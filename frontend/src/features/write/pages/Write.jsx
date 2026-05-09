import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PromptDetails from '../components/PromptDetails.jsx';
import WritingEditor from '../components/WritingEditor.jsx';
import { fetchTodayPrompts } from '../writeActions';
import { nextPrompt } from '../writeSlice';
import { LANGUAGES } from '@/lib/constants/languages';

export default function Write() {
  const dispatch = useDispatch();
  const [preferredLanguage, setPreferredLanguage] = useState('');

  const { prompts, currentPromptIndex, loading, error } = useSelector(
    (state) => state.write,
  );

  useEffect(() => {
    dispatch(fetchTodayPrompts());
  }, [dispatch]);

  const learningPrompts = useMemo(() => {
    return prompts.filter((prompt) => prompt.type === 'learning');
  }, [prompts]);

  const learningLanguages = useMemo(() => {
    return [...new Set(learningPrompts.map((prompt) => prompt.language))];
  }, [learningPrompts]);

  const selectedLanguage = learningLanguages.includes(preferredLanguage)
    ? preferredLanguage
    : (learningLanguages[0] ?? '');

  const filteredPrompts = useMemo(() => {
    return learningPrompts.filter(
      (prompt) => prompt.language === selectedLanguage,
    );
  }, [learningPrompts, selectedLanguage]);

  const currentPrompt = filteredPrompts[currentPromptIndex];

  const getLanguageLabel = (code) => {
    return LANGUAGES.find((language) => language.code === code)?.label || code;
  };

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-4 py-6 md:p-8 pb-24 md:pb-8'>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        <aside className='lg:col-span-5 space-y-6'>
          {learningLanguages.length > 1 && (
            <div className='flex gap-2 bg-white p-1 rounded-full border border-indigo-100'>
              {learningLanguages.map((language) => (
                <button
                  key={language}
                  type='button'
                  onClick={() => setPreferredLanguage(language)}
                  className={`flex-1 py-2 rounded-full text-xs font-bold transition ${
                    selectedLanguage === language
                      ? 'bg-[#5D45FD] text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {getLanguageLabel(language)}
                </button>
              ))}
            </div>
          )}

          <PromptDetails
            prompt={currentPrompt}
            loading={loading}
            error={error}
            onNewPrompt={() => dispatch(nextPrompt(filteredPrompts.length))}
          />
        </aside>

        <main className='lg:col-span-7'>
          <WritingEditor prompt={currentPrompt} />
        </main>
      </div>
    </div>
  );
}
