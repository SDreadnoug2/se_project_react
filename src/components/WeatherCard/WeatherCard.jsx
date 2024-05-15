import "./WeatherCard.css";
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard(props) {
  const currentWeather = "../src/assets/PartialClouds.png";
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="weatherCard">
      <img
        className="weatherCard__image"
        src={"./src/assets/PartialClouds.png"}
        alt="image"
      />
      <h1 className="weatherCard__temperature">
        {props.temp}°{currentTemperatureUnit}
      </h1>
    </div>
  );
}

export default WeatherCard;
