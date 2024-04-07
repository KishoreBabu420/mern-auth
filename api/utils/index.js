import jwt from 'jsonwebtoken';

export const signToken = async (id) => {
  const expiresIn = 8 * 60 * 60; // 8 hours in seconds

  const options = {
    expiresIn,
  };

  return await jwt.sign({ id }, process.env.SECRET, options);
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, 'You need to login'));

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return next(errorHandler(403, 'Token is not valid'));
    req.user = decoded;
    next();
  });
};
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
