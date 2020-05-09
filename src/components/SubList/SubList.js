import React from 'react';
import LienListView from '../LienListView/LienListView';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import SubListFormElement from '../../containers/SubBatch/SubListFormElement/SubListFormElement';

const SubList = ({ subData, subBatchVisited, subDate }) => {
  console.log('sub list render');
  if (!subBatchVisited) {
    return <Redirect to='/subs' />;
  }
  if (subData) {
    const liens = subData;
    const props = {
      data: liens,
      headers: [
        'ID',
        'Block',
        'Lot',
        'Qualifier',
        'Cert Number',
        'Sale Date',
        'Township',
        'Address',
        'Tax',
        'Utility',
        'Other',
      ],
      emptyMessage: 'No open liens',
    };
    const tableRows = (formFormatter) => {
      return liens.map((lien, index) => {
        const tds = [];
        for (let key in lien) {
          if (key !== 'subs') {
            if (typeof key === 'string' && key.includes('date')) {
              tds.push(<td key={key}>{formFormatter(lien[key], ['date'])}</td>);
            } else if (key === 'total') {
              tds.push(
                <td key={key}>{formFormatter(lien[key], ['currency'])}</td>
              );
            } else {
              tds.push(<td key={key}>{lien[key]}</td>);
            }
          }
        }
        const types = ['Tax', 'Utility', 'Other'];
        const sub_date = subDate;
        for (let type of types) {
          const sub = lien.subs
            ? lien.subs.find((sub) => sub.sub_type === type)
            : null;
          const props = {
            lien_id: lien.lien_id,
            sub_type: type,
            sub_date,
            total: sub ? sub.total : 0,
          };
          tds.push(<SubListFormElement key={`sub ${type}`} {...props} />);
        }
        return <tr key={index}>{tds}</tr>;
      });
    };
    return <LienListView {...props}>{tableRows}</LienListView>;
  }
  return <Spinner />;
};

export default SubList;
