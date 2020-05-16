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
  const selectChangedHandler = (event) => {
    let value = event.target.value;
    if (value) {
      props.fieldSelected(value);
    } else {
      props.clearBatchData();
    }
  };
  const inputChangedHandler = (
    event,
    { updateField, controlName, validateField, setFormData }
  ) => {
    let value = event.target.value;
    let existingDate = false;
    if (props.subBatchDates) {
      for (let dateTime of props.subBatchDates) {
        const date = new Date(parseInt(dateTime)).toLocaleDateString();
        if (date === value) {
          existingDate = true;
          break;
        }
      }
    }
    updateField(value);
    const actionObject = validateField(value, controlName, true, 0, false);
    const payload = { ...actionObject };
    if (existingDate) {
      payload.data.valid = false;
      payload.data.errorMessage = 'Cannot be an already batched date';
      payload.formIsValid = false;
    }
    setFormData(payload);
  };
  const callbacks = {
    select: {
      inputChangedHandler: selectChangedHandler,
    },
    input: {
      inputChangedHandler,
    },
  };
  const { formElements, formData, formFormatter } = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { county, sub_date } = formData.controls;
    props.submitted(
      county.value,
      formFormatter(sub_date.value, ['date'], false)
    );
  };

  const button = (
    <Button btnType='Primary' disabled={!formData.formIsValid}>
      Create new batch
    </Button>
  );
  const form = (
    <form className={classes.SubBatchForm} onSubmit={onSubmitHandler}>
      {props.children(formElements, button)}
    </form>
  );
  return form;
};

export default SubBatchForm;
