import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './LienSearch.module.css';
import * as actions from '../../store/actions/index';
import LienSearchForm from './LienSearchForm/LienSearchForm';
import LienSearchList from '../LienSearchList/LienSearchList';
import withSizes from 'react-sizes';
import MobileLienSearchFrom from './MobileLienSearchForm/MobileLienSearchForm';

const LienSearch = ({ isMobile }) => {
  const dispatch = useDispatch();
  const lienDetailError = useSelector((state) => state.lienDetail.error);
  const lienSearchError = useSelector((state) => state.lienSearch.error);

  useEffect(() => {
    if (lienDetailError) {
      window.flash(lienDetailError.displayMessage, 'error');
      dispatch(actions.clearLien());
    }
    if (lienSearchError) {
      window.flash(lienSearchError.displayMessage, 'error');
      dispatch(actions.clearLiens());
    }
  });

  useEffect(() => {
    return () => {
      dispatch(actions.clearLien());
      dispatch(actions.clearLiens());
    };
  }, [dispatch]);

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

  return isMobile ? mobileForm : desktopForm;
};

const mapSizesToProps = ({ width }) => {
  return {
    isMobile: width <= 640,
  };
};

export default withSizes(mapSizesToProps)(React.memo(LienSearch));
