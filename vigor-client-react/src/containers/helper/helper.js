import React, { Fragment } from 'react';

function formInput(key, value, handleChange, submitted = false, type = "text") {
  return (
    <Fragment>
      <input
        className="form-control"
        type={type}
        name={key}
        value={value}
        onChange={(e) => handleChange(e, key)}
      />
      {submitted && !value &&
        <div className="help-block">{key} is required</div>
      }
    </Fragment>
  )
};

function formGroupWrapper(label, element, wrapperStyle = {}, labelStyle = {}) {
  return (
    <div className='form-group'>
      <label
        htmlFor={label}
      >{label}</label>
      {element}
    </div>
  )
}

export {
  formInput,
  formGroupWrapper,
}
