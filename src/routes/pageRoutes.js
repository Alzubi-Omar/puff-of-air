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

router.get("/faqs", (req, res) => {
  res.render("faqs", {
    title: "Puff of Air - FAQs",
    currentPage: "faqs",
    pageCss: "faqs",
    scripts: "/js/faqs.js",
  });
});

router.get("/about", (req, res) =>
  res.render("about", {
    title: "Puff of Air - About",
    currentPage: "about",
    pageCss: "about",
  }),
);

export { router as pageRoutes };
