import { config } from "../config/config.js";

export const getWeatherNews = async () => {
  const url = `${config.newsApiUrl}?q=weather+forecast+climate&language=en&sortBy=publishedAt&pageSize=6&apiKey=${config.newsApiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch news");
  }

  const weatherKeywords = [
    "weather",
    "storm",
    "flood",
    "snow",
    "rain",
    "climate",
    "tornado",
    "drought",
    "temperature",
    "forecast",
  ];

  return data.articles
    .filter(
      (article) =>
        article.title &&
        article.description &&
        article.urlToImage &&
        weatherKeywords.some((keyword) =>
          article.title.toLowerCase().includes(keyword),
        ),
    )
    .map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    }));
};
