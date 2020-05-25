import React from 'react';
import classes from './Number.module.css';
import { AiOutlineNumber } from 'react-icons/ai';

const Dollar = ({ color, backgroundColor }) => (
  <div className={classes.Icon} style={{ color: color, backgroundColor }}>
    <AiOutlineNumber size={20} />
  </div>
);

export default Dollar;
