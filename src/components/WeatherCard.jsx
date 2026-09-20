import { celsiusToFahrenheit } from "../utils/api";

export default function WeatherCard({ data, unit, onToggleUnit }) {
  function convert(celsius) {
    return unit === "F"
      ? Math.round(celsiusToFahrenheit(celsius))
      : Math.round(celsius);
  }

  return (
    <div className="weather-card">
      <h2>{data.place.name}, {data.place.country}</h2>
      <button onClick={onToggleUnit}>°C / °F</button>
      <p className="temperature">{convert(data.temperature)}°{unit}</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind: {data.windSpeed} km/h</p>
      <p>Precipitation: {data.precipitation} mm</p>

      <ul className="forecast">
        {data.daily.map((day) => (
          <li key={day.date}>
            <span>{new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}</span>
            <span>{convert(day.max)}° / {convert(day.min)}°</span>
          </li>
        ))}
      </ul>
    </div>
  );
}