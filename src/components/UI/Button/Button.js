import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  const classNames = [classes.Button];
  if (props.btnType) {
    for (let key of props.btnType.split(' ')) {
      classNames.push(classes[key]);
    }
  }
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      className={classNames.join(' ')}
      onMouseEnter={props.hovered}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
