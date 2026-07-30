import { motion } from "framer-motion";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiFog,
  WiSunrise,
  WiSunset,
  WiCloud,
} from "react-icons/wi";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/**
 * DetailCard — a single reusable premium glass stat card. Animates
 * in on mount and lifts + glows on hover.
 */
function DetailCard({ icon: Icon, label, value, sub }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-panel rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-glass hover:shadow-glass-lg hover:bg-white/[0.16] transition-colors duration-300 min-h-[128px]"
    >
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-xs md:text-sm uppercase tracking-wider font-medium">
          {label}
        </span>
        <Icon className="text-white/70" size={26} />
      </div>
      <div>
        <p className="text-white text-2xl md:text-3xl font-display font-semibold leading-tight">
          {value}
        </p>
        {sub && <p className="text-white/50 text-xs mt-1">{sub}</p>}
      </div>
    </motion.div>
  );
}

export default function Details({ weather }) {
  if (!weather) return null;

  const { main, wind, visibility, clouds, sys, timezone } = weather;

  const fmtTime = (unixUtc) =>
    new Date((unixUtc + timezone) * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

  const cards = [
    {
      icon: WiThermometer,
      label: "Feels Like",
      value: `${Math.round(main.feels_like)}°`,
      sub: `Actual ${Math.round(main.temp)}°`,
    },
    {
      icon: WiHumidity,
      label: "Humidity",
      value: `${main.humidity}%`,
      sub: main.humidity > 60 ? "Humid" : "Comfortable",
    },
    {
      icon: WiStrongWind,
      label: "Wind Speed",
      value: `${wind.speed.toFixed(1)} m/s`,
      sub: wind.deg !== undefined ? `${wind.deg}° direction` : undefined,
    },
    {
      icon: WiBarometer,
      label: "Pressure",
      value: `${main.pressure}`,
      sub: "hPa",
    },
    {
      icon: WiFog,
      label: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      sub: visibility >= 10000 ? "Clear" : "Reduced",
    },
    {
      icon: WiCloud,
      label: "Cloudiness",
      value: `${clouds.all}%`,
      sub: clouds.all < 20 ? "Mostly clear" : clouds.all < 70 ? "Partly cloudy" : "Overcast",
    },
    {
      icon: WiSunrise,
      label: "Sunrise",
      value: fmtTime(sys.sunrise),
      sub: "Local time",
    },
    {
      icon: WiSunset,
      label: "Sunset",
      value: fmtTime(sys.sunset),
      sub: "Local time",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {cards.map((c) => (
        <DetailCard key={c.label} {...c} />
      ))}
    </motion.div>
  );
}
