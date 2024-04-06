// Import necessary libraries
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

// Set the port number
const port = process.env.PORT || 8000;

// Initialize the Express app
const app = express();

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
