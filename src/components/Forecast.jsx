import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const iconMap = {
  Clear: WiDaySunny,
  Clouds: WiCloudy,
  Rain: WiRain,
  Drizzle: WiRain,
  Thunderstorm: WiThunderstorm,
  Snow: WiSnow,
  Mist: WiFog,
  Fog: WiFog,
  Haze: WiFog,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Forecast({ forecast = [] }) {
  if (!forecast.length) return null;

  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-white/80 text-sm md:text-base font-medium tracking-wide uppercase mb-4"
      >
        5-Day Forecast
      </motion.h3>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
      >
        {forecast.map((day) => {
          const condition = day.weather[0];
          const Icon = iconMap[condition.main] || WiDaySunny;
          const dayLabel = new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          });
          const dateLabel = new Date(day.dt * 1000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <motion.div
              key={day.dt}
              variants={item}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass-panel rounded-3xl p-5 flex flex-col items-center gap-2 text-center shadow-glass hover:shadow-glass-lg hover:bg-white/[0.16] transition-colors duration-300"
            >
              <p className="text-white font-semibold text-sm">{dayLabel}</p>
              <p className="text-white/50 text-xs -mt-1">{dateLabel}</p>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="my-1"
              >
                <Icon className="text-white" size={52} />
              </motion.div>

              <p className="text-white/70 text-xs capitalize leading-tight">
                {condition.description}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-white font-display font-semibold text-lg">
                  {Math.round(day.main.temp_max)}°
                </span>
                <span className="text-white/50 text-sm">
                  {Math.round(day.main.temp_min)}°
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
