import React from 'react';
import classes from './Navigation.module.css';
import { useLocation } from 'react-router-dom';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import SideNavigation from '../Navigation/SideNavigation/SideNavigation';

const Navigation = () => {
  const location = useLocation();
  let page = 'Home';
  switch (location.pathname) {
    case '/':
      page = 'Home';
      break;
    case '/subs':
      page = 'Subs';
      break;
    case '/upload':
      page = 'Upload';
      break;
    case '/reports':
      page = 'Reports';
      break;
    default:
      page = 'Home';
  }
  return (
    <>
      <SideNavigation />
      <div className={classes.Navigation}>
        <p className={classes.Breadcrumb}>{page}</p>
        <NavigationItems />
      </div>
    </>
  );
};

export default Navigation;
