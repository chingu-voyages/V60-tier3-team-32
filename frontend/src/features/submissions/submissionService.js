import api from '@/api/axios';

export const getSubmissions = async () => {
  const res = await api.get('/users/me/posts?limit=20');
  return res.data.data;
};

export const getSubmissionById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  console.log('single post response:', res.data);
  return res.data;
};
