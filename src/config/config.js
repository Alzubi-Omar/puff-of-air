export const config = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  apiUrl: "https://api.openweathermap.org/data/2.5/weather",
  geoUrl: "https://api.openweathermap.org/geo/1.0/direct",
  unit: "imperial",
};
