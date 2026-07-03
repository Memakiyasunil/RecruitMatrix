import React, { useState, useEffect } from 'react';
import { Search, Eye, Download, Calendar, Star, CheckCircle, XCircle, Clock, User, MapPin, Phone, Mail, Briefcase } from 'lucide-react';

const API = 'http://localhost:5000/api/v1';

const STATUS_MAP = {
  'Applied': 'bg-blue-100 text-blue-700', 'Screening': 'bg-yellow-100 text-yellow-700',
  'Shortlisted': 'bg-indigo-100 text-indigo-700', 'Interview Scheduled': 'bg-purple-100 text-purple-700',
  'Interview Completed': 'bg-cyan-100 text-cyan-700', 'Selected': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700', 'Hold': 'bg-orange-100 text-orange-700',
  'Offered': 'bg-teal-100 text-teal-700', 'Offer Accepted': 'bg-emerald-100 text-emerald-700',
  'Joining In Progress': 'bg-sky-100 text-sky-700', 'Joined': 'bg-green-200 text-green-800',
  'No Show': 'bg-gray-100 text-gray-600', 'Withdrawn': 'bg-slate-100 text-slate-600',
};
const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_MAP[status] || 'bg-slate-100 text-slate-500'}`}>{status}</span>
);

const MOCK_APPS = [
  { id: 'app-1', firstName: 'Rahul', lastName: 'Sharma', email: 'rahul@example.com', mobile: '+91 98765 11111', positionApplied: 'Senior React Developer', currentLocation: 'Mumbai', totalExperience: 5, expectedCTC: 18, noticePeriod: 30, skills: ['React', 'Node.js', 'Firebase'], status: 'Shortlisted', appliedAt: '2026-06-28T10:00:00Z', currentStage: 'Shortlisted' },
  { id: 'app-2', firstName: 'Priya', lastName: 'Patel', email: 'priya@example.com', mobile: '+91 98765 22222', positionApplied: 'Business Analyst', currentLocation: 'Bengaluru', totalExperience: 3, expectedCTC: 12, noticePeriod: 45, skills: ['SQL', 'Power BI'], status: 'Interview Scheduled', appliedAt: '2026-06-25T09:00:00Z', currentStage: 'Round 1 Scheduled' },
  { id: 'app-3', firstName: 'Amit', lastName: 'Verma', email: 'amit@example.com', mobile: '+91 98765 33333', positionApplied: 'HR Manager', currentLocation: 'Delhi', totalExperience: 8, expectedCTC: 22, noticePeriod: 60, skills: ['HRMS', 'Payroll'], status: 'Selected', appliedAt: '2026-06-20T08:00:00Z', currentStage: 'Selected' },
  { id: 'app-4', firstName: 'Sneha', lastName: 'Gupta', email: 'sneha@example.com', mobile: '+91 98765 44444', positionApplied: 'Senior React Developer', currentLocation: 'Hyderabad', totalExperience: 6, expectedCTC: 20, noticePeriod: 30, skills: ['React', 'TypeScript'], status: 'Joined', appliedAt: '2026-05-15T11:00:00Z', currentStage: 'Joined' },
  { id: 'app-5', firstName: 'Vijay', lastName: 'Kumar', email: 'vijay@example.com', mobile: '+91 98765 55555', positionApplied: 'Business Analyst', currentLocation: 'Chennai', totalExperience: 2, expectedCTC: 9, noticePeriod: 15, skills: ['Excel', 'JIRA'], status: 'Rejected', appliedAt: '2026-06-10T07:00:00Z', currentStage: 'Rejected' },
];

// ─── Candidate Progress / Pipeline Page ───────────────────────────────────────
export function FullCandidateProgressPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/applications`);
      const data = await res.json();
      setApplications(data.success && data.data.length > 0 ? data.data : MOCK_APPS);
    } catch { setApplications(MOCK_APPS); }
    finally { setLoading(false); }
  };

  const fetchTimeline = async (appId) => {
    try {
      const res = await fetch(`${API}/applications/${appId}/timeline`);
      const data = await res.json();
      setTimeline(data.success ? data.data : []);
    } catch { setTimeline([]); }
  };

  const openDetail = (app) => {
    setSelected(app);
    fetchTimeline(app.id);
  };

  const ALL_STATUSES = ['Applied', 'Screening', 'Shortlisted', 'Interview Scheduled', 'Interview Completed', 'Selected', 'Rejected', 'Hold', 'Joined'];

  const PIPELINE_STAGES = [
    { label: 'Applied', statuses: ['Applied', 'Screening'] },
    { label: 'Shortlisted', statuses: ['Shortlisted'] },
    { label: 'Interviewing', statuses: ['Interview Scheduled', 'Interview Completed'] },
    { label: 'Selected', statuses: ['Selected', 'Offered', 'Offer Accepted'] },
    { label: 'Joined', statuses: ['Joining In Progress', 'Joined'] },
  ];

  const filtered = applications.filter(a => {
    const q = search.toLowerCase();
    const ms = !q || `${a.firstName} ${a.lastName} ${a.positionApplied}`.toLowerCase().includes(q);
    const mstatus = !statusFilter || a.status === statusFilter;
    return ms && mstatus;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Candidate Pipeline</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track all candidates across the hiring funnel</p>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {PIPELINE_STAGES.map(({ label, statuses }) => {
          const count = applications.filter(a => statuses.includes(a.status)).length;
          return (
            <div key={label} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
              <div className="text-2xl font-bold text-slate-700">{count}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              <div className="w-full h-1 rounded-full mt-2 bg-slate-100">
                <div className="h-1 rounded-full bg-indigo-500" style={{ width: `${applications.length > 0 ? (count / applications.length) * 100 : 0}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
          <option value="">All Statuses</option>
          {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Candidate', 'Position', 'Experience', 'Expected CTC', 'Applied', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={7} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : filtered.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
                        {app.firstName?.[0]}{app.lastName?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{app.firstName} {app.lastName}</p>
                        <p className="text-slate-400 text-xs">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{app.positionApplied}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{app.totalExperience} yrs</td>
                  <td className="px-4 py-4 text-sm text-slate-600">₹{app.expectedCTC} LPA</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openDetail(app)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600" title="View Detail"><Eye size={15} /></button>
                      {app.resumeUrl && <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-green-50 text-slate-500 hover:text-green-600" title="Download Resume"><Download size={15} /></a>}
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-slate-400">No candidates match your search</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-lg">Candidate Detail</h2>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
                  {selected.firstName?.[0]}{selected.lastName?.[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xl">{selected.firstName} {selected.lastName}</h3>
                  <p className="text-slate-500">{selected.positionApplied}</p>
                  <div className="mt-1"><StatusBadge status={selected.status} /></div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Email', value: selected.email, icon: Mail },
                  { label: 'Mobile', value: selected.mobile, icon: Phone },
                  { label: 'Location', value: selected.currentLocation, icon: MapPin },
                  { label: 'Experience', value: `${selected.totalExperience} years`, icon: Briefcase },
                  { label: 'Expected CTC', value: `₹${selected.expectedCTC} LPA`, icon: Star },
                  { label: 'Notice Period', value: `${selected.noticePeriod} days`, icon: Clock },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-2 text-slate-600">
                    <Icon size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div><p className="text-xs text-slate-400">{label}</p><p className="font-medium">{value}</p></div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              {selected.skills?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">{selected.skills.map(s => <span key={s} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">{s}</span>)}</div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Activity Timeline</p>
                {timeline.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No activity recorded yet</p>
                ) : (
                  <div className="space-y-3">
                    {timeline.map((event, i) => (
                      <div key={event.id || i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">{event.eventTitle}</p>
                          <p className="text-xs text-slate-400">{event.eventDescription}</p>
                          <p className="text-xs text-slate-300 mt-0.5">{new Date(event.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selected.resumeUrl && (
                <a href={selected.resumeUrl} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Download size={16} /> Download Resume
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Full Interview Schedule Page (Company Panel) ─────────────────────────────
export function FullCompanyInterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(null);

  const ROUND_LABELS = { 'hr-screening': 'HR Screening', technical: 'Technical', managerial: 'Managerial', client: 'Client', final: 'Final Round' };
  const STATUS_COLORS = { scheduled: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700', 'no-show': 'bg-gray-100 text-gray-600' };
  const MOCK_INTERVIEWS = [
    { id: 'int-1', candidateName: 'Priya Patel', positionApplied: 'Business Analyst', roundNumber: 1, roundType: 'hr-screening', mode: 'video', scheduledDate: '2026-07-10', startTime: '10:00', endTime: '11:00', interviewers: ['Alice CEO'], status: 'scheduled', meetingLink: 'https://meet.google.com/abc' },
    { id: 'int-2', candidateName: 'Amit Verma', positionApplied: 'HR Manager', roundNumber: 1, roundType: 'technical', mode: 'in-person', scheduledDate: '2026-07-08', startTime: '14:00', endTime: '15:30', interviewers: ['Charlie TechMgr'], status: 'completed', location: 'Office Floor 3' },
  ];

  useEffect(() => {
    fetch(`${API}/interviews`).then(r => r.json()).then(d => setInterviews(d.success && d.data.length ? d.data : MOCK_INTERVIEWS)).catch(() => setInterviews(MOCK_INTERVIEWS)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Interview Schedule</h1>
        <p className="text-slate-500 text-sm mt-0.5">View all scheduled and completed interviews</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{l:'Scheduled', s:'scheduled', c:'text-blue-700 bg-blue-50 border-blue-200'},{l:'Completed', s:'completed', c:'text-green-700 bg-green-50 border-green-200'},{l:'Total', s:'all', c:'text-slate-700 bg-slate-50 border-slate-200'}].map(({l,s,c}) => (
          <div key={l} className={`rounded-xl border p-4 ${c}`}>
            <div className="text-2xl font-bold">{s==='all'?interviews.length:interviews.filter(i=>i.status===s).length}</div>
            <div className="text-xs mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Candidate','Position','Round','Date & Time','Mode','Interviewer(s)','Status','Action'].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={8} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : interviews.map(iv => (
                <tr key={iv.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-medium text-slate-800 text-sm">{iv.candidateName}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{iv.positionApplied}</td>
                  <td className="px-4 py-4"><span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">R{iv.roundNumber} — {ROUND_LABELS[iv.roundType]||iv.roundType}</span></td>
                  <td className="px-4 py-4"><p className="text-sm font-medium text-slate-700">{iv.scheduledDate}</p><p className="text-xs text-slate-400">{iv.startTime} – {iv.endTime}</p></td>
                  <td className="px-4 py-4 text-sm text-slate-600 capitalize">{iv.mode?.replace('-',' ')}</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{(iv.interviewers||[]).join(', ')||'—'}</td>
                  <td className="px-4 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[iv.status]||'bg-slate-100 text-slate-600'}`}>{iv.status}</span></td>
                  <td className="px-4 py-4">
                    {iv.status === 'completed' && <button onClick={() => setShowFeedback(iv)} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 font-medium">View / Add Feedback</button>}
                    {iv.meetingLink && iv.status === 'scheduled' && <a href={iv.meetingLink} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 font-medium">Join Meeting</a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showFeedback && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between mb-4"><h2 className="font-bold text-slate-800">Interview Summary</h2><button onClick={() => setShowFeedback(null)} className="text-slate-400">✕</button></div>
            <div className="space-y-3 text-sm">
              {[['Candidate', showFeedback.candidateName], ['Position', showFeedback.positionApplied], ['Round', `${showFeedback.roundType} — Round ${showFeedback.roundNumber}`], ['Date', showFeedback.scheduledDate], ['Status', showFeedback.status]].map(([l, v]) => (
                <div key={l} className="flex gap-2"><span className="text-slate-400 w-24">{l}:</span><span className="font-medium text-slate-700">{v}</span></div>
              ))}
            </div>
            <button onClick={() => setShowFeedback(null)} className="w-full mt-5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Selected Candidates Page (Company Panel) ─────────────────────────────────
export function FullSelectedCandidatesPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API}/applications?status=Selected`).then(r => r.json()).then(d => setApps(d.success ? d.data : MOCK_APPS.filter(a => a.status === 'Selected'))).catch(() => setApps(MOCK_APPS.filter(a => a.status === 'Selected'))).finally(() => setLoading(false));
  }, []);
  return <CandidateListPage title="Selected Candidates" description="Candidates who have been selected after interview process" apps={apps} loading={loading} statusFilter="Selected" />;
}

export function FullRejectedCandidatesPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API}/applications?status=Rejected`).then(r => r.json()).then(d => setApps(d.success ? d.data : MOCK_APPS.filter(a => a.status === 'Rejected'))).catch(() => setApps(MOCK_APPS.filter(a => a.status === 'Rejected'))).finally(() => setLoading(false));
  }, []);
  return <CandidateListPage title="Rejected Candidates" description="Candidates not selected in the hiring process" apps={apps} loading={loading} statusFilter="Rejected" />;
}

function CandidateListPage({ title, description, apps, loading }) {
  const [search, setSearch] = useState('');
  const filtered = apps.filter(a => !search || `${a.firstName} ${a.lastName} ${a.positionApplied}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="p-6">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-800">{title}</h1><p className="text-slate-500 text-sm mt-0.5">{description}</p></div>
      <div className="relative mb-5 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Candidate','Position','Experience','CTC','Applied Date','Status'].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={6} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : filtered.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>{app.firstName?.[0]}{app.lastName?.[0]}</div><div><p className="font-semibold text-slate-800 text-sm">{app.firstName} {app.lastName}</p><p className="text-slate-400 text-xs">{app.email}</p></div></div></td>
                  <td className="px-4 py-4 text-sm text-slate-700">{app.positionApplied}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{app.totalExperience} yrs</td>
                  <td className="px-4 py-4 text-sm text-slate-600">₹{app.expectedCTC} LPA</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4"><StatusBadge status={app.status} /></td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-slate-400">No records found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Offer Status Page (Company Panel) ────────────────────────────────────────
export function FullOfferStatusPage() {
  const [joinings, setJoinings] = useState([]);
  const [loading, setLoading] = useState(true);
  const STATUS_COLORS_J = { 'offer-pending':'bg-yellow-100 text-yellow-700','offer-released':'bg-blue-100 text-blue-700','offer-accepted':'bg-teal-100 text-teal-700','offer-rejected':'bg-red-100 text-red-700','joining-confirmed':'bg-green-100 text-green-700','joined':'bg-emerald-100 text-emerald-800' };
  const MOCK_J = [{ id:'j-1', candidateName:'Sneha Gupta', positionApplied:'Senior React Developer', offeredSalaryCTC:19, offerReleaseDate:'2026-06-25', offerStatus:'offer-accepted', expectedJoiningDate:'2026-08-01', joiningStatus:'offer-accepted' }];

  useEffect(() => { fetch(`${API}/joinings`).then(r => r.json()).then(d => setJoinings(d.success ? d.data : MOCK_J)).catch(() => setJoinings(MOCK_J)).finally(() => setLoading(false)); }, []);

  return (
    <div className="p-6">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-800">Offer Status</h1><p className="text-slate-500 text-sm mt-0.5">Track offer letters and acceptance status</p></div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Candidate','Position','Offered CTC','Release Date','Offer Status','Expected Joining','Joining Status'].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={7} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : joinings.map(j => (
                <tr key={j.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-semibold text-slate-800 text-sm">{j.candidateName}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{j.positionApplied}</td>
                  <td className="px-4 py-4 text-sm font-medium text-indigo-600">₹{j.offeredSalaryCTC} LPA</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{j.offerReleaseDate||'—'}</td>
                  <td className="px-4 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS_J[j.offerStatus]||'bg-slate-100 text-slate-500'}`}>{j.offerStatus?.replace(/-/g,' ')}</span></td>
                  <td className="px-4 py-4 text-sm text-slate-600">{j.expectedJoiningDate||'—'}</td>
                  <td className="px-4 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS_J[j.joiningStatus]||'bg-slate-100 text-slate-500'}`}>{j.joiningStatus?.replace(/-/g,' ')}</span></td>
                </tr>
              ))}
              {!loading && joinings.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-slate-400">No joining records found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Joined Candidates Page (Company Panel) ───────────────────────────────────
export function FullJoinedCandidatesPage() {
  const [joinings, setJoinings] = useState([]);
  const [loading, setLoading] = useState(true);
  const MOCK_J = [{ id:'j-1', candidateName:'Sneha Gupta', positionApplied:'Senior React Developer', offeredSalaryCTC:19, actualJoiningDate:'2026-07-01', joiningStatus:'joined' }];
  useEffect(() => { fetch(`${API}/joinings?joiningStatus=joined`).then(r => r.json()).then(d => setJoinings(d.success ? d.data : MOCK_J)).catch(() => setJoinings(MOCK_J)).finally(() => setLoading(false)); }, []);

  return (
    <div className="p-6">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-800">Joined Candidates</h1><p className="text-slate-500 text-sm mt-0.5">Candidates who have successfully joined</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {joinings.map(j => (
          <div key={j.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>{j.candidateName?.[0]}</div>
              <div><p className="font-bold text-slate-800">{j.candidateName}</p><p className="text-slate-500 text-sm">{j.positionApplied}</p></div>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Offered CTC</span><span className="font-medium">₹{j.offeredSalaryCTC} LPA</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Joining Date</span><span className="font-medium">{j.actualJoiningDate||j.expectedJoiningDate||'—'}</span></div>
            </div>
            <div className="mt-3"><span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">✓ Joined</span></div>
          </div>
        ))}
        {!loading && joinings.length === 0 && <p className="text-slate-400 col-span-3 text-center py-12">No candidates have joined yet</p>}
      </div>
    </div>
  );
}
