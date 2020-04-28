import React from 'react';
import { useSelector } from 'react-redux';
import classes from './LienSearch.module.css';
import LienSearchForm from '../LienSearchForm/LienSearchForm';
import LienSearchList from '../LienSearchList/LienSearchList';
import FlashMessage from '../../components/UI/FlashMessage/FlashMessage';

const LienSearch = () => {
  const lienDetailError = useSelector((state) => state.lienDetail.error);
  const lienSearchError = useSelector((state) => state.lienSearch.error);
  let error = null;
  if (lienDetailError) {
    error = (
      <FlashMessage type='error' message={lienDetailError.displayMessage} />
    );
  }
  let listError = null;
  if (lienSearchError) {
    listError = (
      <FlashMessage type='error' message={lienSearchError.displayMessage} />
    );
  }
  return (
    <>
      {error}
      {listError}
      <div className={classes.LienSearch}>
        <LienSearchForm failed={lienSearchError ? true : false} />
      </div>
      <div className={[classes.LienSearch, classes.LienSearchList].join(' ')}>
        <LienSearchList />
      </div>
    </>
  );
};

export default React.memo(LienSearch);
