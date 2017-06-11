import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import EnterpriseRegister from '../components/EnterpriseRegister';
import enterpriseSignupRequest from '../actions/signup';

import { bindActionCreators } from 'redux';

class EnterpriseRegisterContainer extends React.Component {
	static propTypes = {
	  dispatch: PropTypes.func.isRequired,
	};

	render() {
		const { dispatch } = this.props;
		const actions = bindActionCreators(enterpriseSignupRequest, dispatch);

	    return (
	        <EnterpriseRegister enterpriseSignupRequest={actions}/>
	    );
	}
}

export default connect(null)(EnterpriseRegisterContainer);
