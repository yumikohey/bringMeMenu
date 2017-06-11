import React from 'react';
import Header from '../commons/Header';
import Navigation from '../commons/Navigation';
import Footer from '../commons/Footer';
import Widget from '../commons/Widget';
import ItemModal from '../commons/ItemModal';
import OrderItem from '../commons/OrderItem';
import classnames from 'classnames';
import * as restaurantActions from '../../actions/restaurant';
import update from 'react-addons-update';

class RestaurantKitchen extends React.Component {
	constructor(props, _railsContext) {
	  super(props, _railsContext);

	  const { store } = this.context;

	  this.state = {
	  	csrfToken: ReactOnRails.authenticityToken(),
	  	slug: '',
	  	orders: []
	  }

	  _.bindAll(this, [
	  	'updateItemStatus'
	  ]);
	}

	componentWillMount() {
		const { store } = this.context;
		const getSlug = restaurantActions.getRestaurantSlugRequest();
		let slug = '';
		const _this = this;
		store.dispatch(getSlug);
		getSlug.payload.then(
			(res) => {
				slug = res.data.slug;
				store.dispatch(restaurantActions.getRestaurantSlugSuccess(slug));
				this.setState({slug, slug});
				App.order = App.cable.subscriptions.create({channel: "OrderChannel", slug: slug}, {
				  connected: function() {},
				  disconnected: function() {},
				  received: function(data) {
				  	store.dispatch(restaurantActions.newOrderIn(data.response));
				  	//TODO
				  	const orders = data.response.open_orders;
				  	_this.setState({orders});
				  },
				  update: function(order) {
				    return this.perform('update_order', {
				      order: order
				    });
				  }
				});
			}
		);

		const getOrders = restaurantActions.getRestaurantOrders();
		store.dispatch(getOrders);
		getOrders.payload.then(
			(res) => {
				if (res.status === 200) {
					store.dispatch(restaurantActions.getRestaurantOrdersSuccess(res.data));
					this.setState({orders: res.data.orders});
				} else {
					store.dispatch(restaurantActions.getRestaurantOrdersFailure(err));
				}
			}
		)
	}

	updateItemStatus(order_number, itemId, complete) {
		App.order.update({order_number, itemId, complete});
	}

	render() {
		let wrapperClass = "gray-bg " + this.props.location.pathname;
		const { location } = this.props;
		const { restaurant_id } = this.props.params;
		const { store } = this.context;
		const { orders } = store.getState().kitchen.toJS();
		let listOfOrders = orders.map((order) => 
        	<div className="col-lg-3" key={order.id}>
        	    <div className="contact-box center-version">
        	    	<div className="col-md-12 space-15">
            	    	<a>
            	        	<ul className="list-group clear-list m-t">
            	        		<OrderItem items={order.items} order_number={order.order_number} updateItemStatus={this.updateItemStatus}/>
            	        	</ul>
            	        	<div className="font-bold">No spicy</div>
            	            <div className="m-t-xs btn-group">
            	                <div className="label label-primary">New Order</div>
            	                <div className="m-t-xs"><i className="fa fa-clock-o"></i> 20 mins left</div>
            	            </div>
        	            </a>
        	        </div>
        	        <div className="contact-box-footer">
    	                <button type="button" className="btn btn-block btn-outline btn-primary">DONE</button>
        	        </div>

        	    </div>
        	</div>
		)
		return (
			<div id="wrapper">
			    <Navigation location={location} restaurant_id={restaurant_id}/>
			        <div id="page-wrapper" className={wrapperClass}>

			            <Header pageName="Kitchen"/>
			            <div className="row">
			            	{listOfOrders}
			            </div>
						<Footer/>
					</div>
			</div>
		)
	}
}

RestaurantKitchen.contextTypes = {
	store: React.PropTypes.object
}

export default RestaurantKitchen;