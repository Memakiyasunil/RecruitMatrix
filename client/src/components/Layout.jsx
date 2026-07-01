import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex h-screen bg-brand-light overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-brand-gray">
              {currentUser?.displayName || currentUser?.email || 'User'}
            </span>
            <button 
              onClick={logout}
              className="text-sm text-brand-red font-medium hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
