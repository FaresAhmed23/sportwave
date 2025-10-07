import axios from 'axios';
import { Product, Order, Customer } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://store-back-gold.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Product API
export const productAPI = {
  getAll: async (params?: Record<string, any>): Promise<{ products: Product[]; pagination: any }> => {
    const { data } = await api.get('/products', { params });
    return data;
  },
  
  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  
  getFeatured: async (): Promise<{ products: Product[] }> => {
    const { data } = await api.get('/products', { params: { featured: true, limit: 8 } });
    return data;
  },
};

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },
  
  register: async (userData: any) => {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Order API
export const orderAPI = {
  create: async (orderData: any): Promise<Order> => {
    const { data } = await api.post('/orders', orderData);
    return data;
  },
  
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await api.get('/orders/my-orders');
    return data;
  },
  
  getById: async (id: string): Promise<Order> => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },
};

// Customer API
export const customerAPI = {
  getProfile: async (): Promise<Customer> => {
    const { data } = await api.get('/customers/profile');
    return data;
  },
  
  updateProfile: async (updates: Partial<Customer>): Promise<Customer> => {
    const { data } = await api.patch('/customers/profile', updates);
    return data;
  },
  
  addToWishlist: async (productId: string) => {
    const { data } = await api.post(`/customers/wishlist/${productId}`);
    return data;
  },
  
  removeFromWishlist: async (productId: string) => {
    const { data } = await api.delete(`/customers/wishlist/${productId}`);
    return data;
  },
  
  addAddress: async (address: any) => {
    const { data } = await api.post('/customers/addresses', address);
    return data;
  },
  
  updateAddress: async (addressId: string, address: any) => {
    const { data } = await api.patch(`/customers/addresses/${addressId}`, address);
    return data;
  },
  
  deleteAddress: async (addressId: string) => {
    const { data } = await api.delete(`/customers/addresses/${addressId}`);
    return data;
  },
};

// Stats API (Admin only)
export const statsAPI = {
  getDashboard: async () => {
    const { data } = await api.get('/stats/dashboard');
    return data;
  },
  
  getAnalytics: async (period: string = '30d') => {
    const { data } = await api.get('/stats/analytics', { params: { period } });
    return data;
  },
};

// Admin Product API
export const adminProductAPI = {
  create: async (formData: FormData) => {
    const { data } = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
  
  update: async (id: string, formData: FormData) => {
    const { data } = await api.patch(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
  
  delete: async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
  
  bulkDelete: async (ids: string[]) => {
    const { data } = await api.post('/products/bulk', {
      operation: 'delete',
      ids,
    });
    return data;
  },
};

export default api;