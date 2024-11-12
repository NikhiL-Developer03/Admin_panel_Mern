// src/utils/axiosInstance.js
import axios from 'axios';

// Create an Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add any common headers or handle token refresh if required
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token if available (example)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (for example, log out on 401)
    if (error.response && error.response.status === 401) {
      // Logic for handling unauthorized access, like redirecting to login
    }
    return Promise.reject(error);
  }
);



// Common API request function
const apiRequest = async (method, url, data = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export default apiRequest;


