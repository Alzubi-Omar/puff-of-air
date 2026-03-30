// Error handling middleware
app.use((err, req, res, next) => {
  res.render("error", {
    title: "Puff of Air - Error",
    statusCode: err.statusCode || 500,
    error:
      err.message || "An unexpected error occurred. Please try again later.",
  });
});
