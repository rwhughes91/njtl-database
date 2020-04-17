import React from 'react';

import classes from './LienSearch.module.css';

import LienSearchForm from '../../containers/LienSearchForm/LienSearchForm';
import LienSearchList from '../../containers/LienSearchList/LienSearchList';

const LienSearch = () => (
  <>
    <div className={classes.LienSearchForm}>
      <LienSearchForm />
    </div>
    <div className={classes.LienSearchList}>
      <LienSearchList />
    </div>
  </>
);

export default React.memo(LienSearch);
