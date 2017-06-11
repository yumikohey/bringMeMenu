import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

class Widget extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        active: this.props.active,
        inactive: true
      };

      _.bindAll(this, [
        'onHover',
        'unHover'
      ]);

    }

    onHover() {
        let { active, inactive } = this.state;
        if (inactive) {
            this.setState({
                active: true,
                inactive: false
            })
        }
    }

    unHover() {
        let { active, inactive } = this.state;
        if (active) {
            this.setState({
                active: false,
                inactive: true
            })
        }
    }

    render() {
        const { active } = this.state;
        const inactive = active ? false : true;
        const { name, icon, restaurant_id, pathname } = this.props;
        return (
            <div className="col-lg-4 col-lg-offset-1">
                <Link to={"/restaurants/"+restaurant_id + pathname }>
                    <div className={classnames("widget-head-color-box p-lg text-center", { "navy-bg": active, "default-widget": inactive })} onMouseEnter={this.onHover} onMouseLeave={this.unHover}>
                        <div className="m-b-md">
                            <h2 className="font-bold no-margins">
                                {name}
                            </h2>
                            <small>Founder of Groupeq</small>
                        </div>
                        <i className={"fa fa-" + icon + " fa-4x"}></i>
                    </div>
                    <div className="default-widget-text-box">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </Link>
            </div>
        )
    }
}

Widget.propTypes = {
  name: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  active: React.PropTypes.string,
  pathname: React.PropTypes.string.isRequired,
  restaurant_id: React.PropTypes.string.isRequired
}

export default Widget