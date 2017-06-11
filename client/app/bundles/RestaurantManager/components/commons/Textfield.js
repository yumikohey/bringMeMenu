import React from 'react';
import classnames from 'classnames';

const InputField = ({ name, value, error, type, onChange, placeholder }) => {
  return (
      <div>
        <input
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
        />
        {error && <span className="help-block">{error}</span>}
      </div>
  )
}

const InputWithLabelDiv = ({ name, value, error, type, onChange, placeholder, labelName, divCol, description }) => {
  return (
      <div>
        <div className={classnames('form-group', { 'has-error': error })}>
          <label className="col-sm-2 control-label">{labelName}</label>
          <div className={divCol}>
            <InputField onChange={onChange} name={name} value={value} error={error} type={type} placeholder={placeholder}/>
            {description && <span className="help-block m-b-none">{description}</span>}
          </div>
        </div>
        <div className="hr-line-dashed"></div>
      </div>
  );
}

const InputWithoutLabelDiv = ({ name, value, error, type, onChange, placeholder }) => {
  return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <InputField onChange={onChange} name={name} value={value} error={error} type={type} placeholder={placeholder}/>
        </div>
    );
}

const TextFieldGroup = ({ field, value, error, type, onChange, placeholder, labelName, divCol, description }) => {
    let body = null;
    if (labelName) {
      body = <InputWithLabelDiv onChange={onChange} name={field} value={value} error={error} type={type} labelName={labelName} divCol={divCol} placeholder={placeholder} description={description}/>
    } else {
      body = <InputWithoutLabelDiv onChange={onChange} name={field} value={value} error={error} type={type} placeholder={placeholder}/>
    }
    return (
      <div>
        {body}
      </div>
    );

}

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  error: React.PropTypes.array,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  labelName: React.PropTypes.string,
  divCol: React.PropTypes.string,
  description: React.PropTypes.string,
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;