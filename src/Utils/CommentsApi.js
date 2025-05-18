import axios from "axios";
//ftech all comments from db
export const fetchComments = (videoId) =>
  axios.get(`http://localhost:3000/video/${videoId}`);
//add comment to db
export const addComment = async (videoId, content, token) =>
  await axios.post(
    `http://localhost:3000/comment/add`,
    { content, video: videoId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
//update comment Api call
export const updateComment = (commentId, content, token) =>
  axios.put(
    `http://localhost:3000/update/${commentId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
//Delete comment 
export const deleteComment = (commentId, token) =>
  axios.delete(`http://localhost:3000/delete/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
