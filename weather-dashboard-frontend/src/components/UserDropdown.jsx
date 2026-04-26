import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const userName = user?.name || user?.email || 'User';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 glass px-3 py-2 rounded-full hover:bg-white/20 transition"
      >
        <User size={18} />
        <span>{userName}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg z-10">
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;