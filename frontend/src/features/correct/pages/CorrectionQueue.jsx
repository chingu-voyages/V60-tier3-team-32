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
    <div className='min-h-screen bg-[#F8FAFF] px-1 pt-6 pb-24 md:px-12 md:py-8'>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
        <aside className='hidden lg:block lg:col-span-4'>
          <FluentLanguagesCard />
        </aside>

        <main className='lg:col-span-8 space-y-6 md:space-y-8'>
          {/* 2. Pass the state and the setter function as props */}
          <FilterHeader filters={filters} setFilters={setFilters} />

          <div className='pb-4'>
            {/* 3. Pass the active filters to the feed so it can filter the cards */}
            <CorrectionList activeFilters={filters} />
          </div>
        </main>
      </div>
    </div>
  );
}
