import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { SendHorizonal, FileText } from 'lucide-react';
import { toast } from 'sonner';

import { createPost, updatePost } from '../writeActions';
import { clearCurrentDraft } from '../writeSlice';
import { useNavigate } from 'react-router-dom';
import TextArea from './TextArea';
import { useWordCount } from '../hooks/useWordCount';

export default function WritingEditor({ prompt }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // pending status tracks if user is saving a draft or submitting
  const [pendingStatus, setPendingStatus] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const content = useWatch({
    control,
    name: 'content',
    defaultValue: '',
  });

  const { isOverLimit } = useWordCount(content, 300);

  console.log(content);

  const {
    submitting,
    updating,
    error,
    submitSuccess,
    updateSuccess,
    currentDraft,
  } = useSelector((state) => state.write);

  // const [content, setContent] = useState('');

  const isEditingDraft = currentDraft?.status === 'draft';
  const draftId = currentDraft?.id || currentDraft?._id;

  // const isBusy = submitting || updating;

  // // cmd/ ctrl + enter to submit
  // const handleKeyDown = (e) => {
  //   if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
  //     e.preventDefault();

  //     handleSubmit();
  //   }
  // };

  // POST reflection
  const buildPostData = (data, status) => ({
    prompt_id: prompt?.id,
    language: prompt?.language,
    fluency_level: prompt?.fluency_level,
    content: data.content,
    status,
  });

  const onSubmit = (data) => {
    if (!prompt || !data.content.trim() || isOverLimit) return;

    setPendingStatus('submitted');

    if (isEditingDraft) {
      dispatch(
        updatePost({
          postId: draftId,
          postData: buildPostData(data, 'submitted'),
        }),
      );
    } else {
      dispatch(createPost(buildPostData(data, 'submitted')));
    }
  };

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

      reset({ content: '' });
      setPendingStatus(null);
      dispatch(clearCurrentDraft());
    }
  }, [submitSuccess, reset, dispatch, pendingStatus, navigate]);

  // Handle update success
  // useEffect(() => {
  //   if (updateSuccess) {
  //     const isDraft = pendingStatus === 'draft';
  //     toast.success(isDraft ? 'Draft saved!' : 'Reflection published!');

  //     if (!isDraft) {
  //       navigate('/submissions');
  //     }

  //     setContent('');
  //     setPendingStatus(null);
  //     dispatch(clearCurrentDraft());
  //   }
  // }, [updateSuccess, dispatch, pendingStatus, navigate]);

  // const handleSaveDraft = () => {
  //   if (!prompt || !content.trim() || isOverLimit) return;

  //   const postData = buildPostData('draft');
  //   const existingDraftId = draftId;

  //   setPendingStatus('draft');

  //   if (existingDraftId) {
  //     dispatch(updatePost({ postId: draftId, postData }));
  //   } else {
  //     dispatch(createPost(buildPostData('draft')));
  //   }
  // };

  // console.log('isEditingDraft:', isEditingDraft);
  // console.log('draftId:', draftId);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Draft Banner */}
      {/* {isEditingDraft && (
        <div className='mb-4 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700'>
          <FileText size={14} className='shrink-0' />

          <span>You're editing a saved draft.</span>
        </div>
      )} */}

      <TextArea
        {...register('content', {
          required: 'Reflection is required',
          minLength: {
            value: 10,
            message: 'Reflection must be at least 10 characters',
          },
        })}
        content={content}
        selectedLanguage={prompt?.language}
      />

      {/* Error */}
      {errors.content && (
        <div className='mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-500'>
          {errors.content.message}
        </div>
      )}

      {/* Actions */}
      <div className='mt-8 flex flex-col gap-3'>
        <button
          type='submit'
          disabled={isOverLimit || !content.trim()}
          className='flex items-center justify-center gap-2 rounded-full bg-[#5D45FD] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4B35E0] disabled:cursor-not-allowed disabled:opacity-50'
        >
          <SendHorizonal size={16} />
          {/* {submitting
            ? 'Submitting...'
            : isEditingDraft
              ? 'Publish Reflection'
              : 'Submit Reflection'} */}
          Submit
        </button>

        <button
          type='button'
          // onClick={handleSaveDraft}
          disabled={isOverLimit || !content.trim()}
          className='flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-gray-100 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {/* {updating
            ? 'Saving...'
            : isEditingDraft
              ? 'Save Changes'
              : 'Save Draft'} */}
          Save Draft
        </button>
      </div>
    </form>
  );
}
