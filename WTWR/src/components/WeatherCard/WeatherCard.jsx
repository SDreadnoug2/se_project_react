import "./WeatherCard.css";

function WeatherCard(props) {
  const currentWeather = "../src/assets/PartialClouds.png";
  const temperature = "45F";

  return (
    <div className="weatherCard">
      <img
        className="weatherCard__image"
        src={"../src/assets/PartialClouds.png"}
        alt="image"
      />
      <h1 className="weatherCard__temperature">{temperature}</h1>
    </div>
  );
}

export default WeatherCard;
