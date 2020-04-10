import React from 'react';

import classes from './Button.module.css';

const Button = (props) => (
  <button
    disabled={props.disabled}
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onMouseEnter={props.hovered}
  >
    {props.children}
  </button>
);

export default Button;
