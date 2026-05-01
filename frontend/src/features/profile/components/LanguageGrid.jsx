import { Button } from "@/components/ui/button";
import { Pencil, Languages, Globe } from "lucide-react"; 

export default function LanguageGrid({ languages }) {
  
  return (
    <div className="bg-[#EBF2FF] rounded-[32px] p-8 lg:p-10 space-y-6">
      
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Languages</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-white/50 border-gray-200 text-[#5D45FD] font-bold text-[10px] uppercase tracking-widest gap-2 px-4"
        >
          <Pencil size={12} /> Edit
        </Button>
      </div>

      {/* Learning Section - Side by Side Pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.learning.map((lang, i) => (
          <div key={i} className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Learning</p>
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-full",
                i === 0 ? "bg-[#E8EDFF] text-[#5D45FD]" : "bg-[#FFF7ED] text-[#F59E0B]"
              )}>
                <Languages size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{lang.name}</h3>
                <p className="text-xs font-semibold text-gray-400">{lang.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fluent Section - Single Large Pill */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100/50">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Fluent</p>
        <div className="space-y-6">
          {languages.fluent.map((lang, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-full",
                i === 0 ? "bg-[#E8EDFF] text-[#5D45FD]" : "bg-[#FFF7ED] text-[#F59E0B]"
              )}>
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{lang}</h3>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

// Simple helper for conditional classes if you haven't imported your utility
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}