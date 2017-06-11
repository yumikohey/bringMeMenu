import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import RestaurantDaily from '../components/restaurants/RestaurantDaily';
import * as restaurantActions from '../actions/restaurant';

import { bindActionCreators } from 'redux';

class RestaurantDailyContainer extends React.Component {
	static propTypes = {
	  dispatch: PropTypes.func.isRequired,
	};

	render() {
		const { dispatch } = this.props;
		const actions = bindActionCreators(restaurantActions, dispatch);
		const { restaurant_id } = this.props.params;

	    return (
	        <RestaurantDaily restaurantActions={actions} location={this.props.location} restaurant_id={restaurant_id}/>
	    );
	}
}

export default connect(null)(RestaurantDailyContainer);