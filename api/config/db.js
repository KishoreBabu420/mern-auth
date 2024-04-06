// Import the mongoose module
import mongoose from 'mongoose';

// Define an asynchronous function called connectDB
const connectDB = async () => {
  // Use a try block to attempt to connect to the MongoDB database
  try {
    // Use the mongoose.connect() method to connect to the database
    // using the MONGO_URI environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a success message to the console, including the host name
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Use a catch block to handle any errors that occur during the connection attempt
  } catch (error) {
    // Log the error to the console
    console.log(error);

    // Exit the process with a status code of 1, indicating an error
    process.exit(1);
  }
};

// Export the connectDB function as the default export
export default connectDB;
