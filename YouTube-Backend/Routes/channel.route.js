import express from 'express';
import { createChannel,getVideosByChannel,addVideoToChannel} from '../Controller/channel.controller.js';
import { verifyJWT } from '../Middleware/verifyJwt.js';

export function channelRoute(app){

// Protected routes with verifyToken middleware
app.post('/api/channel', verifyJWT, createChannel); // Create a channel
app.get('/api/channel/:id', verifyJWT, addVideoToChannel) //add video to channel
app.get('/api/channel/:id', verifyJWT, getVideosByChannel); //get channel video
}

