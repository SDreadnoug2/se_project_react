import "./ToggleSwitch.css";
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <input
        className="ToggleSwitch__checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <label className="ToggleSwitch__label" htmlFor={`react-switch-new`}>
        <span className="ToggleSwitch__button" />
        <span className="ToggleSwitch__text">F</span>
        <span className="ToggleSwitch__text">C</span>
      </label>
    </>
  );
}

export default ToggleSwitch;
