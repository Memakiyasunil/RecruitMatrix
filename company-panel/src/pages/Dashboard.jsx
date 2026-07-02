import React from 'react';
import { FileText, Users, Calendar, Award, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Section 19 — Company Dashboard
const KPI_CARDS = [
  { label: 'Open Requisitions',  value: 12, change: +3,  icon: FileText, color: '#0ea5e9' },
  { label: 'Active Candidates',  value: 84, change: +12, icon: Users,    color: '#6366f1' },
  { label: 'Interviews Scheduled',value: 9, change: -2,  icon: Calendar, color: '#f59e0b' },
  { label: 'Selected Candidates',value: 21, change: +5,  icon: Award,    color: '#10b981' },
  { label: 'Offered Candidates', value: 14, change: +3,  icon: Package,  color: '#8b5cf6' },
  { label: 'Joined Candidates',  value: 10, change: +2,  icon: TrendingUp,color:'#ec4899' },
];

const trendData = [
  { month: 'Jan', requisitions: 4, joined: 2 },
  { month: 'Feb', requisitions: 6, joined: 4 },
  { month: 'Mar', requisitions: 9, joined: 6 },
  { month: 'Apr', requisitions: 7, joined: 5 },
  { month: 'May', requisitions: 12, joined: 8 },
  { month: 'Jun', requisitions: 10, joined: 7 },
];

const pipelineData = [
  { stage: 'Tagged', count: 84 }, { stage: 'Screened', count: 60 },
  { stage: 'Shortlisted', count: 38 }, { stage: 'Interviewed', count: 26 },
  { stage: 'Selected', count: 21 }, { stage: 'Offered', count: 14 },
  { stage: 'Joined', count: 10 },
];

const recentRequisitions = [
  { tr: 'TR-1001', position: 'Senior Developer', dept: 'IT', vacancies: 3, status: 'approved', date: '01-Jul-2026' },
  { tr: 'TR-1002', position: 'HR Manager', dept: 'HR', vacancies: 1, status: 'pending', date: '30-Jun-2026' },
  { tr: 'TR-1003', position: 'Sales Executive', dept: 'Sales', vacancies: 5, status: 'in_progress', date: '28-Jun-2026' },
];

const statusBadge = (s) => {
  const map = { approved: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', in_progress: 'bg-sky-100 text-sky-700', rejected: 'bg-red-100 text-red-700' };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[s] || 'bg-gray-100 text-gray-700'}`}>{s.replace('_', ' ')}</span>;
};

export default function CompanyDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Company Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Welcome back — here's your hiring overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPI_CARDS.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{Math.abs(change)}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="font-semibold text-slate-700 mb-4">Requisition vs Joining Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient>
                <linearGradient id="gJ" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip />
              <Area type="monotone" dataKey="requisitions" stroke="#0ea5e9" fill="url(#gR)" name="Requisitions" />
              <Area type="monotone" dataKey="joined" stroke="#6366f1" fill="url(#gJ)" name="Joined" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="font-semibold text-slate-700 mb-4">Candidate Pipeline</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pipelineData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Candidates" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Requisitions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-700">Recent Requisitions</h2>
          <button className="text-xs text-sky-500 hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{['TR No','Position','Dept','Vacancies','Status','Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentRequisitions.map(r => (
                <tr key={r.tr} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-sky-600">{r.tr}</td>
                  <td className="px-4 py-3 text-slate-700">{r.position}</td>
                  <td className="px-4 py-3 text-slate-500">{r.dept}</td>
                  <td className="px-4 py-3 text-slate-700">{r.vacancies}</td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3 text-slate-400">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
