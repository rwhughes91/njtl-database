import React, { useMemo, useRef } from 'react';
import classes from './SubListFormElement.module.css';
import useForm from '../../../hooks/useForm/useForm';
import useAxios from '../../../hooks/useAxios/useAxios';

const query = `
mutation updateSub($lien_id: Int!, $sub_date: String!, $sub_type: String!, $amount: Float!) {
  updateSubAmount(lien_id: $lien_id, sub_date: $sub_date, sub_type: $sub_type, amount: $amount)
}
`;

const SubListFormElement = ({ lien_id, sub_type, sub_date, total }) => {
  const [, updateSubRequest] = useAxios();

  const data = useMemo(() => {
    return { total };
  }, [total]);

  const lastValue = useRef(data.total);

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
      className: classes.InputElement,
      container: classes.Input,
      label: classes.Label,
      invalid: classes.Invalid,
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

  const blurHandler = (
    event,
    { controlName, formData, setFormData, formFormatter }
  ) => {
    if (formData.controls.total.valid) {
      const value = formFormatter(event.target.value, ['currency'], false);
      setFormData({
        type: 'UPDATE_FIELD_TO_DISPLAY_VALUE',
        controlName,
        value: event.target.value,
      });
      if (value !== lastValue.current && value >= 0) {
        updateSubRequest(
          {
            query,
            variables: {
              lien_id,
              sub_date,
              sub_type,
              amount: value,
            },
          },
          'updateSubAmount'
        );
        lastValue.current = value;
      }
    } else {
      setFormData({
        type: 'UPDATE_FIELD',
        controlName,
        data: {
          touched: false,
          valid: false,
          errorMessage: false,
          value: formFormatter(lastValue.current, ['currency']),
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

  const { formElements } = useForm(
    { formControls, data },
    inputClassNames,
    callbacks
  );

  return <td>{formElements}</td>;
};

export default SubListFormElement;
