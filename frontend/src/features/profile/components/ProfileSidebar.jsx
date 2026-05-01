import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

export default function ProfileSidebar() {
  const activeLink = "Overview";
  // Updated list to match the visual hierarchy of your design
  const links = ["Overview", "Account Settings"];

  return (
    <nav className="bg-[#EBF2FF] rounded-[32px] p-6 space-y-3">
      <h2 className="px-4 text-xl font-bold text-gray-800 mb-6">Profile</h2>
      
      {links.map((link) => {
        const isActive = link === activeLink;
        
        return (
          <Button
            key={link}
            variant="ghost"
            className={cn(
              "w-full justify-center text-[10px] font-bold tracking-widest uppercase h-12 transition-all",
              isActive 
                ? "bg-[#E8EDFF] text-[#5D45FD] rounded-full shadow-sm" // Pill shape for active
                : "bg-transparent text-[#5D45FD]/60 hover:text-[#5D45FD] border border-gray-200 rounded-full" // Outlined for inactive
            )}
          >
            {link}
          </Button>
        );
      })}
    </nav>
  );
}
