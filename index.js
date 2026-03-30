import "dotenv/config";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./src/config/config.js";
import { weatherRoutes } from "./src/routes/weatherRoutes.js";

const app = express();

// Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "https://openweathermap.org"],
        fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
        scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrcElem: ["'self'", "https://cdn.jsdelivr.net"],
      },
    },
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Request logger
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
app.use(requestLogger);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

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
