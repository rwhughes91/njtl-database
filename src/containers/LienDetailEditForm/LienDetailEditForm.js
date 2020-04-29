import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import classes from './LienDetailEditForm.module.css';
import formControls from './formControls';
import useForm from '../../hooks/useForm/useForm';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import LienListView from '../../components/LienListView/LienListView';

const LienDetailEditForm = ({ data, lien_id }) => {
  const dispatch = useDispatch();
  const lastQuery = useRef(null);
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

  const selectFieldChangedHandler = (event, { updateField }) => {
    updateField(event.target.value, 0);
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
      inputChangedHandler: selectFieldChangedHandler,
      blurHandler,
    },
    textarea: {
      inputChangedHandler,
      blurHandler,
    },
  };

  const [formElements, formData, setFormData, formFormatter] = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const payload = {};
    const payloadVariables = [
      'recording_fee',
      'recording_date',
      'redemption_date',
      'redemption_amount',
      'winning_bid_percentage',
      'search_fee',
      'year_end_penalty',
      'status',
      'notes',
    ];
    const statusEnums = {
      redeemed: 'REDEEMED',
      bankruptcy: 'BANKRUPTCY',
      'bankruptcy/redeemed': 'BANKRUPTCYREDEEMED',
      foreclosure: 'FORECLOSURE',
      'foreclosure/redeemed': 'FORECLOSUREREDEEMED',
      'no-subs': 'NOSUBS',
      own: 'OWN',
      '': 'OPEN',
    };
    for (let variable of payloadVariables) {
      if (formData.controls[variable].formatters) {
        payload[variable] = formFormatter(
          formData.controls[variable].value,
          formData.controls[variable].formatters,
          false
        );
      } else {
        payload[variable] = formData.controls[variable].value;
      }
    }
    payload.status = statusEnums[payload.status];
    if (lastQuery.current !== JSON.stringify({ lien_id, payload })) {
      lastQuery.current = JSON.stringify({ lien_id, payload });
      dispatch(
        actions.updateLien({
          lien_id,
          payload,
        })
      );
    }
  };

  const clearHandler = (event) => {
    event.preventDefault();
    setFormData({ type: 'RESET_FORM' });
  };

  const props = {
    headers: ['Type', 'Date', 'Total'],
    data: data.subs ? data.subs : [],
    emptyMessage: 'No Subs',
    lien_id: data.lien_id ? data.lien_id : '',
    styles: { tableLayout: 'fixed' },
    emptyMessageStyles: { position: 'relative', top: '-2rem' },
  };
  let subs = <LienListView {...props} />;
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
          <div className={classes.FormColumn}>{formElements.slice(8, 12)}</div>
          <div className={classes.FormColumn}>{formElements.slice(12, 16)}</div>
          <div className={classes.FormColumn}>{formElements.slice(16, 20)}</div>
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
