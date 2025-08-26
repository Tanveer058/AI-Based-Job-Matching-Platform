import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ai-job-matching.vercel.app/api',
  withCredentials: true,
});

// Attach token to every request if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Handle token expiration or invalid token globally
API.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      (error.response.data?.error === 'TokenExpired' || error.response.data?.error === 'Token is not valid.')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;