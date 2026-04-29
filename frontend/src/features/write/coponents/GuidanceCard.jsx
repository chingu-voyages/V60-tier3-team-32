import { ArrowLeftRight } from "lucide-react"; // Swapped for the switch icon

export default function GuidanceCard() {
  const words = ["streets", "coffee", "sunrise", "word", "word"];

  return (
    <div className="bg-[#F4F7FF] rounded-[32px] p-8 border border-white/50 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Guidance
        </span>
        <div className="flex gap-2">
          {/* Language and Level Tags */}
          <span className="bg-[#E0E7FF] text-[#5D45FD] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase">
            Spanish
          </span>
          <span className="bg-[#F1F1F1] text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase">
            Beginner
          </span>
        </div>
      </div>

      {/* Instruction List */}
      <ul className="space-y-3 mb-8">
        {[
          "Write 3 simple sentences using 'I see', 'I hear', 'I feel'.",
          "Check your verb conjugation for clarity."
        ].map((text, i) => (
          <li key={i} className="flex gap-3 text-[13px] text-gray-600 leading-relaxed">
            <span className="text-[#5D45FD] font-bold">•</span> {text}
          </li>
        ))}
      </ul>

      {/* Helpful Words Section */}
      <div className="mb-8">
        <h4 className="text-[11px] font-bold text-gray-800 uppercase mb-3">Helpful words</h4>
        <div className="flex flex-wrap gap-2">
          {words.map((word, i) => (
            <span 
              key={i} 
              className="bg-[#FEF3C7] text-[#D97706] px-3 py-1 rounded-md text-[11px] font-bold border border-[#FDE68A]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* THE UPDATED SWITCH BUTTON */}
      <button className="w-full py-3 bg-white text-[#5D45FD] font-bold text-[13px] rounded-full border border-indigo-50 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors shadow-sm">
        <ArrowLeftRight size={16} strokeWidth={2.5} />
        Switch Language
      </button>
    </div>
  );
}