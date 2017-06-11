import React from 'react';
import Header from '../commons/Header';
import Navigation from '../commons/Navigation';
import Footer from '../commons/Footer';
import Widget from '../commons/Widget';
import classnames from 'classnames';

// let customStyle = classnames.bind(styles);

class RestaurantMain extends React.Component {

    constructor(props, _railsContext) {
      super(props);

      this.state = {
        errors: new Object(),
        isLoading: false,
        csrfToken: ReactOnRails.authenticityToken()
      };

      _.bindAll(this, [
      ]);

    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    render() {
        let wrapperClass = "gray-bg " + this.props.location.pathname;
        const { restaurant_id, location } = this.props;
        // let className = cx({
        //   defaultWidgetBg: true
        // });
        return (
            <div id="wrapper">
                <Navigation location={location} restaurant_id={restaurant_id}/>
                    <div id="page-wrapper" className={wrapperClass}>

                        <Header pageName="Main"/>
                            <div className="row m-t-lg">
                                <Widget name="Create/Update Menu" icon="signal" pathname="/menu" restaurant_id={restaurant_id}/>
                                <Widget name="QR Code Management" icon="search" pathname="/qr" restaurant_id={restaurant_id}/>
                            </div>

                            <div className="row m-t-lg">
                                <Widget name="Payment" icon="credit-card" pathname="/payments" restaurant_id={restaurant_id}/>
                                <Widget name="Settings" icon="cogs" pathname="/settings" restaurant_id={restaurant_id}/>
                            </div>

                            <div className="row m-t-lg">
                                hello
                            </div>
                        <Footer />
                    </div>
            </div>
        )
    }
}

export default RestaurantMain