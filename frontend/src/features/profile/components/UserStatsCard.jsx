import { Pencil } from "lucide-react"; // Import for the edit icon on the avatar
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function UserStatsCard({ user }) {
  const userInitial = user.username?.charAt(0).toUpperCase() || "U";

  return (
    <Card className="bg-white rounded-[32px] p-8 lg:p-12 shadow-sm border border-gray-100/50">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        
        {/* Profile Image Section with Edit Button */}
        <div className="relative">
          <div className="h-28 w-28 rounded-full bg-[#E8EDFF] flex items-center justify-center text-[#5D45FD] text-4xl font-medium shadow-inner">
            {userInitial}
          </div>
          <button className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
            <Pencil size={14} className="text-[#5D45FD]" />
          </button>
        </div>

        <div className="flex-1 w-full space-y-6">
          {/* Name and Top Reviewer Badge */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
            {user.isTopReviewer && (
              <Badge className="bg-[#FEF3C7] text-[#D97706] hover:bg-[#FEF3C7] border-none px-3 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                <span className="text-[8px]">★</span> Top Reviewer
              </Badge>
            )}
          </div>

          {/* Green Credit Pill - Exact match to design */}
          <div className="w-full bg-[#DCFCE7] rounded-full h-8 flex items-center justify-center relative overflow-hidden">
             <div className="flex items-center gap-1.5 text-[#059669] font-bold text-xs z-10">
               <span className="text-sm">✦</span> 12 credits
             </div>
          </div>

          {/* Stats Grid - Minimalist Layout */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-2">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-gray-800">Prompts</p>
              <p className="text-xl font-bold text-gray-900">{user.stats.posts}</p>
              <p className="text-[10px] font-medium text-gray-400">posts</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-xl font-bold text-gray-900">{user.stats.feedback}</p>
              <p className="text-[10px] font-medium text-gray-400 mt-5">feedback</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-gray-800">Corrections</p>
              <p className="text-xl font-bold text-gray-900">{user.stats.given}</p>
              <p className="text-[10px] font-medium text-gray-400">given</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-xl font-bold text-gray-900">{user.stats.hearts}</p>
              <div className="pt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#5D45FD" xmlns="http://www.w3.org/2000/svg">
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
