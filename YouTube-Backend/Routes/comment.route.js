import express from 'express';
import { addComment, updateComment, deleteComment, getComments } from '../Controller/comment.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

export function videoRoute(app){

// Protected routes with verifyToken middleware
router.post('/add', verifyToken, addComment);  // Add comment
router.put('/update/:commentId', verifyToken, updateComment);  // Update comment
router.delete('/delete/:commentId', verifyToken, deleteComment);  // Delete comment
router.get('/video/:videoId', getComments);  // Get all comments for a specific video

export default router;
