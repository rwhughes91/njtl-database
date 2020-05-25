import React, { useState, useEffect, useMemo, useCallback } from 'react';
import classes from './UploadLiens.module.css';
import { useSelector } from 'react-redux';
import ExportExcel from '../../components/ExportExcel/ExportExcel';
import useAxios from '../../hooks/useAxios/useAxios';
import Axios from 'axios';
import UploadLiensTable from '../../components/UploadLiensTable/UploadLiensTable';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import socket from '../../socket';
import * as FileSaver from 'file-saver';
import BadConnection from '../../components/Errors/BadConnection';

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

const UploadLiens = () => {
  const token = useSelector((state) => state.auth.token);
  const [fileName] = useState('uploadLiensTemplate');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUpload, setShowUpload] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [uploadData, requestUploadData] = useAxios();
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
      if (success) {
        window.flash('Liens Uploaded', 'success');
      } else if (errorMessage) {
        window.flash(errorMessage, 'error');
      }
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

  const onSubmitHandler = useCallback(
    (event, uploadingBeginState, selectedFile, token) => {
      event.preventDefault();
      setLiensUploading(uploadingBeginState);
      const data = new FormData();
      data.append('file', selectedFile);
      Axios.put('http://localhost:4000/upload', data, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch((err) => {
        setLiensUploading({
          uploading: false,
          success: false,
          errorMessage: err.response.data.message,
        });
        window.flash(err.response.data.message, 'error');
      });
      setSelectedFile(null);
    },
    []
  );

  const onChangedHandler = useCallback((event) => {
    setSelectedFile(event.target.files[0]);
  }, []);

  const onErrorLogClickHandler = useCallback((token) => {
    Axios.get('http://localhost:4000/upload', {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.headers['content-type'].startsWith('application/json')) {
          window.flash(res.data, 'error');
        } else {
          const data = new Blob([res.data]);
          FileSaver.saveAs(data, 'uploadErrorLog.xlsx');
        }
      })
      .catch(() => {
        window.flash('Something went wrong', 'error');
      });
  }, []);

  let form = (
    <>
      <form
        className={classes.UploadForm}
        onSubmit={(event) =>
          onSubmitHandler(event, uploadingBeginState, selectedFile, token)
        }
      >
        <h1 className={classes.FormTitle}>Upload new liens</h1>
        <input
          id='upload'
          type='file'
          onChange={onChangedHandler}
          className={classes.UploadInput}
        />
        <label htmlFor='upload' className={classes.UploadInputLabel}>
          <span
            className={[
              classes.UploadInputButton,
              selectedFile ? classes.Active : null,
            ].join(' ')}
          >
            Upload...
          </span>
          <span className={classes.UploadInputFile}>
            {selectedFile ? selectedFile.name : 'No file selected'}
          </span>
        </label>

        <Button btnType='Primary' disabled={!selectedFile}>
          Upload
        </Button>
      </form>
      <button
        className={classes.SeeColumns}
        onClick={() => setShowTable((prevState) => !prevState)}
      >
        {showTable ? 'Hide columns' : 'See columns'}
      </button>
    </>
  );

  let error;
  if (uploadData.error) {
    error = <BadConnection />;
  }

  let uploadOutput = error || <Spinner />;
  if (uploadData.data && !liensUploading.uploading) {
    const downloads = (
      <div className={classes.UploadForm}>
        <h1 className={classes.FormTitle}>
          Download a template / last error log
        </h1>
        <ExportExcel excelData={uploadData.data.data} fileName={fileName}>
          Export template
        </ExportExcel>
        <Button
          btnType='Secondary'
          clicked={() => onErrorLogClickHandler(token)}
        >
          Error Log
        </Button>
      </div>
    );
    uploadOutput = (
      <>
        <div
          className={[
            classes.UploadLiens,
            showTable ? classes.Shift : null,
          ].join(' ')}
        >
          <ul className={classes.ButtonList}>
            <li className={showUpload ? classes.Active : null}>
              <button
                className={classes.LoadButton}
                onClick={() => setShowUpload(true)}
              >
                Upload
              </button>
            </li>
            <li className={!showUpload ? classes.Active : null}>
              <button
                className={classes.LoadButton}
                onClick={() => setShowUpload(false)}
              >
                Downloads
              </button>
            </li>
          </ul>
          {showUpload ? form : downloads}
        </div>
        <div
          className={[classes.ColumnsTableContainer, classes.Shift].join(' ')}
          style={showTable ? { opacity: '1' } : { opacity: '0' }}
        >
          <h1 className={classes.FormTitle}>Expected columns</h1>
          <UploadLiensTable fields={uploadData.data.fields} />
        </div>
      </>
    );
  }

  return uploadOutput;
};

export default React.memo(UploadLiens);
