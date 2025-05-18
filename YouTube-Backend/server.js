// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();
// Import required modules
import express from "express";
// Import database connection function
import connectDb from "./config/db.js";
// Import route
import { userRoute } from "./Routes/user.route.js";
import { videoRoute } from "./Routes/video.route.js";
import cors from 'cors';
import { channelRoute } from './Routes/channel.route.js';
import { commentRoute } from './Routes/comment.route.js';
// Create an instance of an Express application
const app=new express();
// Middleware to parse incoming JSON requests
app.use(express.json());
// Enable CORS for handling cross-origin requests from frontend
app.use(cors());
// Connect to MongoDB database
connectDb();
// Register all route handlers 
userRoute(app);
videoRoute(app);
channelRoute(app);
commentRoute(app);

// Define the port the server will listen on
const port=3000;
// Start the Express server
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});