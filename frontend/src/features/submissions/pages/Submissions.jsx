import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, MessageCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { formatSubmissions } from '@/utils/formatSubmissions';
import { fetchSubmissions } from '../submissionActions';

const tabs = [
  { label: 'Submitted', value: 'submitted' },
  { label: 'Drafts', value: 'draft' },
];

export default function Submissions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('submitted');

  const { submissions, loading, error } = useSelector(
    (state) => state.submissions,
  );

  useEffect(() => {
    dispatch(fetchSubmissions());
  }, [dispatch]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      if (activeTab === 'submitted') {
        return ['submitted', 'corrected'].includes(item.status);
      }

      return item.status === 'draft';
    });
  }, [submissions, activeTab]);

  const formattedSubmissions = useMemo(
    () => formatSubmissions(filteredSubmissions),
    [filteredSubmissions],
  );

  const handleSubmissionClick = (item) => {
    const route =
      item.status === 'draft' ? `/write/${item.id}` : `/submissions/${item.id}`;

    navigate(route);
  };

  if (loading) {
    return <p className='p-8'>Loading submissions...</p>;
  }

  if (error) {
    return <p className='p-8 text-red-500'>{error}</p>;
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-4 py-6 md:px-12 md:py-8 font-sans'>
      <div className='container mx-auto mb-8'>
        <button
          onClick={() => navigate('/dashboard')}
          className='flex items-center gap-2 text-gray-500 hover:text-[#5D45FD] transition-colors font-medium text-sm mb-6'
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <h1 className='text-[28px] md:text-4xl font-bold text-gray-900 tracking-tight'>
            My Submissions
          </h1>

          <div className='flex gap-2 overflow-x-auto pb-1'>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#5D45FD] text-white'
                      : 'bg-white border border-gray-100 text-gray-600 hover:border-[#5D45FD]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className='container mx-auto'>
        {formattedSubmissions.length > 0 ? (
          <div className='flex flex-col gap-4 md:gap-6'>
            {formattedSubmissions.map((item) => {
              const isDraft = item.status === 'draft';
              const hasReviews = item.comments > 0;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSubmissionClick(item)}
                  className='group relative bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer lg:p-6 p-5 rounded-[28px]'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex items-center gap-2 lg:gap-3 flex-wrap'>
                      <span className='text-[10px] lg:text-[11px] font-bold text-[#5D45FD] bg-[#E8EDFF] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0'>
                        {item.language}
                      </span>

                      <span className='text-[11px] lg:text-xs text-gray-400 font-medium whitespace-nowrap'>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : 'No date'}
                      </span>
                    </div>

                    {isDraft ? (
                      <div className='flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200 shrink-0'>
                        <FileText size={13} />

                        <span className='text-[10px] lg:text-[11px] font-bold whitespace-nowrap'>
                          Continue Writing
                        </span>
                      </div>
                    ) : hasReviews ? (
                      <div className='flex items-center gap-1.5 bg-[#FFF9E6] text-[#D97706] px-2.5 py-1 rounded-full border border-[#FEF3C7] shrink-0'>
                        <MessageCircle
                          size={13}
                          fill='currentColor'
                          className='opacity-80'
                        />

                        <span className='text-[10px] lg:text-[11px] font-bold whitespace-nowrap'>
                          {item.comments}{' '}
                          {item.comments === 1 ? 'review' : 'reviews'}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className='space-y-2 min-w-0'>
                    <h3 className='text-[16px] lg:text-lg font-bold text-gray-900 group-hover:text-[#5D45FD] transition-colors leading-tight truncate'>
                      {item.title}
                    </h3>

                    <p className='text-[13px] lg:text-sm text-gray-500 line-clamp-2'>
                      {item.preview}
                    </p>

                    <div className='flex items-center gap-4 pt-2 text-xs text-gray-400'>
                      <span>{item.wordCount} words</span>
                      <span>{item.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='bg-white rounded-[32px] p-12 text-center border border-dashed border-gray-200 text-gray-400'>
            <p className='font-medium mb-2'>No {activeTab} posts yet.</p>

            <p className='text-sm'>
              {activeTab === 'draft'
                ? 'Start writing to save your first draft.'
                : 'Your submissions will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
