import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ name, orange, wide, clickHandler }) => {
  const handleClick = () => clickHandler(name);
  const className = `component-button ${orange ? "orange" : ""} ${
    wide ? "wide" : ""
  }`.trim();

  return (
    <div className={className}>
      <button onClick={handleClick}>{name}</button>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  orange: PropTypes.bool,
  wide: PropTypes.bool,
  clickHandler: PropTypes.func,
};

export default Button;
