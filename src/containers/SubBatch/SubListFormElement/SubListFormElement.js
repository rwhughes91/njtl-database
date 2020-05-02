import React, { useState, useMemo } from 'react';
import formFormatter from '../../../utils/formFormatter';
import useForm from '../../../hooks/useForm/useForm';

const SubListFormElement = ({ sub_type, sub_date, total }) => {
  const data = useMemo(() => {
    return { total };
  }, [total]);

  const formControls = {
    total: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: '',
      },
      valid: true,
      validation: { isCurrency: true },
      touched: false,
      errorMessage: '',
      formatters: ['currency'],
      value: '',
    },
  };

  const inputClassNames = {
    input: {
      className: '',
      container: '',
      label: '',
      invalid: '',
      errorMessage: '',
    },
  };

  const inputChangedHandler = (
    event,
    { updateField, controlName, validateField }
  ) => {
    updateField(event.target.value);
    validateField(event.target.value, controlName, false);
  };

  const blurHandler = (event, { controlName, formData, setFormData }) => {
    if (formData.controls.total.valid) {
      setFormData({ type: 'UPDATE_FIELD_TO_DISPLAY_VALUE', controlName });
    } else {
      setFormData({
        type: 'UPDATE_FIELD',
        controlName,
        data: {
          touched: false,
          valid: false,
          errorMessage: false,
          value: formFormatter(data.total, ['currency']),
        },
      });
    }
  };

  const callbacks = {
    input: {
      inputChangedHandler,
      blurHandler,
    },
  };

  const [formElements] = useForm(
    { formControls, data },
    inputClassNames,
    callbacks
  );

  return <td>{formElements}</td>;
};

export default SubListFormElement;
