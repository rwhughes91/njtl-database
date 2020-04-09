import React from 'react';

import classes from './Navigation.module.css';

import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import SideNavigation from '../Navigation/SideNavigation/SideNavigation';

const Navigation = () => {
  return (
    <>
      <SideNavigation />
      <div className={classes.Navigation}>
        <p className={classes.Breadcrumb}>Home</p>
        <NavigationItems />
      </div>
    </>
  );
};

export default Navigation;
