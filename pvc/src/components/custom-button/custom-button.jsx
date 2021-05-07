import React from "react";

import "./custom-button.scss";

const CustomButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`btn btn--1 ${props.className ? props.className : ""}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
