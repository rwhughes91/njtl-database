import React, { useState, useCallback, useRef } from 'react';

import classes from './LienSearchForm.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import formControls from './formControls';
import formValidation from './formValidation';

const LienSearchForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [controls, setControls] = useState(formControls);

  const formState = useRef(controls);
  const timer = useRef(0);

  const validateInputTimer = (validatorFn) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(validatorFn, 1000);
  };

  const validateInputHandler = useCallback((value, controlName) => {
    if (value.length > 0) {
      const [valid, errorMessage] = formValidation(
        value,
        formState.current[controlName].validation
      );
      const updatedControls = {
        ...formState.current,
        [controlName]: {
          ...formState.current[controlName],
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
    }
  }, []);

  const inputChangedHandler = useCallback(
    (event, controlName) => {
      const value = event.target.value;
      let updatedControls;
      if (event.target.value.length > 0) {
        const [valid] = formValidation(
          event.target.value,
          controls[controlName].validation
        );
        updatedControls = {
          ...controls,
          [controlName]: {
            ...controls[controlName],
            touched: true,
            value,
            valid,
          },
        };
        let formIsValid = false;
        for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid || formIsValid;
        }
        setFormIsValid(formIsValid);
      } else {
        updatedControls = {
          ...controls,
          [controlName]: {
            ...controls[controlName],
            value: event.target.value,
            touched: false,
            valid: false,
            errorMessage: '',
          },
        };
      }
      formState.current = updatedControls;
      setControls(updatedControls);
      validateInputTimer(() => {
        validateInputHandler(value, controlName);
      });
    },
    [controls, validateInputHandler]
  );

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
      shouldValidate: formElement.config.validation,
      touched: formElement.config.touched,
      label: formElement.config.elementConfig.placeholder,
      errorMessage: formElement.config.errorMessage,
      invalid: formElement.config.errorMessage.length > 0,
      changed: (event) => inputChangedHandler(event, formElement.id),
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
