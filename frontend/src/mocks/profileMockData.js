/**
 * Mock Data for Profile Feature
 * Structure designed to mirror API responses for easy real data integration
 */

export const mockUserProfile = {
  id: "user-1",
  username: "User123",
  avatar: "U",
  status: "No Submissions",
  statusColor: "bg-green-100 text-green-700"
};

export const mockStats = [
  {
    id: "stat-1",
    label: "Submissions",
    value: 0
  },
  {
    id: "stat-2",
    label: "Corrections",
    value: 0
  },
  {
    id: "stat-3",
    label: "Streak",
    value: 0
  },
  {
    id: "stat-4",
    label: "XP",
    value: 0
  }
];

export const mockLanguages = {
  fluent: [
    { id: 1, name: "Spanish", icon: "🇪🇸" },
    { id: 2, name: "French", icon: "🇫🇷" }
  ],
  learning: [
    { id: 3, name: "English", icon: "🇬🇧" },
    { id: 4, name: "Latin", icon: "📜" }
  ]
};

export const mockMenuItems = [
  { id: "overview", label: "OVERVIEW", isActive: true },
  { id: "settings", label: "ACCOUNT SETTINGS", isActive: false }
];
