import React, { useState, useRef, useEffect } from 'react';
import SubBatchForm from './SubBatchForm/SubBatchForm';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import useAxios from '../../hooks/useAxios/useAxios';
import SubBatchList from '../../components/SubBatchList/SubBatchList';
import SubList from '../../components/SubList/SubList';

const subBatchQuery = `
query fetchSubBatch($county: String!) {
  getSubBatch(county: $county)
}
`;

const subDetailQuery = `
query fetchLiensFromSubDate($date: String!, $county: String!) {
  getLiensFromSubDate(date: $date, county: $county) {
    lien_id
    block
    lot
    qualifier
    certificate_number
    sale_date
    county
    address
    subs {
      sub_type
      sub_date
      total
    }
  }
}
`;

const openLiensQuery = `
query fetchOpenLiens($county: String!) {
  getOpenLiens(county: $county) {
    lien_id
    block
    lot
    qualifier
    certificate_number
    sale_date
    county
    address
  }
}
`;

const SubBatch = () => {
  const [lastCounty, setLastCounty] = useState(null);
  const [subBatchData, sendRequestSubBatchData, clearSubBatch] = useAxios();
  const [subListData, sendRequestSubListData, clearSubList] = useAxios();
  const history = useHistory();
  const location = useLocation();
  const subBatchVisited = useRef(false);
  const subDate = useRef('');
  const toUpdate = useRef(false);

  console.log('sub batch render');

  useEffect(() => {
    console.log('use effect');
    if (lastCounty && location.pathname === '/subs') {
      sendRequestSubBatchData(
        { query: subBatchQuery, variables: { county: lastCounty } },
        'getSubBatch'
      );
      toUpdate.current = false;
    }
  }, [lastCounty, sendRequestSubBatchData, location.pathname]);

  const updateSubListData = (query, variables, queryName, date) => {
    sendRequestSubListData(
      {
        query,
        variables,
      },
      queryName
    );
    subDate.current = date;
    history.push('/subs/batch');
  };

  const onFieldChangeHandler = (county) => {
    setLastCounty(county);
    subBatchVisited.current = true;
  };

  const tableRowClickHandler = (date) => {
    clearSubList();
    updateSubListData(
      subDetailQuery,
      { county: lastCounty, date },
      'getLiensFromSubDate',
      date
    );
  };

  const onNewBatchSubmitHandler = (county, date) => {
    clearSubList();
    updateSubListData(openLiensQuery, { county }, 'getOpenLiens', date);
    toUpdate.current = true;
  };

  let form = (
    <SubBatchForm
      fieldSelected={onFieldChangeHandler}
      clearBatchData={clearSubBatch}
      data={lastCounty}
      subBatchDates={subBatchData.data}
      submitted={onNewBatchSubmitHandler}
    >
      {(formElements, button) => {
        return (
          <>
            {formElements[0]}
            {subBatchData.data && (
              <>
                {formElements.slice(1)}
                {button}
              </>
            )}
          </>
        );
      }}
    </SubBatchForm>
  );

  return (
    <>
      <Switch>
        <Route path='/subs' exact>
          <SubBatchList
            form={form}
            subBatchData={subBatchData.data}
            tableRowClickHandler={tableRowClickHandler}
            lastCounty={lastCounty}
          />
        </Route>
        <Route path='/subs/batch' exact>
          <SubList
            subBatchVisited={subBatchVisited.current}
            subData={subListData.data}
            subDate={subDate.current}
          />
        </Route>
      </Switch>
    </>
  );
};

export default SubBatch;
