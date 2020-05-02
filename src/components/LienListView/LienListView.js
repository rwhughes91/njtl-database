import React from 'react';
import classes from './LienListView.module.css';
import formFormatter from '../../utils/formFormatter';

const LienListView = ({
  data,
  headers,
  pagination,
  emptyMessage,
  styles = {},
  children,
}) => {
  let table;
  if (data && data.length >= 1) {
    table = (
      <div>
        <table className={classes.Table} style={styles.styles}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children(formFormatter)}</tbody>
        </table>
        {pagination}
      </div>
    );
  } else {
    table = (
      <div className={classes.EmptyMessage} style={styles.emptyMessageStyles}>
        {emptyMessage}
      </div>
    );
  }
  return table;
};

export default LienListView;
