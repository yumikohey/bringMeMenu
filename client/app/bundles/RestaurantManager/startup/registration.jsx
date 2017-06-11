import ReactOnRails from 'react-on-rails';

import HelloWorld from '../components/HelloWorld';
import RestaurantRouterApp from './RestaurantRouterApp';
import restaurantStore from '../store/restaurantStore';

// ReactOnRails.setOptions({
//   traceTurbolinks: 'TRACE_TURBOLINKS', // eslint-disable-line no-undef
// });

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  RestaurantRouterApp,
});

ReactOnRails.registerStore({
  restaurantStore,
});