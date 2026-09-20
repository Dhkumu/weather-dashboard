import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";
import SearchHistory from "./components/SearchHistory";

const HISTORY_KEY = "weather-dashboard-history";

function App() {
  const { data, status, error, search } = useWeather();

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

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

  return (
    <div>git add <div className=""></div>
      <h1>Weather Dashboard</h1>

      <SearchBar onSearch={handleSearch} />
      <SearchHistory history={history} onSelect={handleSearch} />

      {status === "loading" && <LoadingSpinner />}
      {status === "error" && <ErrorMessage message={error} />}
      {status === "success" && data && <WeatherCard data={data} />}
    </div>
  );
}

export default App;