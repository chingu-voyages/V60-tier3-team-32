import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

export default function RecentActivityCard({ activities = [] }) {
  return (
    <div
      className='
        /* Container Logic: Visible on large, transparent on mobile */
        lg:bg-[#EEF4FF] 
        lg:rounded-[32px]
        lg:p-8 
        lg:border lg:border-blue-50/50
        lg:shadow-sm
        
        bg-transparent
        p-0
        border-none
      '
    >
      {/* HEADER */}
      <div className='flex items-center justify-between mb-4 lg:mb-6 px-1 lg:px-2'>
        <h2 className='text-[20px] lg:text-xl font-bold text-gray-900 tracking-tight'>
          Recent Activity
        </h2>

        <Link
          to='/activity'
          className='text-sm font-bold text-[#5D45FD] hover:opacity-80 transition-opacity'
        >
          View All
        </Link>
      </div>

      {/* LIST */}
      <div className='flex flex-col gap-3'>
        {activities.map((item) => (
          <div
            key={item.id}
            className='
              group
              flex items-center justify-between 
              bg-white 
              
              /* Desktop: Slim height */
              lg:rounded-[40px] 
              lg:px-8 lg:py-3.5
              
              /* Mobile: Organic rounding */
              rounded-[2.5rem] 
              px-6 py-4
              
              border border-gray-100/80
              hover:shadow-md 
              hover:border-indigo-100
              transition-all duration-300
              cursor-pointer
            '
          >
            {/* LEFT CONTENT 
                FIX: flex-1 and min-w-0 allow this container to shrink relatively.
            */}
            <div className='flex flex-col gap-0.5 lg:gap-1 flex-1 min-w-0'>
              {/* TIME ROW */}
              <div className='flex items-center gap-2 text-[11px] lg:text-[12px] text-gray-400 font-medium'>
                <Clock size={13} strokeWidth={2.5} />
                <span>{item.time}</span>
              </div>

              {/* MESSAGE 
                  FIX: 'truncate' handles the character loss as the width decreases.
              */}
              <p className='text-[14px] lg:text-[15px] text-gray-600 leading-snug truncate'>
                <span className='text-[#5D45FD] font-semibold'>
                  {item.highlight}
                </span>{' '}
                {item.text}
              </p>
            </div>

            {/* RIGHT ICON */}
            <div className='shrink-0 ml-4'>
              <ArrowRight
                size={18}
                className='text-[#5D45FD] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
