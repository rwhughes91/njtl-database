import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  const styleClasses = [];
  if (props.type === 'primary') {
    styleClasses.push(classes.NavigationItem, classes.Primary);
  } else if (props.type === 'secondary') {
    styleClasses.push(classes.NavigationItem, classes.Secondary);
  } else {
    styleClasses.push(classes.SideNavigationItem);
  }
  return (
    <li className={styleClasses.join(' ')}>
      <NavLink to={props.link} exact activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
