import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import React, { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";

function Main(props) {
  const temperature = Math.round(props.temp);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    name: "",
    link: "",
    weather: "",
  });

  const handleImageClick = (link, name, weather) => {
    setModalInfo({
      isOpen: true,
      name: name,
      link: link,
      weather: weather,
    });
  };

  useEffect(() => {
    let weatherCondition = "";
    if (temperature > 80) {
      weatherCondition = "hot";
    } else if (temperature >= 65 && temperature <= 80) {
      weatherCondition = "warm";
    } else if (temperature < 65) {
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
        Today is {temperature}°F / You may want to wear:
      </h2>
      {modalInfo.isOpen && (
        <ItemModal
          image={modalInfo.link}
          name={modalInfo.name}
          weather={modalInfo.weather}
          onClose={handleImageClose}
        />
      )}
      <div className="main__clothingCards">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            name={item.name}
            link={item.link}
            onClick={() => {
              handleImageClick(item.link, item.name, item.weather);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
