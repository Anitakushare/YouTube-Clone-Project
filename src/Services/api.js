import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000', // ✅ No extra /user here unless you want it
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;