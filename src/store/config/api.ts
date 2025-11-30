
const API_BASE_URL = import.meta.env.API_BASE_URL  || 'http://localhost:5000/api/v1';


export const API_ENDPOINTS = {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    getProfile: `${API_BASE_URL}/auth/me`,
    updateProfile: `${API_BASE_URL}/auth/update-profile`,
    updatePassword: `${API_BASE_URL}/auth/update-password`,
    
} as const;