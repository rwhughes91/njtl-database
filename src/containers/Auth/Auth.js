import React, { useState, useEffect, useCallback } from 'react';
import classes from './Auth.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Route, Switch } from 'react-router-dom';
import axios from '../../axios-liens';
import Login from './Login/Login';
import PasswordReset from './PasswordReset/PasswordReset';

const Auth = () => {
  const dispatch = useDispatch();
  const [tokenEmailed, setTokenEmailed] = useState({
    sent: false,
    message: null,
    type: null,
  });
  const error = useSelector((state) => state.auth.error);
  const tokenMessage = useSelector((state) => state.auth.tokenMessage);
  const [passwordResetError, setPasswordResetError] = useState(null);

  useEffect(() => {
    return () => {
      setTokenEmailed({ sent: false, message: null, type: null });
      dispatch(actions.tokenMessage(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (tokenMessage === 'Password updated') {
      window.flash(tokenMessage, 'success');
    } else if (tokenMessage) {
      window.flash(tokenMessage, 'error');
    }
    if (error) {
      window.flash(error, 'error');
    }
    if (tokenEmailed.sent) {
      window.flash(tokenEmailed.message, tokenEmailed.type);
    }
    if (passwordResetError) {
      window.flash(passwordResetError, 'error');
    }
  });

  const tokenSubmitHandler = useCallback(async (email) => {
    try {
      await axios.post('/reset', { email });
      setTokenEmailed({ sent: true, message: 'Token sent', type: 'success' });
    } catch (err) {
      setTokenEmailed({
        sent: true,
        message: err.response.data.message,
        type: 'error',
      });
    }
  }, []);

  return (
    <div>
      <h1 className={classes.Title}>NJTL Database</h1>
      <Switch>
        <Route path='/auth/password_reset/:token' exact>
          <PasswordReset setError={setPasswordResetError} />
        </Route>
        <Route path='/'>
          <Login sendTokenSubmitted={tokenSubmitHandler} errorMessage={error} />
        </Route>
      </Switch>
    </div>
  );
};

export default React.memo(Auth);
