import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPen } from "lucide-react";

export default function ChangeUsernameForm({ onCancel }) {
  const [newUsername, setNewUsername] = useState('User123'); // Initialize with current data
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting new username:", newUsername);
    // Mimic API delay
    setTimeout(() => {
        setIsLoading(false);
        console.log("Success");
        onCancel(); // Close form view on success
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pt-4">
      
      {/* 
         The forms must follow the minimalist, large rounding pattern established 
         in the main UI (image_4d01da.png and image_4cfa59.png) 
      */}
      <div className="space-y-4">
        <label className="text-[11px] font-medium tracking-widest text-gray-500 uppercase ml-3">
          Enter New Username
        </label>
        <div className="relative">
          <Input 
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full h-14 rounded-full bg-white border border-gray-100 shadow-inner px-6 focus-visible:ring-[#3730A3]"
            placeholder="Introduce new username"
          />
          <UserPen className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
        </div>
        <p className="text-[10px] text-gray-400 px-4">
          This is how other users will see you. Choose carefully.
        </p>
      </div>

      <div className="flex gap-4 pt-12 md:pt-20">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1 rounded-full h-14 font-semibold text-gray-500">
          Cancel
        </Button>
        <Button 
            disabled={isLoading || !newUsername}
            className="flex-1 rounded-full h-14 font-bold bg-[#3730A3] hover:bg-[#312E81] text-white disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Username"}
        </Button>
      </div>
    </form>
  );
}