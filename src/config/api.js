export const API_BASE_URL = 'https://mgnrega-back.onrender.com/api/mgnrega';

export const API_ENDPOINTS = {
  DISTRICTS: `${API_BASE_URL}/districts`,
  DISTRICT_STATS: (name) => `${API_BASE_URL}/district/${name}`,
  SAVE_DATA: `${API_BASE_URL}/save`,
  API_STATUS: `${API_BASE_URL}/api-status`
};
