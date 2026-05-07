import { LANGUAGES } from '@/lib/constants/languages';

export const formatSubmission = (post) => {
  const langMatch = LANGUAGES.find((lang) => lang.code === post.language);

  return {
    id: post._id || post.id,
    status: post.status,
    language: langMatch?.label || post.language,
    languageCode: post.language,
    title: post.prompt?.title || 'Untitled',
    preview: post.preview || post.content || 'No content preview',
    comments: post.corrections_count || post.corrections?.length || 0,
    createdAt: post.created_at,
    wordCount: post.word_count || 0,
    readingTime: post.reading_time || 1,
  };
};

export const formatSubmissions = (posts = []) => {
  return posts.map(formatSubmission);
};
