import express from 'express';
import { createChannel, getChannelByUser, updateChannel, deleteChannel } from '../Controller/channel.controller.js';
import { jwtAuth } from '../Jwt/jwtGenerator.js';

export function videoRoute(app){

// Protected routes with verifyToken middleware
app.post('/api/channel', jwtAuth, createChannel);  // Create a channel
app.get('/api/channel/:id', jwtAuth, getChannelByUser);  // Get channel by user
app.put('/api/channel/:id', jwtAuth, updateChannel);  // Update channel
app.delete('/api/channel/:id', jwtAuth, deleteChannel);  // Delete channel
}

