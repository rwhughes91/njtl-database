const formControls = {
  lien_id: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Lien ID',
    },
    value: '',
  },
  block: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Block',
    },
    value: '',
  },
  lot: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Lot',
    },
    value: '',
  },
  qualifier: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Qualifier',
    },
    value: '',
  },
  certificate_number: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Certificate #',
    },
    value: '',
  },
  address: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Address',
    },
    value: '',
  },
  county: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Township',
    },
    value: '',
  },
  sale_date: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Sale Date',
    },
    formatters: ['date'],
    value: '',
  },
  recording_fee: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Rec Fee',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    formatters: ['currency'],
    value: '',
  },
  recording_date: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Rec Date',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    formatters: ['date'],
    value: '',
  },
  winning_bid_percentage: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Winning %',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    formatters: ['percent'],
    value: '',
  },
  search_fee: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Search Fee',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    formatters: ['currency'],
    value: '',
  },
  year_end_penalty: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'YEP',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    formatters: ['currency'],
    value: '',
  },
  tax_amount: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Tax Amount',
    },
    formatters: ['currency'],
    value: '',
  },
  premium: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Premium',
    },
    formatters: ['currency'],
    value: '',
  },
  total_principal_balance: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Principal',
    },
    formatters: ['currency'],
    value: '',
  },
  total_cash_out: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Cash Out',
    },
    formatters: ['currency'],
    value: '',
  },
  flat_rate: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Flat Rate',
    },
    formatters: ['currency'],
    value: '',
  },
  cert_int: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Cert Int',
    },
    formatters: ['currency'],
    value: '',
  },
  total_actual_interest: {
    elementType: 'frozenInput',
    elementConfig: {
      type: 'text',
      placeholder: 'Interest',
    },
    formatters: ['currency'],
    value: '',
  },
  status: {
    elementType: 'select',
    elementConfig: {
      placeholder: 'Status',
      options: [
        { value: 'redeemed', displayValue: 'Redeemed' },
        { value: 'bankruptcy', displayValue: 'Bankruptcy' },
        { value: 'bankruptcy/redeemed', displayValue: 'Bankruptcy/Redeemed' },
        { value: 'foreclosure', displayValue: 'Foreclosure' },
        { value: 'foreclosure/redeemed', displayValue: 'Foreclosure/Redeemed' },
        { value: 'no-subs', displayValue: 'No-Subs' },
        { value: 'own', displayValue: 'Own' },
      ],
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    value: '',
  },
  redemption_date: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Red Date',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    formatters: ['date'],
    value: '',
  },
  redemption_amount: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Red Amount',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    formatters: ['currency'],
    value: '',
  },
  notes: {
    elementType: 'textarea',
    elementConfig: {
      type: 'text',
      placeholder: 'Notes',
    },
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
    value: '',
  },
};

export default formControls;
