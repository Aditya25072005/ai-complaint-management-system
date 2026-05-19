/**
 * Error Handling Middleware
 * --------------------------
 * Catches all errors passed via next(error) and sends a standardized JSON response.
 * In development mode, includes the error stack trace for debugging.
 */

const errorHandler = (err, req, res, next) => {
  // Default to 500 if status code is 200 (i.e., not explicitly set)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

/**
 * 404 Not Found Middleware
 * Handles requests to undefined routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
