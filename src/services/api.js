import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api';

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  },
  
  getAllUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/users`);
    return response.data;
  }
};

// Medicine API
export const medicineAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/medicines`);
    return response.data;
  },
  
  create: async (medicine) => {
    const response = await axios.post(`${API_BASE_URL}/medicines`, medicine);
    return response.data;
  },
  
  update: async (id, medicine) => {
    const response = await axios.put(`${API_BASE_URL}/medicines/${id}`, medicine);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/medicines/${id}`);
    return response.data;
  },
  
  rate: async (id, userId, rating) => {
    const response = await axios.post(`${API_BASE_URL}/medicines/${id}/rate`, { userId, rating });
    return response.data;
  }
};

// Order API
export const orderAPI = {
  create: async (order) => {
    const response = await axios.post(`${API_BASE_URL}/orders`, order);
    return response.data;
  },
  
  getUserOrders: async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
    return response.data;
  },
  
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  }
};