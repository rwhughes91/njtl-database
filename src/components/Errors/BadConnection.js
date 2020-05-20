import React from 'react';
import classes from './BadConnection.module.css';

const BadConnection = () => (
  <div className={classes.BadConnection}>
    <h1>Please check your internet connection</h1>
    <p>then try reloading</p>
  </div>
);

export default BadConnection;
