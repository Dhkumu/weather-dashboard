// Open-Meteo is free and needs no API key/signup, unlike OpenWeatherMap.
const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// Open-Meteo returns a numeric "weather code" instead of a text label.
// This table translates those codes into something readable.
export const WEATHER_CODES = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  61: { label: "Light rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  71: { label: "Snow", icon: "🌨️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

export function describeWeatherCode(code) {
  return WEATHER_CODES[code] || { label: "Unknown", icon: "❔" };
}

// Turns a city name (e.g. "Kathmandu") into coordinates.
export async function geocodeCity(cityName) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(cityName)}&count=1`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`No city found matching "${cityName}".`);
  }

  const { name, country, latitude, longitude } = data.results[0];
  return { name, country, latitude, longitude };
}

// Given coordinates, fetches current weather.
export async function fetchWeather(latitude, longitude) {
  const url = `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code,
  };
}