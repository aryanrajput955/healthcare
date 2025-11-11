// stores/useJourneyStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Ensure client-side execution for fetch operations
const isClient = typeof window !== 'undefined';

const useJourneyStore = create(
  persist(
    (set, get) => ({
      userJourneys: [],
      loading: false,
      error: null,

      fetchUserJourneys: async (token) => {
        if (!isClient) {
          set({ loading: false, error: 'Cannot fetch journeys on the server.' });
          return;
        }

        const { userJourneys } = get();
        if (userJourneys.length > 0) {
          return; // Prevent redundant fetches
        }

        set({ loading: true, error: null });

        try {
          if (!token) {
            throw new Error('No authentication token available.');
          }

          const targetUserId = 1; // Hardcoded for testing; replace with user.id
          const response = await fetch(`https://api.indiem.tech/user-journey/user/1`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMsg = errorData.message || `Failed to fetch user journeys: ${response.statusText}`;
            if (response.status === 404) {
              errorMsg = 'No journeys found for the specified user. Verify backend data availability.';
            }
            throw new Error(errorMsg);
          }

          const data = await response.json();
          set({
            userJourneys: data || [],
            loading: false,
          });

          return data;
        } catch (error) {
          set({ loading: false, error: error.message });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'journey-storage',
      storage: {
        getItem: (key) => {
          if (typeof window !== 'undefined') {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          }
          return null;
        },
        setItem: (key, value) => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(value));
          }
        },
        removeItem: (key) => {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
          }
        },
      },
    }
  )
);

export default useJourneyStore;