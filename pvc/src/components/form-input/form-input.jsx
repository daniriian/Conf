import React from "react";

import "./form-input.scss";

const FormInput = ({ label, name, ...otherProps }) => {
  return (
    <div className="form-input">
      <input
        className="form-input__input"
        name={name}
        {...otherProps}
        label={label}
      />
      <label htmlFor={name} className="form-input__label">
        {label}
      </label>
    </div>
  );
};

export default FormInput;
