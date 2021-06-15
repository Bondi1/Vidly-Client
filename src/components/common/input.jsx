import React from "react";

const Input = ({ name, label, focus, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus={focus === "true" ? true : ""}
        {...rest}
        id={name}
        name={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
