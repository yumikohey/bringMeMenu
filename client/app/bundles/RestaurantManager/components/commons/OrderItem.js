import React from 'react';
import classnames from 'classnames';

class OrderItem extends React.Component {
	constructor(props, _railsContext) {
		super(props, _railsContext);
		const { store } = this.context;
	}

	render() {
		const { items, order_number, updateItemStatus } = this.props;
		const li = Object.keys(items).map((key) => 
			<li className="list-group-item fist-item" key={key}>
				<span className="pull-right">
				    <div className="i-checks">
				      <label className="">
				      <div className={classnames('icheckbox_square-green', { 'checked': items[key].done })}>
				        <input type="radio" checked={items[key].done} value={items[key].done} name="on_sale" onClick={() => updateItemStatus(order_number, key, items[key].done)}/>
				      </div> 
				      <i></i>
				      </label>
				    </div>
				</span>
				
				<span className="label label-success m-r-xs">{items[key].qty}</span>{items[key].full_name}
			</li>
		);
		return (
			<div>
				{li}
			</div>
		)
	}
}

OrderItem.propTypes = {
	items: React.PropTypes.object.isRequired,
	order_number: React.PropTypes.string.isRequired,
	updateItemStatus: React.PropTypes.func.isRequired
}

export default OrderItem;