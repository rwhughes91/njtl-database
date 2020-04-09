import React from 'react';

import classes from './LienSearch.module.css';

import LienSearchForm from '../../containers/LienSearchForm/LienSearchForm';

const LienSearch = (props) => (
  <div className={classes.LienSearch}>
    <LienSearchForm />
  </div>
);

export default LienSearch;
