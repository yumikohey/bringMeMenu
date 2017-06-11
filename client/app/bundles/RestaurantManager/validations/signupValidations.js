import validate from 'validate.js';
import isEmpty from 'lodash/isEmpty';

const signupConstraints = { 
  email: {
    presence: true,
    email: true,
    exclusion: {
      message: "This field must be filled."
    }
  },
  restaurant_name: {
    presence: true,
    exclusion: {
      message: "This field must be filled."
    }
  },
  first_name: {
    presence: true,
    exclusion: {
      message: "This field must be filled."
    }
  },
  last_name: {
    presence: true,
    exclusion: {
      message: "This field must be filled."
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "Must be at least 6 characters."
    }
  },
  password_confirmation: {
    presence: true,
    equality: "password",
    exclusion: {
      message: "Confirm password is not equal to password."
    }
  }
};

export default function validateInput(data) {
  let errors = {};

  errors = validate(data.restaurant_employee, signupConstraints);

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
