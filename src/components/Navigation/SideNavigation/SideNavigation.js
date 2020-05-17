import React from 'react';
import classes from './SideNavigation.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const SideNavigation = (props) => {
  return (
    <div
      className={[
        classes.SideNavigation,
        props.forceShow ? classes.Show : null,
      ].join(' ')}
    >
      <div>
        <p className={classes.SideNavigationTitle}>
          NJ Tax Lien <span>Database</span>
        </p>
        <input
          className={classes.SideNavigationInput}
          placeholder='Search by Lien ID...'
          onKeyPress={props.submitted}
        />
        <ul className={classes.SideNavigationItems}>
          <NavigationItem link='/' pathsToMatch={['/', /^\/lien\/\d+/]}>
            Search
          </NavigationItem>
          <NavigationItem link='/upload' pathsToMatch={['/upload']}>
            Upload
          </NavigationItem>
          <NavigationItem link='/subs' pathsToMatch={['/subs', '/subs/batch']}>
            Subs
          </NavigationItem>
          <NavigationItem link='/reports' pathsToMatch={['/reports']}>
            Reports
          </NavigationItem>
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

export default React.memo(SideNavigation);
