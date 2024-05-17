import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import React, { useState, useEffect, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { ClothingListContext } from "../../contexts/ClothingListContext";

function Main(props) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const { clothingItems } = useContext(ClothingListContext);
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

    const itemsForWeather = clothingItems.filter(
      (item) => item.weather === weatherCondition
    );
    setFilteredItems(itemsForWeather);
  }, [temperature, clothingItems]);

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
            link={item.imageUrl}
            onClick={() =>
              props.handleImageClick(
                item.imageUrl,
                item.name,
                item.weather,
                item._id
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
