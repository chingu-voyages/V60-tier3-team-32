import api from '@/api/axios';

export const getMe = () => api.get('/users/me');
