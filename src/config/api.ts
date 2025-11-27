// 🔧 API Configuration
// Đọc từ .env.local để lấy backend URL

export const API_CONFIG = {
  // Backend API URL - Đọc từ .env.local
  // Development: http://localhost:3781
  // Production: https://yourdomain.com
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
};

// Helper function để build API URL
export const getApiUrl = (endpoint: string): string => {
  // Nếu có BASE_URL trong env, dùng absolute URL
  if (API_CONFIG.BASE_URL) {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  }
  
  // Fallback: dùng relative path (same origin)
  return endpoint;
};

// Example usage:
// const url = getApiUrl('/api/display-promotions');
// → http://localhost:3781/api/display-promotions

