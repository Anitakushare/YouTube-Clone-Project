import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import { userRoute } from "./Routes/user.route.js";
import { videoRoute } from "./Routes/video.route.js";
import cors from 'cors';
import { channelRoute } from './Routes/channel.route.js';
import { commentRoute } from './Routes/comment.route.js';

const app=new express();
app.use(express.json());
app.use(cors());
connectDb();
userRoute(app);
videoRoute(app);
channelRoute(app);
commentRoute(app);


const port=3000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});