// lib/authstore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Store from '../stores/store'; // Adjust path as needed

// Helper function to decode JWT payload (client-side extraction only; no signature verification)
const decodeJWT = (token) => {
  try {
    if (!token) return null;
    const payload = token.split('.')[1];
    if (!payload) return null;
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    return JSON.parse(atob(paddedPayload));
  } catch (error) {
    return null;
  }
};

// Helper function to set auth cookie
const setAuthCookie = (token) => {
  if (typeof document !== 'undefined') {
    document.cookie = `auth=${token}; path=/; max-age=86400; SameSite=Strict`;
  }
};

// Helper function to clear auth cookie
const clearAuthCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth=; path=/; max-age=0; SameSite=Strict';
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      initializeAuth: () => {
        const { user, token } = get();
        if (user && token) return; // Skip if already initialized
        const storedUser = Store.getItem('user');
        const storedToken = Store.getItem('token');
        if (storedToken && storedUser && typeof storedUser === 'object' && storedUser.name) {
          const decodedToken = decodeJWT(storedToken);
          const userWithId = decodedToken && decodedToken.sub
            ? { ...storedUser, id: decodedToken.sub }
            : storedUser;
          set({ user: userWithId, token: storedToken });
          setAuthCookie(storedToken);
        } else {
          if (storedUser === 'undefined' || storedToken === 'undefined') {
            Store.removeItem('user');
            Store.removeItem('token');
          }
          set({ user: null, token: null });
          clearAuthCookie();
        }
      },
      setAuth: (user, token) => {
        const decodedToken = decodeJWT(token);
        const userWithId = decodedToken && decodedToken.sub
          ? { ...user, id: decodedToken.sub }
          : user;
        Store.setItem('user', userWithId);
        Store.setItem('token', token);
        setAuthCookie(token); // Store token in cookie for middleware
        set({ user: userWithId, token });
      },
      clearAuth: () => {
        Store.removeItem('user');
        Store.removeItem('token');
        clearAuthCookie(); // Clear cookie on logout
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (key) => Store.getItem(key),
        setItem: (key, value) => Store.setItem(key, value),
        removeItem: (key) => Store.removeItem(key),
      },
    }
  )
);

export default useAuthStore;