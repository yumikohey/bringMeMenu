import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactOnRails from 'react-on-rails';
import update from 'react-addons-update';
import validateInput from '../../validations/restaurantProfileValidations';
import classnames from 'classnames';
import Header from '../commons/Header';
import Navigation from '../commons/Navigation';
import Footer from '../commons/Footer';
import { correctHeight, detectBody } from '../layouts/Helper';
import Textfield from '../commons/Textfield';

export default class RestaurantProfile extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    this.state = {
      errors: new Object(),
      isLoading: false,
      csrfToken: ReactOnRails.authenticityToken(),
      restaurantInfo: {}
    };

    _.bindAll(this, [
        'profileFormOnChange',
        'saveProfile'
    ]);
  }

  componentWillMount() {
    const { store } = this.context;
    const { restaurantActions } = this.props;
    const { restaurantInfo } = this.state;
    const url = window.location.pathname.replace('profile', 'get_profile');
    const getRestaurantProfile = restaurantActions.getRestaurantProfileRequest(url);
    store.dispatch(getRestaurantProfile);
    getRestaurantProfile.payload.then(
      (res) => {
        if (res.status === 200) {
          store.dispatch(restaurantActions.loadRestaurantProfileSuccess(res.data));
          // NEED TO UPDATE
          this.setState({restaurantInfo: res.data});
        }
      }
    );
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  profileFormOnChange(e) {
    // need to set up the object 
    this.setState({
      restaurantInfo: update(this.state.restaurantInfo, {[e.target.name]: {$set: e.target.value}})
    });
  }

  saveProfile(e) {
    e.preventDefault();
    this.state.errors = {};
    const url = window.location.pathname.replace('profile', 'update_restaurant_profile');
    if (this.isValid()) {
      this.props.restaurantActions.restaurantUpdateProfileRequest(url, this.state.restaurantInfo, this.state.csrfToken).then(
        (res) => {
          if(res.status === 200){
            this.setState({restaurantInfo: res.data});            
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
    let wrapperClass = "gray-bg " + this.props.location.pathname;
    const { errors, restaurantInfo } = this.state;
    const { location, restaurant_id } = this.props;
    const slug = restaurantInfo['slug'];
    console.log(restaurantInfo);
      return (
          <div id="wrapper">
              <Navigation location={location} restaurant_id={restaurant_id}/>

              <div id="page-wrapper" className={wrapperClass}>

                  <Header pageName="Profile"/>

                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Business Profile</h5>
                            <div className="ibox-tools">
                                <a className="collapse-link">
                                    <i className="fa fa-chevron-up"></i>
                                </a>
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <i className="fa fa-wrench"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-user">
                                    <li><a href="#">Config option 1</a>
                                    </li>
                                    <li><a href="#">Config option 2</a>
                                    </li>
                                </ul>
                                <a className="close-link">
                                    <i className="fa fa-times"></i>
                                </a>
                            </div>
                        </div>
                        <div className="ibox-content">
                            <form method="put" className="form-horizontal">

                                <Textfield error={errors.business_name}
                                           divCol="col-sm-10" field="business_name"
                                           labelName="Business Legal Name"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['business_name']}
                                           placeholder="Restaurant Legal Name"
                                           description={restaurantInfo['slug']}/>

                                <Textfield error={errors.business_alias}
                                           divCol="col-sm-10"
                                           field="business_alias"
                                           labelName="Business Alias Name"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['business_alias']}
                                           placeholder="Restaurant Alias Name"
                                           description="What customers usually called your business?"/>

                                <Textfield error={errors.owner_name} 
                                           divCol="col-sm-10"
                                           field="owner_name"
                                           labelName="Owner's Name"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['owner_name']}
                                           placeholder="Owner's Name" />

                                <Textfield error={errors.business_phone_number}
                                           divCol="col-sm-10"
                                           field="business_phone_number"
                                           labelName="Business Phone Number"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['business_phone_number']}
                                           placeholder="Business Phone Number" />

                                <Textfield error={errors.contact_email}
                                           divCol="col-sm-10"
                                           field="contact_email"
                                           labelName="Business Contact Email"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['contact_email']}
                                           placeholder="Business Contact Email"
                                           description="This email is for your customers to contact you."/>

                                <Textfield error={errors.registered_email}
                                           divCol="col-sm-10"
                                           field="registered_email"
                                           labelName="Business Registered Email"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['registered_email']}
                                           placeholder="Business Registered Email"
                                           description="This email is for RMrestaurant to send you annoucements, billing information, etc."/>

                                <Textfield error={errors.tax_id}
                                           divCol="col-sm-10"
                                           field="tax_id"
                                           labelName="Business Tax ID"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['tax_id']}
                                           placeholder="Business Tax ID" />

                                <Textfield error={errors.street_name}
                                           divCol="col-sm-10"
                                           field="street_name"
                                           labelName="Street"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['street_name']}
                                           placeholder="Street" />

                                <Textfield error={errors.city}
                                           divCol="col-sm-10"
                                           field="city"
                                           labelName="City"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['city']}
                                           placeholder="City" />

                                <Textfield error={errors.state}
                                           divCol="col-sm-10"
                                           field="state"
                                           labelName="State"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['state']}
                                           placeholder="State" />

                                <Textfield error={errors.zip_code}
                                           divCol="col-sm-10"
                                           field="zip_code"
                                           labelName="Zip Code"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['zip_code']}
                                           placeholder="Zip Code" />

                                <Textfield error={errors.cuisine_type}
                                           divCol="col-sm-10"
                                           field="cuisine_type"
                                           labelName="Cuisine Type"
                                           onChange={this.profileFormOnChange}
                                           value={restaurantInfo['cuisine_type']}
                                           placeholder="Cuisine Type" />

                                <div className="form-group">
                                    <div className="col-sm-4 col-sm-offset-2">
                                        <button className="btn btn-white" type="submit">Cancel</button>
                                        <button className="btn btn-primary" type="submit" onClick={(e) => this.saveProfile(e)} >Save changes</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                  <Footer />

              </div>

          </div>

      )
  }

  componentDidMount() {

      // Run correctHeight function on load and resize window event
      $(window).bind("load resize", function() {
          correctHeight();
          detectBody();
      });

      // Correct height of wrapper after metisMenu animation.
      $('.metismenu a').click(() => {
          setTimeout(() => {
              correctHeight();
          }, 300)
      });
  }
}

RestaurantProfile.contextTypes = {
  store: React.PropTypes.object
}

RestaurantProfile.propTypes = {
  restaurantActions: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
}
