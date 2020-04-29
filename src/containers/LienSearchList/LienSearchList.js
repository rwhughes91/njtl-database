import React from 'react';
import classes from './LienSearchList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from '../../components/UI/Pagination/Pagination';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import LienListView from '../../components/LienListView/LienListView';

const maxCount = parseInt(process.env.REACT_APP_MAX_COUNT);

const LienSearchList = () => {
  const loading = useSelector((state) => state.lienSearch.loading);
  const liens = useSelector((state) => state.lienSearch.liens);
  const lastQueryCount = useSelector(
    (state) => state.lienSearch.lastQueryCount
  );
  const lastQueryVariables = useSelector(
    (state) => state.lienSearch.lastQueryVariables
  );
  const lienError = useSelector((state) => state.lienDetail.error);
  const currentLien = useSelector((state) => state.lienDetail.currentLien);
  const dispatch = useDispatch();
  const history = useHistory();

  const nextPageHandler = (selectedPage) => {
    const { selected } = selectedPage;
    const skip = selected * maxCount;
    const variables = {
      ...lastQueryVariables,
      skip,
    };
    dispatch(actions.fetchLiens(variables));
  };

  const tableRowClickHandler = (id) => {
    if (lienError || currentLien) {
      dispatch(actions.clearLien());
    }
    history.push(`/lien/${id}`);
  };

  let pagination = null;
  if (lastQueryCount > maxCount) {
    pagination = (
      <div className={classes.Pagination}>
        <Pagination
          pageCount={Math.ceil(lastQueryCount / maxCount)}
          nextPageHandler={nextPageHandler}
          initialPage={Math.floor(lastQueryVariables.skip / 100)}
        />
      </div>
    );
  }
  if (liens) {
    const headers = [
      'ID',
      'Block',
      'Lot',
      'Qualifier',
      'Cert Number',
      'Sale Date',
      'Township',
      'Address',
    ];
    const props = {
      headers,
      data: liens,
      tableRowClickHandler,
      emptyMessage: 'No liens found',
    };
    return <LienListView {...props}>{pagination}</LienListView>;
  } else if (loading) {
    return <Spinner bgColor='white' />;
  } else {
    return null;
  }
};

export default React.memo(LienSearchList);
