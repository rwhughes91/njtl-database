import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './LienSearchList.module.css';
import Pagination from '../../components/UI/Pagination/Pagination';
import * as actions from '../../store/actions/index';

const maxCount = parseInt(process.env.REACT_APP_MAX_COUNT);

const LienSearchList = () => {
  const liens = useSelector((state) => state.lienSearch.liens);
  const lastQueryCount = useSelector(
    (state) => state.lienSearch.lastQueryCount
  );
  const lastQueryVariables = useSelector(
    (state) => state.lienSearch.lastQueryVariables
  );
  const dispatch = useDispatch();

  const nextPageHandler = (selectedPage) => {
    const { selected } = selectedPage;
    const skip = selected * maxCount;
    const variables = {
      ...lastQueryVariables,
      skip,
    };
    dispatch(actions.fetchLiens(variables));
  };

  let pagination = null;
  if (lastQueryCount > maxCount) {
    pagination = (
      <div className={classes.Pagination}>
        <Pagination
          pageCount={Math.ceil(lastQueryCount / maxCount)}
          nextPageHandler={nextPageHandler}
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
              {liens.map((lien, index) => {
                const tds = [];
                for (let key in lien) {
                  if (key === 'sale_date') {
                    const date = new Date(parseInt(lien[key]));
                    tds.push(<td key={key}>{date.toLocaleDateString()}</td>);
                  } else {
                    tds.push(<td key={key}>{lien[key]}</td>);
                  }
                }
                return <tr key={index}>{tds}</tr>;
              })}
            </tbody>
          </table>
          {pagination}
        </div>
      );
    } else {
      return <div className={classes.NoLiensFound}>No liens found</div>;
    }
  } else {
    return null;
  }
};

export default LienSearchList;
