import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.clearLiensData());
    dispatch(actions.logout());
  }, [dispatch]);
  return <Redirect to='/' />;
};

export default Logout;
