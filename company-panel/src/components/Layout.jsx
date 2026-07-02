import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from './Sidebar';
import CompanyHeader from './Header';

export default function CompanyLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const w = collapsed ? 'pl-16' : 'pl-64';

  return (
    <div className="min-h-screen bg-slate-50">
      <CompanySidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`${w} transition-all duration-300`}>
        <CompanyHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
