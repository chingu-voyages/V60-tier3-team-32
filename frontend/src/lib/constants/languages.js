export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'zh', label: 'Mandarin Chinese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ar', label: 'Arabic' },
  { code: 'bn', label: 'Bengali' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ru', label: 'Russian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'de', label: 'German' },
  { code: 'fr', label: 'French' },
  { code: 'ko', label: 'Korean' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'tr', label: 'Turkish' },
  { code: 'it', label: 'Italian' },
  { code: 'th', label: 'Thai' },
  { code: 'nl', label: 'Dutch' },
  { code: 'el', label: 'Greek' },
  { code: 'pl', label: 'Polish' },
  { code: 'sv', label: 'Swedish' },
  { code: 'id', label: 'Indonesian' },
  { code: 'tl', label: 'Filipino (Tagalog)' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'cs', label: 'Czech' },
  { code: 'ro', label: 'Romanian' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'da', label: 'Danish' },
  { code: 'fi', label: 'Finnish' },
];

export const FLUENCY_LEVELS = [
  { value: 'beginner', label: 'Beginner: I can understand simple phrase' },
  { value: 'intermediate', label: 'Intermediate: I can understand sentences.' },
  { value: 'advanced', label: 'Advanced: I can understand paragraphs' },
];

export const LANGUAGE_OPTIONS = LANGUAGES.map((language) => ({
  value: language.code,
  label: language.label,
}));

export const FLUENCY_LEVEL_OPTIONS = FLUENCY_LEVELS.map((level) => ({
  value: level.value,
  label: level.label,
}));

export const getLanguageLabel = (code) => {
  return LANGUAGES.find((language) => language.code === code)?.label || '';
};
