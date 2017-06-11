import signupReducer from './signupReducer';
import menuReducer from './menuReducer';
import qrReducer from './qrReducer';
import railsContextReducer from './railsContextReducer';
import orderReducer from './orderReducer';
import profileReducer from './restaurantProfileReducer';
import kitchenReducer from './kitchenReducer';

export default {
  signup: signupReducer,
  restaurant: profileReducer,
  menu: menuReducer,
  qrCodes: qrReducer,
  railsContext: railsContextReducer,
  order: orderReducer,
  kitchen: kitchenReducer
};