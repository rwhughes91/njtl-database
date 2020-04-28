const dateFormatter = (value, display) => {
  if (typeof value === 'string') {
    if (display) {
      if (value.length <= 2) return value;
      if (!(value.charAt(1) === '/' || value.charAt(2) === '/')) {
        return new Date(parseInt(value)).toLocaleDateString();
      }
      return value;
    } else {
      if (value.includes('/')) {
        const newDate = new Date(value);
        return newDate.getTime().toString();
      }
      return value;
    }
  }
  throw new Error(`Value must be typeof string. ${typeof value} was passed`);
};

const percentageFormatter = (value, display) => {
  if (typeof value === 'string' || typeof value === 'number') {
    if (typeof value === 'string') {
      if (display) {
        if (!value.includes('%')) {
          if (value === '') {
            return '0%';
          }
          return `${value}%`;
        }
      } else {
        if (value.includes('%')) {
          return parseInt(value.slice(0, value.length));
        }
      }
      return value;
    } else {
      if (display) {
        return `${value}%`;
      }
      return value;
    }
  }
  throw new Error(
    `Value must of typeof string or number. ${typeof value} was passed`
  );
};

const currencyFormatter = (value, display) => {
  if (typeof value === 'string' || typeof value === 'number') {
    if (display) {
      let newValue = value;
      if (typeof value === 'string' && value.includes('$')) {
        newValue = value.replace(/\$/, '');
      }
      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(newValue);
    } else {
      if (typeof value === 'string' && value.includes('$')) {
        return parseFloat(value.slice(1));
      }
      return value;
    }
  }
  throw new Error(
    `Value must of typeof string or number. ${typeof value} was passed`
  );
};

const formatter = (value, formatters, display = true) => {
  let newValue = value;
  for (let formatter of formatters) {
    if (formatter === 'date') {
      newValue = dateFormatter(value, display);
    } else if (formatter === 'currency') {
      newValue = currencyFormatter(value, display);
    } else if (formatter === 'percent') {
      newValue = percentageFormatter(value, display);
    }
  }
  return newValue;
};

export default formatter;
