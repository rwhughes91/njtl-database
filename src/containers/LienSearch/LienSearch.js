import React from 'react';
import { useSelector } from 'react-redux';
import classes from './LienSearch.module.css';
import LienSearchForm from '../LienSearchForm/LienSearchForm';
import LienSearchList from '../LienSearchList/LienSearchList';
import FlashMessage from '../../components/UI/FlashMessage/FlashMessage';

const LienSearch = () => {
  const lienDetailError = useSelector((state) => state.lienDetail.error);
  let error = null;
  if (lienDetailError) {
    error = (
      <FlashMessage type='error' message={lienDetailError.displayMessage} />
    );
  }
  return (
    <>
      {error}
      <div className={classes.LienSearch}>
        <LienSearchForm />
      </div>
      <div className={[classes.LienSearch, classes.LienSearchList].join(' ')}>
        <LienSearchList />
      </div>
    </>
  );
};

export default React.memo(LienSearch);
