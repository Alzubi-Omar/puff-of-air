import { config } from "../config/config.js";

/**
 * Fetches coordinates for a given city using the OpenWeatherMap Geocoding API.
 * @param {string} city - The city name to geocode
 * @returns {Promise<{lat: number, lon: number, cityName: string, country: string}>}
 */

const getCoordinates = async (city) => {
  const cityEncoded = encodeURIComponent(city.trim());
  const url = `${config.geoUrl}?q=${cityEncoded}&limit=1&appid=${config.apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    cityName: data[0].name,
    country: data[0].country,
  };
};

/**
 * Fetches current weather data for a given city.
 * @param {string} city - The city name to fetch weather for
 * @returns {Promise<Object>} Transformed weather data object
 */
export const getWeatherData = async (city) => {
  const { lat, lon, cityName, country } = await getCoordinates(city);

  const url = `${config.apiUrl}?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${config.unit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.cod !== 200) {
    throw new Error(data.message);
  }

  return {
    cityName: `${cityName}, ${country}`,
    cityTemp: Math.round(data.main.temp),
    description: data.weather?.[0]?.description
      ? data.weather[0].description
          .split(" ")
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(" ")
      : "No description",
    weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    minTemp: Math.round(data.main.temp_min),
    maxTemp: Math.round(data.main.temp_max),
    tempFeels: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    sunrise: new Date(
      (data.sys.sunrise + data.timezone) * 1000,
    ).toLocaleTimeString("en-US", { timeZone: "UTC" }),
    sunset: new Date(
      (data.sys.sunset + data.timezone) * 1000,
    ).toLocaleTimeString("en-US", { timeZone: "UTC" }),
    lat: data.coord?.lat?.toFixed(2) || "N/A",
    lon: data.coord?.lon?.toFixed(2) || "N/A",
    imagePath:
      config.weatherImages[data.weather[0].main.toLowerCase()] ||
      config.weatherImages.default,
  };
};
