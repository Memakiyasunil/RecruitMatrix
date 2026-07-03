import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Briefcase, FileSignature, Share2, 
  Users, Tags, Filter, UserCheck, Calendar, Trophy,
  Mail, ThumbsUp, UserPlus, Building2, FolderOpen,
  ClipboardList, Clock, BarChart3, ShieldCheck,
  FolderTree, TagsIcon, Settings, ScrollText,
  ChevronLeft, ChevronRight, LogOut, ChevronDown, ChevronUp
} from 'lucide-react';

/* ─── RM Logo mark ─────────────────────────────────────────── */
function RMLogoMark({ size = 32 }) {
  return (
    <div className="flex items-center justify-center rounded-xl flex-shrink-0"
      style={{
        width: size, height: size,
        background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 100%)',
        boxShadow: '0 0 16px rgba(99,102,241,0.4)'
      }}>
      <svg viewBox="0 0 32 32" width={size * 0.7} height={size * 0.7} fill="none">
        <text x="1" y="24" fontFamily="Poppins,sans-serif" fontWeight="800" fontSize="20" fill="url(#sLg1)">R</text>
        <text x="14" y="24" fontFamily="Poppins,sans-serif" fontWeight="800" fontSize="20" fill="url(#sLg2)">M</text>
        <polygon points="30,2 32,8 27,6" fill="#f97316" />
        <defs>
          <linearGradient id="sLg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="sLg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Nav groups ──────────────────────────────────────────── */
const MENU_GROUPS = [
  {
    title: 'Website & Applications',
    items: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Applications Inbox', path: '/admin/applications', icon: Users },
      { label: 'Job Openings', path: '/admin/requisitions', icon: Briefcase },
    ]
  },
  {
    title: 'Hiring Workflow',
    items: [
      { label: 'Candidate Pipeline', path: '/admin/candidates', icon: Users },
      { label: 'Tagging', path: '/admin/tagging', icon: Tags },
      { label: 'Screening', path: '/admin/screening', icon: Filter },
      { label: 'Shortlisting', path: '/admin/shortlisting', icon: UserCheck },
      { label: 'Interviews', path: '/admin/interviews', icon: Calendar },
      { label: 'Selection', path: '/admin/selection', icon: Trophy },
      { label: 'Joining Tracker', path: '/admin/joining', icon: UserPlus },
    ]
  },
  {
    title: 'Operations',
    items: [
      { label: 'TR Approval', path: '/admin/approvals', icon: FileSignature },
      { label: 'TR Allocation', path: '/admin/allocations', icon: Share2 },
      { label: 'Offer Letters', path: '/admin/offers', icon: Mail },
      { label: 'Offer Acceptance', path: '/admin/offer-acceptance', icon: ThumbsUp },
      { label: 'Client Management', path: '/admin/clients', icon: Building2 },
      { label: 'Documents', path: '/admin/documents', icon: FolderOpen },
      { label: 'Task Management', path: '/admin/tasks', icon: ClipboardList },
      { label: 'Attendance', path: '/admin/attendance', icon: Clock },
      { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    ]
  },
  {
    title: 'System & Admin',
    items: [
      { label: 'User Management', path: '/admin/users', icon: ShieldCheck },
      { label: 'Role & Permissions', path: '/admin/roles', icon: ShieldCheck },
      { label: 'Department Master', path: '/admin/departments', icon: FolderTree },
      { label: 'Designation Master', path: '/admin/designations', icon: TagsIcon },
      { label: 'Audit Logs', path: '/admin/audit', icon: ScrollText },
      { label: 'System Settings', path: '/admin/settings', icon: Settings },
    ]
  }
];

/* ─── Single nav item ─────────────────────────────────────── */
function NavItem({ item, collapsed }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative',
          collapsed ? 'justify-center' : '',
          isActive
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-gray-400 hover:bg-white/6 hover:text-white'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={18} className={cn('flex-shrink-0', isActive ? 'text-white' : 'text-gray-400 group-hover:text-white')} />
          {!collapsed && <span className="truncate leading-none">{item.label}</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50
                            shadow-xl border border-white/10 pointer-events-none">
              {item.label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}

/* ─── Main Sidebar ────────────────────────────────────────── */
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const w = collapsed ? 'w-18' : 'w-64';

  return (
    <aside className={cn('fixed inset-y-0 left-0 flex flex-col transition-all duration-300 z-50 scrollbar-hide', w)}
      style={{ background: '#0f172a', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

      {/* ── Logo area ── */}
      <div className={cn('flex items-center h-16 px-4 border-b flex-shrink-0 bg-slate-900/50', collapsed ? 'justify-center' : 'gap-3')}
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <RMLogoMark size={36} />
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-base leading-none">
              Recruit<span className="text-indigo-400">Matrix</span>
            </div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-1 font-semibold">Admin Portal</div>
          </div>
        )}
      </div>

      {/* ── Toggle collapse button ── */}
      <button
        onClick={() => setCollapsed(v => !v)}
        className="absolute -right-3 top-[4.5rem] w-6 h-6 rounded-full bg-indigo-600 border-2 border-gray-900
                   flex items-center justify-center text-white shadow-lg hover:bg-indigo-500 transition-colors z-10"
        id="sidebar-toggle-btn"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 scrollbar-hide">
        {MENU_GROUPS.map((group, idx) => (
          <div key={idx}>
            {!collapsed && (
              <p className="px-3 py-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{group.title}</p>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => <NavItem key={item.path} item={item} collapsed={collapsed} />)}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User footer ── */}
      <div className={cn('flex-shrink-0 border-t p-3 bg-slate-900/50', collapsed ? 'flex justify-center' : 'flex items-center gap-3')}
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative"
          style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
          {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'AU'}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-gray-900 pulse-dot" />
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{currentUser?.name || 'Admin User'}</p>
              <p className="text-[10px] text-gray-500 truncate">{currentUser?.email || 'admin@recruitmatrix.com'}</p>
            </div>
            <button onClick={() => logout()} title="Sign out" id="sidebar-logout-btn"
              className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0">
              <LogOut size={15} />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
