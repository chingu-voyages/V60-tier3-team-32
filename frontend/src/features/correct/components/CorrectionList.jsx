import CorrectionCard from './CorrectionCard';
import { Loader2 } from 'lucide-react';

export default function CorrectionList({
  queue = [],
  loading,
  error,
  activeFilters,
}) {
  const filteredQueue = queue.filter((item) => {
    const matchesLevel =
      activeFilters.level === 'All' ||
      item.fluency_level?.toLowerCase() === activeFilters.level.toLowerCase();

    return matchesLevel;
  });

  console.log('queue:', queue);
  console.log('activeFilters:', activeFilters);

  // Debugging the raw data from Redux
  // console.log('Redux Queue State:', queue);

  if (loading) {
    return (
      <div className='flex py-20'>
        <Loader2 className='animate-spin text-[#5D45FD]' size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 text-red-500 p-8 rounded-[32px] text-center border border-red-100'>
        {error}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 md:gap-6 px-2 md:px-0'>
      {filteredQueue && filteredQueue.length > 0 ? (
        filteredQueue.map((item) => (
          <CorrectionCard key={item._id || item.id} item={item} />
        ))
      ) : (
        <div className='bg-white rounded-[32px] p-12 text-center border border-dashed border-gray-200 text-gray-400'>
          <p className='text-lg font-medium text-gray-600 mb-2'>
            No reflections need corrections right now.
          </p>
          <p className='text-sm'>
            Check back later for new learner submissions.
          </p>
        </div>
      )}
    </div>
  );
}
