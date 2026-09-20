export default function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h2>{data.place.name}, {data.place.country}</h2>
      <p className="temperature">{data.temperature}°C</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind: {data.windSpeed} km/h</p>
      <p>Precipitation: {data.precipitation} mm</p>
    </div>
  );
}