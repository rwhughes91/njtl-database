import * as actionTypes from './actionTypes';

export const fetchLiens = (variables, token) => {
  return {
    type: actionTypes.FETCH_LIENS,
    variables,
    token,
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

export const clearLiensData = () => {
  return {
    type: actionTypes.CLEAR_LIENS_DATA,
  };
};
