import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { signToken, errorHandler } from '../utils/index.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = expressAsyncHandler(async (req, res, next) => {
  // Destructure the request body to get username, email, and password
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new User instance with the email, email, and password
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    // Save the new user to the database
    await newUser.save();
    // Send a 201 status code and a success message
    res
      .status(201)
      .json({ message: 'User created successfully', success: true });
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const duplicateField = error.errmsg.match(/index: (.*)_1/)[1];
      const messages = [];
      if (duplicateField === 'username') {
        messages.push('Username is already taken. Please choose another.');
      } else {
        messages.push('The email address you entered is already in use.');
      }
      next(errorHandler(409, messages.join('\n')));
    }
    // other errors for the middleware to handle
    next(error);
  }
});

// @desc    login existing user
// @route   POST /api/auth/login
// @access  Public
export const login = expressAsyncHandler(async (req, res, next) => {
  // Destructure the request body to get email, and password
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const isValidPassword = await bcryptjs.compare(
      password,
      validUser.password,
    );

    if (!isValidPassword) {
      return next(errorHandler(401, 'Invalid credentials'));
    }

    // If everything is good send back a token
    const token = await signToken(validUser._id);
    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
      }) // Set expiry to 8 hours
      .status(200)
      .json({
        ...rest,
        message: 'Login Successful',
        success: true,
        access_toke: token,
      });
  } catch (err) {
    console.log(err);
    errorHandler(res, err.message || 'Internal server error');
  }
});
