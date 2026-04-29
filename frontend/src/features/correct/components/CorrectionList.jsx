import CorrectionCard from './CorrectionCard';
import { useSubmissionStore } from '../../../app/hooks/useSubmissionStore';

export default function CorrectionList({ activeFilters }) {
  const { submissions } = useSubmissionStore();

  const filtered = submissions.filter((item) => {
    const langMatch =
      activeFilters.language === 'All' ||
      item.language === activeFilters.language;
    const levelMatch =
      activeFilters.level === 'All' || item.level === activeFilters.level;
    return langMatch && levelMatch;
  });

  return (
    <div className='bg-[#F8FAFF]flex flex-col gap-4 md:gap-6 px-2 md:px-0'>
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
