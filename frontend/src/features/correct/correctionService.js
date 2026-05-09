import api from '@/api/axios';

export const submitCorrection = async (id, correctionData) => {
  const res = await api.post(`/posts/${id}/corrections`, correctionData);
  return res.data;
};

export const getCorrectionQueue = async () => {
  // Direct hit to the resource root
  const res = await api.get('posts'); 
  console.log('single post response:', res.data);
  return res.data.data;
};