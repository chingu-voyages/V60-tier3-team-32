import { useState } from 'react';

import FilterHeader from '../components/FilterHeader';
import FluentLanguagesCard from '@/features/correct/components/FluentLanguagesCard';
import CorrectionList from '../components/CorrectionList';

export default function CorrectionQueue() {
  // 1. Initialize the filter state here
  const [filters, setFilters] = useState({
    language: 'All',
    level: 'All',
  });

  return (
    <div className='min-h-screen flex flex-col  bg-[#F8FAFF] py-6 pb-24 md:px-28 md:py-8'>
      {/* <aside className='hidden lg:block lg:col-span-4'>
          <FluentLanguagesCard />
        </aside> */}

      {/* 2. Pass the state and the setter function as props */}
      <FilterHeader filters={filters} setFilters={setFilters} />

      <div className='px-4 mt-4'>
        {/* 3. Pass the active filters to the feed so it can filter the cards */}
        <CorrectionList activeFilters={filters} />
      </div>
    </div>
  );
}
