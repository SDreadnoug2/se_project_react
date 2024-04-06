import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main(props) {
  const temperature = "75";
  return (
    <div className="main">
      <WeatherCard />
      <h2 className="main__temperature">
        Today is {temperature} / You may want to wear:
      </h2>
      <ItemCard />
    </div>
  );
}

export default Main;
