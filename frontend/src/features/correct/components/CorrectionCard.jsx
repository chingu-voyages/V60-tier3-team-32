// import { useNavigate } from "react-router-dom";
// import { Clock, FileText } from "lucide-react";

// export default function CorrectionCard({ item }) {
//   const navigate = useNavigate();

//   const handleCorrectClick = () => {
//     navigate("/corrections", { state: { submission: item } });
//   }

//   return (
//     /* Responsive Padding: p-4 for small mobile, p-6 for medium, p-8 for desktop.
//        Responsive Rounding: [24px] for mobile, [32px] for desktop.
//     */
//     <div className="bg-white rounded-[24px] md:rounded-[32px] p-2 sm:p-2 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">

//       {/* Top Header Row - Tighter margins for mobile */}
//       <div className="flex justify-between items-center mb-3 md:mb-4">
//         <div className="flex gap-2 items-center">
//           <span className="bg-[#E0E7FF] text-[#5D45FD] px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
//             {item.language}
//           </span>
//           <span className="bg-[#F1F1F1] text-gray-600 px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase">
//             {item.level}
//           </span>
//         </div>
//         <span className="text-[11px] md:text-[12px] text-gray-400 font-medium">{item.postedAt}</span>
//       </div>

//       {/* Content Section - Adjusted font for mobile readability */}
//       <div className="mb-4 md:mb-5">
//         <h3 className="text-[16px] md:text-[18px] font-bold text-[#1A1A1A] mb-1 md:mb-1.5">{item.title}</h3>
//         <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed line-clamp-2">
//           {item.excerpt}
//         </p>
//       </div>

//       {/* Meta Icons - Reduced gap on small screens */}
//       <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-6 text-gray-400">
//         <div className="flex items-center gap-1.5">
//           <FileText size={12} className="opacity-70 md:w-[14px] md:h-[14px]" />
//           <span className="text-[11px] md:text-[12px] font-bold">{item.words} words</span>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <Clock size={12} className="opacity-70 md:w-[14px] md:h-[14px]" />
//           <span className="text-[11px] md:text-[12px] font-bold">~{item.readingTime} mins</span>
//         </div>
//       </div>

//       {/* Action Button - Responsive padding for better touch targets */}
//       <button
//         onClick={handleCorrectClick}
//         className="w-full py-3.5 md:py-3 bg-[#5D45FD] hover:bg-[#4a36cc] text-white font-bold text-[13px] md:text-[14px] rounded-full shadow-sm transition-all active:scale-[0.98]">
//         Correct Now
//       </button>
//     </div>
//   );
// }

import { useNavigate } from 'react-router-dom';
import { Clock, FileText, CheckCircle } from 'lucide-react';

export default function CorrectionCard({ item }) {
  const navigate = useNavigate();

  // Check if this submission already has a review in your localStorage store
  const hasReview = item.reviews && item.reviews.length > 0;

  const handleCorrectClick = () => {
    navigate(`/correct/${item.id}`, { state: { submission: item } });
  };
  const handleViewReview = () => {
    navigate(`/correct/${item.id}/review`, { state: { submission: item } });
  };

  return (
    /* Responsive Padding: p-2 for small mobile, p-8 for desktop.
       Responsive Rounding: [24px] for mobile, [32px] for desktop.
    */
    <div className='bg-white rounded-[24px] md:rounded-[32px] p-4 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all'>
      {/* Top Header Row */}
      <div className='flex justify-between items-center mb-3 md:mb-4'>
        <div className='flex gap-2 items-center'>
          <span className='bg-[#E0E7FF] text-[#5D45FD] px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wider'>
            {item.language}
          </span>
          <span className='bg-[#F1F1F1] text-gray-600 px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase'>
            {item.level}
          </span>
          {hasReview && (
            <span className='flex items-center gap-1 bg-[#E8FFF3] text-[#10B981] px-2 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase border border-[#D1FAE5]'>
              <CheckCircle size={10} />
              Reviewed
            </span>
          )}
        </div>
        <span className='text-[11px] md:text-[12px] text-gray-400 font-medium'>
          {item.postedAt}
        </span>
      </div>

      {/* Content Section */}
      <div className='mb-4 md:mb-5'>
        <h3 className='text-[16px] md:text-[18px] font-bold text-[#1A1A1A] mb-1 md:mb-1.5'>
          {item.title}
        </h3>
        <p className='text-[13px] md:text-[14px] text-gray-500 leading-relaxed line-clamp-2'>
          {item.excerpt}
        </p>
      </div>

      {/* Meta Icons */}
      <div className='flex items-center gap-4 md:gap-5 mb-5 md:mb-6 text-gray-400 border-b border-gray-50 pb-5'>
        <div className='flex items-center gap-1.5'>
          <FileText size={12} className='opacity-70 md:w-[14px] md:h-[14px]' />
          <span className='text-[11px] md:text-[12px] font-bold'>
            {item.words} words
          </span>
        </div>
        <div className='flex items-center gap-1.5'>
          <Clock size={12} className='opacity-70 md:w-[14px] md:h-[14px]' />
          <span className='text-[11px] md:text-[12px] font-bold'>
            ~{item.readingTime} mins
          </span>
        </div>
      </div>

      {/* Action Button - Dynamic based on review status */}
      {hasReview ? (
        <button
          onClick={handleViewReview}
          className='w-full py-3.5 md:py-3 bg-white border-2 border-[#5D45FD] text-[#5D45FD] hover:bg-indigo-50 font-bold text-[13px] md:text-[14px] rounded-full transition-all active:scale-[0.98]'
        >
          View Review
        </button>
      ) : (
        <button
          onClick={handleCorrectClick}
          className='w-full py-3.5 md:py-3 bg-[#5D45FD] hover:bg-[#4a36cc] text-white font-bold text-[13px] md:text-[14px] rounded-full shadow-sm transition-all active:scale-[0.98]'
        >
          Correct Now
        </button>
      )}
      <button
        onClick={handleCorrectClick}
        className='w-full py-3.5 md:py-3 bg-[#5D45FD] hover:bg-[#4a36cc] text-white font-bold text-[13px] md:text-[14px] rounded-full shadow-sm transition-all active:scale-[0.98]'
      >
        Correct Now
      </button>
    </div>
  );
}
