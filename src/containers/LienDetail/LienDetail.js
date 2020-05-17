import React, { useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import classes from './LienDetail.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import LienDetailEditForm from './LienDetailEditForm/LienDetailEditForm';
import FlashMessage, {
  FlashMessageContainer,
} from '../../components/UI/FlashMessage/FlashMessage';

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
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (currentLien && currentLien.lien_id !== variables.lien_id) {
      dispatch(actions.fetchLien(variables, token));
    } else if (!currentLien) {
      dispatch(actions.fetchLien(variables, token));
    }
  }, [variables, currentLien, dispatch, token]);

  useEffect(() => {
    return () => {
      dispatch(actions.clearLienUpdate());
    };
  }, [dispatch]);

  const flashMessagesArray = [];
  let successMessage;
  if (updateSuccessMessage) {
    successMessage = { type: 'success', message: updateSuccessMessage };
    flashMessagesArray.push(successMessage);
  }
  let errorMessage;
  if (updateErrorMessage && updateErrorMessage.displayMessage) {
    errorMessage = {
      type: 'error',
      message: updateErrorMessage.displayMessage,
    };
    flashMessagesArray.push(errorMessage);
  }
  let form = <Spinner />;
  if (currentLien) {
    form = (
      <>
        <FlashMessageContainer top='7rem'>
          {flashMessagesArray.map((flashMessage, index) => {
            return <FlashMessage {...flashMessage} key={index} />;
          })}
        </FlashMessageContainer>
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
