import validator from 'validator';

const formValidation = (value, rules) => {
  let isValid = true;
  let errorMessage = '';
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (!isValid) {
      errorMessage = 'Field required';
    }
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid) {
      errorMessage = `Must be over ${rules.minLength - 1} chars`;
    }
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (!isValid) {
      errorMessage = `Must be under ${rules.maxLength + 1} chars`;
    }
  }
  if (rules.isCurrency) {
    isValid = validator.isCurrency(value);
    if (!isValid) {
      errorMessage = 'Must be a currency';
    }
  }
  return [isValid, errorMessage];
};

export default formValidation;
