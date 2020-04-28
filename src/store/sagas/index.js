import { all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import * as lienSearchSagas from './lienSearch';
import * as lienDetailSagas from './lienDetail';

function* watchLienSearch() {
  yield takeLatest(actionTypes.FETCH_LIENS, lienSearchSagas.fetchLiensSaga);
  yield takeLatest(actionTypes.FETCH_LIEN, lienDetailSagas.fetchLienSaga);
  yield takeLatest(actionTypes.UPDATE_LIEN, lienDetailSagas.updateLienSaga);
}

export default function* rootSaga() {
  yield all([watchLienSearch()]);
}
