import React from 'react';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  const styleClasses = [classes.NavigationItem];
  if (props.type === 'primary') {
    styleClasses.push(classes.Primary);
  } else {
    styleClasses.push(classes.Secondary);
  }
  return <li className={styleClasses.join(' ')}>{props.children}</li>;
};

export default NavigationItem;
