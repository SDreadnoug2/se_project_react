import "./WeatherCard.css";
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import weatherImage from "../../../public/assets/PartialClouds.png"

function WeatherCard(props) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="weatherCard">
      <img
        className="weatherCard__image"
        src={weatherImage}
        alt="image"
      />
      <h1 className="weatherCard__temperature">
        {props.temp}°{currentTemperatureUnit}
      </h1>
    </div>
  );
}

export default WeatherCard;
