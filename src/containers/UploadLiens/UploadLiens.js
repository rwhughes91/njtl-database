import React, { useState, useEffect, useMemo } from 'react';
import ExportExcel from '../../components/ExportExcel/ExportExcel';
import useAxios from '../../hooks/useAxios/useAxios';
import Axios from 'axios';
import UploadLiensTable from '../../components/UploadLiensTable/UploadLiensTable';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import socket from '../../socket';
import FlashMessage from '../../components/UI/FlashMessage/FlashMessage';
import * as FileSaver from 'file-saver';

const getUploadTemplateQuery = `
query fetchUploadTemplate {
  getUploadTemplate {
    fields {
      block
      lot
      qualifier
      county
      address
      year
      llc
      advertisement_number
      mua_number
      certificate_number
      lien_type
      list_item
      current_owner
      longitude
      latitude
      assessed_value
      tax_amount
      certificate_face_value
      winning_bid_percentage
      premium
      sale_date
      recording_fee
      recording_date
      search_fee
    }
    data {
      block
      lot
      qualifier
      county
      address
      year
      llc
      advertisement_number
      mua_number
      certificate_number
      lien_type
      list_item
      current_owner
      longitude
      latitude
      assessed_value
      tax_amount
      certificate_face_value
      winning_bid_percentage
      premium
      sale_date
      recording_fee
      recording_date
      search_fee
    }
  }
}
`;

const UploadLiens = (props) => {
  const [fileName] = useState('uploadLiensTemplate');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadData, requestUploadData] = useAxios();
  const [errorLogMessage, setErrorLogMessage] = useState(null);
  const uploadStartState = useMemo(() => {
    return {
      uploading: false,
      success: false,
      errorMessage: null,
    };
  }, []);

  const uploadingBeginState = useMemo(() => {
    return {
      uploading: true,
      success: false,
      errorMessage: null,
    };
  }, []);

  const [liensUploading, setLiensUploading] = useState(uploadStartState);

  useEffect(() => {
    socket.on('uploadingState', ({ uploading }) => {
      if (uploading !== liensUploading) {
        setLiensUploading(uploading);
      }
    });
    socket.on('uploadBegin', () => {
      if (liensUploading !== uploadingBeginState) {
        setLiensUploading(uploadingBeginState);
      }
    });
    socket.on('uploadDone', ({ success, errorMessage }) => {
      setLiensUploading({ uploading: false, success, errorMessage });
    });
    return () => {
      socket.off('uploadingState');
      socket.off('uploadBegin');
      socket.off('uploadDone');
    };
  }, [liensUploading, uploadingBeginState]);

  useEffect(() => {
    socket.emit('getUploadState');
  }, []);

  useEffect(() => {
    const cancelToken = Axios.CancelToken;
    const source = cancelToken.source();
    requestUploadData(
      {
        query: getUploadTemplateQuery,
      },
      'getUploadTemplate',
      { cancelToken: source.token }
    );
    return () => {
      source.cancel();
    };
  }, [requestUploadData]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLiensUploading(uploadingBeginState);
    const data = new FormData();
    data.append('file', selectedFile);
    Axios.post('http://localhost:4000/upload', data).catch((err) => {
      setLiensUploading({
        uploading: false,
        success: false,
        errorMessage: err.response.data.message,
      });
    });
  };

  const onChangedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onErrorLogClickHandler = (event) => {
    setErrorLogMessage(null);
    Axios({
      url: 'http://localhost:4000/upload',
      method: 'GET',
      responseType: 'blob',
    })
      .then((res) => {
        if (res.headers['content-type'].startsWith('application/json')) {
          setErrorLogMessage(res.data);
        } else {
          const data = new Blob([res.data]);
          FileSaver.saveAs(data, 'uploadErrorLog.xlsx');
        }
      })
      .catch(() => {
        setErrorLogMessage('Something went wrong');
      });
  };

  let form = (
    <form onSubmit={onSubmitHandler}>
      <label>Upload your file</label>
      <input type='file' onChange={onChangedHandler} />
      <Button btnType='Primary'>Upload</Button>
    </form>
  );

  let flashMessage = null;
  if (!liensUploading.uploading) {
    if (liensUploading.success) {
      flashMessage = <FlashMessage type='success' message='Liens uploaded' />;
    } else if (liensUploading.errorMessage) {
      flashMessage = (
        <FlashMessage type='error' message={liensUploading.errorMessage} />
      );
    }
  }

  let errorLogFlashMessage = null;
  if (errorLogMessage) {
    errorLogFlashMessage = (
      <FlashMessage type='error' message={errorLogMessage} />
    );
  }

  let uploadOutput = <Spinner />;
  if (uploadData.data && !liensUploading.uploading) {
    uploadOutput = (
      <>
        {flashMessage}
        {errorLogFlashMessage}
        <ExportExcel excelData={uploadData.data.data} fileName={fileName}>
          Export
        </ExportExcel>
        <UploadLiensTable fields={uploadData.data.fields} />
        {form}
        <Button btnType='Secondary' clicked={onErrorLogClickHandler}>
          Error Log
        </Button>
      </>
    );
  }

  return (
    <div>
      <h1>Upload Liens</h1>
      {uploadOutput}
    </div>
  );
};

export default UploadLiens;
