import React from 'react';
import { NavLink } from 'react-router-dom';

const modules = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'User Management', path: '/users', icon: '👤' },
  { name: 'Role & Permission', path: '/roles', icon: '🔒' },
  { name: 'Client Management', path: '/clients', icon: '🏢' },
  { name: 'Master Management', path: '/master', icon: '⚙️' },
  { name: 'Talent Requisition', path: '/requisitions', icon: '📝' },
  { name: 'Approval Workflow', path: '/approvals', icon: '✅' },
  { name: 'Allocation', path: '/allocations', icon: '👥' },
  { name: 'Candidate Management', path: '/candidates', icon: '🎓' },
  { name: 'Candidate Pipeline', path: '/pipeline', icon: '🛤️' },
  { name: 'Interview Management', path: '/interviews', icon: '📅' },
  { name: 'Offer Management', path: '/offers', icon: '✉️' },
  { name: 'Joining Management', path: '/joining', icon: '🤝' },
  { name: 'Task Management', path: '/tasks', icon: '📋' },
  { name: 'CRM', path: '/crm', icon: '💼' },
  { name: 'Reports & Analytics', path: '/reports', icon: '📈' },
  { name: 'Notification', path: '/notifications', icon: '🔔' },
  { name: 'Document Management', path: '/documents', icon: '📁' },
  { name: 'Audit Logs', path: '/audit', icon: '🔍' },
  { name: 'Settings', path: '/settings', icon: '🔧' },
  { name: 'FAQs', path: '/faqs', icon: '❓' },
  { name: 'System Configuration', path: '/config', icon: '🖥️' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col overflow-hidden shadow-sm">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <img src="/favicon.svg" alt="RecruitMatrix Logo" className="w-10 h-10" />
        <div className="font-bold text-xl text-brand-dark tracking-tight">
          Recruit<span className="text-brand-purple">Matrix</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {modules.map((mod) => (
            <li key={mod.name}>
              <NavLink
                to={mod.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-brand-purple/10 text-brand-purple' 
                      : 'text-brand-gray hover:bg-gray-50 hover:text-brand-dark'
                  }`
                }
              >
                <span className="text-lg">{mod.icon}</span>
                {mod.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
