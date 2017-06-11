import React from 'react';
import Header from '../commons/Header';
import Navigation from '../commons/Navigation';
import Footer from '../commons/Footer';
import Widget from '../commons/Widget';
import ItemModal from '../commons/ItemModal';
import classnames from 'classnames';
import * as qrActions from '../../actions/qrcode';
import update from 'react-addons-update';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		state
	}
}

class RestaurantQr extends React.Component {
	constructor(props, _railsContext) {
	  super(props, _railsContext);

	  const { store } = this.context;

	  this.state = {
	  	csrfToken: ReactOnRails.authenticityToken(),
	  	table_number: "",
	  	description:"",
	  	active_qr_codes: []
	  }

	  _.bindAll(this, [
	  	'addQRCode',
	  	'onChange'
	  ]);
	}

	componentWillMount() {
	  const { store } = this.context;
	  const { active_qr_codes } = this.state;
	  const getActiveQRCodes = qrActions.getQRCodesRequest();
	  store.dispatch(getActiveQRCodes);
	  getActiveQRCodes.payload
	  	.then((res) => {
	  		if (res.status === 200) {
	  			store.dispatch(qrActions.getQRCodesSuccess(res.data.qr_codes));
	  		} else {
	  			store.dispatch(qrActions.getQRCodesFailure(res.error));
	  		}
	  	});
	}

	addQRCode() {
		const { store } = this.context;
		const { table_number, description } = this.state;
		const qrInfo = {
			table_number,
			description
		}
		const addQRCode = qrActions.addQRCodeRequest(qrInfo, this.state.csrfToken);
		store.dispatch(addQRCode);
		addQRCode.payload
			.then((res) => {
				this.setState({
					table_number: "",
					description: "",
				})
				if (res.status === 200) {
					store.dispatch(qrActions.addQRCodeSuccess(res.data.qr_code))
				} else {
					store.dispatch(qrActions.addQRCodeFailure(res.error))
				}
			});
	}

	onChange(e) {
	  this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		let wrapperClass = "gray-bg " + this.props.location.pathname;
		const { location } = this.props;
		const { restaurant_id } = this.props.params;
		const { store } = this.context;
		const listOfQRs = store.getState().qrCodes.toJS().qrs;
		let listOfQRCodes = listOfQRs.map((item) =>
			<li key={item.id}>
				<div className="row">
					<div className="col-md-5 m-l-xs">
						<img src={item.qrcode} />
					</div>
					<div className="col-md-5">
						<h4>Table Number: {item.table_number}</h4>
						<small className="m-r">{item.description}</small>
					</div>
				</div>
			</li>
		)
		return (
			<div id="wrapper">
			    <Navigation location={location} restaurant_id={restaurant_id}/>
			        <div id="page-wrapper" className={wrapperClass}>

			            <Header pageName="QR Code"/>
			            <div className="row">
			            	<div className="col-lg-4">
			            	    <div className="ibox-content">
			            	    	<div className="row">
				            	    	<div className="col-md-6">
					            	        <h2>Add QR Code</h2>
					            	        <small>Add QR Code for tables.</small>
					            	    </div>
					            	    <div className="col-md-4 col-md-offset-2">
					            	        <div className="label label-primary pull-right m-t-xs p-xs">
					            	        	<span className="md-font">Print</span>
		                                    </div>
		                                </div>
		                            </div>
			            	        <ul className="todo-list m-t">
			            	            {listOfQRCodes}
			            	        </ul>
			            	        <div className="ibox m-t-md">
			            	        	<div className="input-group">
			            	        		<input type="text" placeholder="table number" name="table_number" onChange={this.onChange}className="form-control" />
			            	        		<span className="input-group-btn" style={{width: 0}}></span>
			            	        		<input type="text" placeholder="notes" name="description" onChange={this.onChange}className="form-control" />
			            	        		<span className="input-group-btn">
			            	        			<button type="button" className="btn btn-primary" onClick={this.addQRCode}>Add</button>
			            	        		</span>
			            	        	</div>
			            	        </div>
			            	    </div>
			            	</div>
			            </div>
						<Footer/>
					</div>
			</div>
		)
	}
}

RestaurantQr.contextTypes = {
	store: React.PropTypes.object
}

export default connect(mapStateToProps, qrActions)(RestaurantQr);