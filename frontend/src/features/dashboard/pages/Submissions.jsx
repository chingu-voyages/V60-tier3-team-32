import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SUBMISSIONS } from '../../../mocks/submissionData';

export default function Submissions() {
  const navigate = useNavigate();

  // TODO: Replace with real data from backend API
  // const { submissions } = useSubmissionStore();
  // const submissions = await fetchSubmissions();

  const submissions = MOCK_SUBMISSIONS;

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-4 py-6 md:px-12 md:py-8 font-sans'>
      {/* Header Section */}
      <div className='container mx-auto mb-8'>
        <button
          onClick={handleBack}
          className='flex items-center gap-2 text-gray-500 hover:text-[#5D45FD] transition-colors font-medium text-sm mb-6'
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h1 className='text-[28px] md:text-4xl font-bold text-gray-900 tracking-tight'>
          My Submissions
        </h1>
      </div>

      {/* Submissions List */}
      <div className='container mx-auto'>
        {submissions.length > 0 ? (
          <div className='flex flex-col gap-4 md:gap-6'>
            {submissions.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/submissions/${item.id}`, {
                    state: { submission: item },
                  });
                }}
                className='group relative bg-white border border-gray-100 
                  hover:border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer
                  lg:p-6 p-5 rounded-[28px]'
              >
                {/* Top Row */}
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-2 lg:gap-3'>
                    <span className='text-[10px] lg:text-[11px] font-bold text-[#5D45FD] bg-[#E8EDFF] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0'>
                      {item.language}
                    </span>
                    <span className='text-[11px] lg:text-xs text-gray-400 font-medium whitespace-nowrap'>
                      {item.postedAt}
                    </span>
                  </div>

                  {item.reviews && item.reviews.length > 0 && (
                    <div className='flex items-center gap-1.5 bg-[#FFF9E6] text-[#D97706] px-2.5 py-1 rounded-full border border-[#FEF3C7] shrink-0'>
                      <MessageCircle
                        size={13}
                        fill='currentColor'
                        className='opacity-80'
                      />
                      <span className='text-[10px] lg:text-[11px] font-bold whitespace-nowrap'>
                        {item.reviews.length} reviews
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className='space-y-1 min-w-0'>
                  <h3 className='text-[16px] lg:text-lg font-bold text-gray-900 group-hover:text-[#5D45FD] transition-colors leading-tight truncate'>
                    {item.title}
                  </h3>

                  <p className='text-[13px] lg:text-sm text-gray-500 truncate whitespace-nowrap'>
                    {item.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-white rounded-[32px] p-12 text-center border border-dashed border-gray-200 text-gray-400'>
            No submissions yet. Start writing to share your work!
          </div>
        )}
      </div>
    </div>
  );
}
