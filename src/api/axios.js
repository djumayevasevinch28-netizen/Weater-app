import axios from "axios";

// Get a free key at https://home.openweathermap.org/api_keys
// then create a .env file in the project root with:
// VITE_WEATHER_API_KEY=your_key_here
export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

/**
 * Fetch current weather for a given city name.
 * @param {string} city
 */
export const getCurrentWeather = (city) =>
  weatherApi.get("/weather", { params: { q: city } });

/**
 * Fetch current weather by geographic coordinates.
 * @param {number} lat
 * @param {number} lon
 */
export const getCurrentWeatherByCoords = (lat, lon) =>
  weatherApi.get("/weather", { params: { lat, lon } });

/**
 * Fetch 5 day / 3 hour forecast for a given city name.
 * @param {string} city
 */
export const getForecast = (city) =>
  weatherApi.get("/forecast", { params: { q: city } });

/**
 * Fetch 5 day / 3 hour forecast by geographic coordinates.
 * @param {number} lat
 * @param {number} lon
 */
export const getForecastByCoords = (lat, lon) =>
  weatherApi.get("/forecast", { params: { lat, lon } });

export default weatherApi;
