import React from 'react';
import { Search, Bell, MessageSquare, Calendar, Sun, UserCircle } from 'lucide-react';
import { Input } from './ui/Input';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { currentUser, logout } = useAuth();
  return (
    <header className="h-16 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 glass">
      <div className="flex-1 max-w-md">
        <Input 
          type="search" 
          placeholder="Global search..." 
          icon={Search} 
          className="h-10 bg-gray-50/50"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
          <Sun size={20} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
          <Calendar size={20} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
          <MessageSquare size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full border border-white"></span>
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        
        <div className="flex items-center space-x-2 p-1 pr-2 rounded-full hover:bg-gray-50 transition-colors group relative cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {currentUser?.name || 'User'}
          </span>
          
          {/* Simple Dropdown for Logout */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
            </div>
            <div className="p-1">
              <button 
                onClick={() => logout()}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
