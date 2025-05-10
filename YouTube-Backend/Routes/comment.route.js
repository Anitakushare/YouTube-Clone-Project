import express from 'express';
import { addComment, updateComment, deleteComment, getComments } from '../Controller/comment.controller.js';
import { verifyJWT } from '../Middleware/verifyJwt.js';

export function commentRoute(app){

// Protected routes with verifyToken middleware
app.post('/add',  verifyJWT, addComment);  // Add comment
app.put('/update/:commentId',  verifyJWT, updateComment);  // Update comment
app.delete('/delete/:commentId',  verifyJWT, deleteComment);  // Delete comment
app.get('/video/:videoId',getComments);  // Get all comments for a specific video
}
