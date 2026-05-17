import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGES } from '@/lib/constants/languages';

// Components
import JourneyCard from '../components/JourneyCard';
import RecentActivityCard from '../components/RecentActivityCard';
import RecentSubmissionsCard from '../components/RecentSubmissionsCard';
import PromptCard from '../components/PromptCard';

// Actions
import { fetchDashboardData } from '../dashboardActions';
import { fetchMyCorrections } from '../../correct/correctionActions';

export default function Dashboard() {
  const dispatch = useDispatch();

  // Get general dashboard data
  const {
    user,
    prompts,
    recentPosts,
    loading: dashLoading,
    error,
  } = useSelector((state) => state.dashboard);

  // Get your personal correction history from the new slice
  const { myCorrections, loading: corrLoading } = useSelector(
    (state) => state.corrections,
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
    // UPDATE: Fetch 'all' to show a mix of contributions and feedback on the dashboard
    dispatch(fetchMyCorrections('all'));
  }, [dispatch]);

  const isLoading = dashLoading || corrLoading;

  if (isLoading && !user) {
    return (
      <p className='p-8 text-gray-500 font-medium'>Loading your workspace...</p>
    );
  }

  if (error) {
    return <p className='p-8 text-red-500 font-bold'>{error}</p>;
  }

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
        status: post.status,
      };
    }) || [];

  // console.log(formattedSubmissions);

  return (
    <div className='min-h-screen bg-[#F8FAFF] px-1 py-4 md:p-8 pb-5 md:pb-8'>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        {/* Sidebar */}
        <aside className='lg:col-span-4 order-1'>
          <JourneyCard languages={learningLanguages} />
        </aside>

        {/* Main Feed */}
        <main className='lg:col-span-8 space-y-6 lg:space-y-8 order-2'>
          <PromptCard prompt={firstPrompt} />

          {/* RecentActivityCard now receives the 'all' mixed feed */}
          <RecentActivityCard
            activities={myCorrections}
            isLoading={corrLoading}
          />

          <RecentSubmissionsCard submissions={formattedSubmissions} />
        </main>
      </div>
    </div>
  );
}
