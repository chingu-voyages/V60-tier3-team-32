import { franc } from 'franc-min';
import { LANGUAGES } from '@/lib/constants/languages';

export const useLanguageDetection = (content = '') => {
  const text = content.trim();

  if (text.length < 20) {
    return {
      languageCode: 'und',
      languageName: 'unknown',
      isReliable: false,
    };
  }

  const languageCode = franc(text);
  const foundLanguage = LANGUAGES.find((lang) => lang.code === languageCode);

  return {
    languageCode,
    languageName: foundLanguage?.label || 'unknown',
    isReliable: languageCode !== 'und',
  };
};
