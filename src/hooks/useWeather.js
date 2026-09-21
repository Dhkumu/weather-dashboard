import { useState } from "react";
import { geocodeCity, fetchWeather } from "../utils/api";

export function useWeather() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function search(cityName) {
    setStatus("loading");
    setError(null);

    try {
      const place = await geocodeCity(cityName);
      const weather = await fetchWeather(place.latitude, place.longitude);
      setData({ place, ...weather });
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  async function searchByCoords(latitude, longitude) {
    setStatus("loading");
    setError(null);

    try {
      const weather = await fetchWeather(latitude, longitude);
      setData({ place: { name: "Your location", country: "" }, ...weather });
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return { data, status, error, search, searchByCoords };
}