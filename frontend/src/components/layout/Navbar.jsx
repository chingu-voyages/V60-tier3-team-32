import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md'>
      <div className='container mx-auto flex h-20 items-center justify-between px-4 md:px-8'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <div className='h-8 w-8 bg-[#5D45FD] rounded-lg flex items-center justify-center text-white font-bold'>
            L
          </div>
          <span className='text-xl font-bold tracking-tight text-[#3A33D1]'>
            LinguaLoop
          </span>
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-10'>
          <Link
            to='/'
            className='text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors'
          >
            Home
          </Link>
          <Link
            to='/about'
            className='text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors'
          >
            About
          </Link>
        </div>

        {/* Actions (Visible on all screens) */}

        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className='rounded-full bg-[#5D45FD] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#4a36e0] active:scale-95'
            >
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              className='rounded-full bg-[#5D45FD] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#4a36e0] active:scale-95'
            >
              Get Started
            </Link>
          )}

          {/* Animated Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none'
            aria-label='Toggle Menu'
          >
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute top-20 left-0 w-full bg-white border-b border-gray-100 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className='flex flex-col p-6 gap-6'>
          <Link
            to='/'
            onClick={() => setIsOpen(false)}
            className='text-sm font-bold uppercase tracking-widest text-gray-600'
          >
            Home
          </Link>
          <Link
            to='/about'
            onClick={() => setIsOpen(false)}
            className='text-sm font-bold uppercase tracking-widest text-gray-600'
          >
            About
          </Link>

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className='text-sm font-bold uppercase tracking-widest text-gray-600'
            >
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              onClick={() => setIsOpen(false)}
              className='text-sm font-bold uppercase tracking-widest text-gray-600'
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
