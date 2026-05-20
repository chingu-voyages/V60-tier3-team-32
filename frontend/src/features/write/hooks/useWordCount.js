export const useWordCount = (content = '', MAX_WORDS = 300) => {
  const words = content.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const wordsRemaining = MAX_WORDS - wordCount;
  const isOverLimit = wordCount > MAX_WORDS;

  return { wordCount, wordsRemaining, isOverLimit };
};
