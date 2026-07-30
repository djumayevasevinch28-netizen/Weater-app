import { useMemo } from "react";
import { motion } from "framer-motion";
import { getWeatherTheme } from "../utils/weatherTheme";

/**
 * Background — a full-viewport, slowly animated scene that changes
 * based on the current weather condition. Pure CSS/SVG based motion,
 * layered under the glass UI to keep everything readable.
 */
export default function Background({ main = "Clear", isNight = false }) {
  const theme = getWeatherTheme(main, isNight);
  const scene = theme.scene;

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        top: Math.random() * 70,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        top: Math.random() * 50 + 5,
        scale: Math.random() * 0.8 + 0.6,
        duration: Math.random() * 25 + 30,
        delay: Math.random() * -30,
        opacity: Math.random() * 0.3 + 0.35,
      })),
    []
  );

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 0.5 + 0.5,
        height: Math.random() * 20 + 15,
      })),
    []
  );

  const snowFlakes = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 6,
        size: Math.random() * 6 + 4,
        opacity: Math.random() * 0.6 + 0.4,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 6,
      })),
    []
  );

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br ${theme.gradient} bg-gradient-animate animate-gradient-shift transition-colors duration-1000`}
    >
      {/* Ambient floating particles — always present, subtle */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/20 blur-[1px]"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Sun glow for clear daytime skies */}
      {(scene === "clear") && (
        <motion.div
          className="absolute -top-24 right-10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-yellow-200 via-orange-300 to-transparent blur-3xl opacity-70"
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Moon + stars for night scenes */}
      {(scene === "night" || scene === "night-clouds") && (
        <>
          <motion.div
            className="absolute top-16 right-16 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-[0_0_60px_20px_rgba(255,255,255,0.35)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          />
          {stars.map((s) => (
            <motion.span
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
              }}
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Drifting clouds */}
      {(scene === "clouds" || scene === "night-clouds" || scene === "rain" || scene === "mist") && (
        <div className="absolute inset-0">
          {clouds.map((c) => (
            <motion.div
              key={c.id}
              className="absolute"
              style={{ top: `${c.top}%`, left: "-20%" }}
              animate={{ x: ["0vw", "130vw"] }}
              transition={{
                duration: c.duration,
                repeat: Infinity,
                delay: c.delay,
                ease: "linear",
              }}
            >
              <svg
                width={220 * c.scale}
                height={90 * c.scale}
                viewBox="0 0 220 90"
                style={{ opacity: c.opacity }}
              >
                <ellipse cx="60" cy="55" rx="55" ry="30" fill="white" />
                <ellipse cx="110" cy="40" rx="65" ry="35" fill="white" />
                <ellipse cx="160" cy="55" rx="50" ry="28" fill="white" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Rain */}
      {scene === "rain" && (
        <div className="absolute inset-0">
          {rainDrops.map((r) => (
            <motion.span
              key={r.id}
              className="absolute w-[1.5px] rounded-full bg-gradient-to-b from-white/0 via-white/60 to-white/0"
              style={{ left: `${r.left}%`, height: r.height, top: "-10%" }}
              animate={{ y: ["0vh", "115vh"] }}
              transition={{
                duration: r.duration,
                repeat: Infinity,
                delay: r.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Snow */}
      {scene === "snow" && (
        <div className="absolute inset-0">
          {snowFlakes.map((f) => (
            <motion.span
              key={f.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${f.left}%`,
                width: f.size,
                height: f.size,
                opacity: f.opacity,
                top: "-5%",
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, 15, -15, 0],
              }}
              transition={{
                duration: f.duration,
                repeat: Infinity,
                delay: f.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Thunderstorm — dark clouds + lightning flashes */}
      {scene === "thunderstorm" && (
        <>
          <div className="absolute inset-0">
            {clouds.slice(0, 4).map((c) => (
              <motion.div
                key={c.id}
                className="absolute opacity-40"
                style={{ top: `${c.top / 2}%`, left: "-20%" }}
                animate={{ x: ["0vw", "130vw"] }}
                transition={{
                  duration: c.duration * 0.8,
                  repeat: Infinity,
                  delay: c.delay,
                  ease: "linear",
                }}
              >
                <svg width={260} height={100} viewBox="0 0 220 90">
                  <ellipse cx="60" cy="55" rx="55" ry="30" fill="#1a1a2e" />
                  <ellipse cx="110" cy="40" rx="65" ry="35" fill="#1a1a2e" />
                  <ellipse cx="160" cy="55" rx="50" ry="28" fill="#1a1a2e" />
                </svg>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{ opacity: [0, 0, 0.5, 0.1, 0.7, 0, 0, 0, 0, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {rainDrops.slice(0, 40).map((r) => (
            <motion.span
              key={r.id}
              className="absolute w-[1.5px] rounded-full bg-gradient-to-b from-white/0 via-white/50 to-white/0"
              style={{ left: `${r.left}%`, height: r.height, top: "-10%" }}
              animate={{ y: ["0vh", "115vh"] }}
              transition={{
                duration: r.duration * 0.8,
                repeat: Infinity,
                delay: r.delay,
                ease: "linear",
              }}
            />
          ))}
        </>
      )}

      {/* Mist / haze soft layers */}
      {scene === "mist" && (
        <div className="absolute inset-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-1/3 bg-white/10 blur-2xl"
              style={{ top: `${i * 30 + 10}%` }}
              animate={{ x: ["-10%", "10%", "-10%"] }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Soft vignette for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
    </div>
  );
}
