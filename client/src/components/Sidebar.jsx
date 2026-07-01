import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Briefcase } from 'lucide-react';

export function Sidebar({ menuItems = [] }) {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#0F172A] text-white flex flex-col transition-all duration-300 z-50">
      {/* Logo Area */}
      <div className="flex h-16 items-center px-6 border-b border-white/10">
        <Briefcase className="w-8 h-8 text-[#4F46E5] mr-3" />
        <span className="text-xl font-bold tracking-wide">RecruitMatrix</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {menuItems.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <div key={index} className="py-2">
                <div className="h-px bg-white/10 mx-3" />
                {item.label && (
                  <p className="px-3 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </p>
                )}
              </div>
            );
          }

          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2.5 rounded-[12px] text-sm font-medium transition-colors group',
                  isActive
                    ? 'bg-[#4F46E5] text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
