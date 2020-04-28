import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  const location = useLocation();
  const styleClasses = [];
  if (props.type === 'primary') {
    styleClasses.push(classes.NavigationItem, classes.Primary);
  } else if (props.type === 'secondary') {
    styleClasses.push(classes.NavigationItem, classes.Secondary);
  } else {
    styleClasses.push(classes.SideNavigationItem);
  }
  let match = false;
  if (props.pathsToMatch) {
    for (let path of props.pathsToMatch) {
      if (typeof path === 'string') {
        if (path === location.pathname) {
          match = true;
        }
      } else if (path instanceof RegExp) {
        if (path.test(location.pathname)) {
          match = true;
        }
      }
    }
  }
  return (
    <li className={styleClasses.join(' ')}>
      <Link className={match ? classes.Active : null} to={props.link}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavigationItem;
