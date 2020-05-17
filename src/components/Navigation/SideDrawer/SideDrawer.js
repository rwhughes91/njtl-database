import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './SideDrawer.module.css';
import SideNavigation from '../SideNavigation/SideNavigation';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({ show, showSideDrawer, submitted, setShowSideDrawer }) => {
  const location = useLocation();
  const sideDrawerClasses = [classes.SideDrawer, classes.Close];
  if (show) {
    sideDrawerClasses[1] = classes.Open;
  }

  useEffect(() => {
    setShowSideDrawer(false);
  }, [location, setShowSideDrawer]);

  return (
    <div className={classes.Toggler}>
      <Backdrop show={show} hide={showSideDrawer} />
      <div className={sideDrawerClasses.join(' ')}>
        <SideNavigation forceShow submitted={submitted} />
      </div>
    </div>
  );
};

export default React.memo(SideDrawer);
