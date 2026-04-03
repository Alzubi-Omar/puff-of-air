import express from "express";
import { getWeatherNews } from "../services/newsService.js";

const router = express.Router();

const renderPage = (page, title) => (req, res) => {
  res.render(page, {
    title: `Puff of Air - ${title}`,
    currentPage: page,
    pageCss: page,
  });
};

router.get("/about", renderPage("about", "About"));
router.get("/faqs", renderPage("faqs", "FAQs"));

router.get("/news", async (req, res, next) => {
  try {
    const articles = await getWeatherNews();
    res.render("news", {
      title: "Puff of Air - Weather News",
      currentPage: "news",
      pageCss: "news",
      articles: articles || [],
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    next(error);
  }
});

export { router as pageRoutes };
