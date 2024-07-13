import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import React, { useState, useEffect, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { ClothingListContext } from "../../contexts/ClothingListContext";
import { UserInfoContext } from "../../contexts/UserInfoContext";

function Main(props) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const userData = useContext(UserInfoContext);
  const { clothingItems } = useContext(ClothingListContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const temperature = currentTemperatureUnit === "F" ? props.temp.F : props.temp.C;

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
            id={props._id}
            isLiked = {item.likes.some(id => id === userData._id)}
            handleCardLike={() => props.handleCardLike({ id: item._id, isLiked: item.likes.some(id => id === userData._id) })}
            handleCardClick={() =>
              props.handleImageClick(
                item.imageUrl,
                item.name,
                item.weather,
                item._id,
                item.owner
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
