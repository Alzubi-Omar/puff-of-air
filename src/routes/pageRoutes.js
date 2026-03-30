import express from "express";

const router = express.Router();

const renderPage = (page, title) => (req, res) => {
  res.render(page, {
    title: `Puff of Air - ${title}`,
    currentPage: page,
    pageCss: page,
  });
};

router.get("/about", renderPage("about", "About"));
router.get("/news", renderPage("news", "News"));
router.get("/faqs", renderPage("faqs", "FAQs"));

export { router as pageRoutes };
