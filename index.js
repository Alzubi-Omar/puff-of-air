import "dotenv/config";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./src/config/config.js";
import { weatherRoutes } from "./src/routes/weatherRoutes.js";
import { requestLogger } from "./src/middleware/requestLogger.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { pageRoutes } from "./src/routes/pageRoutes.js";

const app = express();

// Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://openweathermap.org"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
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

// Request logging
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
app.use("/", pageRoutes);
// Error handling
app.use(errorHandler);

// Server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
