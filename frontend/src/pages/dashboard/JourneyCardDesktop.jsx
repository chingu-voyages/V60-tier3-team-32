import { Card, CardContent } from "@/components/ui/card";

export default function JourneyCardDesktop({ languages }) {
  return (
    <Card className="bg-[#F3F6FF] rounded-[2.5rem] border-none shadow-none p-6">
      <CardContent className="p-0 space-y-6">
        <h3 className="text-xl font-bold text-slate-800">Your Journey</h3>

        {/* Credits Badge - Full Width for Sidebar */}
        <div className="bg-[#e7faf0] border border-[#A7F3D0] py-2 px-5 rounded-[1.5rem] flex items-center gap-3 shadow-sm">
          <span className="text-xl text-[#065F46]">✦</span> 
          <span className="text-[#064E3B] font-extrabold text-lg tracking-tight">
            12 credits
          </span>
        </div>

        <div className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.name} className="bg-white p-5 rounded-[1.5rem] flex items-center gap-4 shadow-sm border border-slate-100">
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: lang.color }}>
                <span style={{ color: lang.iconColor }}>文</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Learning</p>
                <p className="font-bold text-slate-900 text-[15px]">{lang.name}</p>
                <p className="text-[11px] text-slate-500 italic">{lang.level}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}