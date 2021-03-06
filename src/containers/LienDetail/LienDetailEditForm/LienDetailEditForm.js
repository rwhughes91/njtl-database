import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './LienDetailEditForm.module.css';
import formControls from './formControls';
import useForm from '../../../hooks/useForm/useForm';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';
import LienListView from '../../../components/LienListView/LienListView';
import { isEqual } from 'lodash/lang';

const LienDetailEditForm = ({ data, lien_id }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
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

  const inputChangedHandler = useCallback(
    (event, { updateField, validateField, controlName }) => {
      updateField(event.target.value);
      validateField(event.target.value, controlName);
    },
    []
  );

  const textAreaChangedHandler = useCallback((event, { updateField }) => {
    updateField(event.target.value, 0);
  }, []);

  const selectFieldChangedHandler = useCallback((event, { updateField }) => {
    updateField(event.target.value, 0);
  }, []);

  const blurHandler = useCallback((event, { controlName, setFormData }) => {
    setFormData({ type: 'UPDATE_FIELD_TO_DISPLAY_VALUE', controlName });
  }, []);

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
      inputChangedHandler: textAreaChangedHandler,
      blurHandler,
    },
  };

  const { formElements, formData, setFormData, formFormatter } = useForm(
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
        actions.updateLien(
          {
            lien_id,
            payload,
          },
          token
        )
      );
    }
  };

  const clearHandler = (event) => {
    event.preventDefault();
    setFormData({ type: 'RESET_FORM' });
  };

  const props = {
    data: data.subs ? data.subs : [],
    headers: ['Type', 'Date', 'Total'],
    emptyMessage: 'No Subs',
    styles: {
      styles: { tableLayout: 'fixed' },
      emptyMessageStyles: { position: 'relative', top: '-2rem' },
    },
  };
  const tableRows = (formFormatter) => {
    const subs = data.subs;
    return subs.map((sub, index) => {
      const tds = [];
      for (let key in sub) {
        if (typeof key === 'string' && key.includes('date')) {
          tds.push(<td key={key}>{formFormatter(sub[key], ['date'])}</td>);
        } else if (key === 'total') {
          tds.push(<td key={key}>{formFormatter(sub[key], ['currency'])}</td>);
        } else {
          tds.push(<td key={key}>{sub[key]}</td>);
        }
      }
      return <tr key={index}>{tds}</tr>;
    });
  };
  let subs = <LienListView {...props}>{tableRows}</LienListView>;
  const form = (
    <form className={classes.LienDetailEditForm}>
      <div className={classes.FormGroup}>
        <div className={classes.FormType}>
          <div className={classes.Title}>
            <span>Lien Information</span>
          </div>
          <div className={classes.FormColumn}>
            {formElements.find((element) => element.key === 'lien_id')}
            {formElements.find((element) => element.key === 'block')}
            {formElements.find((element) => element.key === 'lot')}
            {formElements.find((element) => element.key === 'qualifier')}
          </div>
          <div className={classes.FormColumn}>
            {formElements.find(
              (element) => element.key === 'certificate_number'
            )}
            {formElements.find((element) => element.key === 'address')}
            {formElements.find((element) => element.key === 'county')}
            {formElements.find((element) => element.key === 'sale_date')}
          </div>
        </div>
        <div className={classes.FormType}>
          <div className={classes.Title}>
            <span>Financial Information</span>
          </div>
          <div className={classes.FormColumn}>
            {formElements.find((element) => element.key === 'recording_date')}
            {formElements.find((element) => element.key === 'recording_fee')}
            {formElements.find(
              (element) => element.key === 'winning_bid_percentage'
            )}
            {formElements.find((element) => element.key === 'search_fee')}
          </div>
          <div className={classes.FormColumn}>
            {formElements.find((element) => element.key === 'year_end_penalty')}
            {formElements.find((element) => element.key === 'tax_amount')}
            {formElements.find((element) => element.key === 'premium')}
            {formElements.find(
              (element) => element.key === 'total_principal_balance'
            )}
          </div>
          <div className={classes.FormColumn}>
            {formElements.find((element) => element.key === 'total_cash_out')}
            {formElements.find((element) => element.key === 'flat_rate')}
            {formElements.find((element) => element.key === 'cert_int')}
            {formElements.find(
              (element) => element.key === 'total_actual_interest'
            )}
          </div>
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
            <div className={classes.FormRow}>
              {formElements.find((element) => element.key === 'status')}
              {formElements.find(
                (element) => element.key === 'redemption_date'
              )}
              {formElements.find(
                (element) => element.key === 'redemption_amount'
              )}
            </div>
            <div className={[classes.FormRow, classes.FormRowLarge].join(' ')}>
              {formElements.find((element) => element.key === 'notes')}
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

export default React.memo(LienDetailEditForm, isEqual);
