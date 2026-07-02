import React, { useState } from 'react';
import { Bell, Search, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CompanyHeader() {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search requisitions, candidates..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-xl transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="relative">
          <div onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 cursor-pointer pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">{currentUser?.name || 'Company User'}</p>
              <p className="text-xs text-slate-400">{currentUser?.role?.name || 'Client Admin'}</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden py-1">
              <button onClick={() => { setMenuOpen(false); navigate('/profile'); }} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Profile Settings</button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
