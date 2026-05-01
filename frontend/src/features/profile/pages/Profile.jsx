import ProfileSidebar from "../components/ProfileSidebar";
import UserStatsCard from "../components/UserStatsCard";
import LanguageGrid from "../components/LanguageGrid";

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
    // Minimal horizontal padding on mobile to respect App.jsx global padding
    <div className="min-h-screen bg-[#F8FAFF] px-1 py-4 md:px-4 md:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 
          Left Sidebar: 
          - hidden by default (mobile/tablet)
          - flex on lg screens (desktop)
        */}
        <aside className="hidden lg:flex lg:flex-col lg:col-span-4 xl:col-span-3 sticky top-8">
          <ProfileSidebar />
        </aside>

        {/* 
          Right Content: 
          - Full width on mobile/tablet
          - 8/12 or 9/12 on desktop
        */}
        <main className="col-span-1 lg:col-span-8 xl:col-span-9 space-y-6">
          <UserStatsCard user={mockUser} />

          {/* 
             Heading for the section - often helpful when the sidebar is gone 
             to give the user context of where they are.
          */}

          <LanguageGrid languages={mockLanguages} />
        </main>
      </div>
    </div>
  );
}
