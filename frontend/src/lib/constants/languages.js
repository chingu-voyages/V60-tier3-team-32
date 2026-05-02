export const LANGUAGES = [
  { code: 'eng', label: 'English' },
  { code: 'spa', label: 'Spanish' },
  { code: 'zho', label: 'Mandarin Chinese' },
  { code: 'hin', label: 'Hindi' },
  { code: 'ara', label: 'Arabic' },
  { code: 'ben', label: 'Bengali' },
  { code: 'por', label: 'Portuguese' },
  { code: 'rus', label: 'Russian' },
  { code: 'jpn', label: 'Japanese' },
  { code: 'pan', label: 'Punjabi' },
  { code: 'deu', label: 'German' },
  { code: 'fra', label: 'French' },
  { code: 'kor', label: 'Korean' },
  { code: 'vie', label: 'Vietnamese' },
  { code: 'tur', label: 'Turkish' },
  { code: 'ita', label: 'Italian' },
  { code: 'tha', label: 'Thai' },
  { code: 'nld', label: 'Dutch' },
  { code: 'ell', label: 'Greek' },
  { code: 'pol', label: 'Polish' },
  { code: 'swe', label: 'Swedish' },
  { code: 'ind', label: 'Indonesian' },
  { code: 'tgl', label: 'Filipino (Tagalog)' },
  { code: 'ukr', label: 'Ukrainian' },
  { code: 'ces', label: 'Czech' },
  { code: 'ron', label: 'Romanian' },
  { code: 'hun', label: 'Hungarian' },
  { code: 'dan', label: 'Danish' },
  { code: 'fin', label: 'Finnish' },
];

export const FLUENCY_LEVELS = [
  { value: 'Beginner', label: 'Beginner: I can understand simple phrase' },
  { value: 'Intermediate', label: 'Intermediate: I can understand sentences.' },
  { value: 'Advanced', label: 'Advanced: I can understand paragraphs' },
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
