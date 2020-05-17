import React from 'react';

import classes from './DrawerToggler.module.css';

const DrawerToggler = (props) => (
  <div className={classes.DrawerToggle} onClick={props.showSideDrawer}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default React.memo(DrawerToggler);
