export default {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Email',
    },
    value: '',
    validation: { required: true, isEmail: true },
    valid: false,
    touched: false,
    errorMessage: '',
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'true',
    },
    value: '',
    validation: { required: true },
    valid: false,
    touched: false,
    errorMessage: '',
  },
};
