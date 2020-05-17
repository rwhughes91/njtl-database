import React, { useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './Navigation.module.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import SideNavigation from '../Navigation/SideNavigation/SideNavigation';
import * as actions from '../../store/actions/index';
import DrawerToggler from '../Navigation/SideNavigation/DrawerToggler/DrawerToggler';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Navigation = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  let page = 'Home';
  switch (location.pathname) {
    case '/':
      page = 'Search';
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
      page = 'Search';
  }
  if (location.pathname.startsWith('/lien/')) {
    page = 'Detail';
  } else if (location.pathname.startsWith('/subs/')) {
    page = 'Subs';
  }

  const toggleSideNav = useCallback(() => {
    setShowSideDrawer((prevState) => !prevState);
  }, []);

  const onSubmitHandler = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        dispatch(actions.clearLien());
        dispatch(actions.clearLiens());
        history.push(`/lien/${event.target.value}`);
        event.target.value = '';
        event.target.blur();
      }
    },
    [dispatch, history]
  );

  return (
    <>
      <SideNavigation submitted={onSubmitHandler} />
      <DrawerToggler showSideDrawer={toggleSideNav}>Menu</DrawerToggler>
      <SideDrawer
        show={showSideDrawer}
        showSideDrawer={toggleSideNav}
        submitted={onSubmitHandler}
        setShowSideDrawer={setShowSideDrawer}
      />
      <div className={classes.Navigation}>
        <p className={classes.Breadcrumb}>{page}</p>
        <NavigationItems />
      </div>
    </>
  );
};

export default React.memo(Navigation);
