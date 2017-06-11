import React from 'react';
import Header from '../commons/Header';
import Navigation from '../commons/Navigation';
import Footer from '../commons/Footer';
import Widget from '../commons/Widget';
import ItemModal from '../commons/ItemModal';
import classnames from 'classnames';
import * as menuActions from '../../actions/menu';
import update from 'react-addons-update';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		state
	}
}

class RestaurantMenu extends React.Component {
	constructor(props, _railsContext) {
	  super(props, _railsContext);

	  const { store } = this.context;

	  this.state = {
	  	csrfToken: ReactOnRails.authenticityToken(),
	  	newItem: {},
	  	lgShow: false,
	  	selectedItem: {}
	  }

	  _.bindAll(this, [
	  	'addMenu',
	  	'enteringNewItem',
	  	'modalInputFieldOnChange',
	  	'radioBtnOnClick',
	  	'updateItem'
	  ]);

	}

	enteringNewItem(e) {
		const { newItem } = this.state;
	    this.setState({
	        newItem: update(newItem, {full_name: {$set: e.target.value}})
	    });
	}

	componentWillMount() {
		const { store } = this.context;
		const url = '/restaurants/' + this.props.params.restaurant_id + '/get_items_from_menu';
		let getMenuRequest = menuActions.getMenuRequest(url);
		store.dispatch(getMenuRequest);
		getMenuRequest.payload
			.then((res) => {
				if (res.status === 200) {
					store.dispatch(menuActions.getMenuRequestSuccess(res.data));			
				} else {
					store.dispatch(menuActions.getMenuRequestFailure(res.error));
				}
			})
			.catch((err) => {
				store.dispatch(menuActions.getMenuRequestFailure(err));
			})
	}

	addMenu(e) {
		const { store } = this.context;
		const { csrfToken, newItem } = this.state;
		const _this = this;
		const addItemToMenu = menuActions.addItemToMenuRequest(newItem, csrfToken)
		store.dispatch(addItemToMenu);
		addItemToMenu.payload
			.then((res) => {
				if (res.status === 200) {
					_this.setState({newItem: {}});
					store.dispatch(menuActions.addItemToMenuSuccess(res.data));
				}
				// TODO: failure response
			})
	}

	modalInputFieldOnChange(e) {
		this.setState({
		    selectedItem: update(this.state.selectedItem, {[e.target.name]: {$set: e.target.value}})
		});
	}

	radioBtnOnClick(e) {
		const { name } = e.target;
		const value = this.state.selectedItem[name];
		this.setState({
			selectedItem: update(this.state.selectedItem, {[name]: {$set: !value}})
		});
	}

	updateItem() {
		const { store } = this.context;
		const updateItem = menuActions.updateItemRequest(this.state.selectedItem, this.state.csrfToken);
		store.dispatch(updateItem);
		updateItem.payload
			.then((res) => {
				if (res.status === 200) {
					store.dispatch(menuActions.updateItemSuccess(res.data));
				} else {
					// TODO failure
					store.dispatch(menuActions.updateItemFailure(res.err));
				}
			});
	}

	render() {
		let wrapperClass = "gray-bg " + this.props.location.pathname;
		const { location } = this.props;
		const { restaurant_id } = this.props.params;
		const { store } = this.context;
		const { newItem, selectedItem } = this.state;
		let items = store.getState().menu.toJS().items;
		let lgClose = () => {
			this.setState({ lgShow: false });
		}
		let item = items.map((e) => <li key={e.id} onClick={() => this.setState({ lgShow: true, selectedItem:e })}><span className="m-l-xs">{e.full_name}</span></li>);
		return (
			<div id="wrapper">
			    <Navigation location={location} restaurant_id={restaurant_id}/>
			        <div id="page-wrapper" className={wrapperClass}>

			            <Header pageName="Menu"/>
			            <div className="row">
							<div className="col-lg-4">
							    <div className="ibox-content">
							        <h2>Active Menu</h2>
							        <small>This is menu is now available to your customers.</small>
							        <ul className="todo-list m-t">
							            {item}
							        </ul>
							        <div className="social-comment">
							        	<div className="form-group">
								        	<textarea className="form-control" placeholder="Add New Item here..." onChange={this.enteringNewItem} value={newItem["full_name"]}></textarea>
								        </div>
								        <button className="btn btn-primary btn-block" onClick={(e) => this.addMenu(e)}>Add Item</button>
							        </div>
							    </div>
							</div>

							<div className="col-lg-4">
							    <div className="ibox-content">
							        <h2>Items</h2>
							        <small>You can update these items one by one.</small>
							        <ul className="todo-list m-t">
							        </ul>
							    </div>
							</div>

							<div className="col-lg-4">
							    <div className="ibox-content">
							        <h2>Inactive Menus</h2>
							        <small>You can update below menus and make them active again.</small>
							        <ul className="todo-list m-t">
							        </ul>
							    </div>
							</div>
						</div>

						<ItemModal show={this.state.lgShow} onHide={lgClose} item={this.state.selectedItem} onChange={this.modalInputFieldOnChange} onClick={this.radioBtnOnClick} onSubmit={this.updateItem}/>

						<Footer/>
					</div>
			</div>
		)
	}
}

RestaurantMenu.contextTypes = {
	store: React.PropTypes.object
}

export default connect(mapStateToProps, menuActions)(RestaurantMenu);