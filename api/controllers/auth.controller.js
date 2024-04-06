import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

import bcryptjs from 'bcryptjs';

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
    // Initialize an empty array to store error messages
    let messages = [];

    // Check if the error is a MongoServerError and the error code is 11000
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // Extract the duplicate field from the error message
      const duplicateField = error.errmsg.match(/index: (.*)_1/)[1];

      // Check if the duplicate field is the username
      if (duplicateField === 'username') {
        messages.push('Username is already taken. Please choose another.');
      }
      // If the duplicate field is not the username, it must be the email
      else {
        messages.push('The email address you entered is already in use.');
      }
    }
    // If the error is not a validation error or a MongoServerError, send a generic error message
    else {
      messages.push(
        'An error occurred while creating the user. Please try again later.',
      );
    }

    // Send the appropriate status code and error messages
    if (messages.length > 0) {
      res
        .status(messages.length === 1 ? 400 : 409)
        .json({ message: messages.join('\n') });
    }
  }
});
