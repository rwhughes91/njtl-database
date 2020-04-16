import { all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import * as lienSearchSagas from './lienSearch';

function* watchLienSearch() {
  yield takeLatest(actionTypes.FETCH_LIENS, lienSearchSagas.fetchLiensSaga);
}

export default function* rootSaga() {
  yield all([watchLienSearch()]);
}
