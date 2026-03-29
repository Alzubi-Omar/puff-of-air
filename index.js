import dotenv from "dotenv/config";
import express from "express";
import expressLayouts from "express-ejs-layouts";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

// Routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "Puff of Air - Home",
  });
});

app.post("/", async (req, res) => {
  const city = req.body.searchTemp;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=imperial`;

  const response = await fetch(url);

  const data = await response.json();

  res.render("current", {
    title: `Puff of Air - ${data.name}`,
    cityName: data.name,
    cityTemp: Math.round(data.main.temp),
    description: data.weather[0].description
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
  });
});

// Server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
