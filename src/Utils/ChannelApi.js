import axios from "axios";
// Create a new channel Api call
export const createChannel = async (form, token) => {
  return await axios.post("http://localhost:3000/channel", form, {
    headers: {
      Authorization: `Bearer ${token}`
       
    },
  });
};
//Get Channel info by its handle
export const getChannelByHandle = async (handle, token) => {
  return await axios.get(`http://localhost:3000/channel/${handle}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};