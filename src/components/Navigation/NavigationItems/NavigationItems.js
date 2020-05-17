import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import withSizes from 'react-sizes';

const NavigationItems = (props) => {
  let link = (
    <NavigationItem link='/dashboard' type='primary'>
      Dashboard
    </NavigationItem>
  );
  if (props.isMobile) {
    link = (
      <NavigationItem link='/' type='primary'>
        Lien Search
      </NavigationItem>
    );
  }
  return (
    <ul className={classes.NavigationItems}>
      {link}
      <NavigationItem link='/logout' type='secondary'>
        Logout
      </NavigationItem>
    </ul>
  );
};

const mapSizesToProps = ({ width }) => {
  return {
    isMobile: width <= 640,
  };
};

export default withSizes(mapSizesToProps)(React.memo(NavigationItems));
