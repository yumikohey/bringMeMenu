import React from 'react';
import classnames from 'classnames';

class Item extends React.Component {
  constructor(props, _railsContext) {
    super(props, _railsContext);

    const { store } = this.context;

    this.state = {
      csrfToken: ReactOnRails.authenticityToken(),
      item: Object.assign({}, this.props.item, {qty: 0})
    }

    _.bindAll(this, [
      'addOne',
      'minusOne'
    ]);
  }

  addOne() {
    const qty = this.state.item.qty + 1;
    const { full_name } = this.state.item;
    this.setState({
      item: Object.assign({}, this.state.item, {qty})
    });
    const data = {
      [this.state.item.id]: { qty, full_name, done: false }
    };
    this.props.updateOrder(data);
  }

  minusOne() {
    const itemQty = this.state.item.qty;
    const itemId = this.state.item.id;
    const { full_name } = this.state.item;
    if (itemQty <= 0) {
      item: Object.assign({}, this.state.item, {qty: 0})
    } else {
      const qty = this.state.item.qty - 1;
      this.setState({
        item: Object.assign({}, this.state.item, {qty})
      });
      const data = {
        [this.state.item.id]: { qty, full_name, done: false }
      };
      this.props.updateOrder(data);
    }

  }

  render() {
    const { item } = this.state;
    return (
        <tr>
            <td className="project-status">
                <span className="label label-primary">Active</span>
            </td>
            <td className="project-title">
                <a href="project_detail.html">{item.full_name}</a>
                <br/>
                <small></small>
            </td>
            <td className="project-title">
                <span>{item.ingredients}</span>
            </td>
            <td className="project-title">
              <span>${item.regular_price}</span>
            </td>
            <td className="project-actions">
              <div>
                <button className="btn btn-danger btn-circle btn-outline" type="button" onClick={() => this.minusOne() }><i className="fa fa-minus"></i></button>
                  <span className="p-xs"><strong>{item.qty}</strong></span>
                <button className="btn btn-info btn-circle btn-outline" type="button" onClick={() => this.addOne() }><i className="fa fa-plus"></i></button>
              </div>
            </td>
        </tr>
    )
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  updateOrder: React.PropTypes.func.isRequired,
}

Item.defaultProps = {
}

export default Item;