import { useLanguageDetection } from '../hooks/useLanguageDetection';
import { useWordCount } from '../hooks/useWordCount';

export default function TextArea({
  content = '',
  MAX_WORDS = 300,
  selectedLanguage,
  ...fieldProps
}) {
  const { wordCount, wordsRemaining, isOverLimit } = useWordCount(
    content,
    MAX_WORDS,
  );
  const { languageName, languageCode, isReliable } =
    useLanguageDetection(content);

  const hasLanguageMismatch =
    isReliable && selectedLanguage && languageCode !== selectedLanguage;

  return (
    <div>
      <textarea
        {...fieldProps}
        placeholder='Write your first sentence here...'
        className='w-full min-h-[500px] resize-none rounded-[32px] border border-gray-100 bg-stone-50 p-6 text-[15px] leading-relaxed text-gray-700 shadow-sm outline-none placeholder:text-[#79716B] md:p-8'
      />
      <div className='flex justify-end items-center gap-2'>
        <span
          className={`text-xs font-semibold ${
            isOverLimit ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {isOverLimit ? 0 : wordsRemaining} words remaining
        </span>
        <span
          className={`text-xs font-semibold ${
            isOverLimit ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          •
        </span>
        <span
          className={`text-xs font-semibold ${
            isOverLimit ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {isOverLimit ? 0 : wordCount}/{MAX_WORDS}
        </span>
      </div>

      {hasLanguageMismatch && (
        <p className='rounded-xl bg-yellow-50 px-4 py-3 text-sm text-yellow-700'>
          This looks like {languageName}, but your selected language is
          different.
        </p>
      )}
    </div>
  );
}
