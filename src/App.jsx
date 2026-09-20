import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";

function App() {
  const { data, status, error, search } = useWeather();

  return (
    <div>
      <h1>Weather Dashboard</h1>

      <SearchBar onSearch={search} />

      {status === "loading" && <LoadingSpinner />}
      {status === "error" && <ErrorMessage message={error} />}
      {status === "success" && data && <WeatherCard data={data} />}
    </div>
  );
}

export default App;