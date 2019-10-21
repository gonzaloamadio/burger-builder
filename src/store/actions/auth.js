import * as actionTypes from './actionTypes';
import axios from 'axios';

// Set loading and other required variables
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  // TODO: Save refreshToken to make people stay logged in
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    userId: authData.localId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000); // *1000 to turn miliseconds in seconds
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      password,
      email,
      returnSecureToken: true
    };
    let url = isSignUp
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQFWiKnOIQ3VJUkcVy14sHNdrfDuf9ip4'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQFWiKnOIQ3VJUkcVy14sHNdrfDuf9ip4';
    axios
      .post(url, authData)
      .then(response => {
        console.log(response.data);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        // console.log(err);
        // err.response is the one we have to use (axios wrap wrap the response like this.)
        // console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (new Date() < expirationDate) {
        dispatch(authSuccess({ idToken: token, localId: userId }));
        // We pass the miliseconds remaining for the token to be expired
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};
