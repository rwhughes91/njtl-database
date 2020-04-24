import React from 'react';

import classes from './Spinner.module.css';

const Spinner = (props) => {
  const classNames = [classes.Loader];
  if (props.bgColor === 'white') {
    classNames.push(classes.White);
  } else {
    classNames.push(classes.Gray);
  }
  return <div className={classNames.join(' ')}>Loading...</div>;
};

export default Spinner;
