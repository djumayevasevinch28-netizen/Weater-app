import { useEffect, useState } from "react";

/**
 * useClock — provides a live, ticking digital clock, the current
 * formatted date, and a time-of-day greeting. Optionally offsets
 * the clock by a UTC timezone offset (in seconds), used to show the
 * *local* time of a searched city rather than the visitor's device time.
 *
 * @param {number|null} utcOffsetSeconds
 */
export default function useClock(utcOffsetSeconds = null) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getEffectiveDate = () => {
    if (utcOffsetSeconds === null || utcOffsetSeconds === undefined) {
      return now;
    }
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + utcOffsetSeconds * 1000);
  };

  const effectiveDate = getEffectiveDate();

  const time = effectiveDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = effectiveDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hour = effectiveDate.getHours();
  let greeting = "Good Evening";
  let icon = "moon";
  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    icon = "sunrise";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
    icon = "sun";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
    icon = "sunset";
  } else {
    greeting = "Good Night";
    icon = "moon";
  }

  const isNight = hour >= 20 || hour < 6;

  return { time, date, greeting, greetingIcon: icon, isNight, effectiveDate };
}
