import React from 'react';
import { Bell, CheckCheck } from 'lucide-react';

const notifications = [
  { type: 'approval', title: 'Requisition Approved', message: 'TR-1001 (Senior Developer) has been approved.', time: '2 hrs ago', read: false },
  { type: 'interview', title: 'Interview Scheduled', message: 'Interview for Rahul Sharma scheduled on 5-Jul at 11 AM.', time: '5 hrs ago', read: false },
  { type: 'offer', title: 'Offer Letter Ready', message: 'Offer letter for Neha Singh is ready for your review.', time: '1 day ago', read: true },
  { type: 'info', title: 'Candidate Shortlisted', message: '3 new candidates shortlisted for QA Engineer position.', time: '2 days ago', read: true },
];
const TYPE_COLORS = { approval: '#10b981', interview: '#6366f1', offer: '#f59e0b', info: '#0ea5e9' };

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-800">Notifications</h1><p className="text-sm text-slate-400 mt-1">{notifications.filter(n => !n.read).length} unread notifications</p></div>
        <button className="flex items-center gap-2 text-sm text-sky-500 hover:underline"><CheckCheck size={15} /> Mark all read</button>
      </div>
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className={`bg-white rounded-2xl border shadow-sm p-4 flex items-start gap-4 ${!n.read ? 'border-sky-100' : 'border-slate-100'}`}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${TYPE_COLORS[n.type]}18` }}>
              <Bell size={16} style={{ color: TYPE_COLORS[n.type] }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-semibold ${!n.read ? 'text-slate-800' : 'text-slate-600'}`}>{n.title}</p>
                <span className="text-xs text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-500">{n.message}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
