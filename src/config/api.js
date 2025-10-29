// src/config/api.js
export const API_BASE_URL = 'http://localhost:8080/api/mgnrega';

export const API_ENDPOINTS = {
  DISTRICTS: `${API_BASE_URL}/districts`,
  DISTRICT_STATS: (name) => `${API_BASE_URL}/district/${name}`,
  SAVE_DATA: `${API_BASE_URL}/save`,
  API_STATUS: `${API_BASE_URL}/api-status`
};