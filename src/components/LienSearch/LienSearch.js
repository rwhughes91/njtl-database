import React from 'react';

import classes from './LienSearch.module.css';

import LienSearchForm from '../../containers/LienSearchForm/LienSearchForm';

const LienSearch = () => (
  <div className={classes.LienSearch}>
    <LienSearchForm />
  </div>
);

export default React.memo(LienSearch);
