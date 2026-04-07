/**
 * Global error handling middleware.
 * Catches all errors passed via next(err) and renders the error page.
 * @param {Error} err - The error object
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.statusCode || 500} - ${err.message}`);

  res.status(err.statusCode || 500).render("error", {
    title: "Puff of Air - Error",
    statusCode: err.statusCode || 500,
    error:
      err.message || "An unexpected error occurred. Please try again later.",
    currentPage: "error",
  });
};
