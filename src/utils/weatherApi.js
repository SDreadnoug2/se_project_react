import { apiInfo } from "./constants";

export function updateWeather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${apiInfo.latitude}&lon=${apiInfo.longitude}&units=imperial&appid=${apiInfo.apikey}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .then((data) => {
      return data.main.temp;
    })
    .catch((error) => console.error(error));
}
