import React, { useState, createContext, useContext } from 'react';
import {
  LayoutDashboard, PlusCircle, FileText, Users, UserCheck,
  Calendar, Award, Package, FolderOpen, Bell, User,
  ChevronLeft, ChevronRight, LogOut, Building2, UserPlus, ClipboardList
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarContext = createContext({});
export const useSidebar = () => useContext(SidebarContext);

const NAV_ITEMS = [
  { label: 'Dashboard',                path: '/dashboard',           icon: LayoutDashboard },
  { label: 'Create Talent Requisition',path: '/requisitions/create', icon: PlusCircle },
  { label: 'My Requisitions',          path: '/requisitions',        icon: FileText },
  { label: 'Candidate Progress',       path: '/candidates/progress', icon: Users },
  { label: 'Shortlist Review',         path: '/candidates/shortlist',icon: UserCheck },
  { label: 'Interview Schedule',       path: '/interviews',          icon: Calendar },
  { label: 'Selected Candidates',      path: '/selected',            icon: Award },
  { label: 'Offer Status',             path: '/offers',              icon: Package },
  { label: 'Joined Candidates',        path: '/joinings',            icon: Users },
  { label: 'Employee Management',      path: '/employees',           icon: UserPlus },
  { label: 'Attendance',               path: '/attendance',          icon: Users },
  { label: 'Task Management',          path: '/tasks',               icon: ClipboardList },
  { label: 'Reports',                  path: '/reports',             icon: FolderOpen },
  { label: 'Documents',               path: '/documents',            icon: FileText },
  { label: 'Notifications',           path: '/notifications',        icon: Bell },
  { label: 'Profile',                  path: '/profile',             icon: User },
];

function NavItem({ item, collapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = pathname === item.path || pathname.startsWith(item.path + '/');
  const Icon = item.icon;

  return (
    <button
      onClick={() => navigate(item.path)}
      title={collapsed ? item.label : undefined}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
        ${active
          ? 'bg-sky-500 text-white shadow-md shadow-sky-200'
          : 'text-slate-500 hover:bg-sky-50 hover:text-sky-600'}`}
    >
      <Icon size={18} className="flex-shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </button>
  );
}

export default function CompanySidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 flex flex-col z-50 transition-all duration-300 scrollbar-hide ${collapsed ? 'w-16' : 'w-64'}`}
      style={{ background: '#fff', borderRight: '1px solid #e2e8f0' }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-slate-100 flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          <Building2 size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-sm text-slate-800">RecruitMatrix</p>
            <p className="text-[10px] text-slate-400">Company Portal</p>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-white z-10 shadow-md"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-hide space-y-1">
        {NAV_ITEMS.map(item => <NavItem key={item.path} item={item} collapsed={collapsed} />)}
      </nav>

      {/* User footer */}
      <div className={`flex-shrink-0 border-t border-slate-100 p-3 ${collapsed ? 'flex justify-center' : 'flex items-center gap-3'}`}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>CA</div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">Client Admin</p>
              <p className="text-xs text-slate-400 truncate">admin@company.com</p>
            </div>
            <button className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg">
              <LogOut size={15} />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
