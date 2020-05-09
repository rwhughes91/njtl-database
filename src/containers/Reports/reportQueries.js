export default {
  getTownshipsList: `
    query getTownshipsList {
      getTownships
    }
    `,
  fetchLiens: `
  query fetchLiens($county: String!, $sale_year: Int, $llc: String) {
    getLiens(county: $county, sale_year: $sale_year, llc: $llc) {
      liens {
        lien_id
        block
        lot
        qualifier
        certificate_number
        sale_date
        county
        address
        lien_type
        current_owner
        assessed_value
        tax_amount
        status
        premium
        address
        certificate_face_value
        winning_bid_percentage
        year_end_penalty
        flat_rate
        cert_int
        total_subs_paid
        total_cash_out
        total_principal_paid
        total_actual_interest
        total_legal_fees
        total_principal_balance
        redemption_date
        redemption_amount
      }
    }
  }
  `,
  fetchMonthlyRedemptions: `
  query fetchMonthlyRedemptions($year: Int!, $month: Int!, $county: String) {
    getMonthlyRedemptions(year: $year, month: $month, county: $county) {
      lien_id
        block
        lot
        qualifier
        certificate_number
        sale_date
        county
        address
        lien_type
        current_owner
        assessed_value
        tax_amount
        status
        premium
        address
        certificate_face_value
        winning_bid_percentage
        year_end_penalty
        flat_rate
        cert_int
        total_subs_paid
        total_cash_out
        total_principal_paid
        total_actual_interest
        total_legal_fees
        total_principal_balance
        redemption_date
        redemption_amount
    }
  }
  `,
  fetchMonthlySubPayments: `
  query fetchMonthlySubPayments($year: Int!, $month: Int!, $county: String) {
    getMonthlySubPayments(year: $year, month: $month, county: $county) {
      lien_id
        block
        lot
        qualifier
        certificate_number
        sale_date
        county
        address
        lien_type
        current_owner
        assessed_value
        tax_amount
        status
        premium
        address
        certificate_face_value
        winning_bid_percentage
        year_end_penalty
        flat_rate
        cert_int
        total_subs_paid
        total_cash_out
        total_principal_paid
        total_actual_interest
        total_legal_fees
        total_principal_balance
        redemption_date
        redemption_amount
        subs {
          sub_type
          sub_date
          total
        }
    }
  }
  `,
};
