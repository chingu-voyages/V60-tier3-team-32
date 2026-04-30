import {
  ArrowLeft,
  CheckCircle2,
  History,
  MessageSquare,
  User,
  Globe,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function CorrectionReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the submission from the router state
  const submission = location.state?.submission;

  // Track which review is currently selected (defaults to the most recent)
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(
    submission?.reviews ? submission.reviews.length - 1 : 0,
  );

  const currentReview = submission?.reviews?.[selectedReviewIndex];

  // Global Error State if data is missing
  if (!submission || !currentReview) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-[#F8FAFF] font-sans'>
        <div className='bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 text-center'>
          <p className='text-gray-500 font-medium mb-6'>
            No review data found for this submission.
          </p>
          <button
            onClick={() => navigate('/correct')}
            className='bg-[#5D45FD] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-100 transition-transform active:scale-95'
          >
            Return to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF]  px-4 py-6 md:px-12 md:py-12 font-sans'>
      <div className='container mx-auto max-w-6xl'>
        {/* Navigation & Header */}
        <header className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-gray-400 hover:text-[#5D45FD] transition-all font-black text-[11px] tracking-widest uppercase w-fit'
          >
            <ArrowLeft size={16} strokeWidth={3} />
            Back to Queue
          </button>

          <div className='md:text-right space-y-2'>
            <h1 className='text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight leading-none'>
              {submission.title}
            </h1>
            <div className='flex md:justify-end gap-2'>
              <div className='flex items-center gap-1 bg-[#5D45FD] text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase'>
                <Globe size={10} />
                {submission.language}
              </div>
              <span className='bg-white text-gray-400 border border-gray-100 px-3 py-1 rounded-md text-[10px] font-bold uppercase'>
                {submission.level}
              </span>
            </div>
          </div>
        </header>

        {/* Comparison Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10'>
          {/* Left: Original Version */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 px-4 text-gray-400'>
              <History size={16} />
              <h2 className='text-[11px] font-black uppercase tracking-widest'>
                Original Text
              </h2>
            </div>
            <div className='bg-[#EEF2FF] rounded-[32px] p-8 md:p-10 border border-indigo-50 min-h-[350px]'>
              <p className='text-[#1A1A1A] leading-relaxed text-[16px] opacity-70'>
                {submission.text}
              </p>
            </div>
          </div>

          {/* Right: Selected Correction */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between px-4'>
              <div className='flex items-center gap-2 text-[#10B981]'>
                <CheckCircle2 size={16} />
                <h2 className='text-[11px] font-black uppercase tracking-widest'>
                  Correction
                </h2>
              </div>
              <div className='text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm'>
                VERSION {selectedReviewIndex + 1}
              </div>
            </div>
            <div className='bg-white rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(93,69,253,0.08)] border border-white min-h-[350px] relative'>
              <p className='text-[#1A1A1A] leading-relaxed text-[16px] font-medium relative z-10'>
                {currentReview.correction}
              </p>
              {/* Subtle background icon for aesthetic polish */}
              <CheckCircle2
                size={100}
                className='absolute bottom-6 right-6 text-[#5D45FD] opacity-[0.03]'
              />
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <section className='bg-white rounded-[32px] p-8 md:p-10 border border-gray-50 shadow-sm mb-16'>
          <div className='flex items-center gap-2 mb-6 text-[#5D45FD]'>
            <MessageSquare
              size={18}
              fill='currentColor'
              className='opacity-20'
            />
            <h2 className='text-sm font-black uppercase tracking-tight'>
              Corrector's Notes
            </h2>
          </div>
          <div className='bg-[#F8FAFF] p-6 md:p-8 rounded-[24px] border-l-4 border-[#5D45FD]'>
            <p className='text-[#5D45FD] text-[15px] leading-relaxed italic font-medium'>
              "
              {currentReview.notes ||
                'No additional feedback was provided for this specific correction.'}
              "
            </p>
          </div>
        </section>

        {/* Other Contributors Section */}
        <section className='pt-10 border-t border-gray-200'>
          <div className='flex items-center justify-between mb-8 px-2'>
            <h2 className='text-xs font-black text-gray-400 uppercase tracking-[0.2em]'>
              Other Contributors
            </h2>
            <span className='text-[10px] font-black bg-gray-100 text-gray-400 px-3 py-1 rounded-full'>
              {submission.reviews.length} REVIEW
              {submission.reviews.length !== 1 ? 'S' : ''}
            </span>
          </div>

          {submission.reviews.length > 1 ? (
            /* SCROLLABLE REVIEWER LIST */
            <div className='flex gap-4 overflow-x-auto pb-6 scrollbar-hide'>
              {submission.reviews.map((rev, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedReviewIndex(idx)}
                  className={`flex-shrink-0 flex items-center gap-4 p-5 rounded-[28px] border transition-all duration-300 ${
                    selectedReviewIndex === idx
                      ? 'bg-[#5D45FD] border-[#5D45FD] text-white shadow-xl shadow-indigo-100 translate-y-[-4px]'
                      : 'bg-white border-gray-100 text-gray-500 hover:border-[#5D45FD] hover:bg-indigo-50/30'
                  }`}
                >
                  <div
                    className={`p-3 rounded-full ${selectedReviewIndex === idx ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <User size={20} />
                  </div>
                  <div className='text-left'>
                    <p className='text-xs font-black tracking-tight'>
                      Reviewer {idx + 1}
                    </p>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider opacity-60`}
                    >
                      {rev.userId === 'current-user'
                        ? 'Your Input'
                        : 'Native Member'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* EMPTY STATE PLACEHOLDER */
            <div className='bg-white border-2 border-dashed border-gray-100 rounded-[32px] p-12 text-center transition-colors hover:border-indigo-100 group'>
              <div className='flex flex-col items-center gap-3'>
                <div className='p-4 bg-gray-50 rounded-full text-gray-300 group-hover:text-[#5D45FD] transition-colors'>
                  <User size={28} />
                </div>
                <p className='text-gray-400 text-sm font-bold'>
                  No other reviews for this post yet.
                </p>
                <p className='text-gray-300 text-[10px] uppercase font-black tracking-[0.1em]'>
                  Be the first to add another perspective!
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
