import axios from "axios";
// Create a new channel
export const createChannel = async (form, token) => {
  return await axios.post("http://localhost:3000/channel", form, {
    headers: {
      Authorization: `Bearer ${token}`
       // You are sending JSON, not multipart
    },
  });
};


export const getChannelByHandle = async (handle, token) => {
  return await axios.get(`http://localhost:3000/channel/${handle}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Add a video to a channel
export const addVideoToChannel = async (channelId, videoData, token) => {
  return await axios.post(`http://localhost:3000/channel/${channelId}/video`, videoData, {
    headers: { Authorization: `Bearer ${token}`},
  });
};
