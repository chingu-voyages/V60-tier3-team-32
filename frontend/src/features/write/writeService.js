import api from '@/api/axios';

export const fetchTodayPromptsAPI = async () => {
  const res = await api.get('/prompts/today');
  return res.data;
};

export const createPostAPI = async (postData) => {
  const res = await api.post('/posts', postData);
  return res.data;
};

export const updatePostAPI = async ({ postId, postData }) => {
  const res = await api.patch(`/posts/${postId}`, postData);
  return res.data;
};
