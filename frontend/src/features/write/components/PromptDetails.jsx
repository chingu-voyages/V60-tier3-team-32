import { RefreshCw, Sparkles } from 'lucide-react';

export default function PromptDetails({ prompt, loading, error, onNewPrompt }) {
  if (loading) {
    return (
      <div className='bg-[#EEF2FF] rounded-[32px] p-8 border border-indigo-50'>
        <p className='text-sm text-gray-500'>Loading prompt...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-[#EEF2FF] rounded-[32px] p-8 border border-indigo-50'>
        <p className='text-sm text-red-500'>{error}</p>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className='bg-[#EEF2FF] rounded-[32px] p-8 border border-indigo-50'>
        <p className='text-sm text-gray-500'>No prompts available.</p>
      </div>
    );
  }

  return (
    <div className='bg-[#EEF2FF] rounded-[32px] p-8 relative overflow-hidden border border-indigo-50'>
      <div className='flex items-center gap-2 text-[#5D45FD] mb-4'>
        <Sparkles size={16} fill='currentColor' />
        <span className='text-[11px] font-bold uppercase tracking-[0.1em]'>
          Prompt of the Day
        </span>
      </div>

      <div className='space-y-4 mb-8'>
        <h1 className='text-2xl lg:text-[28px] font-bold text-[#2D2D5F] leading-tight'>
          {prompt.title}
        </h1>

        <p className='text-gray-500 text-[15px] leading-relaxed'>
          {prompt.description}
        </p>

        <div className='flex flex-wrap gap-2 pt-2'>
          <span className='text-xs font-bold text-[#5D45FD] bg-white px-3 py-1 rounded-full'>
            {prompt.language}
          </span>

          <span className='text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full'>
            {prompt.fluency_level}
          </span>

          {prompt.type && (
            <span className='text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full capitalize'>
              {prompt.type}
            </span>
          )}
        </div>
      </div>

      <button
        type='button'
        onClick={onNewPrompt}
        disabled={loading}
        className='w-full py-3 bg-white hover:bg-gray-50 text-[#5D45FD] font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-sm border border-indigo-50/50 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <RefreshCw size={16} />
        New Prompt
      </button>
    </div>
  );
}
