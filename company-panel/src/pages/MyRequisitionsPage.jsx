import React, { useState } from 'react';
import { Search, Filter, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const requisitions = [
  { tr: 'TR-1001', position: 'Senior Developer', dept: 'IT', vacancies: 3, tat: '15-Jul-2026', status: 'approved', date: '01-Jul-2026' },
  { tr: 'TR-1002', position: 'HR Manager', dept: 'HR', vacancies: 1, tat: '20-Jul-2026', status: 'pending', date: '30-Jun-2026' },
  { tr: 'TR-1003', position: 'Sales Executive', dept: 'Sales', vacancies: 5, tat: '25-Jul-2026', status: 'in_progress', date: '28-Jun-2026' },
  { tr: 'TR-1004', position: 'Finance Analyst', dept: 'Finance', vacancies: 2, tat: '10-Jul-2026', status: 'closed', date: '15-Jun-2026' },
  { tr: 'TR-1005', position: 'QA Engineer', dept: 'IT', vacancies: 2, tat: '18-Jul-2026', status: 'approved', date: '02-Jul-2026' },
];

const STATUS_COLORS = { approved: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', in_progress: 'bg-sky-100 text-sky-700', closed: 'bg-slate-100 text-slate-500', rejected: 'bg-red-100 text-red-700' };

export default function MyRequisitionsPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filtered = requisitions.filter(r => r.position.toLowerCase().includes(search.toLowerCase()) || r.tr.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Requisitions</h1>
          <p className="text-sm text-slate-400 mt-1">{requisitions.length} requisitions found</p>
        </div>
        <button onClick={() => navigate('/requisitions/create')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          <Plus size={15} /> New Requisition
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by position or TR no..." className="w-full pl-8 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50">
            <Filter size={14} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{['TR No','Position','Department','Vacancies','TAT Date','Status','Created','Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(r => (
                <tr key={r.tr} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-sky-600">{r.tr}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{r.position}</td>
                  <td className="px-4 py-3 text-slate-500">{r.dept}</td>
                  <td className="px-4 py-3 text-slate-700">{r.vacancies}</td>
                  <td className="px-4 py-3 text-slate-500">{r.tat}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[r.status]}`}>{r.status.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{r.date}</td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
