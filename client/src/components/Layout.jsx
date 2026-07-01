import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout({ menuItems }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} />
      <div className="pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
