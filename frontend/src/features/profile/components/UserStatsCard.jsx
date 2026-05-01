import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function UserStatsCard({ user }) {
  const userInitial = user.username?.charAt(0).toUpperCase() || "U";

  return (
    /* 
       Removed 'border' and 'border-gray-100/50'.
       Added a custom shadow-subtle class or inline box-shadow to match image_578a05.png.
    */
    <Card 
      className="bg-white rounded-[40px] p-6 md:p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none"
    >
      <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-6 md:flex md:items-start md:gap-8 lg:gap-12">
        
        {/* Profile Image Section */}
        <div className="relative shrink-0">
          <div className="h-20 w-20 md:h-28 md:w-28 rounded-full bg-[#E8EDFF] flex items-center justify-center text-[#5D45FD] text-2xl md:text-4xl font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            {userInitial}
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-50 hover:bg-gray-50 transition-all active:scale-95">
            <Pencil size={12} className="md:w-3.5 md:h-3.5 text-[#5D45FD]" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col space-y-6 flex-1 min-w-0">
          {/* Name and Badge Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              {user.username}
            </h1>
            {user.isTopReviewer && (
              <Badge className="w-fit bg-[#FEF3C7] text-[#D97706] hover:bg-[#FEF3C7] border-none px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                <span className="text-[10px]">👑</span> Top Reviewer
              </Badge>
            )}
          </div>

          {/* Green Credit Pill */}
          <div className="w-full bg-[#DCFCE7] rounded-full h-9 flex items-center justify-center shadow-[0_2px_10px_rgba(34,197,94,0.1)]">
             <div className="flex items-center gap-2 text-[#059669] font-bold text-[12px]">
               <span className="text-sm">✦</span> {user.credits} credits
             </div>
          </div>

          {/* Stats Grid - Matching the visual weight of image_578a05.png */}
          <div className="grid grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 pt-2">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Prompts</p>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.stats.posts}</p>
                <p className="text-[11px] font-medium text-gray-400">posts</p>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-2xl font-bold text-gray-900">{user.stats.feedback}</p>
              <p className="text-[11px] font-medium text-gray-400">feedback</p>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Corrections</p>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.stats.given}</p>
                <p className="text-[11px] font-medium text-gray-400">given</p>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-2xl font-bold text-gray-900">{user.stats.hearts}</p>
              <div className="pt-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#6366F1" className="drop-shadow-sm">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}