import express from 'express';
import { createChannel,getChannelByHandle} from '../Controller/channel.controller.js';
import { verifyJWT } from '../Middleware/verifyJwt.js';

export function channelRoute(app){

// Protected routes with verifyToken middleware
app.post('/channel', verifyJWT, createChannel); // Create a channel
app.get('/channel/:handle', verifyJWT, getChannelByHandle)//get channel by Handle

}

