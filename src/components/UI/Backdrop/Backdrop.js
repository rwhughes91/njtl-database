import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props) => (
  <div
    className={classes.Backdrop}
    style={{
      display: props.show ? 'block' : 'none',
    }}
    onClick={props.hide}
  ></div>
);

export default Backdrop;
