import { motion } from "framer-motion";

/**
 * SkeletonBlock — a shimmering placeholder block used to build up
 * skeleton layouts that mirror the real content's shape.
 */
function SkeletonBlock({ className = "" }) {
  return (
    <div className={`rounded-2xl shimmer-bg animate-shimmer ${className}`} />
  );
}

/**
 * Loader — full skeleton screen shown while the initial weather
 * fetch is in flight. Mirrors the real layout (hero card + detail
 * grid + forecast strip) so the transition in feels seamless.
 */
export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-6xl mx-auto flex flex-col gap-6"
    >
      {/* Search bar skeleton */}
      <SkeletonBlock className="h-14 w-full max-w-xl mx-auto rounded-full" />

      {/* Hero card skeleton */}
      <div className="glass-panel rounded-4xl p-8 md:p-10 shadow-glass-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col gap-4">
            <SkeletonBlock className="h-5 w-40" />
            <SkeletonBlock className="h-16 w-56" />
            <SkeletonBlock className="h-5 w-32" />
          </div>
          <SkeletonBlock className="h-32 w-32 rounded-full" />
        </div>
      </div>

      {/* Detail cards skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-28" />
        ))}
      </div>

      {/* Forecast skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-40" />
        ))}
      </div>

      <SkeletonBlock className="h-72 w-full" />

      <div className="flex items-center justify-center gap-3 text-white/70 pt-2">
        <motion.div
          className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-sm tracking-wide">Fetching the skies…</span>
      </div>
    </motion.div>
  );
}
