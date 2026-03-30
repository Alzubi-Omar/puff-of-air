import { config } from "../config/config.js";

const getCoordinates = async (city) => {
  const url = `${config.geoUrl}?q=${city}&limit=1&appid=${config.apiKey}`;

  const response = await fetch(url);

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

export const getWeatherData = async (city) => {
  const { lat, lon, cityName, country } = await getCoordinates(city);

  const url = `${config.apiUrl}?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${config.unit}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.cod !== 200) {
    throw new Error(data.message);
  }

  return {
    cityName: `${cityName}, ${country}`,
    cityTemp: Math.round(data.main.temp),
    description: data.weather[0].description
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
  };
};
