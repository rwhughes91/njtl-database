import * as actionTypes from './actionTypes';

export const fetchLiens = (variables) => {
  return {
    type: actionTypes.FETCH_LIENS,
    variables,
  };
};

export const fetchLiensStart = () => {
  return {
    type: actionTypes.FETCH_LIENS_START,
  };
};

export const fetchLiensSuccess = (liens, variables, count) => {
  return {
    type: actionTypes.FETCH_LIENS_SUCCESS,
    liens,
    variables,
    count,
  };
};

export const fetchLiensFail = (error) => {
  return {
    type: actionTypes.FETCH_LIENS_FAIL,
    error,
  };
};

export const clearLiens = () => {
  return {
    type: actionTypes.CLEAR_LIENS,
  };
};
