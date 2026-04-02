import express from "express";
import { getWeatherData } from "../services/weatherService.js";
import { formatDate } from "../utils/dateFormatter.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Puff of Air - Home",
    currentPage: "home",
    pageCss: "home",
  });
});

router.post("/", async (req, res, next) => {
  try {
    const city = req.body.searchTemp;

    if (!city || city.trim() === "") {
      return res.render("error", {
        title: "Puff of Air - Error",
        statusCode: 400,
        error: "Please enter a city name.",
      });
    }

    const weatherData = await getWeatherData(city);

    res.render("current", {
      title: `Puff of Air - ${weatherData.cityName}`,
      currentPage: "current",
      pageCss: "current",
      ...weatherData,
      day: formatDate(),
    });
  } catch (error) {
    next(error);
  }
});

export { router as weatherRoutes };
