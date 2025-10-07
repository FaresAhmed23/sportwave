import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../api';
import { Customer } from '../types';
import toast from 'react-hot-toast';

interface AuthStore {
  user: (Customer & { isAdmin?: boolean }) | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: Customer & { isAdmin?: boolean }) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      isAdmin: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.login({ email, password });
          set({
            user: response.customer,
            token: response.token,
            isAuthenticated: true,
            isAdmin: response.customer.isAdmin || false,
            isLoading: false,
          });
          toast.success('Welcome back!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || 'Login failed');
          throw error;
        }
      },

      register: async (data: any) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.register(data);
          set({
            user: response.customer,
            token: response.token,
            isAuthenticated: true,
            isAdmin: response.customer.isAdmin || false,
            isLoading: false,
          });
          toast.success('Account created successfully!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || 'Registration failed');
          throw error;
        }
      },

      logout: () => {
        authAPI.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
        toast.success('Logged out successfully');
      },

      updateUser: (user: Customer & { isAdmin?: boolean }) => {
        set({ user, isAdmin: user.isAdmin || false });
      },

      checkAuth: () => {
        const token = get().token;
        const user = get().user;
        if (token && user) {
          set({ 
            isAuthenticated: true,
            isAdmin: user.isAdmin || false 
          });
        } else {
          set({ 
            isAuthenticated: false,
            isAdmin: false 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);