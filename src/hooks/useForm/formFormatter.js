const formatter = (value, formatters, display = true) => {
  let newValue = value;
  for (let formatter of formatters) {
    if (formatter === 'date') {
      if (typeof value === 'string') {
        if (value !== '') {
          if (!(value.charAt(1) === '/' || value.charAt(2) === '/')) {
            if (value.length > 2) {
              newValue = new Date(parseInt(value)).toLocaleDateString();
            }
          }
        }
      }
    } else if (formatter === 'currency') {
      let tmp = value;
      if (typeof value === 'string' && value.lastIndexOf('$') !== -1) {
        tmp = value.replace(/\$/, '');
      }
      newValue = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(tmp);
    } else if (formatter === 'percent') {
      if (typeof value === 'string') {
        if (value.lastIndexOf('%') === -1) {
          if (value === '') {
            newValue = '0%';
          } else {
            newValue = `${value}%`;
          }
        }
      } else {
        newValue = `${value}%`;
      }
    }
  }
  return newValue;
};

export default formatter;
