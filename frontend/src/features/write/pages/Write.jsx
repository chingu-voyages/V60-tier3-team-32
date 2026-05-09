import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PromptDetails from '../components/PromptDetails.jsx';
import WritingEditor from '../components/WritingEditor.jsx';
import { fetchTodayPrompts } from '../writeActions';
import { nextPrompt, setActivePromptType } from '../writeSlice';
import { LANGUAGES } from '@/lib/constants/languages';

export default function Write() {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const { prompts, currentPromptIndex, activePromptType, loading, error } =
    useSelector((state) => state.write);

  const filteredPrompts = prompts.filter(
    (prompt) => prompt.type === activePromptType,
  );

  const currentPrompt = filteredPrompts[currentPromptIndex];

  useEffect(() => {
    dispatch(fetchTodayPrompts());
  }, [dispatch]);

  const learningPrompt = prompts.find((p) => p.type === 'learning');
  const nativePrompt = prompts.find((p) => p.type === 'native');

  const learningLanguage =
    LANGUAGES.find((l) => l.code === learningPrompt?.language)?.label ||
    'Learning';

  const nativeLanguage =
    LANGUAGES.find((l) => l.code === nativePrompt?.language)?.label || 'Native';

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-4 py-6 md:p-8 pb-24 md:pb-8'>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        {/* LEFT COLUMN: 5 Columns */}
        <aside className='lg:col-span-5 space-y-6'>
          <div className='flex gap-2 bg-white p-1 rounded-full border border-indigo-100'>
            <button
              type='button'
              onClick={() => dispatch(setActivePromptType('learning'))}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition ${
                activePromptType === 'learning'
                  ? 'bg-[#5D45FD] text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {learningLanguage}
            </button>

            <button
              type='button'
              onClick={() => dispatch(setActivePromptType('native'))}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition ${
                activePromptType === 'native'
                  ? 'bg-[#5D45FD] text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {nativeLanguage}
            </button>
          </div>

          <PromptDetails
            prompt={currentPrompt}
            loading={loading}
            error={error}
            onNewPrompt={() => dispatch(nextPrompt(filteredPrompts.length))}
          />
        </aside>

        {/* RIGHT COLUMN: 7 Columns */}
        <main className='lg:col-span-7'>
          <WritingEditor prompt={currentPrompt} postId={postId} />
        </main>
      </div>
    </div>
  );
}
