// will allow us to listen to certain actions and do something when they occur.
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

export function* watchAuth() {
  // takeEvery takes the action we are listening to, and the saga that will be exec when that occurs.
  // We are basically setting like a listener.
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
