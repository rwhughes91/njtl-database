import { put, call, select } from 'redux-saga/effects';
import axios from '../../axios-liens';
import * as actions from '../actions/index';

const query = `
query fetchLien($lien_id: Int!) {
  getLien(lien_id: $lien_id) {
    lien_id
    block
    lot
    qualifier
    county
    certificate_number
    address
    sale_date
    recording_fee
    recording_date
    redemption_date
    redemption_amount
    winning_bid_percentage
    search_fee
    year_end_penalty
    tax_amount
    premium
    total_principal_balance
    total_cash_out
    flat_rate
    cert_int
    status
    total_cash_out
    total_actual_interest
    subs {
      sub_type
      sub_date
      amount
    }
    notes
  }
}
`;

const mutationQuery = ``;

export function* fetchLienSaga(action) {
  try {
    const cachedLiens = yield select((state) => state.lienDetail.cachedLiens);
    let lien = cachedLiens.find(
      (lien) => lien.lien_id === action.variables.lien_id
    );
    if (!lien) {
      const response = yield call(axios.post, '/graphql', {
        query,
        variables: action.variables,
      });
      lien = response.data.data.getLien;
    }
    yield put(actions.fetchLienSuccess(lien));
  } catch (err) {
    yield put(actions.fetchLienFail(err));
  }
}

export function* mutateLienSaga(action) {}
