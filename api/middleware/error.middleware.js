const errorMiddleWare = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let success = false;

  if (process.env.NODE_ENV === 'production') {
    // Don't leak sensitive information in production
    message = 'Something went wrong.';
  } else {
    // Log error details to console in development
    console.error(err.stack);
  }

  // Optionally capture more details for debugging (already included)
  const errorDetails = {
    url: req.originalUrl,
    method: req.method,
    error: message,
    ...(err.details ? err.details : {}),
  };

  console.error(JSON.stringify(errorDetails));
  return res.status(statusCode).json({
    success,
    message,
    statusCode,
  });
};

export default errorMiddleWare;
