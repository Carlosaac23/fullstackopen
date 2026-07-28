import { useEffect, useState } from "react";
import { getCountryWeather } from "../services/weather";

export default function Country({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getCountryWeather(country.name.common.toLowerCase()).then((res) => setWeather(res));
  }, [country.name.common]);

  return (
    <div key={country.cca2}>
      <h1>{country.name.common}</h1>
      <p>
        <strong>Capital</strong> {country.capital[0]}
      </p>
      <p>
        <strong>Area</strong> {country.area}
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div className="flag">{country.flag}</div>
      <h3>Weather in {country.name.common}</h3>
      {weather && (
        <div>
          <p>
            <strong>Temperature</strong> {weather.main.temp} Celcius
          </p>
          <img
            style={{ width: "120px" }}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>
            <strong>Wind</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}
