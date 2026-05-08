import api from '@/api/axios';

export const getDashboardData = async () => {
  const [meRes, recentPostsRes, submittedRes, correctedRes, promptRes] =
    await Promise.all([
      api.get('/users/me'),
      api.get('/users/me/posts?limit=5'),
      api.get('/users/me/posts?status=submitted&limit=5'),
      api.get('/users/me/posts?status=corrected&limit=5'),
      api.get('/prompts/today'),
    ]);

  return {
    user: meRes.data,
    recentPosts: recentPostsRes.data.data,
    submittedPosts: submittedRes.data.data,
    correctedPosts: correctedRes.data.data,
    prompts: promptRes.data.data,
  };
};
