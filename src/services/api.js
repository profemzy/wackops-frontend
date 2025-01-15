import axios from 'axios';

const API_URL = 'https://backend.ops.infotitans.ca/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Auth endpoints
  login(credentials) {
    return api.post('/', credentials);
  },
  logout() {
    return api.delete('/');
  },
  register(userData) {
    return api.post('/user', userData);
  },

  // Research endpoints
  getResearch(username) {
    return api.get(`/researches/?username=${username}`);
  },
  createResearch(question) {
    return api.post('/researches/', { question });
  },

  // User endpoints
  getUsers() {
    return api.get('/user/');
  },

  // Pusher authentication
  authenticatePusher(channelName, socketId) {
    const formData = new FormData();
    formData.append('channel_name', channelName);
    formData.append('socket_id', socketId);
    return api.post('/pusher', formData);
  }
};
