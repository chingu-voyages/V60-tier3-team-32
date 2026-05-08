import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function ChangeEmailForm({ onCancel }) {
  const [email, setEmail] = useState('noman@example.com'); // Initial state from user context
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Logic for updating email via API
    setTimeout(() => {
      setIsLoading(false);
      onCancel(); 
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pt-4">
      <div className="space-y-4">
        <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase ml-3">
          Update Email Address
        </label>
        <div className="relative">
          <Input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 rounded-full bg-white border border-gray-100 shadow-inner px-6 focus-visible:ring-[#3730A3]"
            placeholder="new.email@example.com"
          />
          <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
        </div>
        <p className="text-[10px] text-gray-400 px-4">
          You will need to verify your new email address after saving.
        </p>
      </div>

      <div className="flex gap-4 pt-12 md:pt-20">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1 rounded-full h-14 font-semibold text-gray-500">
          Cancel
        </Button>
        <Button 
          disabled={isLoading || !email}
          className="flex-1 rounded-full h-14 font-bold bg-[#3730A3] hover:bg-[#312E81] text-white"
        >
          {isLoading ? "Updating..." : "Update Email"}
        </Button>
      </div>
    </form>
  );
}