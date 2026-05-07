import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { diffWords } from 'diff';

import { fetchSubmissionById } from '../submissionActions';
import { clearSelectedSubmission } from '../submissionSlice';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SubmissionDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [openCorrectionIndexes, setOpenCorrectionIndexes] = useState(null);

  const { selectedSubmission, detailLoading, detailError } = useSelector(
    (state) => state.submissions,
  );

  useEffect(() => {
    dispatch(clearSelectedSubmission());
    dispatch(fetchSubmissionById(id));
  }, [dispatch, id]);

  const submission = selectedSubmission;

  const corrections = Array.isArray(submission?.corrections)
    ? submission.corrections
    : [];

  const defaultOpenCorrectionIndexes =
    corrections.length <= 2 ? corrections.map((_, index) => index) : [0];

  const activeOpenCorrectionIndexes =
    openCorrectionIndexes ?? defaultOpenCorrectionIndexes;

  const handleToggleCorrection = (index) => {
    setOpenCorrectionIndexes((prev) => {
      const current = prev ?? defaultOpenCorrectionIndexes;

      return current.includes(index)
        ? current.filter((openIndex) => openIndex !== index)
        : [...current, index];
    });
  };

  if (detailLoading) {
    return <p className='p-8'>Loading submission...</p>;
  }

  if (detailError || !submission?._id) {
    return (
      <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center px-4'>
        <div className='bg-white rounded-[32px] p-8 text-center border border-gray-100 max-w-md'>
          <p className='text-gray-500 font-medium mb-6'>
            {detailError || 'Submission not found.'}
          </p>

          <button
            onClick={() => navigate('/submissions')}
            className='bg-[#5D45FD] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition'
          >
            Back to Submissions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-4 py-6 md:px-8 md:py-8 font-sans'>
      <div className='container mx-auto max-w-7xl mb-8'>
        <button
          onClick={() => navigate('/submissions')}
          className='flex items-center gap-2 text-gray-500 hover:text-[#5D45FD] transition-colors font-medium text-sm mb-6'
        >
          <ArrowLeft size={18} />
          Back to Submissions
        </button>
      </div>

      <div className='container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
        <div className='md:col-span-1 space-y-6'>
          <div className='py-2 md:p-6 md:bg-indigo-50 space-y-3 rounded-[28px] md:border md:border-gray-100'>
            <h3 className='text-sm md:hidden font-bold text-gray-400 uppercase tracking-wider'>
              Prompt
            </h3>

            <div className='hidden md:flex items-center gap-2 lg:gap-3 flex-wrap'>
              <span className='text-xs lg:text-[11px] font-bold text-[#5D45FD] bg-[#E8EDFF] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0'>
                {submission.language}
              </span>

              <span className='text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wider'>
                {submission.fluency_level}
              </span>
            </div>

            <h2 className='text-xl md:text-2xl font-bold text-[#312C85] leading-tight'>
              {submission.prompt?.title || 'Untitled Prompt'}
            </h2>

            <p className='hidden md:block text-sm text-gray-600 leading-relaxed'>
              {submission.prompt?.description || 'No prompt description.'}
            </p>
          </div>

          <div className='hidden md:block bg-indigo-50 rounded-[28px] p-6 border border-gray-100 space-y-3'>
            <h3 className='text-[13px] font-bold text-gray-400 uppercase tracking-wider'>
              My Submission
            </h3>

            <p className='text-sm text-gray-700 leading-relaxed'>
              {submission.content || 'No content available'}
            </p>

            <div className='flex gap-4 text-xs text-gray-400 pt-3 border-t border-gray-100'>
              <span>{submission.word_count || 0} words</span>
              <span>{submission.reading_time || 1} min read</span>
            </div>
          </div>
        </div>

        <div className='md:col-span-2 '>
          {corrections.length > 0 ? (
            <div className='overflow-hidden'>
              <div className='max-h-[720px] overflow-y-auto space-y-4 scrollbar-hide'>
                {corrections.map((correction, index) => {
                  const isOpen = activeOpenCorrectionIndexes.includes(index);

                  // jsDiff
                  const differences = diffWords(
                    submission.content || '',
                    correction.corrected_text || '',
                  );
                  return (
                    <div
                      key={correction.id || index}
                      className='border border-gray-100 rounded-[22px] overflow-hidden bg-white'
                    >
                      <button
                        onClick={() => handleToggleCorrection(index)}
                        className='w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition'
                      >
                        <div>
                          <div className='flex justify-center items-center gap-2'>
                            <Avatar className='h-9 w-9'>
                              <AvatarImage
                                src={
                                  correction.corrector?.profile_image ||
                                  correction.corrector?.photo_url
                                }
                                alt={
                                  correction.corrector?.username || 'Reviewer'
                                }
                              />
                              <AvatarFallback className='bg-[#E8EDFF] text-[#5D45FD] text-xs font-bold'>
                                {(correction.corrector?.username || 'U')
                                  .charAt(0)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <p className='text-sm font-semibold text-[#1C1917]'>
                              Reviewed by{' '}
                              <span className='text-[#312C85]'>
                                {correction.corrector?.username || 'User'}
                              </span>
                            </p>
                          </div>

                          <p className='text-xs text-gray-400 mt-1'>
                            {correction.created_at
                              ? new Date(
                                  correction.created_at,
                                ).toLocaleDateString()
                              : 'No date'}
                          </p>
                        </div>

                        <span className='text-xs font-bold text-[#5D45FD] bg-[#E8EDFF] px-3 py-1 rounded-full shrink-0'>
                          {isOpen ? 'Hide' : 'View'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className='p-5 pt-3 space-y-6'>
                          <div className='space-y-3'>
                            <h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
                              Original Submission
                            </h4>

                            <p className='text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg'>
                              {submission.content || 'No content available'}
                            </p>
                          </div>

                          <div className='space-y-3'>
                            <h4 className='text-xs font-bold text-emerald-900 uppercase tracking-wider'>
                              Corrected Version
                            </h4>

                            <div className='text-sm leading-relaxed bg-blue-50 p-4 rounded-lg whitespace-pre-wrap'>
                              {differences.map((part, idx) => {
                                if (part.added) {
                                  return (
                                    <span
                                      key={idx}
                                      className='bg-emerald-100 text-emerald-800 rounded font-medium'
                                    >
                                      {part.value}
                                    </span>
                                  );
                                }

                                if (part.removed) {
                                  return (
                                    <span
                                      key={idx}
                                      className='bg-red-100 text-red-500 line-through rounded'
                                    >
                                      {part.value}
                                    </span>
                                  );
                                }

                                return (
                                  <span key={idx} className='text-gray-700'>
                                    {part.value}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div className='space-y-3'>
                            <h4 className='text-xs font-bold text-emerald-900 uppercase tracking-wider'>
                              Correction Notes
                            </h4>

                            <p className='text-sm text-gray-700 leading-relaxed'>
                              {correction.notes || 'No notes added.'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className='bg-white rounded-[28px] p-12 text-center border border-dashed border-gray-200'>
              <p className='text-gray-400 font-medium'>
                No reviews yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
