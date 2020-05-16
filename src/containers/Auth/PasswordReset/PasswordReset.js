import React, { useState, useEffect, useCallback } from 'react';
import classes from './PasswordReset.module.css';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import { useParams, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm/useForm';
import formControls from './formControls';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-liens';
import Axios from 'axios';

const PasswordReset = ({ setError }) => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const [authenticating, setAuthenticating] = useState(false);
  const [tokenValidated, setTokenValidate] = useState(false);

  useEffect(() => {
    const cancelToken = Axios.CancelToken;
    const source = cancelToken.source();
    axios
      .post('/reset/validate_token', { token }, { cancelToken: source.token })
      .then(() => {
        setTokenValidate(true);
      })
      .catch((err) => {
        if (!Axios.isCancel(err)) {
          dispatch(actions.tokenMessage(err.response.data.message));
          history.push('/');
        }
      });
    return () => {
      source.cancel();
    };
  });

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
    (event, { controlName, updateField, validateField }) => {
      const value = event.target.value;
      updateField(value);
      validateField(value, controlName);
    },
    []
  );

  const callbacks = {
    input: {
      inputChangedHandler,
    },
  };
  const { formElements, formData, setFormData } = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  useEffect(() => {
    if (formData.controls.password.value.length > 0) {
      setFormData({
        type: 'UPDATE_FIELD',
        controlName: 'confirmPassword',
        data: {
          valid: false,
          validation: {
            required: true,
            equal: [
              formData.controls.password.value,
              'Does not equal password',
            ],
          },
          errorMessage: 'Does not equal password',
        },
      });
    }
  }, [formData.controls.password.value, setFormData]);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      setError(false);
      setAuthenticating(true);
      await axios.post('/reset_password', {
        token,
        password: formData.controls.password.value,
        confirmPassword: formData.controls.confirmPassword.value,
      });
      dispatch(actions.tokenMessage('Password updated'));
      history.push('/');
    } catch (err) {
      setError(err.response.data.message);
      setAuthenticating(false);
    }
  };

  let form = <Spinner bgColor='white' />;
  if (tokenValidated && !authenticating) {
    form = (
      <>
        <form onSubmit={submitHandler} className={classes.PasswordResetForm}>
          {formElements}
          <Button btnType='Primary Login' disabled={!formData.formIsValid}>
            Update Password
          </Button>
        </form>
        <button
          onClick={() => history.push('/')}
          className={classes.SignInButton}
        >
          Back to sign in
        </button>
      </>
    );
  }
  return (
    <div className={classes.PasswordReset}>
      <h1 className={classes.FormTitle}>Update your password</h1>
      {form}
    </div>
  );
};

export default React.memo(PasswordReset);
