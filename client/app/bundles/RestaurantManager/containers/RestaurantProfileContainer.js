import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import RestaurantProfile from '../components/restaurants/RestaurantProfile';
import * as restaurantActions from '../actions/restaurant';

import { bindActionCreators } from 'redux';

class RestaurantProfileContainer extends React.Component {
	static propTypes = {
	  dispatch: PropTypes.func.isRequired,
	};

	render() {
		const { dispatch } = this.props;
		const actions = bindActionCreators(restaurantActions, dispatch);
		const { restaurant_id } = this.props.params;

	    return (
	        <RestaurantProfile restaurantActions={actions} location={this.props.location} restaurant_id={restaurant_id}/>
	    );
	}
}

export default connect(null)(RestaurantProfileContainer);
