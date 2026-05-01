import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Pencil, Languages, Globe } from "lucide-react"; 
import { cn } from "@/utils/utils"; 

export default function LanguageGrid({ languages }) {
  
  return (
    <div className="w-full space-y-4">
      
      {/* Header - Minimalist as per image_4d01da.png */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Languages</h2>
        
        <Link to="/edit-languages">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl border-gray-200 text-[#5D45FD] font-medium text-sm gap-2 h-9 px-4 hover:bg-gray-50 transition-all"
          >
            <Pencil size={14} /> Edit
          </Button>
        </Link>
      </div>

      {/* Learning Section - Flex/Grid to keep them side-by-side */}
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {languages.learning.map((lang, i) => (
          <div 
            key={i} 
            className="flex-1 min-w-[160px] bg-white rounded-[40px] p-6 border-[1.5px] border-gray-100 shadow-sm"
          >
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Learning</p>
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-3 rounded-2xl shrink-0",
                i === 0 ? "bg-[#E8EDFF] text-[#5D45FD]" : "bg-[#FFF7ED] text-[#F59E0B]"
              )}>
                <Languages size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{lang.name}</h3>
                <p className="text-sm font-medium text-gray-500">{lang.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fluent Section - Wide Card */}
      <div className="bg-white rounded-[40px] p-8 border-[1.5px] border-gray-100 shadow-sm">
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Fluent</p>
        <div className="space-y-5">
          {languages.fluent.map((lang, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-2xl shrink-0",
                i % 2 === 0 ? "bg-[#E8EDFF] text-[#5D45FD]" : "bg-[#FFF7ED] text-[#F59E0B]"
              )}>
                <Globe size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{lang}</h3>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}