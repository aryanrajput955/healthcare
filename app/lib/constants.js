// API Configuration
export const API_BASE_URL = 'https://api.indiem.tech';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  
  // Forms
  FORMS: '/forms',
  FORM_BY_ID: (id) => `/forms/${id}`,
  FORM_RESPONSE: '/form-response',
  
  // User Journey
  USER_JOURNEY: '/user-journey',
  USER_JOURNEY_BY_USER_ID: (userId) => `/user-journey/user/${userId}`,
  USER_JOURNEY_COMPLETE_ACTION: (journeyId, actionId) => `/user-journey/${journeyId}/complete-action/${actionId}`,
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};