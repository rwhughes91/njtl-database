import validator from 'validator';

const formValidation = (value, rules) => {
  let isValid = true;
  let errorMessage = '';
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (!isValid) {
      errorMessage = 'Field required';
      return [isValid, errorMessage];
    }
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid) {
      errorMessage = `Must be over ${rules.minLength - 1} chars`;
      return [isValid, errorMessage];
    }
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (!isValid) {
      errorMessage = `Must be under ${rules.maxLength + 1} chars`;
      return [isValid, errorMessage];
    }
  }
  if (rules.isCurrency) {
    isValid = validator.isCurrency(value) && isValid;
    if (!isValid) {
      errorMessage = 'Must be a currency';
      return [isValid, errorMessage];
    }
  }
  if (rules.isDate) {
    const date = new Date(value);
    isValid = date.toString() !== 'Invalid Date' && isValid;
    if (!isValid) {
      errorMessage = 'Must be a valid date';
      return [isValid, errorMessage];
    }
  }
  return [isValid, errorMessage];
};

export default formValidation;
