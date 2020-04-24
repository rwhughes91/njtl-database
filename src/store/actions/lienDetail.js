import * as actionTypes from './actionTypes';

export const fetchLien = (variables) => {
  return {
    type: actionTypes.FETCH_LIEN,
    variables,
  };
};

export const fetchLienSuccess = (lien) => {
  return {
    type: actionTypes.FETCH_LIEN_SUCCESS,
    lien,
  };
};

export const fetchLienFail = (error) => {
  return {
    type: actionTypes.FETCH_LIEN_FAIL,
    error,
  };
};

export const clearLienError = () => {
  return {
    type: actionTypes.CLEAR_LIEN_ERROR,
  };
};
