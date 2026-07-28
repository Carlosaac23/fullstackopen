import axios from "axios";

export function getCountryWeather(city) {
  const req = axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPEN_WEATHER_API}&units=metric`,
  );
  return req.then((res) => res.data);
}
