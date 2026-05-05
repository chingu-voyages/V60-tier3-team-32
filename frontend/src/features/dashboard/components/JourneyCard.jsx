import { getLevelStyles } from '@/utils/utils';

export default function JourneyCard({ languages = [] }) {
  return (
    <div
      className='
        bg-indigo-50 rounded-[32px] p-6 lg:p-8 shadow-sm border border-gray-100
      '
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2
          className='text-xl lg:text-2xl font-bold text-gray-900 tracking-tight
        '
        >
          Your Journey
        </h2>

        <div className='bg-[#DCFCE7] text-[#059669] px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#BBF7D0]'>
          <span className='text-sm font-bold'>✦</span>
        </div>
      </div>

      {/* container switches layout based on screen */}
      <div
        className='
          flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x
          lg:flex-col lg:overflow-visible lg:gap-4
        '
      >
        {languages.length === 0 ? (
          <p className='text-sm text-gray-500'>No languages yet.</p>
        ) : (
          languages.map((lang) => {
            const style = getLevelStyles(lang.level);

            return (
              <div
                key={lang.code || lang.name}
                className='
                  min-w-[165px] w-[calc(50%-6px)] flex-none
                  flex items-center gap-3 bg-white p-4 rounded-[2rem]
                  border border-gray-100 shadow-sm snap-start
                  
                  lg:min-w-0 lg:w-full lg:rounded-[20px]
                '
              >
                {/* Icon */}
                <div
                  className={`
                    h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold
                    ${style.bg} ${style.text}
                  `}
                >
                  <span>文</span>
                </div>

                {/* Text */}
                <div className='flex flex-col min-w-0'>
                  <p className='text-[9px] uppercase text-gray-400 font-extrabold tracking-widest mb-0.5'>
                    LEARNING
                  </p>

                  <p className='font-bold text-gray-900 text-[15px] leading-tight truncate'>
                    {lang.name}
                  </p>

                  <p className='text-[11px] text-gray-400 font-medium truncate'>
                    {lang.level}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
