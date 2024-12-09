import { weather_codes } from "../consts/weather";

/**
 * give description based on weather code
 */
export const getWeather = (code) => {
  return weather_codes[code]?.split(":")[0] || "Unknown";
};
