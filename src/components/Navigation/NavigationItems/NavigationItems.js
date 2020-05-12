import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/dashboard' type='primary'>
      Dashboard
    </NavigationItem>
    <NavigationItem link='/logout' type='secondary'>
      Logout
    </NavigationItem>
  </ul>
);

export default NavigationItems;
