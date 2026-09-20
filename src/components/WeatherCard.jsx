export default function WeatherCard({ data }) {
  return (
    <div>
      <h2>{data.place.name}, {data.place.country}</h2>
      <p>{data.temperature}°C</p>
      <p>Humidity: {data.humidity}%</p>
    </div>
  );
}