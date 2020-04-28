import React from 'react';
import classes from './LienSearchList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from '../../components/UI/Pagination/Pagination';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

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
    if (liens.length >= 1) {
      return (
        <div>
          <table className={classes.LienSearchList}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Block</th>
                <th>Lot</th>
                <th>Qualifier</th>
                <th>Cert Number</th>
                <th>Sale Date</th>
                <th>Township</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {liens.map((lien) => {
                const tds = [];
                for (let key in lien) {
                  if (key === 'sale_date') {
                    const date = new Date(parseInt(lien[key]));
                    tds.push(<td key={key}>{date.toLocaleDateString()}</td>);
                  } else {
                    tds.push(<td key={key}>{lien[key]}</td>);
                  }
                }
                return (
                  <tr
                    key={lien.lien_id}
                    onClick={() => tableRowClickHandler(lien.lien_id)}
                  >
                    {tds}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {pagination}
        </div>
      );
    } else {
      return <div className={classes.NoLiensFound}>No liens found</div>;
    }
  } else if (loading) {
    return <Spinner bgColor='white' />;
  } else {
    return null;
  }
};

export default React.memo(LienSearchList);
