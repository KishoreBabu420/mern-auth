// Import necessary libraries
import express from 'express'; // Import the Express library
import dotenv from 'dotenv'; // Import the Dotenv library
import cors from 'cors';
import connectDB from './config/db.js'; // Import the database connection function

// Import routes
import userRoutes from './routes/user.route.js'; // Import user routes
import authRoutes from './routes/auth.route.js'; // Import authentication routes
import errorMiddleWare from './middleware/error.middleware.js';

// Configure environment variables
dotenv.config(); // Load environment variables from.env file

// Connect to the database
connectDB(); // Connect to the database using the imported function

// Set the port number
const port = process.env.PORT || 8000; // Set the port number to either the value of the PORT environment variable or 8000

// Initialize the Express app
const app = express(); // Create an Express application
app.use(express.json()); // Use the JSON middleware for parsing JSON-encoded request bodies
app.use(express.urlencoded({ extended: false })); // Use the URL-encoded middleware for parsing URL-encoded request bodies

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`); // Log a message to the console when the server starts
});

// API paths
app.use('/api/user', userRoutes); // Use the user routes for requests to the /api/user path
app.use('/api/auth', authRoutes); // Use the authentication routes for requests to the /api/auth path

//Error Middleware
app.use(errorMiddleWare);

//cors
app.use(cors());
