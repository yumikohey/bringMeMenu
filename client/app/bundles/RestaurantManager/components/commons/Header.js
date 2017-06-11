import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helper';

class TopHeader extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        pageName: this.props.pageName,
      };

      _.bindAll(this, [
      ]);

    }

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    render() {
        const { pageName } = this.props;
        return (
            <div>
                <div className="row border-bottom">
                    <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                        <div className="navbar-header">
                            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars"></i> </a>
                        </div>
                        <ul className="nav navbar-top-links navbar-right">
                            <li>
                                <a href="#">
                                    <i className="fa fa-sign-out"></i> Log out
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="row wrapper border-bottom white-bg page-heading margin-bottom-twice">
                    <div className="col-lg-9">
                        <h2>{pageName}</h2>
                        <ol className="breadcrumb">
                            <li>
                                <a href="main">Home</a>
                            </li>
                            <li className="active">
                                <strong>{pageName}</strong>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

TopHeader.propTypes = {
  pageName: React.PropTypes.string.isRequired,
}

export default TopHeader