import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import PromptDetails from '../components/PromptDetails.jsx';
import WritingEditor from '../components/WritingEditor.jsx';
import { fetchTodayPrompts } from '../writeActions';
import { clearCurrentDraft, nextPrompt, setCurrentDraft } from '../writeSlice';
import { LANGUAGES } from '@/lib/constants/languages';
import { getSubmissionById } from '@/features/submissions/submissionService.js';
import { deletePostById } from '@/features/submissions/submissionActions.js';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

export default function Write() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preferredLanguage, setPreferredLanguage] = useState('');

  const { prompts, currentPromptIndex, currentDraft, loading, error } =
    useSelector((state) => state.write);

  const learningPrompts = prompts.learning || [];
  const nativePrompts = prompts.native || [];

  useEffect(() => {
    dispatch(fetchTodayPrompts());
  }, [dispatch]);

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

  const currentPrompt = filteredPrompts[currentPromptIndex] ?? null;

  const activePrompt = currentDraft?.prompt ?? currentPrompt;

  const nativePrompt = useMemo(() => {
    if (!activePrompt?.prompt_key) return null;

    return (
      nativePrompts.find(
        (prompt) => prompt.prompt_key === activePrompt.prompt_key,
      ) ?? null
    );
  }, [activePrompt, nativePrompts]);

  const getLanguageLabel = (code) => {
    return LANGUAGES.find((language) => language.code === code)?.label || code;
  };

  const handleDeleteDraft = async () => {
    if (!currentDraft?._id) return;

    try {
      await dispatch(deletePostById(currentDraft._id)).unwrap();
      dispatch(clearCurrentDraft());
      navigate('/submissions');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) return;

    getSubmissionById(id)
      .then((fullDraft) => {
        dispatch(setCurrentDraft(fullDraft));
      })
      .catch(() => {
        navigate('/submissions', { replace: true });
      });
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (!id) {
      dispatch(clearCurrentDraft());
    }
  }, [id, dispatch]);

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-4 py-6 md:p-8 pb-24 md:pb-8'>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        <aside className='lg:col-span-5 space-y-6'>
          {id && currentDraft?.status === 'draft' && (
            <div className='flex justify-start'>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type='button'
                    className='flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition'
                  >
                    <Trash2 size={16} />
                    Delete Draft
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent className='w-[90%] max-w-md rounded-2xl p-5 sm:p-6'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this draft?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your draft.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className='flex-col sm:flex-row gap-2'>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleDeleteDraft}
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete Draft
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {!id && learningLanguages.length > 1 && (
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
            prompt={activePrompt}
            nativePrompt={nativePrompt}
            loading={loading}
            error={error}
            onNewPrompt={() => dispatch(nextPrompt(filteredPrompts.length))}
          />
        </aside>

        <main className='lg:col-span-7'>
          <WritingEditor prompt={activePrompt} draft={currentDraft} />
        </main>
      </div>
    </div>
  );
}
