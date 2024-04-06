import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

import bcryptjs from 'bcryptjs';
import errorHandler from '../middleware/error.middleware.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = expressAsyncHandler(async (req, res) => {
  // Destructure the request body to get username, email, and password
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new User instance with the email, email, and password
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    // Save the new user to the database
    await newUser.save();

    // Send a 201 status code and a success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Rethrow the error for the middleware to handle
    throw error;
    dd;
  }
});
