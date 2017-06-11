import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router';

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        const { restaurant_id } = this.props;
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                             </span>
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Example user</strong>
                             </span> <span className="text-muted text-xs block">Example position<b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><a href="#"> Logout</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                IN+
                            </div>
                        </li>
                        <li className={this.activeRoute("/daily")}>
                            <Link to={"/restaurants/"+ restaurant_id +"/daily"}><i className="fa fa-bar-chart"></i> <span className="nav-label">Daily</span></Link>
                        </li>
                        <li className={this.activeRoute("/orders")}>
                            <Link to={"/restaurants/"+ restaurant_id +"/orders"}><i className="fa fa-edit"></i> <span className="nav-label">Orders</span></Link>
                        </li>
                        <li className={this.activeRoute("/main")}>
                            <Link to={"/restaurants/"+ restaurant_id +"/main"}><i className="fa fa-th-large"></i> <span className="nav-label">Management</span></Link>
                        </li>
                        <li className={this.activeRoute("/profile")}>
                            <Link to={"/restaurants/"+ restaurant_id +"/profile"}><i className="fa fa-th-large"></i> <span className="nav-label">Profile</span></Link>
                        </li>
                    </ul>

            </nav>
        )
    }
}

export default Navigation