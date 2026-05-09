import { ArrowLeft, Sparkles, Send, Loader2 } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissionById } from '../../submissions/submissionActions'; 
import { clearSelectedSubmission } from '../../submissions/submissionSlice'; 
import { createCorrection } from '../correctionActions'; 
import { resetCorrectionStatus } from '../correctionSlice';

export default function Correct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  // 1. Get Submission Details from Redux
  const { 
    selectedSubmission, 
    detailLoading, 
    detailError 
  } = useSelector((state) => state.submissions);

  const { submitting, submitSuccess, submitError } = useSelector((state) => state.corrections);

  // 2. Data Logic: Prioritize full Redux data over the 'preview' version from location state
  const submissionData = selectedSubmission?.data || selectedSubmission;
  const displayData = submissionData || location.state?.submission;

  const [correction, setCorrection] = useState('');
  const [notes, setNotes] = useState('');

  // 3. Force fetch if we don't have the 'content' field (even if location state exists)
  useEffect(() => {
    const hasFullContent = location.state?.submission?.content;
    
    if (id && !hasFullContent) {
      dispatch(fetchSubmissionById(id));
    }
    
    return () => dispatch(clearSelectedSubmission());
  }, [id, location.state, dispatch]);

  useEffect(() => {
    if (submitSuccess) {
      dispatch(resetCorrectionStatus());
      navigate('/dashboard');
    }
  }, [submitSuccess, navigate, dispatch]);

  const handleSubmitCorrection = () => {
    if (!id || !correction.trim()) return;
    dispatch(createCorrection({ id, correctionData: { 
      corrected_text: correction.trim(), 
      notes: notes.trim() 
    }}));
  };

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-4 py-6 md:px-12 md:py-8 font-sans'>
      <div className='container mx-auto flex justify-between items-center mb-8'>
        <button onClick={() => navigate('/correct')} className='flex items-center gap-2 text-gray-500 hover:text-[#5D45FD] font-medium text-sm'>
          <ArrowLeft size={18} /> Back to Queue
        </button>
        <div className='flex items-center gap-2 bg-[#E8FFF3] text-[#10B981] px-4 py-2 rounded-full border border-[#D1FAE5]'>
          <Sparkles size={16} fill='currentColor' />
          <span className='text-xs font-bold uppercase'>Reward: 1 credit</span>
        </div>
      </div>

      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        
        {/* Sidebar: Original Submission */}
        <div className='lg:col-span-4 space-y-4'>
          <h2 className='text-lg font-bold text-[#1A1A1A] px-2'>Original Submission</h2>
          
          <div className='bg-[#EEF2FF] rounded-[32px] p-8 border border-indigo-50 min-h-[250px] flex flex-col'>
            {detailLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="animate-spin text-[#5D45FD]" size={32} />
              </div>
            ) : detailError ? (
              <div className="text-red-500 text-sm p-4">{detailError}</div>
            ) : displayData ? (
              <>
                <div className='flex gap-2 mb-4'>
                  <span className='bg-[#5D45FD] text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase'>
                    {displayData.language}
                  </span>
                  <span className='bg-white/60 text-gray-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase border border-white'>
                    {displayData.fluency_level}
                  </span>
                </div>
                
                {/* FIX: Check content first, then fallback to preview */}
                <p className='text-[#1A1A1A] leading-relaxed text-[15px] italic'>
                  "{displayData.content || displayData.preview || "Loading full text..."}"
                </p>

                <div className="mt-auto pt-6 border-t border-indigo-100/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5D45FD] font-bold text-xs shadow-sm border border-indigo-50">
                    {displayData.author?.username?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wide">Author</p>
                    <p className="text-sm font-bold text-indigo-900">{displayData.author?.username}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">No submission data available.</div>
            )}
          </div>
        </div>

        {/* Right Form: Correction Input */}
        <div className='lg:col-span-8 space-y-6'>
          <section className='space-y-3'>
            <h2 className='text-lg font-bold text-[#1A1A1A] px-2'>Your Correction</h2>
            <textarea
              placeholder='Correct the grammar and flow...'
              value={correction}
              onChange={(e) => setCorrection(e.target.value)}
              disabled={submitting}
              className='w-full h-64 bg-white border border-gray-100 rounded-[32px] p-8 text-[15px] outline-none focus:ring-4 focus:ring-indigo-50 transition-all resize-none shadow-sm'
            />
          </section>

          <section className='space-y-3'>
            <h2 className='text-lg font-bold text-[#1A1A1A] px-2 text-sm'>Notes (optional)</h2>
            <textarea
              placeholder='Explain your changes...'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={submitting}
              className='w-full h-32 bg-white border border-gray-100 rounded-[32px] p-8 text-[15px] outline-none focus:ring-4 focus:ring-indigo-50 transition-all resize-none shadow-sm'
            />
          </section>

          <button
            onClick={handleSubmitCorrection}
            disabled={submitting || !correction.trim()}
            className='w-full py-4 bg-[#5D45FD] text-white font-bold rounded-full hover:bg-[#4a36cc] flex items-center justify-center gap-2 transition-all disabled:bg-gray-300'
          >
            {submitting ? <Loader2 className="animate-spin" size={18} /> : <>Submit Correction <Send size={18} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}