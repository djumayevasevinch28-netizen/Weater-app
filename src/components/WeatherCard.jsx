import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiNightAltCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiSunrise,
  WiSunset,
  WiHumidity,
} from "react-icons/wi";
import useClock from "../hooks/useClock";
import { weatherEmojiMap } from "../utils/weatherTheme";

const iconMap = {
  Clear: { day: WiDaySunny, night: WiNightClear },
  Clouds: { day: WiCloudy, night: WiNightAltCloudy },
  Rain: { day: WiRain, night: WiRain },
  Drizzle: { day: WiRain, night: WiRain },
  Thunderstorm: { day: WiThunderstorm, night: WiThunderstorm },
  Snow: { day: WiSnow, night: WiSnow },
  Mist: { day: WiFog, night: WiFog },
  Fog: { day: WiFog, night: WiFog },
  Haze: { day: WiFog, night: WiFog },
};

function AnimatedIcon({ main, isNight }) {
  const entry = iconMap[main] || iconMap.Clear;
  const Icon = isNight ? entry.night : entry.day;

  return (
    <motion.div
      animate={
        main === "Clear"
          ? { rotate: 360 }
          : main === "Clouds"
          ? { x: [0, 8, 0] }
          : { y: [0, -6, 0] }
      }
      transition={{
        duration: main === "Clear" ? 20 : 4,
        repeat: Infinity,
        ease: main === "Clear" ? "linear" : "easeInOut",
      }}
      className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
    >
      <Icon className="text-white" size={140} />
    </motion.div>
  );
}

export default function WeatherCard({ weather }) {
  const { time, date, greeting } = useClock(weather?.timezone);

  if (!weather) return null;

  const { name, sys, weather: weatherArr, main, wind } = weather;
  const condition = weatherArr[0];
  const emoji = weatherEmojiMap[condition.main] || "🌡️";
  const isNight = condition.icon.endsWith("n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="glass-panel rounded-4xl md:rounded-5xl p-6 sm:p-8 md:p-10 shadow-glass-lg relative overflow-hidden"
    >
      {/* subtle glow accent */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex flex-col gap-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-white/70 text-sm md:text-base font-medium tracking-wide"
          >
            {greeting} · {date}
          </motion.p>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-white text-shadow-soft">
              {name}, {sys.country}
            </h1>
          </div>

          <p className="text-white/60 text-sm md:text-base -mt-1">
            {weather.coord.lat.toFixed(2)}°, {weather.coord.lon.toFixed(2)}°
          </p>

          <div className="flex items-end gap-4 mt-2">
            <motion.h2
              key={main.temp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl font-display font-light text-white text-shadow-soft leading-none"
            >
              {Math.round(main.temp)}°
            </motion.h2>
            <div className="pb-2 md:pb-3">
              <p className="text-white/90 text-lg md:text-xl capitalize font-medium">
                {condition.description} {emoji}
              </p>
              <p className="text-white/60 text-sm md:text-base">
                Feels like {Math.round(main.feels_like)}°
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-1 text-white/70 text-sm md:text-base">
            <span className="flex items-center gap-1">
              ▲ {Math.round(main.temp_max)}°
            </span>
            <span className="flex items-center gap-1">
              ▼ {Math.round(main.temp_min)}°
            </span>
            <span className="flex items-center gap-1">
              <WiHumidity size={20} /> {main.humidity}%
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-white/80 text-lg md:text-xl tracking-widest mt-3"
          >
            {time}
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-2 self-center">
          <AnimatedIcon main={condition.main} isNight={isNight} />
          <div className="flex items-center gap-4 text-white/70 text-xs md:text-sm mt-1">
            <span className="flex items-center gap-1">
              <WiSunrise size={22} />
              {new Date((sys.sunrise + weather.timezone) * 1000).toLocaleTimeString(
                "en-US",
                { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }
              )}
            </span>
            <span className="flex items-center gap-1">
              <WiSunset size={22} />
              {new Date((sys.sunset + weather.timezone) * 1000).toLocaleTimeString(
                "en-US",
                { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }
              )}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
