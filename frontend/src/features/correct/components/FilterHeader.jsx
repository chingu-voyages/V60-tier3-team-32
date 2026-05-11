import { ChevronDown, Globe, BarChart3 } from 'lucide-react';

export default function FilterHeader({ filters, setFilters }) {
  const options = {
    // Language: ["All", "Spanish", "English", "French"],
    Level: ['All', 'Beginner', 'Intermediate', 'Advanced'],
  };

  const handleUpdate = (key, value) => {
    setFilters((prev) => ({ ...prev, [key.toLowerCase()]: value }));
  };

  return (
    <div className='space-y-3 md:space-y-4 px-3 md:px-0'>
      {['Level'].map((label) => (
        <div key={label} className='flex items-center gap-4'>
          <span className='text-[14px] md:text-[15px] font-bold text-[#1A1A1A] w-20 md:w-24'>
            {label}:
          </span>
          <div className='relative flex-1 max-w-sm'>
            <select
              value={filters[label.toLowerCase()]}
              onChange={(e) => handleUpdate(label, e.target.value)}
              className='w-full appearance-none bg-white border border-gray-100 rounded-[12px] px-10 py-2.5 text-[13px] font-medium text-gray-600 outline-none focus:ring-2 focus:ring-indigo-50 cursor-pointer'
            >
              {options[label].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'>
              {label === 'Language' ? (
                <Globe size={16} />
              ) : (
                <BarChart3 size={16} />
              )}
            </div>
            <ChevronDown
              size={16}
              className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
