import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchMyCorrections } from '../../correct/correctionActions';

const tabs = [
  { label: 'Made by Me', value: 'made' },
  { label: 'Received', value: 'received' },
];

export default function MyCorrections() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 'made' is the default view
  const [activeTab, setActiveTab] = useState('made');

  const { myCorrections, loading, error } = useSelector(
    (state) => state.corrections,
  );

  // Re-fetch whenever the tab changes to get the correct 'type' from backend
  useEffect(() => {
    dispatch(fetchMyCorrections(activeTab));
  }, [dispatch, activeTab]);

  const handleCorrectionClick = (item) => {
    // Navigate to the specific post view
    navigate(`/submissions/${item.post?.id}`);
  };

  if (loading && myCorrections.length === 0) {
    return (
      <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center'>
        <p className='text-gray-500 font-medium animate-pulse'>Loading corrections...</p>
      </div>
    );
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
            Activity History
          </h1>

          <div className='flex gap-2 overflow-x-auto pb-1'>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#5D45FD] text-white shadow-md shadow-indigo-100'
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
        {error ? (
          <p className='p-8 text-red-500 font-bold bg-red-50 rounded-2xl'>{error}</p>
        ) : myCorrections.length > 0 ? (
          <div className='flex flex-col gap-4 md:gap-6'>
            {myCorrections.map((item) => {
              const isReceived = activeTab === 'received';

              return (
                <div
                  key={item.id}
                  onClick={() => handleCorrectionClick(item)}
                  className='group relative bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer lg:p-6 p-5 rounded-[28px]'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex items-center gap-2 lg:gap-3 flex-wrap'>
                      <span className='text-[10px] lg:text-[11px] font-bold text-[#5D45FD] bg-[#E8EDFF] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0'>
                        {item.post?.language || 'Lang'}
                      </span>

                      <span className='text-[11px] lg:text-xs text-gray-400 font-medium whitespace-nowrap'>
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString(undefined, { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })
                          : 'Recent'}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border shrink-0 ${
                      isReceived 
                        ? 'bg-[#FFF9E6] text-[#D97706] border-[#FEF3C7]' 
                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}>
                      {isReceived ? <MessageCircle size={13} /> : <PenTool size={13} />}
                      <span className='text-[10px] lg:text-[11px] font-bold whitespace-nowrap'>
                        {isReceived ? 'Feedback Received' : 'Contribution'}
                      </span>
                    </div>
                  </div>

                  <div className='space-y-2 min-w-0'>
                    <h3 className='text-[16px] lg:text-lg font-bold text-gray-900 group-hover:text-[#5D45FD] transition-colors leading-tight truncate'>
                      {isReceived ? `@${item.corrector?.username}` : 'You'} improved "{item.post?.prompt?.title || 'Personal Entry'}"
                    </h3>

                    <p className='text-[14px] text-gray-600 line-clamp-1 italic bg-gray-50 p-3 rounded-xl border border-gray-50'>
                      "{item.corrected_preview}"
                    </p>

                    <div className='flex items-center gap-4 pt-1 text-xs text-gray-400'>
                      <span>Original author: {isReceived ? 'You' : `@${item.post?.author?.username}`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='bg-white rounded-[32px] p-16 text-center border border-dashed border-gray-200 text-gray-400'>
            <div className='mb-4 flex justify-center'>
                {activeTab === 'made' ? <PenTool size={40} className='opacity-20' /> : <MessageCircle size={40} className='opacity-20' />}
            </div>
            <p className='font-medium mb-2 text-gray-600'>No corrections found here.</p>
            <p className='text-sm max-w-xs mx-auto'>
              {activeTab === 'made'
                ? "You haven't helped anyone improve their writing yet. Browse the community to start!"
                : "No one has corrected your posts yet. Keep submitting!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}