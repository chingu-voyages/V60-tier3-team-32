import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordForm({ onCancel }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Logic for password hashing/update via backend
    setTimeout(() => {
      setIsLoading(false);
      onCancel();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="space-y-5">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase ml-3">
            Current Password
          </label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"}
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              className="w-full h-14 rounded-full bg-white border border-gray-100 shadow-inner px-6"
              placeholder="••••••••"
            />
            <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase ml-3">
            New Password
          </label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"}
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              className="w-full h-14 rounded-full bg-white border border-gray-100 shadow-inner px-6"
              placeholder="Min. 8 characters"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3730A3]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-12 md:pt-16">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1 rounded-full h-14 font-semibold text-gray-500">
          Cancel
        </Button>
        <Button 
          disabled={isLoading || !passwords.new || passwords.new.length < 8}
          className="flex-1 rounded-full h-14 font-bold bg-[#3730A3] hover:bg-[#312E81] text-white"
        >
          {isLoading ? "Securing..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}