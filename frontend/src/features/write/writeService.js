import api from '@/lib/api';

export const fetchTodayPromptsAPI = async () => {
  const res = await api.get('/prompts/today');
  return res.data;
};

export const createPostAPI = async (postData) => {
  const res = await api.post('/posts', postData);
  return res.data;
};
