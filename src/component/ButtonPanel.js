import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./ButtonPanel.css";

const ButtonPanel = ({ clickHandler }) => {
  const buttonGroups = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const renderButton = (name, orange = false, wide = false) => (
    <Button
      name={name}
      clickHandler={clickHandler}
      orange={orange}
      wide={wide}
    />
  );

  return (
    <div className="component-button-panel">
      {buttonGroups.map((group, index) => (
        <div key={index}>
          {group.map(name =>
            renderButton(
              name,
              ["÷", "x", "-", "+", "="].includes(name),
              name === "0",
            ),
          )}
        </div>
      ))}
    </div>
  );
};

ButtonPanel.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default ButtonPanel;
