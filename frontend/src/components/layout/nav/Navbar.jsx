import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PenLine,
  Sparkles,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import MobileProfileOverlay from './MobileProfileOverlay';
import logo from '@/assets/Logo-Desktop.svg';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading, user } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Private (logged-in) nav
  const privateNavItems = [
    { label: 'DASHBOARD', path: '/dashboard', icon: LayoutDashboard },
    { label: 'WRITE', path: '/write', icon: PenLine },
    { label: 'CORRECT', path: '/correct', icon: Sparkles },
  ];

  // Public (logged-out) nav
  const publicNavItems = [{ label: 'HOME', path: '/' }];

  const navItems = isAuthenticated ? privateNavItems : publicNavItems;

  const logoClasses = 'h-7 w-auto sm:h-8 lg:h-9 object-contain';

  if (loading) return null;

  const handleLogout = async () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className='sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative'>
          {/* LEFT: Logo */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className='flex flex-shrink-0 items-center'
          >
            <img src={logo} alt='LinguaLoop' className={logoClasses} />
          </Link>

          {/* CENTER: Nav Items (NOW ALWAYS RENDERS) */}
          <div className='hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:gap-2'>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`px-3 lg:px-6 py-2 rounded-full text-[10px] lg:text-xs font-bold tracking-widest transition-all ${
                  isActive(item.path)
                    ? 'bg-[#E8EDFF] text-[#5D45FD]'
                    : 'text-gray-500 hover:text-[#5D45FD]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RIGHT: Auth Section */}
          <div className='flex items-center ml-auto md:ml-0'>
            {isAuthenticated ? (
              <div className='ml-2'>
                {/* Desktop Dropdown */}
                <div className='hidden md:block'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='focus:outline-none'>
                      <Avatar className='h-10 w-10 cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all'>
                        <AvatarImage src={user?.profile_image} />
                        <AvatarFallback className='bg-[#E8EDFF] text-[#5D45FD] font-bold text-xl'>
                          {user?.username?.[0]?.toUpperCase() ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='end' className='w-56'>
                      <DropdownMenuLabel className='text-sm font-semibold flex items-center gap-2'>
                        <Avatar className='h-7 w-7 cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all'>
                          <AvatarImage src={user?.profile_image} />
                          <AvatarFallback className='bg-[#E8EDFF] text-[#5D45FD] font-bold text-xl'>
                            {user?.username?.[0]?.toUpperCase() ?? 'U'}
                          </AvatarFallback>
                        </Avatar>
                        {user?.username}
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link
                          to='/profile'
                          className='cursor-pointer flex items-center'
                        >
                          <User size={16} className='mr-2' /> Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className='cursor-pointer'>
                        <Settings size={16} className='mr-2' /> Settings
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className='cursor-pointer text-red-600'
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className='mr-2' /> Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className='md:hidden active:scale-95 transition-transform'
                >
                  <Avatar className='h-10 w-10 cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all'>
                    <AvatarImage src={user?.profile_image} />
                    <AvatarFallback className='bg-[#E8EDFF] text-[#5D45FD] font-bold text-xl'>
                      {user?.username?.[0]?.toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </div>
            ) : (
              <div className='hidden md:flex items-center gap-2'>
                <Link
                  to='/login'
                  className='px-4 py-2 rounded-full bg-[#5D45FD] text-white text-sm font-semibold hover:opacity-90'
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE PROFILE OVERLAY */}
      <MobileProfileOverlay
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
        logo={logo}
        logoClasses={logoClasses}
      />

      {/* MOBILE TAB BAR */}
      {isAuthenticated && (
        <div className='fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-100 md:hidden flex items-center justify-around px-2 pb-safe'>
          {privateNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.label}
                to={item.path}
                className='flex flex-col items-center justify-center w-full h-full gap-1'
              >
                <div
                  className={`p-1 px-4 rounded-xl transition-colors ${
                    active ? 'bg-[#E8EDFF]' : ''
                  }`}
                >
                  <Icon
                    size={20}
                    className={active ? 'text-[#5D45FD]' : 'text-gray-400'}
                  />
                </div>

                <span
                  className={`text-[9px] font-bold tracking-tighter ${
                    active ? 'text-[#5D45FD]' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
