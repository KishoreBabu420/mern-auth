const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';
  let success = false;

  if (process.env.NODE_ENV === 'production') {
    // Don't leak sensitive information in production
    errorMessage = 'Something went wrong.';
  } else {
    // Log error details to console in development
    console.error(err.stack);
  }

  if (err.status) {
    statusCode = err.status;
  }

  if (err.message) {
    errorMessage = err.message;
  }

  // Optionally capture more details for debugging (already included)
  const errorDetails = {
    url: req.originalUrl,
    method: req.method,
    error: errorMessage,
    ...(err.details ? err.details : {}),
  };

  console.error(JSON.stringify(errorDetails));

  // Check for specific errors from try-catch blocks
  if (err.messages) {
    statusCode = err.status || 500;
    errorMessage = err.messages.join('\n');
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    const duplicateField = errorDetails.error.match(/index: (.*)_1/)[1];
    const messages = [];
    if (duplicateField === 'username') {
      messages.push('Username is already taken. Please choose another.');
    } else {
      messages.push('The email address you entered is already in use.');
    }
    statusCode = 409;
    errorMessage = messages.join('\n');
  } else {
    // Handle other potential errors (as before)
  }

  res.status(statusCode).json({
    message: errorMessage,
    success,
    statusCode,
  });
};

export default errorHandler;
