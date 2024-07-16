import { apiInfo } from "./constants";
import { checkResponse } from "./api";
export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${apiInfo.latitude}&lon=${apiInfo.longitude}&units=imperial&appid=${apiInfo.apikey}`,
    {
      method: "GET",
    }
  )
    .then((res) => checkResponse(res))
    .then((data) => {
      const climate = {
        temp: data.main.temp,
        location: data.name,
      };
      return climate;
    });
}
