import React from 'react';
import classes from './LienListView.module.css';
import FormFormatter from '../../utils/formFormatter';

const LienListView = ({
  headers,
  data,
  tableRowClickHandler,
  emptyMessage,
  lien_id,
  children,
  styles,
  emptyMessageStyles,
}) => {
  let table;
  if (data && data.length >= 1) {
    table = (
      <div>
        <table className={classes.Table} style={styles}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => {
              const tds = [];
              for (let key in rowData) {
                if (typeof key === 'string' && key.includes('date')) {
                  tds.push(
                    <td key={key}>{FormFormatter(rowData[key], ['date'])}</td>
                  );
                } else if (key === 'total') {
                  tds.push(
                    <td key={key}>
                      {FormFormatter(rowData[key], ['currency'])}
                    </td>
                  );
                } else {
                  tds.push(<td key={key}>{rowData[key]}</td>);
                }
              }
              let onClickHandler = null;
              if (tableRowClickHandler && lien_id) {
                onClickHandler = () => tableRowClickHandler(lien_id);
              } else if (tableRowClickHandler) {
                onClickHandler = () => tableRowClickHandler(rowData.lien_id);
              }
              return (
                <tr key={index} onClick={onClickHandler}>
                  {tds}
                </tr>
              );
            })}
          </tbody>
        </table>
        {children}
      </div>
    );
  } else {
    table = (
      <div className={classes.EmptyMessage} style={emptyMessageStyles}>
        {emptyMessage}
      </div>
    );
  }
  return table;
};

export default LienListView;
