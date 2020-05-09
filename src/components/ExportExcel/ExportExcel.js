import React from 'react';
import Button from '../UI/Button/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportExcel = ({ excelData, fileName, children }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = (excelData, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      btnType='Primary'
      clicked={() => exportToExcel(excelData, fileName)}
    >
      {children}
    </Button>
  );
};

export default ExportExcel;
