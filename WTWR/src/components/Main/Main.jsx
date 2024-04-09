import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main(props) {
  const temperature = props.temp;
  return (
    <div className="main">
      <WeatherCard temp={temperature} />
      <h2 className="main__temperature">
        Today is {temperature} / You may want to wear:
      </h2>
      <ItemCard />
    </div>
  );
}

export default Main;
