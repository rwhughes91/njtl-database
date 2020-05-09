import React, { useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import classes from './LienDetail.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import LienDetailEditForm from './LienDetailEditForm/LienDetailEditForm';
import FlashMessage from '../../components/UI/FlashMessage/FlashMessage';

const LienDetail = () => {
  const { lien_id } = useParams();
  const variables = useMemo(() => {
    return { lien_id: parseInt(lien_id) };
  }, [lien_id]);
  const dispatch = useDispatch();
  const currentLien = useSelector((state) => state.lienDetail.currentLien);
  const error = useSelector((state) => state.lienDetail.error);
  const updateErrorMessage = useSelector(
    (state) => state.lienDetail.updateError
  );
  const updateSuccessMessage = useSelector(
    (state) => state.lienDetail.updateSuccessMessage
  );

  useEffect(() => {
    if (currentLien && currentLien.lien_id !== variables.lien_id) {
      dispatch(actions.fetchLien(variables));
    } else if (!currentLien) {
      dispatch(actions.fetchLien(variables));
    }
  }, [variables, currentLien, dispatch]);
  let successMessage;
  if (updateSuccessMessage) {
    successMessage = (
      <FlashMessage type='success' message={updateSuccessMessage} />
    );
  }
  let errorMessage;
  if (updateErrorMessage && updateErrorMessage.displayMessage) {
    errorMessage = (
      <FlashMessage type='error' message={updateErrorMessage.displayMessage} />
    );
  }
  let form = <Spinner />;
  if (currentLien) {
    form = (
      <>
        {successMessage}
        {errorMessage}
        <LienDetailEditForm
          data={{ ...currentLien }}
          lien_id={variables.lien_id}
        />
      </>
    );
  }
  return (
    <>
      <div className={classes.LienDetail}>
        {error && <Redirect to='/' />}
        {form}
      </div>
    </>
  );
};

export default React.memo(LienDetail);
