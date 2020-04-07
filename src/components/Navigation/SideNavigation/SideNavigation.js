import React from 'react';

import classes from './SideNavigation.module.css';

// import DrawerToggler from './DrawerToggler/DrawerToggler';

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
          <li>Home</li>
          <li>Upload</li>
          <li>Subs</li>
          <li>Reports</li>
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
