import React from 'react';
import LienListView from '../LienListView/LienListView';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import SubListFormElement from '../../containers/SubBatch/SubListFormElement/SubListFormElement';

const SubList = ({ subData, subBatchVisited }) => {
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
      emptyMessage: 'No subs',
    };
    const tableRows = (formFormatter) => {
      return liens.map((lien, index) => {
        const tds = [];
        for (let key in lien) {
          if (key === 'subs') {
            const types = ['Tax', 'Utility', 'Other'];
            const sub_date = lien.subs[0].sub_date;
            for (let type of types) {
              const sub = lien.subs.find((sub) => sub.sub_type === type);
              const props = {
                lien_id: lien.lien_id,
                sub_type: type,
                sub_date,
                total: sub ? sub.total : 0,
              };
              tds.push(<SubListFormElement key={`sub ${type}`} {...props} />);
            }
          } else if (typeof key === 'string' && key.includes('date')) {
            tds.push(<td key={key}>{formFormatter(lien[key], ['date'])}</td>);
          } else if (key === 'total') {
            tds.push(
              <td key={key}>{formFormatter(lien[key], ['currency'])}</td>
            );
          } else {
            tds.push(<td key={key}>{lien[key]}</td>);
          }
        }
        return <tr key={index}>{tds}</tr>;
      });
    };
    return <LienListView {...props}>{tableRows}</LienListView>;
  }
  return <Spinner />;
};

export default SubList;
