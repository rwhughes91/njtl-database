import React, { useState, useCallback } from 'react';
import classes from './LienSearchForm.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import formControls from './formControls';
import formValidation from './formValidation';

const LienSearchForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [controls, setControls] = useState(formControls);

  const inputChangedHandler = useCallback(
    (event, controlName) => {
      const [valid, errorMessage] = formValidation(
        event.target.value,
        controls[controlName].validation
      );
      const updatedControls = {
        ...controls,
        [controlName]: {
          ...controls[controlName],
          value: event.target.value,
          touched: true,
          valid,
          errorMessage,
        },
      };
      let formIsValid = false;
      for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid || formIsValid;
      }
      setFormIsValid(formIsValid);
      setControls(updatedControls);
    },
    [controls]
  );

  const blurHandler = (event, controlName) => {
    console.log(controls[controlName].errorMessage);
  };

  const resetHandler = (event) => {
    event.preventDefault();
    setFormIsValid(false);
    setControls(formControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  const formElements = formElementsArray.map((formElement, index) => {
    const props = {
      key: formElement.id,
      elementType: formElement.config.elementType,
      elementConfig: formElement.config.elementConfig,
      value: formElement.config.value,
      invalid: !formElement.config.valid,
      shouldValidate: formElement.config.validation,
      touched: formElement.config.touched,
      label: formElement.config.elementConfig.placeholder,
      errorMessage: formElement.config.errorMessage,
      changed: (event) => inputChangedHandler(event, formElement.id),
      blurred: (event) => blurHandler(event, formElement.id),
    };
    return <Input {...props} />;
  });

  let form = (
    <form className={classes.LienSearchForm} onSubmit={submitHandler}>
      <div className={classes.FormGroup}>{formElements.slice(0, 4)}</div>
      <div className={classes.FormGroup}>{formElements.slice(4)}</div>
      <div className={classes.FormGroup}>
        <div>
          <Button
            btnType='Primary'
            clicked={submitHandler}
            disabled={!formIsValid}
          >
            Submit
          </Button>
          <Button btnType='Danger' clicked={resetHandler}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  );

  return form;
};

export default LienSearchForm;
