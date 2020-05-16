import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './LienSearch.module.css';
import * as actions from '../../store/actions/index';
import LienSearchForm from './LienSearchForm/LienSearchForm';
import LienSearchList from '../LienSearchList/LienSearchList';
import FlashMessage from '../../components/UI/FlashMessage/FlashMessage';
import withSizes from 'react-sizes';
import MobileLienSearchFrom from './MobileLienSearchForm/MobileLienSearchForm';

const LienSearch = ({ isMobile }) => {
  const dispatch = useDispatch();
  const lienDetailError = useSelector((state) => state.lienDetail.error);
  const lienSearchError = useSelector((state) => state.lienSearch.error);

  useEffect(() => {
    if (lienDetailError) {
      const timer = setTimeout(() => {
        dispatch(actions.clearLien());
      }, 6500);
      return () => {
        clearTimeout(timer);
        dispatch(actions.clearLien());
      };
    }
  }, [dispatch, lienDetailError]);

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

  const desktopForm = (
    <>
      <div className={classes.LienSearch}>
        <LienSearchForm failed={lienSearchError ? true : false} />
      </div>
      <div className={[classes.LienSearch, classes.LienSearchList].join(' ')}>
        <LienSearchList />
      </div>
    </>
  );
  const mobileForm = (
    <div className={classes.LienSearch}>
      <MobileLienSearchFrom />
    </div>
  );
  return (
    <>
      {error}
      {listError}
      {isMobile ? mobileForm : desktopForm}
    </>
  );
};

const mapSizesToProps = ({ width }) => {
  return {
    isMobile: width <= 630,
  };
};

export default withSizes(mapSizesToProps)(React.memo(LienSearch));
