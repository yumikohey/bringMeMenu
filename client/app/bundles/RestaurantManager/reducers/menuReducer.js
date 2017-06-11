import Immutable from 'immutable';

import * as actionTypes from '../constants/menuConstants';
import * as itemActionTypes from '../constants/itemConstants';

export const menuInitialState = Immutable.fromJS({
  items: [],
  isLoading: false,
  addMenuError: null,
  loadingError: null,
  isSaving: false,
  newItem: {},
});

export default function menuReducer(state = menuInitialState, action = null) {
  const { type, error} = action;

  switch (type) {
    case actionTypes.ADD_ITEM_TO_MENU_REQUEST: {
      return state.merge({
        isSaving: true,
      })
    }

    case actionTypes.GET_MENU_REQUEST: {
      return state.merge({
        isLoading: true
      })
    }

    case actionTypes.GET_MENU_SUCCESS: {
      return state.merge({
        isLoading: false,
        items: action.data
      })
    }

    case actionTypes.GET_MENU_FAILURE: {
      return state.merge({
        isLoading: false,
        loadingError: error
      })
    }

    case actionTypes.ADD_ITEM_TO_MENU_SUCCESS: {
      return state.merge({
        isSaving: false,
        items: state.get("items").concat(action.data)
      });
    }

    case actionTypes.ADD_ITEM_TO_MENU_FAILURE: {
      return state.merge({
        aAddMenuError: error,
        isSaving: false,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return state.merge({
        isSaving: true,
      });
    }

    case itemActionTypes.UPDATE_ITEM: {
      return state.merge({
        isSaving: true,
      });
    }

    case itemActionTypes.UPDATE_ITEM_SUCCESS: {
      return state.merge({
        isSaving: false,
        items: (state.get("items").toJS().filter(selectedItem => selectedItem.id !== action.data.id)).concat(action.data)
      });
    }

    case itemActionTypes.UPDATE_ITEM_FAILURE: {
      return state.merge({
        isSaving: false,
      });
    }

    default: {
      return state;
    }
  }
}