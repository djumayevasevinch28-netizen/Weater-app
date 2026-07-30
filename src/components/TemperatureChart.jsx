import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel-light rounded-xl px-3 py-2 text-white text-sm shadow-glass">
        <p className="font-medium">{label}</p>
        <p className="text-white/80">{Math.round(payload[0].value)}°</p>
      </div>
    );
  }
  return null;
}

export default function TemperatureChart({ hourly = [], accent = "#FFB84D" }) {
  if (!hourly.length) return null;

  const data = hourly.map((entry) => ({
    time: new Date(entry.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
    }),
    temp: entry.main.temp,
    feels: entry.main.feels_like,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      whileHover={{ y: -4 }}
      className="glass-panel rounded-4xl p-6 md:p-8 shadow-glass-lg"
    >
      <h3 className="text-white/80 text-sm md:text-base font-medium tracking-wide uppercase mb-4">
        Temperature Trend · Next 24h
      </h3>
      <div className="h-64 md:h-72 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accent} stopOpacity={0.6} />
                <stop offset="95%" stopColor={accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={36}
              tickFormatter={(v) => `${Math.round(v)}°`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke={accent}
              strokeWidth={3}
              fill="url(#tempGradient)"
              animationDuration={1200}
              dot={{ r: 3, fill: accent, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: accent }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
