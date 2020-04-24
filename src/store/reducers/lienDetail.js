import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentLien: null,
  cachedLiens: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIEN_SUCCESS:
      const lienToCache = [];
      if (
        !state.cachedLiens.some((lien) => lien.lien_id === action.lien.lien_id)
      ) {
        lienToCache.push(action.lien);
      }
      return {
        ...state,
        error: null,
        cachedLiens: state.cachedLiens.concat(lienToCache),
        currentLien: action.lien,
      };
    case actionTypes.FETCH_LIEN_FAIL:
      return {
        ...state,
        error: {
          ...action.error,
          displayMessage: 'Could not query lien...',
        },
      };
    case actionTypes.CLEAR_LIEN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
