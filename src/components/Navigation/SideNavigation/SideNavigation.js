import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './SideNavigation.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
// import DrawerToggler from './DrawerToggler/DrawerToggler';

const SideNavigation = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    if (event.key === 'Enter') {
      dispatch(actions.clearLien());
      dispatch(actions.clearLiens());
      history.push(`/lien/${event.target.value}`);
      event.target.value = '';
      event.target.blur();
    }
  };
  return (
    <div className={classes.SideNavigation}>
      <div>
        <p className={classes.SideNavigationTitle}>
          NJ Tax Lien <span>Database</span>
        </p>
        <input
          className={classes.SideNavigationInput}
          placeholder='Search by Lien ID...'
          onKeyPress={onSubmitHandler}
        />
        <ul className={classes.SideNavigationItems}>
          <NavigationItem link='/' pathsToMatch={['/', /^\/lien\/\d+/]}>
            Home
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

export default SideNavigation;
