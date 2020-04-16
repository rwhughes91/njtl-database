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

export const fetchLiensSuccess = (liens) => {
  return {
    type: actionTypes.FETCH_LIENS_SUCCESS,
    liens,
  };
};

export const fetchLiensFail = (error) => {
  return {
    type: actionTypes.FETCH_LIENS_FAIL,
    error,
  };
};
