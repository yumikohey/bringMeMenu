import Immutable from 'immutable';

import * as actionTypes from '../constants/qrConstants';

export const qrInitialState = Immutable.fromJS({
  qrs: [],
  isLoading: false,
  addQRError: null,
  loadingError: null,
  isSaving: false
});

export default function qrReducer(state = qrInitialState, action = null) {
  const { type, error} = action;

  switch (type) {
    case actionTypes.ADD_QRCODE_REQUEST: {
      return state.merge({
        isSaving: true,
      })
    }

    case actionTypes.ADD_QRCODE_SUCCESS: {
      return state.merge({
        isSaving: false,
        qrs: state.get("qrs").concat(action.data),
      })
    }

    case actionTypes.ADD_QRCODE_FAILURE: {
      return state.merge({
        isSaving: false,
        addQRError: action.error
      })
    }

    case actionTypes.GET_QRCODES_SUCCESS: {
      return state.merge({
        isSaving:false,
        qrs: state.get("qrs").concat(action.data),
      })
    }

    case actionTypes.GET_QRCODES_FAILURE: {
      return state.merge({
        isSaving:false,
        loadingError: action.error
      })
    }

    default: {
      return state;
    }
  }
}