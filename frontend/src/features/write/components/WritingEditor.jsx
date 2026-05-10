import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendHorizonal, FileText } from 'lucide-react';
import { toast } from 'sonner';

import { createPost, updatePost } from '../writeActions';
import { clearCurrentDraft } from '../writeSlice';
import { useNavigate } from 'react-router-dom';

const MAX_WORDS = 300;

export default function WritingEditor({ prompt }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    submitting,
    updating,
    error,
    submitSuccess,
    updateSuccess,
    currentDraft,
  } = useSelector((state) => state.write);

  const [content, setContent] = useState('');
  const [pendingStatus, setPendingStatus] = useState(null);

  const isEditingDraft = currentDraft?.status === 'draft';
  const draftId = currentDraft?.id || currentDraft?._id;

  const isBusy = submitting || updating;

  // cmd/ ctrl + enter to submit
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();

      handleSubmit();
    }
  };

  useEffect(() => {
    if (currentDraft?.content !== undefined) {
      setContent(currentDraft.content);
    }
  }, [currentDraft?.id, currentDraft?.content]);

  const wordCount = useMemo(() => {
    if (!content.trim()) return 0;
    return content.trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  const wordsRemaining = MAX_WORDS - wordCount;
  const isOverLimit = wordsRemaining < 0;

  // Handle submit success
  useEffect(() => {
    if (submitSuccess) {
      const isDraft = pendingStatus === 'draft';

      toast.success(
        pendingStatus === 'draft' ? 'Draft saved!' : 'Reflection submitted!',
      );
      if (!isDraft) {
        navigate('/submissions');
      }

      setContent('');
      setPendingStatus(null);
      dispatch(clearCurrentDraft());
    }
  }, [submitSuccess, dispatch, pendingStatus]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      toast.success(
        pendingStatus === 'draft' ? 'Draft saved!' : 'Reflection published!',
      );
      setContent('');
      setPendingStatus(null);
      dispatch(clearCurrentDraft());
    }
  }, [updateSuccess, dispatch, pendingStatus]);

  const buildPostData = (status) => ({
    prompt_id: prompt?.id,
    language: prompt?.language,
    fluency_level: prompt?.fluency_level,
    content,
    status,
  });

  const handleSubmit = (e) => {
    e?.preventDefault?.();

    if (!prompt || !content.trim() || isOverLimit) return;

    setPendingStatus('submitted');

    if (isEditingDraft) {
      dispatch(
        updatePost({
          postId: draftId,
          postData: buildPostData('submitted'),
        }),
      );
    } else {
      dispatch(createPost(buildPostData('submitted')));
    }
  };

  const handleSaveDraft = () => {
    if (!prompt || !content.trim() || isOverLimit) return;
    setPendingStatus('draft');
    if (isEditingDraft) {
      dispatch(
        updatePost({ postId: draftId, postData: buildPostData('draft') }),
      );
    } else {
      dispatch(createPost(buildPostData('draft')));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Draft Banner */}
      {isEditingDraft && (
        <div className='mb-4 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700'>
          <FileText size={14} className='shrink-0' />

          <span>You're editing a saved draft.</span>
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Write your first sentence here...'
        className='w-full min-h-[420px] resize-none rounded-[32px] border border-gray-100 bg-stone-50 p-6 text-[15px] leading-relaxed text-gray-700 shadow-sm outline-none placeholder:text-[#79716B] md:p-8'
        onKeyDown={handleKeyDown}
      />

      {/* Word Counter */}
      <div className='mt-4 flex items-center'>
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

      {/* Error */}
      {error && (
        <div className='mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-500'>
          {error}
        </div>
      )}

      {/* Actions */}
      <div className='mt-8 flex flex-col gap-3'>
        <button
          type='submit'
          disabled={isBusy || isOverLimit || !content.trim()}
          className='flex items-center justify-center gap-2 rounded-full bg-[#5D45FD] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4B35E0] disabled:cursor-not-allowed disabled:opacity-50'
        >
          <SendHorizonal size={16} />

          {submitting
            ? 'Submitting...'
            : isEditingDraft
              ? 'Publish Reflection'
              : 'Submit Reflection'}
        </button>

        <button
          type='button'
          onClick={handleSaveDraft}
          disabled={isBusy || isOverLimit || !content.trim()}
          className='flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-gray-100 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {updating
            ? 'Saving...'
            : isEditingDraft
              ? 'Save Changes'
              : 'Save Draft'}
        </button>
      </div>
    </form>
  );
}
