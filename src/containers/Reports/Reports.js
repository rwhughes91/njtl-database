import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import LienReport from './LienReport/LienReport';
import MonthlyReport from './MonthlyReport/MonthlyReport';
import queries from './reportQueries';
import axios from '../../axios-liens';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import classes from './Reports.module.css';
import FlashMessage, {
  FlashMessageContainer,
} from '../../components/UI/FlashMessage/FlashMessage';

const exportToExcel = (excelData, fileName) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

const Reports = () => {
  const [showModal, setShowModal] = useState({ show: false, child: null });
  const token = useSelector((state) => state.auth.token);
  const [flashMessageErrors, setFlashMessageErrors] = useState({
    getLienReport: null,
    getMonthlyReport: null,
    getTownships: null,
  });
  // const flashMessagesArray = [];
  const getTownships = async () => {
    setFlashMessageErrors((prevState) => {
      return {
        ...prevState,
        getTownships: null,
      };
    });
    try {
      const response = await axios.post(
        '/graphql',
        {
          query: queries.getTownshipsList,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const townships = response.data.data.getTownships;
      const excelData = townships.map((township) => {
        return { townships: township };
      });
      exportToExcel(excelData, 'townships');
    } catch (err) {
      setFlashMessageErrors((prevState) => {
        return {
          ...prevState,
          getTownships: { type: 'error', message: 'Could not get townships' },
        };
      });
    }
  };

  const getLienReport = useCallback(
    async (variables) => {
      setFlashMessageErrors((prevState) => {
        return {
          ...prevState,
          getLienReport: null,
        };
      });
      try {
        const response = await axios.post(
          '/graphql',
          {
            query: queries.fetchLiens,
            variables,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const excelData = response.data.data.getLiens.liens;
        exportToExcel(excelData, 'exportedLiens');
      } catch (err) {
        setFlashMessageErrors((prevState) => {
          return {
            ...prevState,
            getLienReport: {
              type: 'error',
              message: 'Could not get lien report',
            },
          };
        });
      }
    },
    [token]
  );

  const getMonthlyReport = useCallback(
    async (queryName, variables, title) => {
      setFlashMessageErrors((prevState) => {
        return {
          ...prevState,
          getMonthlyReport: null,
        };
      });
      const queryId =
        queryName === 'getMonthlyRedemptions'
          ? 'fetchMonthlyRedemptions'
          : 'fetchMonthlySubPayments';
      try {
        const response = await axios.post(
          '/graphql',
          {
            query: queries[queryId],
            variables,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const excelData = response.data.data[queryName];
        exportToExcel(excelData, title);
      } catch (err) {
        setFlashMessageErrors((prevState) => {
          return {
            ...prevState,
            getMonthlyReport: {
              type: 'error',
              message: 'Could not get monthly report',
            },
          };
        });
      }
    },
    [token]
  );

  const flashMessagesArray = [];
  for (let key in flashMessageErrors) {
    if (flashMessageErrors[key]) {
      flashMessagesArray.push(flashMessageErrors[key]);
    }
  }

  let children = null;
  switch (showModal.child) {
    case 'Export Liens':
      children = (
        <div>
          <LienReport submitted={getLienReport} />
        </div>
      );
      break;
    case 'Export Monthly Redemptions':
      children = (
        <div>
          <MonthlyReport
            name='getMonthlyRedemptions'
            submitted={getMonthlyReport}
          />
        </div>
      );
      break;
    case 'Export Monthly Subs':
      children = (
        <div>
          <MonthlyReport
            name='getMonthlySubPayments'
            submitted={getMonthlyReport}
          />
        </div>
      );
      break;
    default:
      children = null;
  }
  const modal = (
    <Modal
      show={showModal.show}
      hide={() => setShowModal({ show: false, child: null })}
    >
      {children}
    </Modal>
  );
  const childTypes = [
    'Export Liens',
    'Export Townships',
    'Export Monthly Redemptions',
    'Export Monthly Subs',
  ];
  const descriptions = [
    'Export lien data by county, llc, or sale year',
    'Export a list of townships',
    'Export redemptions (optionally by county) that occurred during a particular month and year',
    'Export subs paid (optionally by county) during a particular month and year',
  ];
  const buttons = childTypes.map((type, i) => {
    if (type === 'Export Townships') {
      return (
        <tr key={i}>
          <td>
            <Button
              style={{ width: '80%' }}
              btnType='Primary'
              clicked={getTownships}
            >
              Export Townships
            </Button>
          </td>
          <td>{descriptions[i]}</td>
        </tr>
      );
    }
    return (
      <tr key={i}>
        <td>
          <Button
            key={i}
            style={{ width: '80%' }}
            btnType='Primary'
            clicked={() => setShowModal({ show: true, child: type })}
          >
            {type}
          </Button>
        </td>
        <td>{descriptions[i]}</td>
      </tr>
    );
  });
  return (
    <>
      <FlashMessageContainer top='7rem'>
        {flashMessagesArray.map((flashMessage, index) => {
          return <FlashMessage {...flashMessage} key={index} />;
        })}
      </FlashMessageContainer>
      {modal}
      <div className={classes.Reports}>
        <h1 className={classes.Title}>Download reports</h1>
        <table>
          <thead>
            <tr>
              <th>Exports</th>
            </tr>
          </thead>
          <tbody>{buttons}</tbody>
        </table>
      </div>
    </>
  );
};

export default React.memo(Reports);
