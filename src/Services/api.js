import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000', // ✅ No extra /user here unless you want it
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;