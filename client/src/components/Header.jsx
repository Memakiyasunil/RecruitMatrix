import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header({ onToggleSidebar }) {
  const { currentUser, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AU';

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 sticky top-0 z-40">

      {/* Left: hamburger + search */}
      <div className="flex items-center gap-4 flex-1">
        <button id="header-menu-btn"
                onClick={onToggleSidebar}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-xs hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="global-search"
            type="search"
            placeholder="Search anything..."
            className="w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50/80
                       outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-200 rounded px-1.5 py-0.5 font-mono">
            /
          </kbd>
        </div>
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-2">

        {/* Bell with badge */}
        <button id="notifications-btn"
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold border border-white">
            5
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 mx-1" />

        {/* User profile */}
        <div className="relative">
          <button
            id="user-profile-btn"
            onClick={() => setShowProfile(v => !v)}
            className="flex items-center gap-2.5 p-1 pr-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt={currentUser.name}
                   className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                   style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                {initials}
              </div>
            )}
            {/* Online dot */}
            <div className="relative -ml-2 -mb-2">
              <span className="block w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{currentUser?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'admin@recruitmatrix.com'}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                  {currentUser?.role || 'Admin'}
                </span>
              </div>
              <div className="p-1">
                <button
                  id="header-logout-btn"
                  onClick={() => { logout(); setShowProfile(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
