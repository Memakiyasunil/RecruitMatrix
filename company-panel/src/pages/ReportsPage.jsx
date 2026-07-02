import React from 'react';
import { BarChart2, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const reportData = [
  { month: 'Jan', requisitions: 4, selected: 2, joined: 1 },
  { month: 'Feb', requisitions: 6, selected: 4, joined: 3 },
  { month: 'Mar', requisitions: 9, selected: 6, joined: 5 },
  { month: 'Apr', requisitions: 7, selected: 5, joined: 4 },
  { month: 'May', requisitions: 12, selected: 8, joined: 7 },
  { month: 'Jun', requisitions: 10, selected: 7, joined: 6 },
];

const REPORT_TYPES = ['Requisition Summary','Candidate Pipeline Report','Offer & Joining Report','Interview Report'];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Download and view hiring reports for your company</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          <Download size={15} /> Export All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {REPORT_TYPES.map(r => (
          <div key={r} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between hover:border-sky-200 cursor-pointer transition-colors">
            <div>
              <BarChart2 size={20} className="text-sky-500 mb-2" />
              <p className="text-sm font-medium text-slate-700">{r}</p>
            </div>
            <Download size={16} className="text-slate-300" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-700 mb-4">Hiring Summary (2026)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={reportData} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip />
            <Bar dataKey="requisitions" fill="#0ea5e9" radius={[4,4,0,0]} name="Requisitions" />
            <Bar dataKey="selected" fill="#6366f1" radius={[4,4,0,0]} name="Selected" />
            <Bar dataKey="joined" fill="#10b981" radius={[4,4,0,0]} name="Joined" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
