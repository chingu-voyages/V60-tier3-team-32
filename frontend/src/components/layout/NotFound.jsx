import { Link } from 'react-router-dom';
import notFound from '@/assets/notFoundImg.png';

export default function NotFound() {
  return (
    <main className='flex min-h-screen justify-center  lg:-translate-y-16 '>
      <div className='flex flex-col mt-28 md:mt-0 items-center gap-8 md:gap-1 lg:flex-row'>
        <img
          src={notFound}
          className='w-full max-w-md md:max-w-2xl lg:max-w-5xl object-contain'
        />

        <Link
          to='/dashboard'
          className='mt-6 rounded-2xl bg-[#5D45FD] px-5 py-3 text-lg font-bold text-white hover:bg-[#4a37d6]'
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
