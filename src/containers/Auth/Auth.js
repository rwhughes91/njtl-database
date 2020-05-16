import React, { useState, useEffect, useCallback } from 'react';
import classes from './Auth.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Route, Switch } from 'react-router-dom';
import FlashMessage, {
  FlashMessageContainer,
} from '../../components/UI/FlashMessage/FlashMessage';
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
    if (tokenEmailed.sent) {
      const timer = setTimeout(() => {
        setTokenEmailed({ sent: false, message: null, type: null });
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [tokenEmailed]);

  useEffect(() => {
    if (tokenMessage) {
      const timer = setTimeout(() => {
        dispatch(actions.tokenMessage(null));
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [tokenMessage, dispatch]);

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
  const flashMessagesArray = [];
  let flashInvalidToken = null;
  if (tokenMessage === 'Password updated') {
    flashInvalidToken = { type: 'success', message: tokenMessage };
    flashMessagesArray.push(flashInvalidToken);
  } else if (tokenMessage) {
    flashInvalidToken = { type: 'error', message: tokenMessage };
    flashMessagesArray.push(flashInvalidToken);
  }
  let flashError = null;
  if (error) {
    flashError = { type: 'error', message: error };
    flashMessagesArray.push(flashError);
  }
  let flashTokenEmailed = null;
  if (tokenEmailed.sent) {
    flashTokenEmailed = {
      type: tokenEmailed.type,
      message: tokenEmailed.message,
    };
    flashMessagesArray.push(flashTokenEmailed);
  }
  let flashPasswordResetError = null;
  if (passwordResetError) {
    flashPasswordResetError = { type: 'error', message: passwordResetError };
    flashMessagesArray.push(flashPasswordResetError);
  }

  return (
    <div>
      <h1 className={classes.Title}>NJTL Database</h1>
      <FlashMessageContainer center>
        {flashMessagesArray.map((flashMessage, index) => {
          return <FlashMessage {...flashMessage} key={index} />;
        })}
      </FlashMessageContainer>
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
