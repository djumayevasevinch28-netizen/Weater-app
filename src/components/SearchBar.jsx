import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMapPin, FiX } from "react-icons/fi";

/**
 * SearchBar — a floating glass search field. Supports submit via
 * Enter key or the search button, a "use my location" shortcut, and
 * an animated error shake + message when a search fails.
 */
export default function SearchBar({ onSearch, onLocate, error, loading }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSearch(value.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.form
        onSubmit={handleSubmit}
        animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative flex items-center gap-2 glass-panel-light rounded-full px-3 py-2 shadow-glass transition-all duration-300 ${
          focused ? "ring-2 ring-white/50 shadow-glow" : ""
        }`}
      >
        <motion.span
          className="flex items-center justify-center w-10 h-10 rounded-full text-white/80"
          whileTap={{ scale: 0.85 }}
        >
          <FiSearch size={19} />
        </motion.span>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search for a city…"
          className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-base md:text-lg py-2 min-w-0"
        />

        <AnimatePresence>
          {value && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => setValue("")}
              className="flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiX size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={onLocate}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          className="ripple flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          title="Use my location"
        >
          <FiMapPin size={17} />
        </motion.button>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          disabled={loading}
          className="ripple px-5 md:px-6 py-2.5 rounded-full bg-white/90 text-slate-800 font-medium text-sm md:text-base hover:bg-white transition-colors disabled:opacity-60 shadow-md"
        >
          Search
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-center text-sm text-rose-100 bg-rose-500/20 border border-rose-300/30 rounded-xl mt-3 py-2 px-4 backdrop-blur-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
