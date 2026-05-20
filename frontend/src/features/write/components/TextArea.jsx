import { useWordCount } from '../hooks/useWordCount';

export default function TextArea({ content, onChange, MAX_WORDS = 300 }) {
  const { wordCount, wordsRemaining, isOverLimit } = useWordCount(
    content,
    MAX_WORDS,
  );

  return (
    <div>
      <textarea
        className='w-full min-h-[500px] resize-none rounded-[32px] border border-gray-100 bg-stone-50 p-6 text-[15px] leading-relaxed text-gray-700 shadow-sm outline-none placeholder:text-[#79716B] md:p-8'
        placeholder='Write your first sentence here...'
        value={content}
        onChange={onChange}
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
    </div>
  );
}
