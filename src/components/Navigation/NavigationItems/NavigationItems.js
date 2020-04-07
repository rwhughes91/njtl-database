import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem type='primary'>Dashboard</NavigationItem>
    <NavigationItem type='secondary'>Logout</NavigationItem>
  </ul>
);

export default NavigationItems;
