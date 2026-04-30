import api from '@/api/axios';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (credentials) =>
  api.post('/auth/register', credentials);
export const logout = () => api.post('/auth/logout');
