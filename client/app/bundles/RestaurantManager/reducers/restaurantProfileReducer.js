/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/profileConstants';

export const signInInitialState = Immutable.fromJS({
  profile: {},
  loading: false,
  loadingError: null,
});

export default function signupReducer(state = signInInitialState, action = null) {
  const { type, error} = action;

  switch (type) {

    case actionTypes.LOAD_RESTAURANT_PROFILE_SUCCESS: {
      return state.merge({
        loading: false,
        profile: action.data
      });
    }

    case actionTypes.LOAD_RESTAURANT_PROFILE_FAILURE: {
      return state.merge({
        loading: true,
        loadingError: error,
      });
    }

    case action.UPDATE_RESTAURANT_PROFILE: {
      return state.merge({
        loading: true,
      })
    }

    default: {
      return state;
    }
  }
}