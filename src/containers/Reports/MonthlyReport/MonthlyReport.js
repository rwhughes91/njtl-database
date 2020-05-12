import React from 'react';
import classes from './MonthlyReport.module.css';
import useForm from '../../../hooks/useForm/useForm';
import formControls from './monthlyFormControls';
import Button from '../../../components/UI/Button/Button';

const MonthlyReport = (props) => {
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

  const inputChangedHandler = (
    event,
    { controlName, updateField, validateField }
  ) => {
    const value = event.target.value;
    updateField(value);
    validateField(value, controlName);
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
      if (key === 'county' && !formData.controls[key].touched) {
        continue;
      }
      variables[key] = formData.controls[key].value;
    }
    variables.year = variables.year ? parseInt(variables.year) : null;
    variables.month = variables.month ? parseInt(variables.month) : null;
    const title =
      props.name === 'getMonthlyRedemptions'
        ? 'Monthly Redemptions'
        : 'Monthly Sub Payments';
    props.submitted(props.name, variables, title);
  };

  return (
    <form onSubmit={submitHandler}>
      {formElements}
      <Button btnType='Primary' disabled={!formData.formIsValid}>
        Submit
      </Button>
    </form>
  );
};

export default MonthlyReport;
