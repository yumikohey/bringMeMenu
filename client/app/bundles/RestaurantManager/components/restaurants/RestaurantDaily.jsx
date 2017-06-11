import React from 'react';
import Header from '../commons/Header';
import Navigation from '../commons/Navigation';
import Footer from '../commons/Footer';

class RestaurantDaily extends React.Component {

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
        const {restaurant_id} = this.props;
        return (
            <div>
                <div id="wrapper">
                    <Navigation location={location} restaurant_id={restaurant_id}/>
                        <div id="page-wrapper" className="gray-bg">

                            <Header pageName="Daily"/>
 
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-title">
                                            <span className="label label-success pull-right">Monthly</span>
                                            <h5>Income</h5>
                                        </div>
                                        <div className="ibox-content">
                                            <h1 className="no-margins">40 886,200</h1>
                                            <div className="stat-percent font-bold text-success">98% <i className="fa fa-bolt"></i></div>
                                            <small>Total income</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-title">
                                            <span className="label label-info pull-right">Annual</span>
                                            <h5>Orders</h5>
                                        </div>
                                        <div className="ibox-content">
                                            <h1 className="no-margins">275,800</h1>
                                            <div className="stat-percent font-bold text-info">20% <i className="fa fa-level-up"></i></div>
                                            <small>New orders</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-title">
                                            <span className="label label-primary pull-right">Today</span>
                                            <h5>Vistits</h5>
                                        </div>
                                        <div className="ibox-content">
                                            <h1 className="no-margins">106,120</h1>
                                            <div className="stat-percent font-bold text-navy">44% <i className="fa fa-level-up"></i></div>
                                            <small>New visits</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-title">
                                            <span className="label label-danger pull-right">Low value</span>
                                            <h5>User activity</h5>
                                        </div>
                                        <div className="ibox-content">
                                            <h1 className="no-margins">80,600</h1>
                                            <div className="stat-percent font-bold text-danger">38% <i className="fa fa-level-down"></i></div>
                                            <small>In first month</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-title">
                                            <h5>Orders</h5>
                                            <div className="pull-right">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-xs btn-white active">Today</button>
                                                    <button type="button" className="btn btn-xs btn-white">Monthly</button>
                                                    <button type="button" className="btn btn-xs btn-white">Annual</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ibox-content">
                                            <div className="row">
                                                <div className="col-lg-9">
                                                    <div className="flot-chart">
                                                        <div className="flot-chart-content" id="flot-dashboard-chart"></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <ul className="stat-list">
                                                        <li>
                                                            <h2 className="no-margins">2,346</h2>
                                                            <small>Total orders in period</small>
                                                            <div className="stat-percent">48% <i className="fa fa-level-up text-navy"></i></div>
                                                            <div className="progress progress-mini">
                                                                <div className="progress-bar"></div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <h2 className="no-margins ">4,422</h2>
                                                            <small>Orders in last month</small>
                                                            <div className="stat-percent">60% <i className="fa fa-level-down text-navy"></i></div>
                                                            <div className="progress progress-mini">
                                                                <div className="progress-bar"></div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <h2 className="no-margins ">9,180</h2>
                                                            <small>Monthly income from orders</small>
                                                            <div className="stat-percent">22% <i className="fa fa-bolt text-navy"></i></div>
                                                            <div className="progress progress-mini">
                                                                <div className="progress-bar"></div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </div>
                </div>
            </div>
        )
    }
}

export default RestaurantDaily