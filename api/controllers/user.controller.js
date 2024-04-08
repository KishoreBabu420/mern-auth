// Import necessary modules
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/index.js';

// Test route to check if API is working
// @route   GET /api/test
// @access  Public
export const test = (req, res) => {
  res.json({
    message: 'API is working',
  });
};

// Update existing user
// @desc    Update user details for the currently authenticated user
// @route   POST /api/user/update/:id
// @access  Private
export const updateUser = expressAsyncHandler(async (req, res, next) => {
  // Check if the user is trying to update someone else's account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  try {
    // Hash the new password if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user document in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      {
        new: true,
      },
    );

    // Remove the hashed password from the response
    const { password: hashedPassword, ...rest } = updatedUser._doc;

    // Send a 200 status code and a success message
    res.status(200).json({
      ...rest,
      message: 'Successfully updated',
      success: true,
    });
  } catch (error) {
    // Forward other errors to the error handling middleware
    next(error);
  }
});

// Delete existing user
// @desc    Delete user details for the currently authenticated user
// @route   POST /api/user/delete/:id
// @access  Private

export const deleteUser = expressAsyncHandler(async (req, res, next) => {
  // Check if the user is trying to update someone else's account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can Delete only your account!'));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    // Send a 200 status code and a success message
    res.status(200).json({
      message: 'User Deleted',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});
