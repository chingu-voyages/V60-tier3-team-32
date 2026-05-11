import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, PenTool } from 'lucide-react';

export default function RecentActivityCard({ activities = [], isLoading = false }) {
  return (
    <div
      className='
        lg:bg-[#EEF4FF] lg:rounded-[32px] lg:p-8 lg:border lg:border-blue-50/50 lg:shadow-sm
        bg-transparent p-0 border-none
      '
    >
      <div className='flex items-center justify-between mb-4 lg:mb-6 px-1 lg:px-2'>
        <h2 className='text-[20px] lg:text-xl font-bold text-gray-900 tracking-tight'>
          Recent Activity
        </h2>

        <Link
          to='/my-corrections'
          className='text-sm font-bold text-[#5D45FD] hover:opacity-80 transition-opacity'
        >
          View All
        </Link>
      </div>

      <div className='flex flex-col gap-3'>
        {isLoading ? (
          <div className='bg-white border border-gray-100/80 rounded-[2.5rem] px-6 py-4 lg:rounded-[40px] animate-pulse'>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-3/4"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className='bg-white border border-gray-100/80 rounded-[2.5rem] px-6 py-4 lg:rounded-[40px] lg:px-8 lg:py-4'>
            <p className='text-sm text-gray-500'>No recent activity yet.</p>
          </div>
        ) : (
          activities.slice(0, 3).map((item) => {
            const isReceived = item.type === 'received';

            return (
              <Link
                key={item.id}
                to={`/submissions/${item.post?.id}`}
                className='
                  group flex items-center justify-between bg-white
                  lg:rounded-[40px] lg:px-8 lg:py-3.5
                  rounded-[2.5rem] px-6 py-4
                  border border-gray-100/80
                  hover:shadow-md hover:border-indigo-100
                  transition-all duration-300 cursor-pointer
                '
              >
                <div className='flex flex-col gap-0.5 lg:gap-1 flex-1 min-w-0'>
                  {/* Dynamic Label and Icon */}
                  <div className={`flex items-center gap-2 text-[11px] lg:text-[12px] font-bold uppercase tracking-wider ${isReceived ? 'text-[#D97706]' : 'text-indigo-500'}`}>
                    {isReceived ? (
                      <MessageCircle size={13} strokeWidth={2.5} />
                    ) : (
                      <PenTool size={13} strokeWidth={2.5} />
                    )}
                    <span>
                      {isReceived ? 'Feedback Received' : 'You Corrected'}
                    </span>
                  </div>

                  <p className='text-[14px] lg:text-[15px] text-gray-600 leading-snug truncate'>
                    <span className='text-gray-900 font-bold'>
                       {isReceived ? `@${item.corrector?.username}` : 'You'}
                    </span>
                    {' '}improved{' '}
                    <span className='text-[#5D45FD] font-semibold italic'>
                      "{item.post?.prompt?.title || 'Entry'}"
                    </span>
                  </p>

                  <p className='text-[13px] text-gray-400 truncate italic'>
                    "{item.corrected_preview}"
                  </p>
                </div>

                <div className='shrink-0 ml-4'>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-[#5D45FD] transition-colors">
                    <ArrowRight
                      size={16}
                      className='text-[#5D45FD] group-hover:text-white transition-all'
                    />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
} 