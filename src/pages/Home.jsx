import { AnimatePresence, motion } from "framer-motion";
import useWeather from "../hooks/useWeather";
import Background from "../components/Background";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Details from "../components/Details";
import Forecast from "../components/Forecast";
import TemperatureChart from "../components/TemperatureChart";
import Loader from "../components/Loader";
import { getWeatherTheme } from "../utils/weatherTheme";

export default function Home() {
  const { weather, forecast, hourly, loading, error, searchCity, locateMe } =
    useWeather();

  const condition = weather?.weather?.[0];
  const isNight = condition ? condition.icon.endsWith("n") : false;
  const theme = getWeatherTheme(condition?.main, isNight);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center px-4 py-8 md:py-12">
      <Background main={condition?.main} isNight={isNight} />

      <div className="w-full max-w-6xl flex flex-col gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-1 mb-1"
        >
          <h1 className="text-white font-display font-semibold text-2xl md:text-3xl tracking-tight text-shadow-soft">
            Aura Weather
          </h1>
          <p className="text-white/60 text-xs md:text-sm">
            Precise, beautiful weather — anywhere in the world
          </p>
        </motion.div>

        <SearchBar
          onSearch={searchCity}
          onLocate={locateMe}
          error={error}
          loading={loading}
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : weather ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6 md:gap-8 pb-10"
            >
              <WeatherCard weather={weather} />
              <Details weather={weather} />
              <Forecast forecast={forecast} />
              <TemperatureChart hourly={hourly} accent={theme.accent} />
            </motion.div>
          ) : (
            !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/70 mt-10"
              >
                Search for a city to see the weather.
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-auto pt-10 text-white/40 text-xs text-center">
        Weather data by OpenWeatherMap · Crafted with care
      </footer>
    </div>
  );
}