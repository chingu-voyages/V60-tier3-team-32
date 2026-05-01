import ProfileSidebar from "../components/ProfileSidebar";
import UserStatsCard from "../components/UserStatsCard";

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

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] px-4 py-6 md:p-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar - Navigation */}
        <aside className="lg:col-span-3">
          <ProfileSidebar />
        </aside>

        {/* Right Content - Stats & Languages */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Section: Avatar, Credits, and Stats */}
          <UserStatsCard user={mockUser} />
          
        </main>
      </div>
    </div>
  );
}
