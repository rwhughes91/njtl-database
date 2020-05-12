import React from 'react';
import useForm from '../../hooks/useForm/useForm';
import formControls from './formControls';
import Button from '../../components/UI/Button/Button';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const Auth = () => {
  const dispatch = useDispatch();
  const formControlData = { formControls };
  const inputClassNames = {
    input: {
      className: '',
      container: '',
      label: '',
      invalid: '',
      errorMessage: '',
    },
  };
  const inputChangedHandler = (event, { updateField }) => {
    const value = event.target.value;
    updateField(value);
  };
  const callbacks = {
    input: {
      inputChangedHandler,
    },
  };
  const [formElements, formData] = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      actions.auth(
        formData.controls.email.value,
        formData.controls.password.value,
        false
      )
    );
  };
  const form = (
    <form onSubmit={submitHandler}>
      {formElements}
      <Button btnType='Primary'>Submit</Button>
    </form>
  );
  return (
    <div>
      <h1>Sign In/Sign Up</h1>
      {form}
    </div>
  );
};

export default Auth;
