import React from 'react';
import classes from './UploadLiensTable.module.css';

const UploadLiensTable = ({ fields }) => {
  const tableRows = [];
  for (let key in fields) {
    tableRows.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{fields[key]}</td>
      </tr>
    );
  }
  return (
    <table className={classes.Table}>
      <thead>
        <tr>
          <th>Field name</th>
          <th>Data type</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default UploadLiensTable;
