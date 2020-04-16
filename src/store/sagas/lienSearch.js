import { put, call } from 'redux-saga/effects';
import axios from '../../axios-liens';
import * as actions from '../actions/index';

const query = `
query FetchLiens($block: String, $lot: String, $qualifier: String, $certificate_number: String, $sale_year: Int, $county: String, $address: String ) {
  getLiens(block: $block, lot: $lot, qualifier: $qualifier, certificate_number: $certificate_number, sale_year: $sale_year, county: $county, address: $address), {
    block
    lot
    qualifier
    certificate_number
    sale_date
    county
    address
  }
}`;

export function* fetchLiensSaga(action) {
  yield put(actions.fetchLiensStart());
  try {
    const response = yield call(axios.post, '/graphql', {
      query,
      variables: action.variables,
    });
    yield put(actions.fetchLiensSuccess(response.data.data.getLiens));
  } catch (err) {
    yield put(actions.fetchLiensFail(err));
  }
}
