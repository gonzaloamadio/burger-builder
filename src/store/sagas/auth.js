import * as actions from '../actions';
// put will dispatch a new action
import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

// action: action that was dispatched
export function* logoutSaga(action) {
  // We need to prepend each step we execute with yield
  // Thah will mean that we have to wait for that step to finish execution.
  // It will not continuew until the step is done
  yield call([localStorage, 'removeItem'], 'token')
  yield call([localStorage, 'removeItem'], 'expirationDate')
  yield call([localStorage, 'removeItem'], 'userId')
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    password: action.password,
    email: action.email,
    returnSecureToken: true
  };
  let url = action.isSignUp
    ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQFWiKnOIQ3VJUkcVy14sHNdrfDuf9ip4'
    : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQFWiKnOIQ3VJUkcVy14sHNdrfDuf9ip4';

  try {
    // Yielding this, will "pause", will wait the axios action to resolve or reject.
    // And store whatever we get back in response constant.
    const response = yield axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    // localStorage is a sync action, yield is not required, but is good for being homogeneous.
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    // err.response is the one we have to use (axios wrap wrap the response like this.)
    // console.log(err.response);
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  const userId = yield localStorage.getItem('userId');
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    );
    if (new Date() < expirationDate) {
      yield put(actions.authSuccess({ idToken: token, localId: userId }));
      // We pass the miliseconds remaining for the token to be expired
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.authLogout());
    }
  }
}
