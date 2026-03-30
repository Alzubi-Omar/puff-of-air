import "dotenv/config";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import { config } from "./src/config/config.js";
import { weatherRoutes } from "./src/routes/weatherRoutes.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

// Routes
app.use("/", weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.render("error", {
    title: "Puff of Air - Error",
    statusCode: err.statusCode || 500,
    error:
      err.message || "An unexpected error occurred. Please try again later.",
  });
});

// Server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
