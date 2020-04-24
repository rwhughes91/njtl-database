import React from 'react';
import classes from './LienDetailEditForm.module.css';
import formControls from './formControls';
import useForm from '../../hooks/useForm/useForm';
import Button from '../../components/UI/Button/Button';

const LienDetailEditForm = ({ data }) => {
  const formControlData = { formControls, data };
  const inputClassNames = {
    input: {
      className: classes.InputElement,
      container: classes.Input,
      label: classes.Label,
      invalid: classes.Invalid,
      errorMessage: classes.ErrorMessage,
    },
    frozenInput: {
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
    textarea: {
      className: [classes.InputElement, classes.InputTextArea].join(' '),
      container: classes.Input,
      label: '',
      invalid: classes.Invalid,
      errorMessage: classes.ErrorMessage,
    },
  };

  const inputChangedHandler = (event, { updateField }) => {
    updateField(event.target.value);
  };

  const blurHandler = (event, { controlName, setFormData }) => {
    setFormData({ type: 'UPDATE_FIELD_TO_DISPLAY_VALUE', controlName });
  };

  const callbacks = {
    input: {
      inputChangedHandler,
      blurHandler,
    },
    select: {
      inputChangedHandler,
      blurHandler,
    },
    textarea: {
      inputChangedHandler,
      blurHandler,
    },
  };

  const [formElements, formData, setFormData] = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const clearHandler = (event) => {
    event.preventDefault();
    setFormData({ type: 'RESET_FORM' });
  };

  let subs;
  if (data.subs && data.subs.length > 0) {
    const subRows = data.subs.map((sub, index) => {
      const tds = [];
      for (let key in sub) {
        tds.push(<td key={key}>{sub[key]}</td>);
      }
      return <tr key={index}>{tds}</tr>;
    });
    subs = (
      <table className={classes.SubTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{subRows}</tbody>
      </table>
    );
  } else {
    subs = <div className={classes.NoSubTable}>No Subs</div>;
  }
  const form = (
    <form className={classes.LienDetailEditForm}>
      <div className={classes.FormGroup}>
        <div className={classes.FormType}>
          <div className={classes.Title}>
            <span>Lien Information</span>
          </div>
          <div className={classes.FormColumn}>{formElements.slice(0, 4)}</div>
          <div className={classes.FormColumn}>{formElements.slice(4, 8)}</div>
        </div>
        <div className={classes.FormType}>
          <div className={classes.Title}>
            <span>Financial Information</span>
          </div>
          <div className={classes.FormColumn}>{formElements.slice(9, 13)}</div>
          <div className={classes.FormColumn}>{formElements.slice(13, 17)}</div>
          <div className={classes.FormColumn}>{formElements.slice(17, 21)}</div>
        </div>
      </div>
      <div className={classes.FormGroup}>
        <div className={classes.FormType}>
          <div className={classes.Title}>
            <span>Subsequents</span>
          </div>
          {subs}
        </div>
        <div className={[classes.FormType, classes.FormTypeShort].join(' ')}>
          <div className={classes.Title}>
            <span>Redemption Info</span>
          </div>
          <div className={classes.FormColumnFull}>
            <div className={classes.FormRow}>{formElements.slice(20, 23)}</div>
            <div className={[classes.FormRow, classes.FormRowLarge].join(' ')}>
              {formElements.slice(23)}
            </div>
            <div className={classes.FormRow}>
              <div className={classes.ButtonContainer}>
                <Button
                  clicked={submitHandler}
                  btnType='Primary'
                  disabled={!formData.formIsValid}
                >
                  Save
                </Button>
                <Button clicked={clearHandler} btnType='Danger'>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
  return form;
};

export default LienDetailEditForm;
