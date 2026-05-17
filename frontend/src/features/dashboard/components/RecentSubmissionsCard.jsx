import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusBgColor = {
  draft: 'bg-yellow-100',
  submitted: 'bg-blue-100',
  corrected: 'bg-green-100',
};

export default function RecentSubmissionsCard({ submissions = [] }) {
  return (
    <div
      className='
        lg:bg-indigo-50
        lg:rounded-[32px]
        lg:p-8 
        lg:border lg:border-blue-50/50
        lg:shadow-sm
        
        bg-transparent
        p-0
        border-none
      '
    >
      <div className='flex items-center justify-between mb-4 lg:mb-6 px-1 lg:px-2'>
        <h2 className='text-[20px] lg:text-xl font-bold text-gray-900 tracking-tight'>
          Recent Submissions
        </h2>

        <Link
          to='/submissions'
          className='text-sm font-bold text-[#5D45FD] hover:opacity-80 transition-opacity'
        >
          View All
        </Link>
      </div>

      <div className='flex flex-col gap-6 lg:gap-4'>
        {submissions.length === 0 ? (
          <div className='bg-white border border-gray-100 p-5 rounded-[2.5rem] lg:p-6 lg:rounded-[28px]'>
            <p className='text-sm text-gray-500'>No submissions yet.</p>
          </div>
        ) : (
          submissions.map((item) => {
            const id = item.id;
            const route =
              item.status === 'draft'
                ? `/write/${item.id}`
                : `/submissions/${item.id}`;

            return (
              <Link to={route} key={id} className='block'>
                <div
                  className='
                  group relative bg-white border border-gray-100 
                  hover:border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer
                  lg:p-6 lg:rounded-[28px]
                  p-5 rounded-[2.5rem]
                '
                >
                  <div className='flex items-start justify-between mb-3'>
                    <span className='text-[10px] lg:text-[11px] font-bold text-[#5D45FD] bg-[#E8EDFF] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0'>
                      {item.language}
                    </span>

                    <span
                      className={`text-[10px] lg:text-[11px] font-bold text-[#5D45FD] ${statusBgColor[item.status]}  px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0`}
                    >
                      {item.status}
                    </span>

                    {item.comments > 0 && (
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
                    )}
                  </div>

                  <div className='space-y-1 min-w-0'>
                    <h3 className='text-[16px] lg:text-lg font-bold text-gray-900 group-hover:text-[#5D45FD] transition-colors leading-tight truncate'>
                      {item.title}
                    </h3>

                    <p className='text-[13px] lg:text-sm text-gray-500 truncate whitespace-nowrap'>
                      {item.preview}
                    </p>
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
