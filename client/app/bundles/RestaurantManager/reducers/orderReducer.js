import Immutable from 'immutable';

import * as actionTypes from '../constants/orderMenuConstants';

export const orderInitialState = Immutable.fromJS({
  items: {},
  isLoading: false,
  loadingError: null,
  isSaving: false,
  restaurant_name: '',
  newOrder: {},
});

export default function orderReducer(state = orderInitialState, action = null) {
  const { type, error} = action;

  switch (type) {
    case actionTypes.GET_MENU_REQUEST: {
      return state.merge({
        isLoading: true,
      })
    }

    case actionTypes.GET_MENU_SUCCESS: {
      return state.merge({
        isLoading: false,
        restaurant_name: action.restaurant_name,
        items: action.items
      })
    }

    case actionTypes.GET_MENU_FAILURE: {
      return state.merge({
        isLoading: false,
        loadingError: action.err
      })
    }

    case actionTypes.UPDATE_ORDER: {
      return state.merge({
        newOrder: Object.assign({}, state.get("newOrder").toJS(), action.item)
      })
    }

    default: {
      return state;
    }
  }
}