import React from 'react';
import classnames from 'classnames';
import { Modal, Button } from 'react-bootstrap';
import Textfield from './Textfield';

const ItemModle = ({ show, onHide, item, onChange, onClick, onSubmit}) => {
    let errors;
    let boundClick = onClick.bind(this);
    let _this = this;
    return (
      <div>
        <Modal show={show} bsSize="large" aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Edit Item</h4>
              <form method="put" className="form-horizontal">
                <Textfield error={errors}
                           divCol="col-sm-6"
                           field="alias_name"
                           labelName="Alias Name"
                           onChange={onChange}
                           value={item['alias_name']}
                           placeholder="Peach Pie"
                           description="How do customers search for this item?"/>
                <Textfield error={errors}
                           divCol="col-sm-6"
                           field="full_name"
                           labelName="Complete Name"
                           onChange={onChange}
                           value={item['full_name']}
                           placeholder="French Style Peach Pie" />
                <Textfield error={errors}
                           divCol="col-sm-6"
                           field="regular_price"
                           labelName="Regular Price"
                           onChange={onChange}
                           value={item['regular_price']}
                           placeholder="8.00" />
                <Textfield error={errors}
                           divCol="col-sm-6"
                           field="sales_price"
                           labelName="On Sale Price"
                           onChange={onChange}
                           value={item['sales_price']}
                           placeholder="8.00" />
                <div>
                  <div className="i-checks">
                    <label className="">
                    <div className={classnames('iradio_square-green', { 'checked': item['active'] })}>
                      <input type="radio" value={item['active']} name="active" onClick={boundClick}/>
                    </div> 
                    <i></i> Active
                    </label>
                  </div>
                  <div className="i-checks">
                    <label className="">
                    <div className={classnames('iradio_square-green', { 'checked': item['on_sale'] })}>
                      <input type="radio" checked={item['on_sale']} value={item['on_sale']} name="on_sale" onClick={boundClick}/>
                      
                    </div> 
                    <i></i> On Sale
                    </label>
                  </div>
                  <div className="i-checks">
                    <label className="">
                    <div className={classnames('iradio_square-green', { 'checked': item['featured'] })}>
                      <input type="radio" checked={item['featured']} value={item['featured']} name="featured" onClick={boundClick}/>
                      
                    </div> 
                    <i></i> Featured
                    </label>
                  </div>
                  <div className="i-checks">
                    <label className="">
                    <div className={classnames('iradio_square-green', { 'checked': item['recommended'] })}>
                      <input type="radio" checked={item['recommended']} value={item['recommended']} name="recommended" onClick={boundClick}/>
                      
                    </div> 
                    <i></i> Recommend
                    </label>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onSubmit}>Submit</Button>
              <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
      </div>
    );

}

ItemModle.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onHide: React.PropTypes.func.isRequired,
  item: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func,
  onSubmit: React.PropTypes.func
}

ItemModle.defaultProps = {
  type: 'text'
}

export default ItemModle;


