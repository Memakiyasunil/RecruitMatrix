import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout({ menuItems }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} />
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'pl-18' : 'pl-64'}`}>
        <Header onToggleSidebar={() => setSidebarCollapsed(v => !v)} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
