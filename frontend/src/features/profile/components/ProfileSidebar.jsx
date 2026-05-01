import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

export default function ProfileSidebar() {
  const activeLink = "Overview";
  const links = ["Overview", "Account Settings"];

  return (
    <nav className="bg-[#EEF2FF] rounded-[40px] p-3 py-8 space-y-4">
      {/* "Profile" remains bold and dark */}
      <h2 className="px-4 text-[26px] font-bold text-black mb-8 tracking-tight">
        Profile
      </h2>
      
      <div className="flex flex-col gap-3">
        {links.map((link) => {
          const isActive = link === activeLink;
          
          return (
            <Button
              key={link}
              variant="ghost"
              className={cn(
                // text-xs with font-normal/medium and high tracking for that elegant look
                "w-full justify-center text-[11px] font-medium tracking-[0.2em] uppercase h-14 rounded-full transition-all",
                isActive 
                  ? "bg-[#E0E7FF] text-[#3730A3]" 
                  : "bg-[#F8FAFF]/50 text-[#3730A3] border border-gray-200 hover:bg-white"
              )}
            >
              {link}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}