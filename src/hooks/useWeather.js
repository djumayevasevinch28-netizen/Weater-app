import { useCallback, useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getForecast,
  getForecastByCoords,
} from "../api/axios";

function groupForecastByDay(list) {
  const days = {};

  list.forEach((entry) => {
    const dayKey = entry.dt_txt.split(" ")[0];
    const hour = Number(entry.dt_txt.split(" ")[1].split(":")[0]);
    const distanceFromNoon = Math.abs(12 - hour);

    if (!days[dayKey] || distanceFromNoon < days[dayKey].distanceFromNoon) {
      days[dayKey] = { ...entry, distanceFromNoon };
    }
  });

  return Object.values(days)
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 5);
}

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  const applyResults = useCallback((weatherRes, forecastRes) => {
    setWeather(weatherRes.data);
    const grouped = groupForecastByDay(forecastRes.data.list);
    setForecast(grouped);
    setHourly(forecastRes.data.list.slice(0, 8));
  }, []);

  const searchCity = useCallback(
    async (city) => {
      if (!city || !city.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const [weatherRes, forecastRes] = await Promise.all([
          getCurrentWeather(city),
          getForecast(city),
        ]);
        applyResults(weatherRes, forecastRes);
      } catch (err) {
        const status = err.response && err.response.status;
        if (status === 404) {
          setError("City not found. Check the spelling and try again.");
        } else if (status === 400) {
          setError("Enter a city name, not a country (e.g. \"Moscow\" instead of \"Russia\").");
        } else if (status === 401) {
          setError("Invalid or inactive API key. Check your .env file.");
        } else if (err.message === "Network Error") {
          setError("Network error. Check your connection and try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [applyResults]
  );

  const searchByCoords = useCallback(
    async (lat, lon) => {
      setLoading(true);
      setError(null);
      try {
        const [weatherRes, forecastRes] = await Promise.all([
          getCurrentWeatherByCoords(lat, lon),
          getForecastByCoords(lat, lon),
        ]);
        applyResults(weatherRes, forecastRes);
      } catch (err) {
        setError("Couldn't fetch weather for your location.");
      } finally {
        setLoading(false);
      }
    },
    [applyResults]
  );

  const locateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => searchByCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setLoading(false);
        if (err.code === 1) {
          setError(
            "Location permission denied. Allow it in your browser's site settings, or search manually."
          );
        } else if (err.code === 2) {
          setError("Location unavailable right now. Try searching manually.");
        } else if (err.code === 3) {
          setError("Location request timed out. Try again.");
        } else {
          setError("Couldn't get your location. Try searching manually.");
        }
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, [searchByCoords]);

  return {
    weather,
    forecast,
    hourly,
    loading,
    error,
    searchCity,
    searchByCoords,
    locateMe,
    unit,
    setUnit,
  };
}