import { Link } from 'react-router-dom';
import { User, Settings, LogOut, X } from 'lucide-react';

export default function MobileProfileOverlay({ isOpen, onClose, onLogout, logo, logoClasses }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white md:hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      
      {/* Header - Mirroring Navbar layout and height exactly */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <img src={logo} alt="Logo" className={logoClasses} />
        <button 
          onClick={onClose}
          className="p-1 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* User Profile Info Block */}
        <div className="flex items-center gap-4 mb-10 px-2 mt-4">
          <div className="h-14 w-14 rounded-full bg-[#E8EDFF] flex items-center justify-center text-[#5D45FD] font-bold text-xl">
            U
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 text-lg tracking-tight">User123</span>
            <span className="text-xs text-gray-400 font-medium tracking-wide">ID: 987654321</span>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex flex-col gap-2">
          <Link 
            to="/profile" 
            onClick={onClose}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors group"
          >
            <User size={22} className="text-gray-400 group-hover:text-[#5D45FD] transition-colors" />
            <span className="font-bold text-gray-700">Profile</span>
          </Link>

          <Link 
            to="/settings" 
            onClick={onClose}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors group"
          >
            <Settings size={22} className="text-gray-400 group-hover:text-[#5D45FD] transition-colors" />
            <span className="font-bold text-gray-700">Settings</span>
          </Link>

          <div className="h-[1px] bg-gray-100 my-4 mx-2" />

          <button 
            onClick={onLogout}
            className="flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors text-left font-bold"
          >
            <LogOut size={22} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}