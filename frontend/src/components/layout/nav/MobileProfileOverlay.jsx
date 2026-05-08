import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

import { User, Settings, LogOut, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MobileProfileOverlay({
  isOpen,
  onClose,
  onLogout,
  logo,
  logoClasses,
}) {
  const { user } = useAuth();
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] bg-white md:hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-300'>
      {/* Header - Mirroring Navbar layout and height exactly */}
      <div className='flex h-16 items-center justify-between px-4 sm:px-6'>
        <img src={logo} alt='Logo' className={logoClasses} />
        <button
          onClick={onClose}
          className='p-1 rounded-full text-gray-400 hover:bg-gray-100 transition-colors'
        >
          <X size={24} />
        </button>
      </div>
      <div className='flex flex-col mx-6'>
        {/* User Profile Info Block */}

        <div className='flex items-center gap-4 py-5 border-1 border-stone-200'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={user?.profile_image} />
            <AvatarFallback className='bg-[#E8EDFF] text-[#5D45FD] font-bold text-xl'>
              {user?.username?.[0]?.toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <span className='font-bold text-gray-800 text-lg tracking-tight'>
            {user?.username ?? 'User'}
          </span>
        </div>

        {/* Navigation List */}
        <div className='flex flex-col px-2 gap-6 border-t border-stone-200'>
          <Link
            to='/profile'
            onClick={onClose}
            className='flex items-center gap-4 py-5'
          >
            <User
              size={22}
              className='text-gray-400 group-hover:text-[#5D45FD] transition-colors'
            />
            <span className='font-bold text-gray-700'>Profile</span>
          </Link>

          <Link
            to='/settings'
            onClick={onClose}
            className='flex items-center gap-4 py-5'
          >
            <Settings
              size={22}
              className='text-gray-400 group-hover:text-[#5D45FD] transition-colors'
            />
            <span className='font-bold text-gray-700'>Settings</span>
          </Link>
          <button
            onClick={onLogout}
            className='flex items-center gap-4 py-5  text-red-500 hover:bg-red-50 transition-colors text-left font-bold border-t border-stone-200'
          >
            <LogOut size={22} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
