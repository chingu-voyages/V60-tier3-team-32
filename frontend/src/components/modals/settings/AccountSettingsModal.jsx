import { useState } from 'react';
import { X, Lock, Mail, UserPen, ChevronLeft } from "lucide-react"; // Added ChevronLeft for better UX
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ChangeUsernameForm from '../forms/ChangeUsernameForm';
import ChangeEmailForm from '../forms/ChangeEmailForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';

export default function AccountSettingsModal({ isOpen, onClose }) {
  const [activeForm, setActiveForm] = useState(null);

  const getActiveView = () => {
    switch (activeForm) {
      case 'username':
        return { icon: <UserPen size={20} />, title: 'Change Username' };
      case 'email':
        return { icon: <Mail size={20} />, title: 'Change Email' };
      case 'password':
        return { icon: <Lock size={20} />, title: 'Change Password' };
      default:
        return { icon: null, title: 'Settings' };
    }
  };

  const { icon, title } = getActiveView();

  // Reset the form state when the modal fully closes
  const handleClose = () => {
    setActiveForm(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* 
          Added [&>button]:hidden to the DialogContent class.
          This is a Tailwind utility that targets the default shadcn close button 
          and hides it, leaving only your custom one.
      */}
      <DialogContent className="sm:max-w-[500px] w-full bg-[#F6F9FF] rounded-[40px] p-0 overflow-hidden border-none shadow-[0_15px_50px_-15px_rgba(0,0,0,0.15)] focus-visible:ring-0 [&>button]:hidden">
        
        <DialogHeader className="p-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 
                  Refinement: If a form is open, show a "Back" button icon instead 
                  of just the static icon. This makes the UI feel more intuitive.
              */}
              {activeForm ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveForm(null)}
                  className="p-0 h-auto hover:bg-transparent text-[#3730A3]"
                >
                  <ChevronLeft size={24} />
                </Button>
              ) : null}
              
              <div className="flex items-center gap-2">
                {activeForm && <div className="text-[#3730A3]">{icon}</div>}
                <DialogTitle className="text-2xl font-bold text-[#3730A3] tracking-tight">
                  {title}
                </DialogTitle>
              </div>
            </div>

            {/* Your Custom Close Button */}
            <Button 
              variant="ghost" 
              onClick={handleClose} 
              className="rounded-full p-2 h-9 w-9 border border-gray-100 bg-white shadow-inner hover:bg-gray-50 transition-colors"
            >
              <X className="text-gray-400" size={18}/>
            </Button>
          </div>

          {activeForm && (
            <DialogDescription className="text-sm text-gray-500 mt-2 px-1">
              Update your account details below.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="p-8 pt-0 pb-10 space-y-6 flex-1 min-h-[300px]">
          {!activeForm && (
            <div className="space-y-4 pt-4">
              {[
                { label: 'Change Username', key: 'username', icon: <UserPen size={18}/> },
                { label: 'Change Email', key: 'email', icon: <Mail size={18}/> },
                { label: 'Change Password', key: 'password', icon: <Lock size={18}/> }
              ].map(opt => (
                <Button 
                  key={opt.key}
                  variant="ghost"
                  onClick={() => setActiveForm(opt.key)}
                  className="w-full h-14 justify-start text-[13px] font-semibold text-[#3730A3] bg-white border border-gray-100 shadow-inner rounded-full px-6 gap-3 hover:bg-white hover:border-gray-200"
                >
                  <div className="p-1 rounded-full bg-[#EEF2FF]/50 border border-gray-100">{opt.icon}</div>
                  {opt.label}
                </Button>
              ))}
            </div>
          )}

          {activeForm === 'username' && <ChangeUsernameForm onCancel={() => setActiveForm(null)} />}
          {activeForm === 'email' && <ChangeEmailForm onCancel={() => setActiveForm(null)} />}
          {activeForm === 'password' && <ChangePasswordForm onCancel={() => setActiveForm(null)} />}

          {!activeForm && (
            <div className="pt-16 md:pt-24 mt-auto">
              <Button className="w-full bg-[#EF4444] hover:bg-[#DC2626] rounded-full h-14 text-white font-bold text-sm transition-all active:scale-95">
                Delete Account
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}