import React from 'react';
import classnames from 'classnames';
import * as orderActions from '../../actions/order';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { getParams, getSlug } from '../../libs/util';
import Item from '../commons/Item';

const mapStateToProps = (state) => {
	return {
		state
	}
}

class OrderMenu extends React.Component {
	constructor(props, _railsContext) {
	  super(props, _railsContext);

	  const { store } = this.context;

	  this.state = {
	  	csrfToken: ReactOnRails.authenticityToken(),
	  	restaurant_name: '',
	  	items: {},
	  }

	  _.bindAll(this, [
	  	'updateOrder',
	  	'placeOrder'
	  ]);
	}

	componentWillMount() {
		const { store } = this.context;
		const slug = getSlug();
		const url = '/v1/' + slug + '/menu';
		const getMenu = orderActions.getMenuRequest(url);
		store.dispatch(getMenu);
		getMenu.payload
		.then((res) => {
			if (res.status === 200) {
				store.dispatch(orderActions.getMenuSuccess(res.data.restaurant_name, res.data.items));
			} else {
				store.dispatch(orderActions.getMenuFailure(res.error));
			}
		});

		if (typeof App !== 'undefined'){
			App.order = App.cable.subscriptions.create({channel: "OrderChannel", slug: slug}, {
			  connected: function() {},
			  disconnected: function() {},
			  purchase: function(order) {
			    return this.perform('purchase', {
			      order: order
			    });
			  }
			});

		}
	}

	updateOrder(item) {
		const { store } = this.context;
		store.dispatch(orderActions.updateOrder(item));
	}

	placeOrder() {
		let data;
		const { store } = this.context;
		const { newOrder } = this.context.store.getState().order.toJS();
		const table_number = getParams('table');
		const slug = getSlug();
		data = {
			items: newOrder,
			table_number,
			slug
		}
		// const placeOrder = orderActions.placeOrderRequest(data, this.state.csrfToken);
		// placeOrder.payload.then((res) => {
		// 	console.log(res);
		App.order.purchase(data);
		// });

	}

	render() {
		const { store } = this.context;
		const orderStore = store.getState().order.toJS();
		const itemsOnMenu = orderStore.items;
		const restaurant_name = orderStore.restaurant_name;
		let listOfItems = (itemsOnMenu.length > 0) ? (itemsOnMenu.map((item) => 
			<Item key={item.id}
				  item={item}
				  updateOrder={this.updateOrder}/>
			)
		) : '';
		return (
			<div>
				<div className="gray-bg">
					<div className="ibox">
					    <div className="ibox-title">
					        <h5>{restaurant_name}</h5>
					        <div className="ibox-tools">
					            <button className="btn btn-primary btn-xs" onClick={this.placeOrder}>Place Order</button>
					        </div>
					    </div>
					    <div className="ibox-content">
					        <div className="row m-b-sm m-t-sm">
					            <div className="col-md-6 col-md-offset-3">
					                <div className="input-group">
					                	<input type="text" placeholder="Search" className="input-sm form-control" />
					                	<span className="input-group-btn">
						                    <button type="button" className="btn btn-sm btn-primary"> Go!</button>
					                    </span>
					                </div>
					            </div>
					        </div>

					        <div className="project-list">

					            <table className="table table-hover">
					                <tbody>
						                {listOfItems}
					                </tbody>
					            </table>
					        </div>
					    </div>
					</div>
				</div>
			</div>
		)
	}
}

OrderMenu.contextTypes = {
	store: React.PropTypes.object
}

export default connect(mapStateToProps, orderActions)(OrderMenu);