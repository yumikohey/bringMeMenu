import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Homepage from '../components/HelloWorld';
import Registration from '../containers/EnterpriseRegisterContainer';
import RestaurantProfileContainer from '../containers/RestaurantProfileContainer';
import RestaurantMainContainer from '../containers/RestaurantMainContainer';
import RestaurantDailyContainer from '../containers/RestaurantDailyContainer';
import RestaurantMenu from '../components/restaurants/RestaurantMenu';
import RestaurantQr from '../components/restaurants/RestaurantQr';
import RestaurantKitchen from '../components/restaurants/RestaurantKitchen';
import OrderMenu from '../components/restaurants/OrderMenu';

export default (
  <Route path="/">
    <IndexRoute
      component={Homepage}
    />
    <Route
      path="/restaurants/:restaurant_id/restaurant_employees/sign_up"
      component={Registration}
    />
    <Route
      path="/restaurants/:restaurant_id/profile"
      component={RestaurantProfileContainer}
      name="profile"
    />
    <Route
      path="/restaurants/:restaurant_id/main"
      component={RestaurantMainContainer}
      name="main"
    />
    <Route
      path="/restaurants/:restaurant_id/daily"
      component={RestaurantDailyContainer}
      name="daily"
    />
    <Route
      path="/restaurants/:restaurant_id/menu"
      component={RestaurantMenu}
      name="menu"
    />
    <Route
      path="/restaurants/:restaurant_id/qr"
      component={RestaurantQr}
      name="qr"
    />
    <Route
      path="/restaurants/:restaurant_id/orders"
      component={RestaurantKitchen}
      name="kitchen"
    />
    <Route
      path="/menu/:restaurant_slug"
      component={OrderMenu}
      name="order"
    />
  </Route>
);
