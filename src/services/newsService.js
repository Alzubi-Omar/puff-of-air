import { config } from "../config/config.js";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Unknown date";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getWeatherNews = async () => {
  const url = `${config.newsApiUrl}?q=weather+forecast+climate&language=en&sortBy=publishedAt&pageSize=10&apiKey=${config.newsApiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    if (!data || data.status !== "ok" || !Array.isArray(data.articles)) {
      throw new Error("Invalid API response");
    }

    const seenTitles = new Set();
    const results = [];

    for (const article of data.articles) {
      const title = article?.title?.trim();
      if (!title || seenTitles.has(title)) continue;
      seenTitles.add(title);
      results.push({
        title,
        description: article?.description || "No description",
        url: article?.url || "#",
        image: article?.urlToImage || null,
        source: article?.source?.name || "Unknown",
        publishedAt: formatDate(article?.publishedAt),
      });
      if (results.length === 6) break;
    }

    return results;
  } catch (error) {
    console.error("getWeatherNews error:", error.message);
    return [];
  }
};
