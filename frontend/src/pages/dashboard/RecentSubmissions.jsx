import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentSubmissions({ submissions = [] }) {
  return (
    <div
      className="
        lg:bg-[#EEF4FF] lg:rounded-[32px] lg:p-8 lg:shadow-sm lg:border lg:border-blue-50/50
        bg-transparent p-0 border-none
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 lg:mb-6 px-1 lg:px-2">
        <h2 className="text-[20px] lg:text-xl font-bold text-gray-900 tracking-tight">
          Recent Submissions
        </h2>
        <Link
          to="/submissions"
          className="text-sm font-bold text-[#5D45FD] hover:opacity-80 transition-opacity"
        >
          View All
        </Link>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3 lg:gap-4">
        {submissions.map((item) => (
          <div
            key={item.id}
            className="
              group relative bg-white border border-gray-100 
              hover:border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer
              lg:p-6 lg:rounded-[28px]
              p-5 rounded-[2.5rem]
            "
          >
            {/* Top Row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 lg:gap-3">
                <span className="text-[10px] lg:text-[11px] font-bold text-[#5D45FD] bg-[#E8EDFF] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                  {item.language}
                </span>
                <span className="text-[11px] lg:text-xs text-gray-400 font-medium whitespace-nowrap">
                  {item.time}
                </span>
              </div>

              {item.comments > 0 && (
                <div className="flex items-center gap-1.5 bg-[#FFF9E6] text-[#D97706] px-2.5 py-1 rounded-full border border-[#FEF3C7] shrink-0">
                  <MessageCircle size={13} fill="currentColor" className="opacity-80" />
                  <span className="text-[10px] lg:text-[11px] font-bold whitespace-nowrap">
                    {item.comments} reviews
                  </span>
                </div>
              )}
            </div>

            {/* Content Section: Using truncate for strict single-line behavior */}
            <div className="space-y-1 min-w-0">
              <h3 className="text-[16px] lg:text-lg font-bold text-gray-900 group-hover:text-[#5D45FD] transition-colors leading-tight truncate">
                {item.title}
              </h3>
              
              {/* THE FIX: Swapped line-clamp for truncate + whitespace-nowrap */}
              <p className="text-[13px] lg:text-sm text-gray-500 truncate whitespace-nowrap">
                {item.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}