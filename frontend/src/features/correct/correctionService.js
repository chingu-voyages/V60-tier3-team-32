import api from '@/api/axios';

export const submitCorrection = async (id, correctionData) => {
  const res = await api.post(`/posts/${id}/corrections`, correctionData);
  return res.data;
};

export const getCorrectionQueue = async (page, limit, filters = {}) => {
  const params = new URLSearchParams({ page, limit, correctable: true });

  if (filters.level && filters.level !== 'All') {
    params.append('level', filters.level);
  }

  const res = await api.get(`/posts?${params}`);
  return res.data;
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
