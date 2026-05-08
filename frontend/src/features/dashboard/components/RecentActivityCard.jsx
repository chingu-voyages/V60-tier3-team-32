import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function RecentActivityCard({ activities = [] }) {
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
          to='/submissions?status=corrected'
          className='text-sm font-bold text-[#5D45FD] hover:opacity-80 transition-opacity'
        >
          View All
        </Link>
      </div>

      <div className='flex flex-col gap-3'>
        {activities.length === 0 ? (
          <div className='bg-white border border-gray-100/80 rounded-[2.5rem] px-6 py-4 lg:rounded-[40px] lg:px-8 lg:py-4'>
            <p className='text-sm text-gray-500'>No corrected posts yet.</p>
          </div>
        ) : (
          activities.map((item) => (
            <div
              key={item.id}
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
                <div className='flex items-center gap-2 text-[11px] lg:text-[12px] text-[#D97706] font-bold'>
                  <MessageCircle size={13} strokeWidth={2.5} />
                  <span>
                    {item.corrections_count || 0}{' '}
                    {(item.corrections_count || 0) === 1
                      ? 'correction'
                      : 'corrections'}
                  </span>
                </div>

                <p className='text-[14px] lg:text-[15px] text-gray-600 leading-snug truncate'>
                  <span className='text-[#5D45FD] font-semibold'>
                    {item.prompt?.title || 'Untitled prompt'}
                  </span>{' '}
                  was corrected.
                </p>

                <p className='text-[13px] text-gray-400 truncate'>
                  {item.preview || item.content}
                </p>
              </div>

              <div className='shrink-0 ml-4'>
                <ArrowRight
                  size={18}
                  className='text-[#5D45FD] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all'
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
