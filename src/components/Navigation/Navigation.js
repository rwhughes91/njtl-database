import React, { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './Navigation.module.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import SideNavigation from '../Navigation/SideNavigation/SideNavigation';
import * as actions from '../../store/actions/index';

const Navigation = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

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
      <div className={classes.Navigation}>
        <p className={classes.Breadcrumb}>{page}</p>
        <NavigationItems />
      </div>
    </>
  );
};

export default React.memo(Navigation);
