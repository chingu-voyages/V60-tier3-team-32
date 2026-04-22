import api from './axios';

export const login = (credentials) => api.post('/auth/login', credentials);

export const logout = () => api.post('/auth/logout');
