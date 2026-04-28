import { Globe } from "lucide-react";

export default function FluentLanguages() {
  const languages = [
    { 
      name: "Spanish", 
      iconColor: "text-blue-500", 
      bgColor: "bg-blue-100/50" 
    },
    { 
      name: "French", 
      iconColor: "text-orange-400", 
      bgColor: "bg-orange-100/50" 
    },
    { 
      name: "English", 
      iconColor: "text-emerald-400", 
      bgColor: "bg-emerald-100/50" 
    }
  ];

  return (
    <div className="bg-[#EEF4FF] rounded-[32px] p-8 border border-white/50">
      <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-8 tracking-tight">
        Native/Fluent Languages
      </h2>
      
      <div className="space-y-4">
        {languages.map((lang) => (
          <div 
            key={lang.name} 
            className="flex items-center gap-4 bg-white p-2.5 pl-3 rounded-full border border-gray-50 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            {/* The Globe Icon Container */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lang.bgColor} shrink-0`}>
              <Globe size={20} className={lang.iconColor} />
            </div>
            
            <span className="text-[17px] font-semibold text-gray-800">
              {lang.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}