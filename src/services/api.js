import axios from 'axios';

const API_URL = 'https://backend.ops.infotitans.ca/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = {
  // Auth endpoints
  login(credentials) {
    return axiosInstance.post('/', credentials);
  },
  logout() {
    return axiosInstance.delete('/');
  },
  register(userData) {
    return axiosInstance.post('/user', userData);
  },

  // Research endpoints
  getResearch(username) {
    return axiosInstance.get(`/researches/?username=${username}`);
  },
  createResearch(question) {
    return axiosInstance.post('/researches/', { question });
  },

  // User endpoints
  getUsers() {
    return axiosInstance.get('/user/');
  },

  // Pusher authentication
  authenticatePusher(channelName, socketId) {
    const formData = new FormData();
    formData.append('channel_name', channelName);
    formData.append('socket_id', socketId);
    return axiosInstance.post('/pusher', formData);
  }
};

export default api;
