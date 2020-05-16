import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  justLoggedIn: null,
  authRedirectPath: '/',
  tokenMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        justLoggedIn: null,
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    case actionTypes.JUST_LOGGED_IN:
      return {
        ...state,
        justLoggedIn: action.message,
      };
    case actionTypes.TOKEN_MESSAGE:
      return {
        ...state,
        tokenMessage: action.message,
      };
    default:
      return state;
  }
};
