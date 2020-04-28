import { put, call } from 'redux-saga/effects';
import axios from '../../axios-liens';
import * as actions from '../actions/index';

const query = `
query FetchLiens($block: String, $lot: String, $qualifier: String, $certificate_number: String, $sale_year: Int, $county: String, $address: String, $sort: String, $limit: Int, $skip: Int ) {
  getLiens(block: $block, lot: $lot, qualifier: $qualifier, certificate_number: $certificate_number, sale_year: $sale_year, county: $county, address: $address, sort: $sort, limit: $limit, skip: $skip) {
    liens {
      lien_id
      block
      lot
      qualifier
      certificate_number
      sale_date
      county
      address
    }
  }
}`;

const countQuery = `
query FetchLiensCount($block: String, $lot: String, $qualifier: String, $certificate_number: String, $sale_year: Int, $county: String, $address: String, $sort: String, $limit: Int, $skip: Int) {
  getLiens(block: $block, lot: $lot, qualifier: $qualifier, certificate_number: $certificate_number, sale_year: $sale_year, county: $county, address: $address, sort: $sort, limit: $limit, skip: $skip) {
    count
  }
}`;

export function* fetchLiensSaga(action) {
  yield put(actions.clearLiens());
  try {
    const countResponse = yield call(axios.post, '/graphql', {
      query: countQuery,
      variables: action.variables,
    });
    const count = countResponse.data.data.getLiens.count;
    let variables;
    const maxCount = parseInt(process.env.REACT_APP_MAX_COUNT);
    if (count >= maxCount) {
      variables = Object.assign({ limit: maxCount }, action.variables);
    } else {
      variables = {
        ...action.variables,
      };
    }
    const response = yield call(axios.post, '/graphql', {
      query,
      variables,
    });
    yield put(
      actions.fetchLiensSuccess(
        response.data.data.getLiens.liens,
        variables,
        count
      )
    );
  } catch (err) {
    yield put(actions.fetchLiensFail(err));
  }
}
