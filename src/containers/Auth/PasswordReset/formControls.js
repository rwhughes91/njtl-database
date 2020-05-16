export default {
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'New password',
      autoComplete: 'true',
    },
    value: '',
    validation: { required: true, minLength: 6 },
    valid: false,
    touched: false,
    errorMessage: '',
  },
  confirmPassword: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Confirm new password',
      autoComplete: 'true',
    },
    value: '',
    validation: { required: true },
    valid: false,
    touched: false,
    errorMessage: '',
  },
};
