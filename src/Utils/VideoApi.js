import axios from "axios";


// Add a new video
export const addVideo = async (videoData, token) => {
  const response = await axios.post("http://localhost:3000/api/video", videoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch all videos
export const fetchAllVideos = async () => {
  const response = await axios.get("http://localhost:3000/api/video");
  return response.data;
};

// Fetch a single video by ID
export const fetchVideoById = async (id, token) => {
  const response = await axios.get(`http://localhost:3000/api/video/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update a video (can update likes, dislikes, title, etc.)
export const updateVideo = async (id, updateFields, token) => {
  const response = await axios.put(`http://localhost:3000/api/video/${id}`, updateFields, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a video
export const deleteVideo = async (id, token) => {
  const response = await axios.delete(`http://localhost:3000/api/video/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
