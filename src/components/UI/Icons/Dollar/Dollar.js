import React from 'react';
import classes from './Dollar.module.css';
import { FiDollarSign } from 'react-icons/fi';

const Dollar = ({ color, backgroundColor }) => {
  return (
    <div className={classes.Icon} style={{ color, backgroundColor }}>
      <FiDollarSign size={20} />
    </div>
  );
};

export default Dollar;
