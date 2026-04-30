import { RefreshCw, Sparkles } from "lucide-react";

export default function PromptDetails() {
  return (
    <div className="bg-[#EEF2FF] rounded-[32px] p-8 relative overflow-hidden border border-indigo-50">
      <div className="flex items-center gap-2 text-[#5D45FD] mb-4">
        <Sparkles size={16} fill="currentColor" />
        <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Prompt of the Day</span>
      </div>

      <div className="space-y-4 mb-8">
        <h1 className="text-2xl lg:text-[28px] font-bold text-[#2D2D5F] leading-tight">
          Describe the feeling of a quiet morning in a city you love.
        </h1>
        <p className="text-gray-500 text-[15px] leading-relaxed">
          Imagine a city you love on a quiet morning before the crowds arrive. 
          Think about how the streets look, the sounds in the distance, and the feeling in the air.
        </p>
      </div>

      <button className="w-full py-3 bg-white hover:bg-gray-50 text-[#5D45FD] font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-sm border border-indigo-50/50">
        <RefreshCw size={16} /> New Prompt
      </button>
      
      <div className="mt-4 text-center">
        <span className="text-[11px] text-gray-400 font-medium italic">1 free submission today</span>
      </div>
    </div>
  );
}