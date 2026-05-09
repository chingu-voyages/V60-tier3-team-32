import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendHorizonal } from 'lucide-react';

import { createPost } from '../writeActions';

const MAX_WORDS = 300;

export default function WritingEditor({ prompt }) {
  const dispatch = useDispatch();

  const { submitting, error, submitSuccess } = useSelector(
    (state) => state.write,
  );

  const [content, setContent] = useState('');

  const wordCount = useMemo(() => {
    return content.trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  const wordsRemaining = MAX_WORDS - wordCount;
  const isOverLimit = wordsRemaining < 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prompt || !content.trim() || isOverLimit) return;

    const postData = {
      prompt_id: prompt?.id,
      language: prompt?.language,
      fluency_level: prompt?.fluency_level,
      content,
      status: 'submitted',
    };

    dispatch(createPost(postData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Write your first sentence here...'
        className='w-full min-h-[420px] resize-none outline-none text-[15px] leading-relaxed text-gray-700 placeholder:text-[#79716B] bg-stone-50 rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8'
      />

      <div className='mt-4 flex items-center'>
        {submitSuccess && (
          <span className='text-xs font-semibold text-green-500'>
            Submitted successfully
          </span>
        )}

        <div className='ml-auto flex items-center gap-2'>
          <span
            className={`text-xs font-semibold ${
              isOverLimit ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {wordsRemaining} words remaining
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
            {wordCount}/{MAX_WORDS}
          </span>
        </div>
      </div>

      {error && (
        <div className='mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-500'>
          {error}
        </div>
      )}

      <div className='mt-8 flex flex-col gap-3'>
        <button
          type='submit'
          disabled={submitting || isOverLimit || !content.trim()}
          className='flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#5D45FD] hover:bg-[#4B35E0] text-white font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <SendHorizonal size={16} />

          {submitting ? 'Submitting...' : 'Submit Reflection'}
        </button>
        <button
          type='button'
          onClick={console.log('drafts')}
          disabled={submitting || isOverLimit || !content.trim()}
          className='flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 border border-stone-200 text-gray-700 font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {' '}
          Save Draft
        </button>
      </div>
    </form>
  );
}
