import { useState } from "react";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [cityInput, setCityInput] = useState("");
  const { data, status, error, search } = useWeather();

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading, which forms do by default
    search(cityInput);
  }

  return (
    <div>
      <h1>Weather Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search a city..."
        />
        <button type="submit">Search</button>
      </form>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error: {error}</p>}
      {status === "success" && data && (
        <div>
          <h2>{data.place.name}, {data.place.country}</h2>
          <p>{data.temperature}°C</p>
          <p>Humidity: {data.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;