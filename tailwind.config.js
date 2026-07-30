/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        glass: "rgba(255, 255, 255, 0.12)",
        "glass-light": "rgba(255, 255, 255, 0.22)",
        "glass-border": "rgba(255, 255, 255, 0.28)",
        ink: "#0B1120",
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "48px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
        "glass-lg": "0 20px 60px -10px rgba(0, 0, 0, 0.45)",
        glow: "0 0 40px rgba(255, 255, 255, 0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "spin-slower": "spin 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 8s ease-in-out infinite 1s",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "drift": "drift 25s linear infinite",
        "drift-slow": "drift 45s linear infinite",
        "fall": "fall linear infinite",
        "flash": "flash 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.2, transform: "scale(0.8)" },
          "50%": { opacity: 1, transform: "scale(1.1)" },
        },
        drift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" },
        },
        fall: {
          "0%": { transform: "translateY(-10vh) translateX(0)", opacity: 0 },
          "10%": { opacity: 1 },
          "100%": { transform: "translateY(110vh) translateX(20px)", opacity: 0.3 },
        },
        flash: {
          "0%, 92%, 100%": { opacity: 0 },
          "93%": { opacity: 1 },
          "94%": { opacity: 0.2 },
          "95%": { opacity: 0.9 },
          "96%": { opacity: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
