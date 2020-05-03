import React, { useMemo } from 'react';
import classes from './SubBatchForm.module.css';
import useForm from '../../../hooks/useForm/useForm';
import formControls from './formControls';
import Button from '../../../components/UI/Button/Button';

const SubBatchForm = (props) => {
  const data = useMemo(() => {
    return { county: props.data };
  }, [props.data]);
  const formControlData = { formControls, data };
  const inputClassNames = {
    input: {
      className: classes.InputElement,
      container: '',
      label: '',
      invalid: classes.Invalid,
      errorMessage: '',
    },
    select: {
      className: classes.InputElement,
      container: '',
      label: '',
      invalid: '',
      errorMessage: '',
    },
  };
  const selectChangedHandler = (event, { updateField }) => {
    let value = event.target.value;
    updateField(value);
    if (value) {
      props.fieldSelected(value);
    } else {
      props.clearBatchData();
    }
  };
  const inputChangedHandler = (
    event,
    { updateField, controlName, validateField }
  ) => {
    let value = event.target.value;
    updateField(value);
    validateField(value, controlName, true, 0);
  };
  const callbacks = {
    select: {
      inputChangedHandler: selectChangedHandler,
    },
    input: {
      inputChangedHandler,
    },
  };
  const [formElements, formData] = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );
  const button = (
    <Button btnType='Primary' disabled={!formData.formIsValid}>
      Create new batch
    </Button>
  );
  const form = (
    <form className={classes.SubBatchForm}>
      {props.children(formElements, button)}
    </form>
  );
  return form;
};

export default SubBatchForm;
