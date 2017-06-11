/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/signupConstants';

export const signupInitialState = Immutable.fromJS({
  signupError: null,
  isSaving: false,
});

export default function signupReducer(state = signupInitialState, action = null) {
  const { type, error} = action;

  switch (type) {

    case actionTypes.SIGNUP_SUCCESS: {
      return state.merge({
        isSaving: false,
      });
    }

    case actionTypes.SIGNUP_FAILURE: {
      return state.merge({
        signupError: error,
        isSaving: false,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return state.merge({
        isSaving: true,
      });
    }

    default: {
      return state;
    }
  }
}