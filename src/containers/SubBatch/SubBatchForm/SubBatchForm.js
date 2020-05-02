import React from 'react';
import classes from './SubBatchForm.module.css';
import useForm from '../../../hooks/useForm/useForm';
import formControls from './formControls';

const SubBatchForm = (props) => {
  const formControlData = { formControls };
  const inputClassNames = {
    input: {
      className: '',
      container: '',
      label: '',
      invalid: '',
      errorMessage: '',
    },
    select: {
      className: '',
      container: '',
      label: '',
      invalid: '',
      errorMessage: '',
    },
  };
  const selectChangedHandler = (event, { updateField }) => {
    let value = event.target.value;
    props.fieldSelected(value);
    updateField(value);
  };
  const inputChangedHandler = (event, { updateField }) => {
    let value = event.target.value;
    updateField(value);
  };
  const callbacks = {
    select: {
      inputChangedHandler: selectChangedHandler,
    },
    input: {
      inputChangedHandler,
    },
  };
  const [formElements] = useForm(formControlData, inputClassNames, callbacks);
  const form = <form className={classes.SubBatchForm}>{formElements}</form>;
  return form;
};

export default SubBatchForm;
