import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, UserCircle, Briefcase, FolderOpen, 
  CheckCircle2, Clock, Calendar, FileCheck, UserPlus 
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/dashboard');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] text-red-500">
        Failed to load dashboard data. Ensure backend is running on port 5000.
      </div>
    );
  }

  const { kpiCards, charts } = data;

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#7C3AED', '#2563EB'];

  const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
            {trend && (
              <p className={`text-xs mt-2 ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isUp ? '↑' : '↓'} {trend.value}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorClass}`}>
            <Icon size={22} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of recruitment operations and performance metrics.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Clients" value={kpiCards.totalClients} icon={Building2} colorClass="bg-blue-100 text-blue-600" />
        <StatCard title="Total Managers" value={kpiCards.totalManagers} icon={Briefcase} colorClass="bg-purple-100 text-purple-600" />
        <StatCard title="Total Staff" value={kpiCards.totalStaff} icon={UserCircle} colorClass="bg-indigo-100 text-indigo-600" />
        <StatCard title="Total Candidates" value={kpiCards.totalCandidates} icon={Users} colorClass="bg-emerald-100 text-emerald-600" trend={{ isUp: true, value: 12 }} />
        
        <StatCard title="Open Positions" value={kpiCards.openPositions} icon={FolderOpen} colorClass="bg-amber-100 text-amber-600" />
        <StatCard title="Closed Positions" value={kpiCards.closedPositions} icon={CheckCircle2} colorClass="bg-green-100 text-green-600" />
        <StatCard title="Pending Approval" value={kpiCards.pendingApproval} icon={Clock} colorClass="bg-orange-100 text-orange-600" />
        <StatCard title="Today's Interviews" value={kpiCards.todaysInterviews} icon={Calendar} colorClass="bg-sky-100 text-sky-600" />
        <StatCard title="Offers Released" value={kpiCards.offersReleased} icon={FileCheck} colorClass="bg-fuchsia-100 text-fuchsia-600" />
        <StatCard title="Joined Candidates" value={kpiCards.joinedCandidates} icon={UserPlus} colorClass="bg-teal-100 text-teal-600" trend={{ isUp: true, value: 8 }} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Hiring */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Hiring Trends</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.monthlyHiring} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="hired" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorHired)" />
                  <Area type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Client Wise Hiring */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Wise Hiring</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.clientWiseHiring}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {charts.clientWiseHiring.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Pipeline */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Pipeline</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.recruitmentPipeline} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#374151' }} width={100} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recruiter Performance */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruiter Performance (Top 5)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.recruiterPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" />
                  <Bar dataKey="sourced" name="Sourced" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interviewed" name="Interviewed" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hired" name="Hired" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* TAT Performance */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">TAT Performance (Avg Days to Hire by Dept)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.tatPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="avgDays" name="Avg Days" stroke="#EF4444" strokeWidth={3} dot={{ r: 6, fill: '#EF4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
