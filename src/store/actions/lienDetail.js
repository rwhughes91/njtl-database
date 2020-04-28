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

export const clearLien = () => {
  return {
    type: actionTypes.CLEAR_LIEN,
  };
};

export const clearLienUpdate = () => {
  return {
    type: actionTypes.CLEAR_UPDATE_LIEN,
  };
};

export const updateLien = (variables) => {
  return {
    type: actionTypes.UPDATE_LIEN,
    variables,
  };
};

export const updateLienSuccess = (lien) => {
  return {
    type: actionTypes.UPDATE_LIEN_SUCCESS,
    lien,
  };
};

export const updateLienFail = (error) => {
  return {
    type: actionTypes.UPDATE_LIEN_FAIL,
    error,
  };
};
