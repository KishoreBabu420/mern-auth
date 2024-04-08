// Import necessary libraries
import express from 'express'; // Import the Express library
import dotenv from 'dotenv'; // Import the Dotenv library
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'; // Import the database connection function
import path from 'path';

// Import routes
import userRoutes from './routes/user.route.js'; // Import user routes
import authRoutes from './routes/auth.route.js'; // Import authentication routes
import errorMiddleWare from './middleware/error.middleware.js';

const __dirname = path.resolve();

// Configure environment variables
dotenv.config(); // Load environment variables from.env file

// Connect to the database
connectDB(); // Connect to the database using the imported function

// Set the port number
const port = process.env.PORT || 8000; // Set the port number to either the value of the PORT environment variable or 8000

// Initialize the Express app
const app = express(); // Create an Express application

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '/client/dist')));

// Serve the 'index.html' file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Use the JSON middleware for parsing JSON-encoded request bodies
app.use(express.json());

// Use the cookie-parser middleware for parsing cookies
app.use(cookieParser());

// Use the URL-encoded middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`); // Log a message to the console when the server starts
});

// Use the user routes for requests to the '/api/user' path
app.use('/api/user', userRoutes);

// Use the authentication routes for requests to the '/api/auth' path
app.use('/api/auth', authRoutes);

// Use the error middleware for handling errors
app.use(errorMiddleWare);

// Use the cors middleware for enabling CORS
app.use(cors());
