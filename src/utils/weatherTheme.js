/**
 * Maps an OpenWeatherMap "main" condition + day/night flag to a
 * cohesive visual theme: background scene type, gradient classes,
 * and an accent color used across cards and charts.
 */
export function getWeatherTheme(main = "Clear", isNight = false) {
  const key = (main || "Clear").toLowerCase();

  const themes = {
    clear: {
      scene: isNight ? "night" : "clear",
      gradient: isNight
        ? "from-[#0F0C29] via-[#1E1B4B] to-[#2A2560]"
        : "from-[#2E88F6] via-[#5FA8F5] to-[#FBC96B]",
      accent: isNight ? "#8B9CF6" : "#FFB84D",
      label: isNight ? "Clear Night" : "Clear Sky",
    },
    clouds: {
      scene: isNight ? "night-clouds" : "clouds",
      gradient: isNight
        ? "from-[#232936] via-[#3A4356] to-[#4B5468]"
        : "from-[#6E8CA0] via-[#8FA6B8] to-[#B9C6CE]",
      accent: "#B9C6CE",
      label: "Cloudy",
    },
    rain: {
      scene: "rain",
      gradient: "from-[#1E2A38] via-[#33475C] to-[#425A70]",
      accent: "#7FB3D5",
      label: "Rainy",
    },
    drizzle: {
      scene: "rain",
      gradient: "from-[#28394A] via-[#3C5468] to-[#4E6C82]",
      accent: "#8FC1DD",
      label: "Drizzle",
    },
    thunderstorm: {
      scene: "thunderstorm",
      gradient: "from-[#0D0D1A] via-[#1A1730] to-[#2C1F4A]",
      accent: "#C9A8FF",
      label: "Thunderstorm",
    },
    snow: {
      scene: "snow",
      gradient: "from-[#5C7A99] via-[#8FAFC9] to-[#E4EEF5]",
      accent: "#EAF4FF",
      label: "Snowy",
    },
    mist: {
      scene: "mist",
      gradient: "from-[#586573] via-[#798794] to-[#9EABB6]",
      accent: "#D8E1E8",
      label: "Misty",
    },
    fog: {
      scene: "mist",
      gradient: "from-[#586573] via-[#798794] to-[#9EABB6]",
      accent: "#D8E1E8",
      label: "Foggy",
    },
    haze: {
      scene: "mist",
      gradient: "from-[#7A6B57] via-[#9C8C71] to-[#BFAF8E]",
      accent: "#E3D5B8",
      label: "Hazy",
    },
  };

  return themes[key] || themes.clear;
}

export const weatherEmojiMap = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
  Smoke: "🌫️",
  Dust: "🌪️",
  Sand: "🌪️",
  Squall: "💨",
  Tornado: "🌪️",
};
