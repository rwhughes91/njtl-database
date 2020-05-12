import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import * as lienSearchSagas from './lienSearch';
import * as lienDetailSagas from './lienDetail';
import * as authSagas from './auth';

function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authSagas.logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSagas.authUserSaga),
    takeEvery(
      actionTypes.AUTH_CHECK_INITIAL_STATE,
      authSagas.authCheckStateSaga
    ),
  ]);
}

function* watchLienSearch() {
  yield all([
    yield takeLatest(actionTypes.FETCH_LIENS, lienSearchSagas.fetchLiensSaga),
    yield takeLatest(actionTypes.FETCH_LIEN, lienDetailSagas.fetchLienSaga),
    yield takeLatest(actionTypes.UPDATE_LIEN, lienDetailSagas.updateLienSaga),
  ]);
}

export default function* rootSaga() {
  yield all([watchLienSearch(), watchAuth()]);
}
