// Import the mongoose module
import mongoose from 'mongoose';

// Define the user schema with required fields and unique constraints
const userSchema = new mongoose.Schema(
  {
    // The username field is a string, required, and unique
    username: {
      type: String,
      required: true,
      unique: true,
    },

    // The email field is a string, required, and unique
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // The password field is a string and required
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Create a User model using the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
