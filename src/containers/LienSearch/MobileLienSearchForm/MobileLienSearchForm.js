import React, { useCallback } from 'react';
import classes from '../../LienSearch/LienSearchForm/LienSearchForm.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import useForm from '../../../hooks/useForm/useForm';
import formControls from './formControls';

const MobileLienSearchForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formControlData = { formControls };
  const inputClassNames = {
    input: {
      className: classes.InputElement,
      container: classes.Input,
      label: classes.Label,
      invalid: classes.Invalid,
      errorMessage: classes.ErrorMessage,
    },
  };
  const inputChangedHandler = useCallback((event, { updateField }) => {
    const value = event.target.value;
    updateField(value);
  }, []);

  const callbacks = {
    input: {
      inputChangedHandler,
    },
  };

  const { formElements, formData, setFormData } = useForm(
    formControlData,
    inputClassNames,
    callbacks
  );

  const onSubmitHandler = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(actions.clearLien());
      dispatch(actions.clearLiens());
      history.push(`/lien/${formData.controls.lien_id.value}`);
    },
    [dispatch, history, formData.controls.lien_id.value]
  );

  const resetHandler = useCallback(
    (event) => {
      event.preventDefault();
      setFormData({ type: 'RESET_FORM' });
    },
    [setFormData]
  );

  return (
    <form className={classes.LienSearchForm}>
      {formElements}
      <div>
        <Button btnType='Primary LargeText' clicked={onSubmitHandler}>
          Find lien
        </Button>
        <Button btnType='Danger LargeText' clicked={resetHandler}>
          Clear
        </Button>
      </div>
    </form>
  );
};

export default MobileLienSearchForm;
