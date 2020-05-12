import React from 'react';

const Input = (props) => {
  let inputElement = null;
  const inputContainerClasses = [props.containerClassName];
  const inputClasses = [props.className];

  if (props.invalid && props.touched) {
    inputClasses.push(props.invalidClassName);
  }
  let label = true;
  switch (props.elementType) {
    case 'textarea':
      label = false;
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
          onMouseLeave={props.mouseExited}
          {...props.elementConfig}
        />
      );
      break;
    case 'select':
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
    case 'frozenInput':
      inputElement = (
        <input
          readOnly
          className={inputClasses.join(' ')}
          value={props.value}
          onBlur={props.blurred}
          onMouseLeave={props.mouseExited}
          {...props.elementConfig}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
          onMouseLeave={props.mouseExited}
          {...props.elementConfig}
        />
      );
  }
  const error = (
    <span className={props.errorMessageClassName}>{props.errorMessage}</span>
  );
  return (
    <div className={inputContainerClasses.join(' ')}>
      {error}
      {inputElement}
      {label && <label className={props.labelClassName}>{props.label}</label>}
    </div>
  );
};

// export default React.memo(Input, (prevProps, nextProps) => {
//   const props = ['value', 'touched', 'invalid'];
//   for (let prop of props) {
//     if (!(prevProps[prop] === nextProps[prop])) {
//       return false;
//     }
//   }
//   return true;
// });

export default Input;
