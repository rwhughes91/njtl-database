import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import classes from './LienSearchForm.module.css';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import formControls from './formControls';

import useForm from '../../hooks/useForm/useForm';

const LienSearchForm = (props) => {
  const dispatch = useDispatch();
  const timer = useRef(0);
  const lastQuery = useRef(null);
  const formControlData = { formControls };
  const inputClassNames = {
    input: {
      className: classes.InputElement,
      container: classes.Input,
      label: classes.Label,
      invalid: classes.Invalid,
      errorMessage: classes.ErrorMessage,
    },
    select: {
      className: classes.InputElement,
      container: classes.Input,
      label: classes.Label,
      invalid: classes.Invalid,
      errorMessage: classes.ErrorMessage,
    },
  };

  const validateInputTimer = useCallback((validatorFn) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(validatorFn, 1000);
  }, []);

  const inputChangedHandler = (
    event,
    { controlName, updateField, validateField }
  ) => {
    let value = event.target.value;
    if (controlName === 'sale_year') {
      value = parseInt(value);
    }
    updateField(value);
    validateInputTimer(() => {
      validateField(value, controlName);
    });
  };

  const callbacks = {
    input: {
      inputChangedHandler,
    },
    select: {
      inputChangedHandler,
    },
  };

  const [formElements, formData, setFormData] = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  const resetHandler = useCallback(
    (event) => {
      event.preventDefault();
      setFormData({ type: 'RESET_FORM' });
    },
    [setFormData]
  );

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const variables = {
        skip: 0,
        sort: 'county sale_date',
      };
      for (let key in formData.controls) {
        if (key === 'county' && !formData.controls[key].touched) {
          continue;
        }
        variables[key] = formData.controls[key].value;
      }
      variables.sale_year = parseInt(variables.sale_year);
      if (props.failed || lastQuery.current !== JSON.stringify(variables)) {
        lastQuery.current = JSON.stringify(variables);
        dispatch(actions.clearLien());
        dispatch(actions.fetchLiens(variables));
      }
    },
    [dispatch, formData.controls, props.failed]
  );

  const form = (
    <form className={classes.LienSearchForm} onSubmit={submitHandler}>
      <div className={classes.FormGroup}>{formElements.slice(0, 4)}</div>
      <div className={classes.FormGroup}>{formElements.slice(4)}</div>
      <div className={classes.FormGroup}>
        <div>
          <Button
            btnType='Primary LargeText'
            clicked={submitHandler}
            disabled={!formData.formIsValid}
          >
            Submit
          </Button>
          <Button btnType='Danger LargeText' clicked={resetHandler}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
  return form;
};

export default React.memo(LienSearchForm);
