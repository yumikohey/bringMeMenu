import validate from 'validate.js';
import isEmpty from 'lodash/isEmpty';

const restaurantProfileConstraints = { 
  contact_email: {
    presence: true,
    email: true,
    exclusion: {
      message: "This field must be filled."
    }
  },
  registered_email: {
    presence: true,
    email: true,
    exclusion: {
      message: "This field must be filled."
    }
  },
  business_name: {
    presence: true,
    exclusion: {
      message: "This field must be filled."
    }
  },
  city: {
    presence: true,
    exclusion: {
      message: "This field must be filled."
    }
  }
};

export default function validateInput(data) {
  let errors = {};

  errors = validate(data.restaurantInfo, restaurantProfileConstraints);

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
