import api from '@/api/axios';

export const getSubmissions = async () => {
  const res = await api.get('/users/me/posts?limit=20');
  return res.data.data;
};

export const getSubmissionById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};
