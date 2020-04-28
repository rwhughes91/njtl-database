import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentLien: null,
  cachedLiens: [],
  error: null,
  updateError: null,
  updateSuccessMessage: null,
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
          error: action.error,
          displayMessage: 'Could not query lien...',
        },
      };
    case actionTypes.CLEAR_LIEN:
      return {
        ...state,
        error: null,
        currentLien: null,
        updateSuccessMessage: null,
        updateError: null,
      };
    case actionTypes.CLEAR_UPDATE_LIEN:
      return {
        ...state,
        updateSuccessMessage: null,
        updateError: null,
      };
    case actionTypes.UPDATE_LIEN_SUCCESS:
      const cachedLiens = [...state.cachedLiens];
      const indexToUpdate = cachedLiens.findIndex(
        (lien) => lien.lien_id === action.lien.lien_id
      );
      cachedLiens[indexToUpdate] = action.lien;
      return {
        ...state,
        updateError: null,
        updateSuccessMessage: 'Lien saved',
        currentLien: action.lien,
        cachedLiens,
      };
    case actionTypes.UPDATE_LIEN_FAIL:
      return {
        ...state,
        updateError: {
          error: action.error,
          displayMessage: 'Could not update lien...',
        },
        updateSuccessMessage: null,
      };
    default:
      return state;
  }
};
