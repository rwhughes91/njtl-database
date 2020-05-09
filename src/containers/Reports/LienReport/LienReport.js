import React from 'react';
import classes from './LienReport.module.css';
import useForm from '../../../hooks/useForm/useForm';
import formControls from './liensFormControls';
import Button from '../../../components/UI/Button/Button';

const LienReport = (props) => {
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

  const inputChangedHandler = (event, { updateField }) => {
    const value = event.target.value;
    updateField(value);
  };

  const callbacks = {
    input: {
      inputChangedHandler,
    },
    select: {
      inputChangedHandler,
    },
  };
  const [formElements, formData] = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const variables = {};
    for (let key in formData.controls) {
      variables[key] = formData.controls[key].value;
    }
    variables.sale_year = variables.sale_year
      ? parseInt(variables.sale_year)
      : null;
    props.submitted(variables);
  };

  return (
    <form onSubmit={submitHandler}>
      {formElements}
      <Button btnType='Primary'>Submit</Button>
    </form>
  );
};

export default LienReport;
