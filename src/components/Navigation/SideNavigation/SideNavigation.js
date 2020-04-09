import React from 'react';

import classes from './SideNavigation.module.css';

// import DrawerToggler from './DrawerToggler/DrawerToggler';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const SideNavigation = (props) => {
  return (
    <div className={classes.SideNavigation}>
      <div>
        <p className={classes.SideNavigationTitle}>
          NJ Tax Lien <span>Database</span>
        </p>
        <input
          className={classes.SideNavigationInput}
          placeholder='Search by Lien ID...'
        />
        <ul className={classes.SideNavigationItems}>
          <NavigationItem link='/'>Home</NavigationItem>
          <NavigationItem link='/upload'>Upload</NavigationItem>
          <NavigationItem link='/subs'>Subs</NavigationItem>
          <NavigationItem link='/reports'>Reports</NavigationItem>
        </ul>
      </div>
      <div>
        <a className={classes.Help} href='mailto:someone@test.com'>
          Issue?
        </a>
      </div>
    </div>
  );
};

export default SideNavigation;
