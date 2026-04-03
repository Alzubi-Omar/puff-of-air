/**
 * Application configuration
 * Loads environment variables and defines app-wide settings.
 */

export const config = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  apiUrl: "https://api.openweathermap.org/data/2.5/weather",
  geoUrl: "https://api.openweathermap.org/geo/1.0/direct",
  unit: "imperial",
  newsApiKey: process.env.NEWS_API_KEY,
  newsApiUrl: "https://newsapi.org/v2/everything",
  weatherImages: {
    clear: "/images/sunnyWeather.jpg",
    snow: "/images/snowyWeather.jpg",
    rain: "/images/rainyWeather.jpg",
    drizzle: "/images/rainyWeather.jpg",
    clouds: "/images/cloudyWeather.jpg",
    thunderstorm: "/images/thunderstormWeather.jpg",
    default: "/images/default.jpg",
  },
};
