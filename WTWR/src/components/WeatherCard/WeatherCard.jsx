import "./WeatherCard.css";

function WeatherCard(props) {
  const currentWeather = "../src/assets/clear_night.png";

  return (
    <div className="weatherCard">
      <img className="weatherCard__image" src={currentWeather} alt="image" />
    </div>
  );
}

export default WeatherCard;
