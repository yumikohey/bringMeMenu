import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactOnRails from 'react-on-rails';
import update from 'react-addons-update';
import validateInput from '../validations/signupValidations';
import classnames from 'classnames';
import Textfield from './commons/Textfield';
import { connect } from 'react-redux';

export default class EnterpriseLogin extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    this.state = {
      errors: new Object(),
      csrfToken: ReactOnRails.authenticityToken(),
      employee: {}
    };

    _.bindAll(this, [
    ]);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  loginOnChange(e) {
    // need to set up the object 
    this.setState({
      employee: update(this.state.employee, {[e.target.name]: {$set: e.target.value}})
    })
  }

  login(e) {
    e.preventDefault();
    this.state.errors = {};
    if (this.isValid()) {

    }
  }

  render() {
    let _this = this;
    const { errors, restaurant_employee } = this.state;
    return (
      <div>
        <div className="gray-bg">
          <div className="middle-box text-center loginscreen animated fadeInDown">
              <div>
                  <div>

                      <h1 className="logo-name">IN+</h1>

                  </div>
                  <h3>Welcome to IN+</h3>
                  <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
                      <!--Continually expanded and constantly improved Inspinia Admin Them (IN+)-->
                  </p>
                  <p>Login in. To see it in action.</p>
                  <form className="m-t" role="form" action="index.html">
                      <div className="form-group">
                          <input type="email" className="form-control" placeholder="Username" required="">
                      </div>
                      <div className="form-group">
                          <input type="password" className="form-control" placeholder="Password" required="">
                      </div>
                      <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

                      <a href="#"><small>Forgot password?</small></a>
                      <p className="text-muted text-center"><small>Do not have an account?</small></p>
                      <a className="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>
                  </form>
                  <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2017</small> </p>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

EnterpriseLogin.propTypes = {
  enterpriseSignupRequest: React.PropTypes.func.isRequired,
}

EnterpriseLogin.contextTypes = {
  store: React.PropTypes.object
}

export default connect(mapStateToProps, qrActions)(EnterpriseLogin);
