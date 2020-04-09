const formValidation = (value, rules) => {
  let isValid = true;
  let errorMessage = '';
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (!isValid) {
      errorMessage = 'This field is required';
    }
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid) {
      errorMessage = `Field needs to be >= ${rules.minLength} chars`;
    }
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (!isValid) {
      errorMessage = `Field needs to be <= ${rules.maxLength} chars`;
    }
  }
  return [isValid, errorMessage];
};

export default formValidation;
