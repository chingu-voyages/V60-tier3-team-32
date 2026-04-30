import { useState, useEffect } from 'react';
import { SendHorizonal, AlertCircle, CheckCircle } from 'lucide-react';
import { useSubmissionStore } from '../../../app/hooks/useSubmissionStore';

export default function WritingEditor() {
  const [text, setText] = useState(() => {
    return localStorage.getItem('lingualoop_draft') || '';
  });

  const [submitted, setSubmitted] = useState(false);
  const { addSubmission } = useSubmissionStore();

  // Calculate word count
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Validation Logic
  const isTooShort = wordCount < 100 && text.length > 0;
  const isTooLong = wordCount > 300;
  const canSubmit = wordCount >= 10 && wordCount <= 300;

  useEffect(() => {
    localStorage.setItem('lingualoop_draft', text);
  }, [text]);

  const handleSubmit = () => {
    if (!canSubmit) return;

    // Create submission object
    const submissionData = {
      title: 'My Reflection',
      excerpt: text.substring(0, 60) + '...',
      text: text,
      language: 'Spanish',
      level: 'Beginner',
      words: wordCount,
      readingTime: readingTime,
      postedAt: 'just now',
    };

    // Add to store
    addSubmission(submissionData);

    // Clear form
    setText('');
    localStorage.removeItem('lingualoop_draft');

    // Show success feedback
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* SUCCESS MESSAGE */}
      {submitted && (
        <div className='flex items-center gap-2 bg-green-50 border border-green-200 rounded-[20px] p-4 text-green-700 animate-in fade-in slide-in-from-top-2'>
          <CheckCircle size={18} />
          <span className='text-sm font-semibold'>
            Submission posted successfully! Check the Correct section to see it.
          </span>
        </div>
      )}

      {/* TEXT INPUT CONTAINER */}
      <div className='relative'>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Write your first sentence here...'
          className={`
            w-full h-[280px] lg:h-[320px] p-8 
            rounded-[32px] border bg-white shadow-sm 
            focus:ring-2 outline-none text-gray-700 
            leading-relaxed resize-none transition-all duration-200
            ${
              isTooLong
                ? 'border-red-400 focus:ring-red-50 focus:border-red-400'
                : 'border-gray-100 focus:ring-indigo-50 focus:border-indigo-200'
            }
          `}
        />
      </div>

      {/* EXTERNAL COUNTER & WARNINGS */}
      <div className='flex items-center justify-between px-2 min-h-[24px]'>
        <div className='flex items-center gap-2'>
          {isTooLong && (
            <div className='flex items-center gap-1.5 text-red-500 animate-in fade-in slide-in-from-left-2'>
              <AlertCircle size={14} />
              <span className='text-[12px] font-bold'>
                Word limit exceeded!
              </span>
            </div>
          )}
          {isTooShort && !isTooLong && (
            <span className='text-[12px] font-medium text-indigo-400'>
              {100 - wordCount} more words needed to submit
            </span>
          )}
        </div>

        <div
          className={`text-[13px] font-bold transition-colors ${isTooLong ? 'text-red-500' : 'text-gray-400'}`}
        >
          {wordCount}{' '}
          <span className='font-medium text-gray-300'>/ 300 words</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className='flex flex-col gap-3 mt-2'>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`
            w-full py-4 font-bold rounded-[20px] 
            flex items-center justify-center gap-2 
            transition-all duration-300 shadow-sm
            ${
              canSubmit
                ? 'bg-[#5D45FD] hover:bg-[#4a36cc] text-white cursor-pointer'
                : 'bg-[#D1D9FF] text-white cursor-not-allowed'
            }
          `}
        >
          Submit Reflection <SendHorizonal size={18} />
        </button>

        <button
          onClick={() => alert('Saved!')}
          className='w-full py-4 bg-white border border-gray-100 text-gray-500 font-bold rounded-[20px] hover:bg-gray-50 transition-all shadow-sm'
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}
