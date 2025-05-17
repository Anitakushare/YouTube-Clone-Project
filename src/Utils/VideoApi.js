import axios from "axios";
// Add a new video
export const addVideo = async (channelId, formDataWithUploader, token) => {
  const response = await axios.post(
    "http://localhost:3000/api/video",{
      ...formDataWithUploader,
      channelId, 
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
// Update a video (can update likes, dislikes, title, etc.)
export const updateVideo = async (videoId,payload, token) => {
  const response = await axios.put(`http://localhost:3000/api/video/${videoId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const updateViewCount = async (videoId, userId, token) => {
    const response = await axios.put(
      `http://localhost:3000/api/video/${videoId}/view`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   return response.data;
};

// Delete a video
export const deleteVideo = async (videoId, token) => {
 
  const response = await axios.delete(`http://localhost:3000/api/video/${videoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
