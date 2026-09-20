import { celsiusToFahrenheit } from "../utils/api";

export default function WeatherCard({ data, unit, onToggleUnit }) {
  const displayTemp =
    unit === "F"
      ? Math.round(celsiusToFahrenheit(data.temperature))
      : Math.round(data.temperature);

  return (
    <div className="weather-card">
      <h2>{data.place.name}, {data.place.country}</h2>
      <button onClick={onToggleUnit}>°C / °F</button>
      <p className="temperature">{displayTemp}°{unit}</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind: {data.windSpeed} km/h</p>
      <p>Precipitation: {data.precipitation} mm</p>
    </div>
  );
}