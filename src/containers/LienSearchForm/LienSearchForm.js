import React, { useReducer, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import classes from './LienSearchForm.module.css';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import formControls from './formControls';
import formValidation from './formValidation';

const initialState = {
  controls: formControls,
  formIsValid: false,
};

const LienSearchFormReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      const updatedControls = {
        formIsValid: action.formIsValid
          ? action.formIsValid
          : state.formIsValid,
        controls: {
          ...state.controls,
          [action.controlName]: {
            ...state.controls[action.controlName],
            ...action.data,
          },
        },
      };
      return updatedControls;
    case 'RESET_FORM':
      return initialState;
    default:
      throw new Error('Action type not recognized');
  }
};

const LienSearchForm = () => {
  const [formData, setFormData] = useReducer(
    LienSearchFormReducer,
    initialState
  );

  const dispatch = useDispatch();
  const timer = useRef(0);
  const lastQuery = useRef(null);

  const validateInputTimer = useCallback((validatorFn) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(validatorFn, 1000);
  }, []);

  const validateInputHandler = useCallback(
    (value, controlName) => {
      if (value.length > 0) {
        const [valid, errorMessage] = formValidation(
          value,
          formData.controls[controlName].validation
        );
        const updatedControls = {
          controlName,
          data: {
            valid,
            errorMessage,
          },
        };
        let formIsValid = false;
        for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid || formIsValid;
        }
        updatedControls.formIsValid = formIsValid;
        setFormData(Object.assign({ type: 'UPDATE_FIELD' }, updatedControls));
      }
    },
    [formData]
  );

  const inputChangedHandler = useCallback(
    (event, controlName) => {
      const value = event.target.value;
      let updatedControls;
      if (value.length > 0) {
        const [valid] = formValidation(
          value,
          formData.controls[controlName].validation
        );
        updatedControls = {
          controlName,
          data: {
            touched: true,
            valid,
            value,
          },
        };
        let formIsValid = false;
        for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid || formIsValid;
        }
        updatedControls.formIsValid = formIsValid;
      } else {
        updatedControls = {
          controlName,
          data: {
            touched: false,
            valid: false,
            errorMessage: '',
            value,
          },
        };
      }
      setFormData(Object.assign({ type: 'UPDATE_FIELD' }, updatedControls));
      validateInputTimer(() => {
        validateInputHandler(value, controlName);
      });
    },
    [formData, validateInputTimer, validateInputHandler]
  );

  const resetHandler = useCallback((event) => {
    event.preventDefault();
    setFormData({ type: 'RESET_FORM' });
  }, []);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const variables = {};
      for (let key in formData.controls) {
        if (key === 'county' && !formData.controls[key].touched) {
          continue;
        }
        variables[key] = formData.controls[key].value;
      }
      if (!(lastQuery.current === JSON.stringify(variables))) {
        lastQuery.current = JSON.stringify(variables);
        dispatch(actions.fetchLiens(variables));
      }
    },
    [dispatch, formData.controls]
  );

  const formElementsArray = [];
  for (let key in formData.controls) {
    formElementsArray.push({
      id: key,
      config: formData.controls[key],
    });
  }

  const formElements = formElementsArray.map((formElement) => {
    const props = {
      key: formElement.id,
      elementType: formElement.config.elementType,
      elementConfig: formElement.config.elementConfig,
      value: formElement.config.value,
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
            disabled={!formData.formIsValid}
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

export default React.memo(LienSearchForm);
