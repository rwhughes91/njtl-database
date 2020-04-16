import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  const inputContainerClasses = [classes.Input];
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
          onMouseLeave={props.mouseExited}
        />
      );
      break;
    case 'select':
      inputContainerClasses.push(classes.InputLarge);
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          onChange={props.changed}
          value={props.value}
          onBlur={props.blurred}
          onMouseLeave={props.mouseExited}
        >
          <option value=''>Select...</option>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
          onMouseLeave={props.mouseExited}
        />
      );
  }
  const error = (
    <span className={classes.ErrorMessage}>{props.errorMessage}</span>
  );
  return (
    <div className={inputContainerClasses.join(' ')}>
      {error}
      {inputElement}
      <label className={classes.Label}>{props.label}</label>
    </div>
  );
};

export default React.memo(Input, (prevProps, nextProps) => {
  const props = ['value', 'touched', 'invalid'];
  for (let prop of props) {
    if (!(prevProps[prop] === nextProps[prop])) {
      return false;
    }
  }
  return true;
});
