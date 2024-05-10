import "./WeatherCard.css";

function WeatherCard(props) {
  const currentWeather = "../src/assets/PartialClouds.png";

  return (
    <div className="weatherCard">
      <img
        className="weatherCard__image"
        src={"../src/assets/PartialClouds.png"}
        alt="image"
      />
      <h1 className="weatherCard__temperature">{props.temp}°F</h1>
    </div>
  );
}

export default WeatherCard;
