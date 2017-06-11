import Immutable from 'immutable';

import * as actionTypes from '../constants/profileConstants';
import * as kitchenActions from '../constants/kitchenConstants';

export const kitchenInitialState = Immutable.fromJS({
  isLoading: false,
  slug: '',
  loadingError: null,
  new_order: {},
  orders: [],

});

export default function kitchenReducer(state = kitchenInitialState, action = null) {
  const { type, error} = action;

  switch (type) {
    case actionTypes.GET_SLUG_REQUEST: {
      return state.merge({
        isLoading: true
      })
    }

    case actionTypes.GET_SLUG_SUCCESS: {
      return state.merge({
        isLoading: false,
        slug: action.slug
      })
    }

    // todo: add new order in incomplete_orders.
    case kitchenActions.NEW_ORDER_IN: {
      return state.merge({
        orders: action.data.open_orders.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
        new_order: action.data.new_order
      })
    }

    case kitchenActions.GET_ORDERS_REQUEST: {
      return state.merge({
        isLoading: true,
      })
    }

    case kitchenActions.GET_ORDERS_SUCCESS: {
      return state.merge({
        isLoading: false,
        orders: action.data.orders
      })
    }

    case kitchenActions.GET_ORDERS_FAILURE: {
      return state.merge({
        isLoading: false,
        loadingError: action.err
      })
    }

    case kitchenActions.GET_ORDERS_FAILURE: {
      return state.merge({
        isLoading: false,
        loadingError: action.err
      })
    }
    
    default: {
      return state;
    }
  }
}