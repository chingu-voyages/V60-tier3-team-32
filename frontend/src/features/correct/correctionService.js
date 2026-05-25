import api from '@/api/axios';

export const submitCorrection = async (id, correctionData) => {
  const res = await api.post(`/posts/${id}/corrections`, correctionData);
  return res.data;
};

export const getCorrectionQueue = async () => {
  // Direct hit to the resource root
  const res = await api.get('/posts?correctable=true');
  // console.log('queue res:', res.data);
  return res.data.data;
};

// export const getMyCorrections = async () => {
//   const res = await api.get('/corrections/me');
//   return res.data.data;
// };

/**
 * Fetches user activity history.
 * @param {string} type - 'made', 'received', or 'all'
 */
export const getMyCorrections = async (type = 'made') => {
  // The URL stays /me, we just append the query param
  const res = await api.get(`/corrections/me?type=${type}`);
  return res.data.data;
};
