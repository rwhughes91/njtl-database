const formControls = {
  block: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Block',
    },
    value: '',
    validation: { minLength: 4 },
    valid: false,
    touched: false,
    errorMessage: '',
  },
  lot: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Lot',
    },
    value: '',
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
  },
  qual: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Qualifier',
    },
    value: '',
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
  },
  certificateNumber: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Certificate Number',
    },
    value: '',
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
  },
  saleYear: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Sale Year',
    },
    value: '',
    validation: { maxLength: 4, minLength: 4 },
    valid: false,
    touched: false,
    errorMessage: '',
  },
  address: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Address',
    },
    value: '',
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
  },
  township: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'Asbury Park', displayValue: 'Asbury Park' },
        { value: 'Atlantic City', displayValue: 'Atlantic City' },
      ],
    },
    value: 'Select...',
    validation: {},
    valid: false,
    touched: false,
    errorMessage: '',
  },
};

export default formControls;
