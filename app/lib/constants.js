// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.indiem.tech';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  CREATE_PAYMENT_ORDER: '/auth/create-payment-order',

  // Forms
  FORMS: '/forms',
  FORM_BY_ID: (id) => `/forms/${id}`,
  FORM_RESPONSE: '/form-response',
  ACTION_RESPONSE: '/action-response',

  // User Journey
  USER_JOURNEY: '/user-journey',
  USER_JOURNEY_BY_USER_ID: (userId) => `/user-journey/user/${userId}`,
  USER_JOURNEY_COMPLETE_ACTION: (journeyId, actionId) => `/user-journey/${journeyId}/complete-action/${actionId}`,

  // Referee
  REFEREE: '/referee',
  REFEREE_BY_ID: (id) => `/referee/${id}`,
  REFEREE_MY: '/referee/my',
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};