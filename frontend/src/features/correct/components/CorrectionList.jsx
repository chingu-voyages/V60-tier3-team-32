import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCorrectionQueue } from '../correctionActions';
import CorrectionCard from './CorrectionCard';
import { Loader2 } from 'lucide-react';

export default function CorrectionList({ activeFilters }) {
  const dispatch = useDispatch();
  const { queue, loading, error } = useSelector((state) => state.corrections);

  useEffect(() => {
    dispatch(fetchCorrectionQueue());
  }, [dispatch]);

  // Filtering the queue based on UI filters
  const filtered = queue.filter((item) => {
    const langMatch =
      activeFilters.language === 'All' ||
      item.language === activeFilters.language;
    const levelMatch =
      activeFilters.level === 'All' ||
      item.fluency_level === activeFilters.level;
    return langMatch && levelMatch;
  });

  console.log('Queue from Redux:', queue);
  console.log('Current Filters:', activeFilters);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#5D45FD]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-8 rounded-[32px] text-center border border-red-100">
        {error}
      </div>
    );
  }

  return (
    // Fixed the "bg-[#F8FAFF]flex" typo here
    <div className='flex flex-col gap-4 md:gap-6 px-2 md:px-0'>
      {filtered.length > 0 ? (
        filtered.map((item) => <CorrectionCard key={item.id} item={item} />)
      ) : (
        <div className='bg-white rounded-[32px] p-12 text-center border border-dashed border-gray-200 text-gray-400'>
          No submissions found for these filters.
        </div>
      )}
    </div>
  );
}