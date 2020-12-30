import React, { useState, useEffect, useCallback } from 'react';
import classes from './Login.module.css';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';
import useForm from '../../../hooks/useForm/useForm';
import formControls from './formControls';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Login = ({ sendTokenSubmitted, errorMessage }) => {
  const dispatch = useDispatch();
  const [authenticating, setAuthenticating] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setAuthenticating(false);
    }
  }, [errorMessage]);

  const formControlData = { formControls };
  const inputClassNames = {
    input: {
      className: classes.InputElement,
      container: classes.Input,
      label: classes.Label,
      invalid: classes.Invalid,
      errorMessage: classes.ErrorMessage,
    },
  };

  const inputChangedHandler = useCallback(
    (event, { controlName, validateField, updateField }) => {
      const value = event.target.value;
      updateField(value);
    },
    []
  );

  const blurHandler = (event, { controlName, validateField }) => {
    const value = event.target.value;
    validateField(value, controlName);
  };

  const callbacks = {
    input: {
      inputChangedHandler,
      blurHandler,
    },
  };

  const { formElements, formData, setFormData } = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  const toggleForgotPassword = () => {
    setForgotPassword((prevState) => !prevState);
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    setAuthenticating(true);
    setFormData({
      type: 'UPDATE_FIELD',
      formIsValid: false,
      controlName: 'password',
      data: {
        valid: false,
        errorMessage: '',
        value: '',
      },
    });
    dispatch(
      actions.auth(
        formData.controls.email.value,
        formData.controls.password.value,
        false
      )
    );
  };

  const sendTokenSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setAuthenticating(true);
      await sendTokenSubmitted(formData.controls.email.value);
      setForgotPassword(false);
      setAuthenticating(false);
    },
    [formData.controls.email.value, sendTokenSubmitted]
  );

  let form = <Spinner bgColor='white' />;
  if (!authenticating && !forgotPassword) {
    form = (
      <>
        <form onSubmit={loginSubmitHandler} className={classes.LoginForm}>
          {formElements.find((element) => element.key === 'email')}
          {formElements.find((element) => element.key === 'password')}
          <Button btnType='Primary Login' disabled={!formData.formIsValid}>
            Sign In
          </Button>
        </form>
        <button
          onClick={toggleForgotPassword}
          className={[classes.ForgotPassword, classes.Absolute].join(' ')}
        >
          Forgot password?
        </button>
        {/* <button className={[classes.ForgotPassword, classes.Guest].join(' ')}>
          Continue as guest
        </button> */}
      </>
    );
  } else if (!authenticating && forgotPassword) {
    form = (
      <>
        <form
          onSubmit={sendTokenSubmitHandler}
          className={[classes.LoginForm, classes.ForgotPasswordForm].join('  ')}
        >
          {formElements.find((element) => element.key === 'email')}
          <Button
            btnType='Primary Login'
            disabled={!formData.controls.email.valid}
          >
            Send Token
          </Button>
        </form>
        <button onClick={toggleForgotPassword} className={classes.BackToSignIn}>
          Back to sign in
        </button>
      </>
    );
  }
  return (
    <div className={classes.Login}>
      <h1 className={classes.FormTitle}>
        {forgotPassword ? 'Reset your password' : 'Sign in to your account'}
      </h1>
      {form}
    </div>
  );
};

export default React.memo(Login);
