import ProfileSidebar from "../components/ProfileSidebar"; // Overview / Settings links
import UserStatsCard from "../components/UserStatsCard"; // The top card with credits/stats
import LanguageGrid from "../components/LanguageGrid"; // The cards for Learning/Fluent

const mockUser = {
  username: "User123",
  isTopReviewer: true,
  credits: 12,
  stats: {
    posts: 106,
    feedback: 92,
    given: 80,
    hearts: 72,
  },
};

const mockLanguages = {
  learning: [
    { name: "Spanish", level: "Beginner" },
    { name: "French", level: "Advanced" },
  ],
  fluent: ["English", "Latin"],
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] px-2 py-6 md:p-1">
      {/* Changed to 12 cols, but giving sidebar only 4 and pushing main to 8 */}
      {/* Using max-w-6xl helps keep the sidebar from becoming a giant block */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar - Now constrained */}
        <aside className="lg:col-span-4 xl:col-span-3"> 
          <ProfileSidebar />
        </aside>

        {/* Right Content */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-6">
          <UserStatsCard user={mockUser} />
          <LanguageGrid languages={mockLanguages} />
        </main>
      </div>
    </div>
  );
}