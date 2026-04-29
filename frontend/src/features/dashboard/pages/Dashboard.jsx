import JourneyCard from '../components/JourneyCard';
import RecentActivityCard from '../components/RecentActivityCard';

import RecentActivity from '../components/RecentActivityCard';
import RecentSubmissionsCard from '../components/RecentSubmissionsCard';
import RecentSubmissions from '../components/RecentSubmissionsCard';
import PromptCard from '@/components/shared/PromptCard';

const mockLanguages = [{ name: 'Spanish' }, { name: 'French' }];

const mockActivities = [
  {
    id: 1,
    highlight: 'Reviewer2',
    text: 'replied to your prompt "[prompt title]".',
    time: '2 hours ago',
  },
  {
    id: 2,
    highlight: 'User1',
    text: 'replied to your correction for "[prompt title if very long...]".',
    time: '8 hours ago',
  },
  {
    id: 3,
    highlight: 'Reviewer2',
    text: 'reviewed your prompt "[prompt title]".',
    time: '2 days ago',
  },
];

const mockSubmissions = [
  {
    id: 1,
    language: 'Spanish',
    time: '2 hours ago',
    title: 'Prompt title',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur. Volutpat in enim feugiat justo.',
    comments: 0,
  },
  {
    id: 2,
    language: 'French',
    time: 'Yesterday',
    title: 'Prompt title',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur. Volutpat in enim feugiat justo.',
    comments: 2,
  },
  {
    id: 3,
    language: 'French',
    time: 'March 21, 2026',
    title: 'Prompt title',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur. Volutpat in enim feugiat justo.',
    comments: 6,
  },
];

export default function Dashboard() {
  return (
    <div className='min-h-screen bg-[#F8FAFF] px-1 py-4 md:p-8 pb-5 md:pb-8'>
      {/* The grid stays 1 column on mobile and 12 columns on LG screens.
         We use 'flex-col' on small screens to ensure the Sidebar (JourneyCard) 
         is physically first in the DOM/Visual order.
      */}
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        {/* TOP on Mobile / LEFT Sidebar on Desktop */}
        <aside className='lg:col-span-4 order-1'>
          <JourneyCard languages={mockLanguages} />
        </aside>

        {/* MAIN FEED: Prompt, Activity, Submissions */}
        <main className='lg:col-span-8 space-y-6 lg:space-y-8 order-2'>
          <PromptCard />

          <RecentActivityCard activities={mockActivities} />

          <RecentSubmissionsCard submissions={mockSubmissions} />
        </main>
      </div>
    </div>
  );
}
