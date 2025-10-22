// API Configuration Constants

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8080';

export const API_ENDPOINTS = {
  // Admin
  HEALTH: '/health',
  RESET: '/admin/reset',
  
  // Profiles
  PROFILES: '/profiles',
  PROFILE_BY_ID: (id: string) => `/profiles/${id}`,
  
  // History
  HISTORY: '/history',
  HISTORY_BY_EMPLOYEE: (id: string) => `/history/${id}`,
  HISTORY_BY_ID: (id: number) => `/history/${id}`,
  
  // Events
  EVENTS: '/events',
  DLQ: '/dlq',
  
  // Producer
  PRODUCER_PERSONAL: '/producer/personal',
  PRODUCER_POSITION: '/producer/position',
  PRODUCER_HISTORY: '/producer/history',
} as const;
