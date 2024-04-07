import jwt from 'jsonwebtoken';

export const signToken = async (id) => {
  const expiresIn = 8 * 60 * 60; // 8 hours in seconds

  const options = {
    expiresIn,
  };

  return await jwt.sign({ id }, process.env.SECRET, options);
};
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
