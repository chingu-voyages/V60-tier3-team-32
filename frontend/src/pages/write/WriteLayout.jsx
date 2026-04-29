import PromptDetails from "./PromptDetails";
import GuidanceCard from "./GuidanceCard";
import WritingArea from "./WritingArea";

export default function WriteLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] px-4 py-6 md:p-8 pb-24 md:pb-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* LEFT COLUMN: 5 Columns */}
        <aside className="lg:col-span-5 space-y-6">
          <PromptDetails />
          <GuidanceCard />
        </aside>

        {/* RIGHT COLUMN: 7 Columns */}
        <main className="lg:col-span-7">
          <WritingArea />
        </main>

      </div>
    </div>
  );
}