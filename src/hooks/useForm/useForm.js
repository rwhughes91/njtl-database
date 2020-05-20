import React, { useReducer, useCallback, useMemo, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import formFormatter from '../../utils/formFormatter';
import formValidation from '../../utils/formValidation';

const inputDefaultConfigs = {
  input: {},
  frozenInput: {},
  select: {},
  textarea: {},
};

const inputDefaultCallbacks = {
  input: {},
  frozenInput: {},
  select: {},
  textarea: {},
};

export const isFormValid = (controls, controlName = null, valid = null) => {
  let formIsValid = true;
  if (valid === false) return false;
  for (let inputIdentifier in controls) {
    if (controlName && valid !== null && inputIdentifier === controlName) {
      formIsValid = valid && formIsValid;
    } else {
      formIsValid = controls[inputIdentifier].valid && formIsValid;
    }
  }
  return formIsValid;
};

const useForm = (
  formControlData,
  inputConfigs = inputDefaultConfigs,
  eventHandlers = inputDefaultCallbacks
) => {
  const { formControls, data } = formControlData;
  inputConfigs = {
    ...inputDefaultConfigs,
    ...inputConfigs,
  };
  eventHandlers = {
    ...inputDefaultCallbacks,
    ...eventHandlers,
  };
  const initialState = useMemo(() => {
    return {
      formIsValid: false,
      controls: formControls,
    };
  }, [formControls]);

  const formReducer = useCallback(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_FORM_VALIDITY':
          return {
            ...state,
            formIsValid: action.formIsValid,
          };
        case 'UPDATE_FIELD':
          const updatedControls = {
            formIsValid:
              typeof action.formIsValid === 'boolean'
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
        case 'UPDATE_FIELD_TO_DISPLAY_VALUE':
          let updatedField = action.value
            ? action.value
            : state.controls[action.controlName].value;
          if (state.controls[action.controlName].formatters) {
            updatedField = formFormatter(
              updatedField,
              state.controls[action.controlName].formatters
            );
          }
          return {
            ...state,
            controls: {
              ...state.controls,
              [action.controlName]: {
                ...state.controls[action.controlName],
                value: updatedField,
              },
            },
          };
        case 'RESET_FORM':
          return initialState;
        case 'UPDATE_TO_CURRENT_VALUES':
          const controls = {
            ...state.controls,
          };
          for (let key in state.controls) {
            const variable = action.data[key];
            if (controls[key].formatters) {
              controls[key].value = variable
                ? formFormatter(variable, controls[key].formatters)
                : formFormatter('', controls[key].formatters);
            } else {
              controls[key].value = variable ? variable : '';
            }
          }
          return {
            ...state,
            controls: {
              ...state.controls,
            },
          };
        default:
          throw new Error('Action type not recognized');
      }
    },
    [initialState]
  );

  const [formData, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_TO_CURRENT_VALUES', data });
    }
  }, [data]);

  const inputChangedHandler = useCallback(
    (value, controlName, fieldLength = 1, toDispatch = true) => {
      let updatedControls;
      if (value.toString().length >= fieldLength) {
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
        const formIsValid = isFormValid(formData.controls, controlName, valid);
        updatedControls.formIsValid = formIsValid;
      } else {
        updatedControls = {
          controlName,
          data: {
            valid: true,
            errorMessage: '',
            value,
          },
        };
      }
      const payload = {
        type: 'UPDATE_FIELD',
        ...updatedControls,
      };
      if (toDispatch) {
        return dispatch(payload);
      }
      return payload;
    },
    [formData]
  );

  const validateInputHandler = useCallback(
    (
      value,
      controlName,
      errorMessageValidation = true,
      lengthToValidate = 1,
      toDispatch = true
    ) => {
      value = value.toString();
      if (value.length >= lengthToValidate) {
        const [valid, errorMessage] = formValidation(
          value,
          formData.controls[controlName].validation
        );
        const updatedControls = {
          controlName,
          data: {
            valid,
            errorMessage: errorMessageValidation ? errorMessage : '',
          },
        };
        const formIsValid = isFormValid(formData.controls, controlName, valid);
        updatedControls.formIsValid = formIsValid;
        const payload = {
          type: 'UPDATE_FIELD',
          ...updatedControls,
        };
        if (toDispatch) {
          return dispatch(payload);
        }
        return payload;
      }
    },
    [formData]
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
      invalid: !formElement.config.valid,
      className: inputConfigs[formElement.config.elementType].className
        ? inputConfigs[formElement.config.elementType].className
        : '',
      containerClassName: inputConfigs[formElement.config.elementType].container
        ? inputConfigs[formElement.config.elementType].container
        : '',
      labelClassName: inputConfigs[formElement.config.elementType].label
        ? inputConfigs[formElement.config.elementType].label
        : '',
      invalidClassName: inputConfigs[formElement.config.elementType].invalid
        ? inputConfigs[formElement.config.elementType].invalid
        : '',
      errorMessageClassName: inputConfigs[formElement.config.elementType]
        .errorMessage
        ? inputConfigs[formElement.config.elementType].errorMessage
        : '',
      changed: eventHandlers[formElement.config.elementType].inputChangedHandler
        ? (event) =>
            eventHandlers[formElement.config.elementType].inputChangedHandler(
              event,
              {
                controlName: formElement.id,
                updateField: (value, fieldLength) =>
                  inputChangedHandler(value, formElement.id, fieldLength),
                validateField: validateInputHandler,
                formData,
                setFormData: dispatch,
                formValidation,
              }
            )
        : null,
      blurred: eventHandlers[formElement.config.elementType].blurHandler
        ? (event) =>
            eventHandlers[formElement.config.elementType].blurHandler(event, {
              controlName: formElement.id,
              validateField: validateInputHandler,
              formFormatter,
              formData,
              setFormData: dispatch,
              formValidation,
            })
        : null,
    };
    return <Input {...props} />;
  });
  return {
    formElements,
    formData,
    setFormData: dispatch,
    formFormatter,
    isFormValid,
  };
};

export default useForm;
