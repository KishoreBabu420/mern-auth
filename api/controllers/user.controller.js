import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({
    message: 'API is working',
  });
};

// @desc    Update existing user
// @route   POST /api/user/update:id
// @access  Private
export const updateUser = expressAsyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

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
        runValidators: true,
      },
    );

    const { password: hashedPassword, ...rest } = updatedUser._doc;
    // Send a 201 status code and a success message
    res.status(200).json({
      ...rest,
      message: 'Successfully updated',
      success: true,
    });
  } catch (error) {
    // other errors for the middleware to handle
    next(error);
  }
});
