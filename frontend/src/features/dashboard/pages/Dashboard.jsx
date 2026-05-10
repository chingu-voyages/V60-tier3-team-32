import { useEffect } from 'react';
import JourneyCard from '../components/JourneyCard';
import RecentActivityCard from '../components/RecentActivityCard';
import RecentSubmissionsCard from '../components/RecentSubmissionsCard';
// import PromptCard from '@/features/dashboard/components/PromptCard';

import { fetchDashboardData } from '../dashboardActions';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGES } from '@/lib/constants/languages';
import PromptCard from '../components/PromptCard';

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user, prompts, recentPosts, correctedPosts, loading, error } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return <p className='p-8'>Loading dashboard...</p>;
  }

  if (error) {
    return <p className='p-8 text-red-500'>{error}</p>;
  }

  //transforms eng to English
  const learningLanguages =
    user?.learning_languages?.map((lang) => {
      const match = LANGUAGES.find((item) => item.code === lang.language);
      return {
        name: match?.label || lang.language,
        level: lang.level,
        code: lang.language,
      };
    }) ?? [];

  const userLang = user?.native_language;

  const firstPrompt =
    prompts?.native?.find((p) => p.language === userLang) ||
    prompts?.native?.[0];

  const formattedSubmissions =
    recentPosts?.map((post) => {
      const langMatch = LANGUAGES.find((l) => l.code === post.language);

      return {
        id: post.id,
        language: langMatch?.label || post.language,
        title: post.prompt?.title || 'Untitled',
        preview: post.preview,
        comments: post.corrections_count || 0,
        createdAt: post.created_at,
      };
    }) || [];

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-1 py-4 md:p-8 pb-5 md:pb-8'>
      {/* The grid stays 1 column on mobile and 12 columns on LG screens.
         We use 'flex-col' on small screens to ensure the Sidebar (JourneyCard) 
         is physically first in the DOM/Visual order.
      */}
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        {/* TOP on Mobile / LEFT Sidebar on Desktop */}
        <aside className='lg:col-span-4 order-1'>
          <JourneyCard languages={learningLanguages} />
        </aside>

        {/* MAIN FEED: Prompt, Activity, Submissions */}
        <main className='lg:col-span-8 space-y-6 lg:space-y-8 order-2'>
          <PromptCard prompt={firstPrompt} />

          <RecentActivityCard activities={correctedPosts || []} />

          <RecentSubmissionsCard submissions={formattedSubmissions} />
        </main>
      </div>
    </div>
  );
}
