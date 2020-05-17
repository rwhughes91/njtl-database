import React from 'react';
import LienListView from '../LienListView/LienListView';
import classes from './SubBatchList.module.css';

const SubBatchList = ({
  form,
  subBatchData,
  tableRowClickHandler,
  lastCounty,
}) => {
  let list = null;
  if (subBatchData) {
    const data = subBatchData.map((sub_date) => {
      return { lastCounty, sub_date };
    });
    const props = {
      headers: ['Township', 'Sub Date'],
      data,
      emptyMessage: 'Please select a township...',
    };
    const tableRows = (formFormatter) => {
      return data.map((sub, index) => {
        const tds = [];
        for (let key in sub) {
          if (typeof key === 'string' && key.includes('date')) {
            tds.push(<td key={key}>{formFormatter(sub[key], ['date'])}</td>);
          } else if (key === 'total') {
            tds.push(
              <td key={key}>{formFormatter(sub[key], ['currency'])}</td>
            );
          } else {
            tds.push(<td key={key}>{sub[key]}</td>);
          }
        }
        return (
          <tr key={index} onClick={() => tableRowClickHandler(sub.sub_date)}>
            {tds}
          </tr>
        );
      });
    };
    list = <LienListView {...props}>{tableRows}</LienListView>;
  }
  return (
    <div>
      {form}
      <div className={classes.SubBatchList}>
        <h1 className={classes.Title}>Previous batches</h1>
        {list}
      </div>
    </div>
  );
};

export default React.memo(SubBatchList);
