import * as actionTypes from '../actions/actionTypes';

const initialState = {
  liens: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIENS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_LIENS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        liens: action.liens,
        lastQueryVariables: action.variables,
        lastQueryCount: action.count,
      };
    case actionTypes.FETCH_LIENS_FAIL:
      return {
        ...state,
        loading: false,
        error: {
          error: action.error,
          displayMessage: 'Could not query liens',
        },
      };
    case actionTypes.CLEAR_LIENS:
      return {
        ...state,
        error: null,
      };
    case actionTypes.CLEAR_LIENS_DATA:
      return initialState;
    default:
      return state;
  }
};
