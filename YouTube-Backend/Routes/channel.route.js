import express from 'express';
import { createChannel,getChannelByHandle,getVideosByChannel,addVideoToChannel} from '../Controller/channel.controller.js';
import { verifyJWT } from '../Middleware/verifyJwt.js';

export function channelRoute(app){

// Protected routes with verifyToken middleware
app.post('/channel', verifyJWT, createChannel); // Create a channel
//app.get('/channel/:id', verifyJWT, addVideoToChannel) //add video to channel
//app.get('/channel/:id', verifyJWT, getVideosByChannel);
app.get('/channel/:handle', verifyJWT, getChannelByHandle)
}

