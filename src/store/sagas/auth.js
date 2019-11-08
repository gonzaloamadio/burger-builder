import * as actions from '../actions';
// put will dispatch a new action
import { put, delay } from 'redux-saga/effects';

// action: action that was dispatched
export function* logoutSaga(action) {
  // We need to prepend each step we execute with yield
  // Thah will mean that we have to wait for that step to finish execution.
  // It will not continuew until the step is done
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}
