import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";
import SearchHistory from "./components/SearchHistory";

const HISTORY_KEY = "weather-dashboard-history";

function App() {
  const { data, status, error, search, searchByCoords } = useWeather();

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [unit, setUnit] = useState("C");

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  function handleSearch(city) {
    search(city);
    setHistory((prev) => {
      const withoutDupe = prev.filter((c) => c !== city);
      return [city, ...withoutDupe].slice(0, 5);
    });
  }

  function handleLocate() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        searchByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        // user denied permission, or it failed — silently ignore for now
      }
    );
  }

  function toggleUnit() {
    setUnit((u) => (u === "C" ? "F" : "C"));
  }

  return (
    <div>
      <h1>Weather Dashboard</h1>

      <SearchBar onSearch={handleSearch} onLocate={handleLocate} />
      <SearchHistory history={history} onSelect={handleSearch} />

      {status === "loading" && <LoadingSpinner />}
      {status === "error" && <ErrorMessage message={error} />}
      {status === "success" && data && (
        <WeatherCard data={data} unit={unit} onToggleUnit={toggleUnit} />
      )}
    </div>
  );
}

export default App;