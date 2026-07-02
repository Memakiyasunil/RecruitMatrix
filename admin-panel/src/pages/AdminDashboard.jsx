import React, { useState } from 'react';
import {
  Users, Briefcase, Calendar, UserCheck,
  TrendingUp, Download, ChevronDown, Plus,
  UserPlus, CalendarClock, BarChart3, ArrowUpRight,
  Clock, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

/* ─── Mock Data ──────────────────────────────────────────────── */
const kpis = [
  {
    id: 'candidates',
    label: 'Total Candidates',
    value: '12,549',
    change: '+12.5%',
    up: true,
    icon: Users,
    color: '#6366f1',
    bg: '#eef2ff',
    spark: [30,45,35,55,40,65,50,70,60,80,72,90],
  },
  {
    id: 'jobs',
    label: 'Active Jobs',
    value: '256',
    change: '+8.3%',
    up: true,
    icon: Briefcase,
    color: '#f97316',
    bg: '#fff7ed',
    spark: [20,35,28,42,38,50,44,55,48,60,54,65],
  },
  {
    id: 'interviews',
    label: 'Interviews',
    value: '1,429',
    change: '+15.7%',
    up: true,
    icon: Calendar,
    color: '#10b981',
    bg: '#f0fdf4',
    spark: [40,55,48,62,58,70,65,78,72,85,80,92],
  },
  {
    id: 'hired',
    label: 'Hired Candidates',
    value: '342',
    change: '+9.8%',
    up: true,
    icon: UserCheck,
    color: '#3b82f6',
    bg: '#eff6ff',
    spark: [15,22,18,28,24,33,29,38,34,42,39,48],
  },
];

const applicationsData = [
  { date: 'May 18', applications: 800 },
  { date: 'May 19', applications: 950 },
  { date: 'May 20', applications: 1100 },
  { date: 'May 21', applications: 1243 },
  { date: 'May 22', applications: 980 },
  { date: 'May 23', applications: 1350 },
  { date: 'May 24', applications: 1450 },
];

const statusData = [
  { name: 'Applied',    value: 5328, pct: '42.4%', color: '#6366f1' },
  { name: 'Screening',  value: 2945, pct: '23.5%', color: '#f97316' },
  { name: 'Interview',  value: 2341, pct: '18.6%', color: '#3b82f6' },
  { name: 'Offered',    value: 1245, pct: '9.9%',  color: '#10b981' },
  { name: 'Rejected',   value: 690,  pct: '5.6%',  color: '#ef4444' },
];

const recentActivities = [
  { id:1, avatar:'JD', color:'#6366f1', text:'New user John Doe has been added',                 time:'2 mins ago' },
  { id:2, avatar:'NJ', color:'#f97316', text:'New job "Frontend Developer" has been posted',     time:'15 mins ago' },
  { id:3, avatar:'SJ', color:'#10b981', text:'Sarah Johnson completed an interview',              time:'1 hour ago' },
  { id:4, avatar:'MB', color:'#3b82f6', text:'Michael Brown was hired for UI/UX Designer',       time:'2 hours ago' },
  { id:5, avatar:'SB', color:'#8b5cf6', text:'System backup completed successfully',              time:'3 hours ago' },
];

const recentApplications = [
  { id:1, name:'Robert Fox',      email:'robert.fox@email.com',    title:'Frontend Developer', company:'Tech Solutions Inc.',status:'Screening', date:'May 24, 2024' },
  { id:2, name:'Jenny Wilson',    email:'jenny.wilson@email.com',  title:'UI/UX Designer',     company:'Creative Minds',    status:'Interview', date:'May 24, 2024' },
  { id:3, name:'Brooklyn Simmons',email:'brooklyn@email.com',      title:'Product Manager',    company:'Innovate Labs',     status:'Applied',   date:'May 24, 2024' },
  { id:4, name:'Leslie Alexander',email:'leslie.alex@email.com',   title:'Backend Developer',  company:'CodeCraft',         status:'Offered',   date:'May 23, 2024' },
  { id:5, name:'Guy Hawkins',     email:'guy.hawkins@email.com',   title:'DevOps Engineer',    company:'CloudNet',          status:'Rejected',  date:'May 23, 2024' },
];

const jobPostingData = [
  { day: 'Mon', jobs: 32 }, { day: 'Tue', jobs: 45 }, { day: 'Wed', jobs: 28 },
  { day: 'Thu', jobs: 60 }, { day: 'Fri', jobs: 52 }, { day: 'Sat', jobs: 38 }, { day: 'Sun', jobs: 20 },
];

const jobStatusBreakdown = [
  { label: 'Active',  count: 156, color: '#6366f1' },
  { label: 'Closed',  count: 63,  color: '#ef4444' },
  { label: 'Draft',   count: 22,  color: '#f59e0b' },
  { label: 'On Hold', count: 15,  color: '#6b7280' },
];

/* ─── Status badge ───────────────────────────────────────────── */
const STATUS_STYLES = {
  Screening: { bg: '#eff6ff', text: '#3b82f6' },
  Interview:  { bg: '#fff7ed', text: '#f97316' },
  Applied:    { bg: '#f0fdf4', text: '#22c55e' },
  Offered:    { bg: '#fdf4ff', text: '#a855f7' },
  Rejected:   { bg: '#fef2f2', text: '#ef4444' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: '#f3f4f6', text: '#6b7280' };
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: s.bg, color: s.text }}>
      {status}
    </span>
  );
}

/* ─── Sparkline mini chart ───────────────────────────────────── */
function MiniSparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 48; const w = 100;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100" height="48" className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── KPI Card ───────────────────────────────────────────────── */
function KpiCard({ kpi }) {
  const Icon = kpi.icon;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">{kpi.label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} style={{ color: kpi.up ? '#22c55e' : '#ef4444' }} />
            <span className="text-xs font-semibold" style={{ color: kpi.up ? '#22c55e' : '#ef4444' }}>
              {kpi.change}
            </span>
            <span className="text-xs text-gray-400">vs last week</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
             style={{ background: kpi.bg }}>
          <Icon size={18} style={{ color: kpi.color }} />
        </div>
      </div>
      <MiniSparkline data={kpi.spark} color={kpi.color} />
    </div>
  );
}

/* ─── Avatar initials ────────────────────────────────────────── */
function Avatar({ initials, color, size = 8 }) {
  return (
    <div className={`w-${size} h-${size} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
         style={{ background: color }}>
      {initials}
    </div>
  );
}

/* ─── Quick Action Card ──────────────────────────────────────── */
function QuickAction({ icon: Icon, label, color, bg }) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all card-hover">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
        <Icon size={18} style={{ color }} />
      </div>
      <span className="text-xs text-gray-600 font-medium text-center leading-tight">{label}</span>
    </button>
  );
}

/* ─── Custom Tooltip ─────────────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-xl rounded-xl px-3 py-2 border border-gray-100 text-xs">
        <p className="text-gray-500 mb-1">{label}</p>
        <p className="font-bold text-gray-900">{payload[0].value.toLocaleString()} Applications</p>
      </div>
    );
  }
  return null;
}

/* ─── Main Dashboard ─────────────────────────────────────────── */
export default function AdminDashboard() {
  const [dateRange] = useState('May 18 - May 24, 2024');

  return (
    <div className="space-y-6 fade-in-up">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button id="export-report-btn"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
            <Download size={15} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-all">
            <Calendar size={14} className="text-gray-500" />
            {dateRange}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        {kpis.map(kpi => <KpiCard key={kpi.id} kpi={kpi} />)}
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Applications Overview — 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Applications Overview</h3>
            <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50">
              This Week <ChevronDown size={12} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={applicationsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false}
                     tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false}
                     tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applications" stroke="#6366f1" strokeWidth={2.5}
                    fill="url(#appGrad)" dot={false}
                    activeDot={{ r: 5, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Applications by Status — 1 col */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Applications by Status</h3>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%"
                     innerRadius={50} outerRadius={75}
                     paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [v.toLocaleString(), '']}
                         contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="text-center -mt-4 mb-2">
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-lg font-bold text-gray-900">12,549</p>
            </div>
            {/* Legend */}
            <div className="w-full space-y-1.5 mt-2">
              {statusData.map(s => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-gray-600">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{s.value.toLocaleString()}</span>
                    <span className="text-gray-400">({s.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Applications — 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Recent Applications</h3>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Candidate</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-3 py-3">Job Title</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-3 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-3 py-3">Applied On</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map(app => (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar initials={app.name.split(' ').map(n=>n[0]).join('')}
                                color={STATUS_STYLES[app.status]?.text || '#6b7280'} size={8} />
                        <div>
                          <p className="font-medium text-gray-900 text-xs">{app.name}</p>
                          <p className="text-gray-400 text-xs">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-medium text-gray-800 text-xs">{app.title}</p>
                      <p className="text-gray-400 text-xs">{app.company}</p>
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-500">{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: Activities + Quick Actions */}
        <div className="flex flex-col gap-4">

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-50">
              <h3 className="text-sm font-semibold text-gray-900">Recent Activities</h3>
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">View All</button>
            </div>
            <div className="p-4 space-y-3">
              {recentActivities.map(a => (
                <div key={a.id} className="flex items-start gap-3">
                  <Avatar initials={a.avatar} color={a.color} size={8} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock size={10}/> {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <QuickAction icon={Briefcase}   label="Add New Job"         color="#f97316" bg="#fff7ed" />
              <QuickAction icon={UserPlus}    label="Add Candidate"       color="#6366f1" bg="#eef2ff" />
              <QuickAction icon={CalendarClock} label="Schedule Interview" color="#10b981" bg="#f0fdf4" />
              <QuickAction icon={BarChart3}   label="View Reports"        color="#3b82f6" bg="#eff6ff" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Job Posting Summary ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Job Posting Summary</h3>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Stats left */}
          <div>
            <p className="text-xs text-gray-500">Total Jobs</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">256</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} className="text-green-500" />
              <span className="text-xs font-semibold text-green-500">8.3%</span>
              <span className="text-xs text-gray-400">vs last week</span>
            </div>
            <div className="mt-4 space-y-2">
              {jobStatusBreakdown.map(j => (
                <div key={j.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: j.color }} />
                    <span className="text-gray-600">{j.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{j.count}</span>
                    <ChevronRight size={12} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Chart */}
          <div className="md:col-span-2">
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={jobPostingData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false}
                       tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Bar dataKey="jobs" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
