import React, { useRef } from 'react';
import SubBatchForm from './SubBatchForm/SubBatchForm';
import { Route, Switch, useHistory } from 'react-router-dom';
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
  const [subBatchData, sendRequestSubBatchData, clearSubBatch] = useAxios();
  const [subListData, sendRequestSubListData] = useAxios();
  const history = useHistory();
  const lastCounty = useRef(null);
  const subBatchVisited = useRef(false);
  const subDate = useRef('');

  const onFieldChangeHandler = (value) => {
    lastCounty.current = value;
    subBatchVisited.current = true;
    sendRequestSubBatchData(
      { query: subBatchQuery, variables: { county: value } },
      'getSubBatch'
    );
  };

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

  const tableRowClickHandler = (date) => {
    updateSubListData(
      subDetailQuery,
      { county: lastCounty.current, date },
      'getLiensFromSubDate',
      date
    );
  };

  const onNewBatchSubmitHandler = (county, date) => {
    updateSubListData(openLiensQuery, { county }, 'getOpenLiens', date);
  };

  let form = (
    <SubBatchForm
      fieldSelected={onFieldChangeHandler}
      clearBatchData={clearSubBatch}
      data={lastCounty.current}
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
            lastCounty={lastCounty.current}
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
