import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import React, { useState, useEffect, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main(props) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const [filteredItems, setFilteredItems] = useState([]);
  const temperature =
    currentTemperatureUnit === "F" ? props.temp.F : props.temp.C;
  useEffect(() => {
    let weatherCondition = "";
    if (props.temp.F > 80) {
      weatherCondition = "hot";
    } else if (props.temp.F >= 65 && props.temp.F <= 80) {
      weatherCondition = "warm";
    } else if (props.temp.F < 65) {
      weatherCondition = "cold";
    }

    const itemsForWeather = defaultClothingItems.filter(
      (item) => item.weather === weatherCondition
    );
    setFilteredItems(itemsForWeather);
  }, [temperature]);

  const handleImageClose = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
  };

  return (
    <div className="main">
      <WeatherCard temp={temperature} />
      <h2 className="main__temperature">
        Today is {temperature}°{currentTemperatureUnit} / You may want to wear:
      </h2>
      <div className="main__clothingCards">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            name={item.name}
            link={item.link}
            onClick={() =>
              props.handleImageClick(item.link, item.name, item.weather)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
