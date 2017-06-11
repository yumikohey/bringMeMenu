import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactOnRails from 'react-on-rails';
import update from 'react-addons-update';
import validateInput from '../validations/signupValidations';
import classnames from 'classnames';
import Textfield from './commons/Textfield';

export default class EnterpriseRegister extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    this.state = {
      restaurant_employee: {},
      errors: new Object(),
      isLoading: false,
      csrfToken: ReactOnRails.authenticityToken(),
    };

    _.bindAll(this, [
      'signupFormOnChange',
      'registrationSubmit',
    ]);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  signupFormOnChange(e) {
    // need to set up the object 
    this.setState({
      restaurant_employee: update(this.state.restaurant_employee, {[e.target.name]: {$set: e.target.value}})
    })
  }

  registrationSubmit(e) {
    e.preventDefault();
    const url = window.location.pathname.slice(0, -8);
    const restaurantProfileUrl = url.replace('restaurant_employees', 'profile');
    this.state.errors = {};
    if (this.isValid()) {
      this.props.enterpriseSignupRequest(url, this.state).then(
        (res) => {
          if(res.status === 200){
            this.context.router.push(restaurantProfileUrl);            
          } else {
            update(this.state.errors, {"server_error": res});
          }
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      )
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
                      <h1 className="logo-name">RM+</h1>
                  </div>
                  <h3>Register to RM+</h3>
                  <p>Manage your restaurant seemlessly.</p>
                  <form className="m-t" role="form" action="#">
                      <Textfield error={errors.restaurant_name} field="restaurant_name" onChange={this.signupFormOnChange} value={restaurant_employee.restaurant_name} placeholder="Restaurant Name"/>
                      <Textfield error={errors.first_name} field="first_name" onChange={this.signupFormOnChange} value={restaurant_employee.first_name} placeholder="Owner's first name"/>
                      <Textfield error={errors.last_name} field="last_name" onChange={this.signupFormOnChange} value={restaurant_employee.last_name} placeholder="Owner's last name"/>
                      <Textfield error={errors.email} field="email" onChange={this.signupFormOnChange} value={restaurant_employee.email} placeholder="Owner's email"/>
                      <Textfield error={errors.password} field="password" onChange={this.signupFormOnChange} value={restaurant_employee.password} placeholder="Password" type="password"/>
                      <Textfield error={errors.password_confirmation} field="password_confirmation" onChange={this.signupFormOnChange} value={restaurant_employee.password_confirmation} placeholder="Confirmed Password" type="password"/>                      
                      <div className="form-group">
                          <div className="checkbox">
                            <label> 
                              <input type="checkbox"/><i></i> Agree the terms and policy 
                            </label>
                          </div>
                      </div>
                      <button type="submit" className="btn btn-primary block full-width m-b" onClick={(e) => _this.registrationSubmit(e)}>Register</button>

                      <p className="text-muted text-center"><small>Already have an account?</small></p>
                      <a className="btn btn-sm btn-white btn-block" href="#">Login</a>
                  </form>
                  <p className="m-t"> <small>Restaurant Manager &copy; 2017</small> </p>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

EnterpriseRegister.propTypes = {
  enterpriseSignupRequest: React.PropTypes.func.isRequired,
}

EnterpriseRegister.contextTypes = {
  router: React.PropTypes.object.isRequired
}
