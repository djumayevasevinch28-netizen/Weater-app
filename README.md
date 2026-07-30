# Aura Weather

A premium, glassmorphic weather app built with React, Vite, Tailwind CSS,
Framer Motion, React Icons, Axios, and Recharts. Inspired by Apple Weather
and iOS 26 design language.

## Features

- Glassmorphism UI with animated gradients, blur, and premium shadows
- Weather-reactive animated backgrounds: sunny sky, drifting clouds, rain,
  snowfall, thunderstorm lightning, and a starry night sky with moon
- Live digital clock, current date, and time-of-day greeting
- Full current-conditions breakdown: temperature, feels like, min/max,
  humidity, wind, pressure, visibility, sunrise/sunset, cloud %, coordinates
- Animated 5-day forecast cards
- 24-hour temperature trend chart (Recharts)
- Animated, error-shaking search bar with "use my location" support
- Skeleton loading screen + spinner
- Fully responsive: mobile, tablet, and desktop

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your OpenWeatherMap API key

Get a free key at https://home.openweathermap.org/api_keys, then create a
`.env` file in the project root (copy `.env.example`):

```bash
cp .env.example .env
```

```
VITE_WEATHER_API_KEY=your_key_here
```

> New OpenWeatherMap keys can take up to a couple of hours to activate.

### 3. Run the dev server

```bash
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

### 4. Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/            axios instance + OpenWeatherMap endpoints
  assets/         static assets
  components/     Background, SearchBar, WeatherCard, Details,
                   Forecast, TemperatureChart, Loader
  hooks/           useWeather, useClock
  pages/           Home
  utils/           weatherTheme (gradient/scene/emoji mapping)
```

## Notes

- The app requests browser geolocation on first load; if denied, it falls
  back to a default city.
- All animations are built with Framer Motion + Tailwind keyframes — no
  external animation libraries beyond that.
