import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from '../../assets/logo-txt.png';

export default function Navbar() {
  // Hardcoded the state since we are not in sync 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {/* Responsive padding: px-4 for mobile, px-8 for desktop */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo: h-7 (smaller) on mobile, h-9 on desktop */}
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex flex-shrink-0 items-center">
          <img 
            src={logo} 
            alt="LinguaLoop" 
            className="h-7 w-auto sm:h-8 lg:h-9 object-contain transition-all duration-300" 
          />
        </Link>

        {/* if user is authenticated  */}
        {isLoggedIn ? (
          <>
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {['DASHBOARD', 'WRITE', 'CORRECT'].map((item) => {
                const path = `/${item.toLowerCase()}`;
                return (
                  <Link
                    key={item}
                    to={path}
                    className={`px-3 lg:px-6 py-2 rounded-full text-[10px] lg:text-xs font-bold tracking-widest transition-all ${
                      isActive(path)
                        ? 'bg-[#E8EDFF] text-[#5D45FD]'
                        : 'text-gray-500 hover:text-[#5D45FD]'
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none ml-2">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#E8EDFF] flex items-center justify-center text-[#5D45FD] font-bold cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all">
                  U
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          // User is not logged in --Guest state
          <>
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              <Link to="/" className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors">Home</Link>
              <Link to="/about" className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors">About</Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                to="/login" 
                className="rounded-full bg-[#5D45FD] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#4a36e0] active:scale-95 whitespace-nowrap"
                onClick={() => setIsLoggedIn(true)}
              >
                Get Started
              </Link>

             {/* hamburger */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
              >
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </>
        )}
      </div>

       {/* hamburger dropdown --mobile */}
      {!isLoggedIn && isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 md:hidden p-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-600">Home</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-gray-600">About</Link>
        </div>
      )}
    </nav>
  );
}