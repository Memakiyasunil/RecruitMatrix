import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Download, ChevronDown, Calendar, Users, FileText, Briefcase, MapPin, Phone, Mail, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000/api/v1';

// ─── Shared Utilities ─────────────────────────────────────────────────────────
const STATUS_MAP = {
  'Applied': 'bg-blue-100 text-blue-700 border-blue-200',
  'Screening': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Shortlisted': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Interview Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
  'Interview Completed': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Selected': 'bg-green-100 text-green-700 border-green-200',
  'Rejected': 'bg-red-100 text-red-700 border-red-200',
  'Hold': 'bg-orange-100 text-orange-700 border-orange-200',
  'Re-Interview': 'bg-pink-100 text-pink-700 border-pink-200',
  'Offered': 'bg-teal-100 text-teal-700 border-teal-200',
  'Offer Accepted': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Joining In Progress': 'bg-sky-100 text-sky-700 border-sky-200',
  'Joined': 'bg-green-200 text-green-800 border-green-300',
  'No Show': 'bg-gray-100 text-gray-600 border-gray-200',
  'Withdrawn': 'bg-slate-100 text-slate-600 border-slate-200',
};

const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_MAP[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
    {status}
  </span>
);

const MOCK_APPLICATIONS = [
  { id: 'app-1', firstName: 'Rahul', lastName: 'Sharma', email: 'rahul@example.com', mobile: '+91 98765 11111', positionApplied: 'Senior React Developer', currentLocation: 'Mumbai', totalExperience: 5, expectedCTC: 18, noticePeriod: 30, resumeUrl: '#', status: 'Applied', currentStage: 'New Application', appliedAt: '2026-06-28T10:00:00Z', skills: ['React', 'Node.js', 'Firebase'] },
  { id: 'app-2', firstName: 'Priya', lastName: 'Patel', email: 'priya@example.com', mobile: '+91 98765 22222', positionApplied: 'Business Analyst', currentLocation: 'Bengaluru', totalExperience: 3, expectedCTC: 12, noticePeriod: 45, resumeUrl: '#', status: 'Shortlisted', currentStage: 'Shortlisted', appliedAt: '2026-06-25T09:00:00Z', skills: ['SQL', 'Power BI', 'Excel'] },
  { id: 'app-3', firstName: 'Amit', lastName: 'Verma', email: 'amit@example.com', mobile: '+91 98765 33333', positionApplied: 'HR Manager', currentLocation: 'Delhi', totalExperience: 8, expectedCTC: 22, noticePeriod: 60, resumeUrl: '#', status: 'Interview Scheduled', currentStage: 'Round 1', appliedAt: '2026-06-20T08:00:00Z', skills: ['HRMS', 'Payroll', 'Recruitment'] },
  { id: 'app-4', firstName: 'Sneha', lastName: 'Gupta', email: 'sneha@example.com', mobile: '+91 98765 44444', positionApplied: 'Senior React Developer', currentLocation: 'Hyderabad', totalExperience: 6, expectedCTC: 20, noticePeriod: 30, resumeUrl: '#', status: 'Selected', currentStage: 'Selected', appliedAt: '2026-06-15T11:00:00Z', skills: ['React', 'TypeScript', 'GraphQL'] },
  { id: 'app-5', firstName: 'Vijay', lastName: 'Kumar', email: 'vijay@example.com', mobile: '+91 98765 55555', positionApplied: 'Business Analyst', currentLocation: 'Chennai', totalExperience: 2, expectedCTC: 9, noticePeriod: 15, resumeUrl: '#', status: 'Rejected', currentStage: 'Rejected', appliedAt: '2026-06-10T07:00:00Z', skills: ['Excel', 'JIRA'] },
];

const MOCK_INTERVIEWS = [
  { id: 'int-1', applicationId: 'app-2', candidateName: 'Priya Patel', positionApplied: 'Business Analyst', roundNumber: 1, roundType: 'hr-screening', mode: 'video', scheduledDate: '2026-07-10', startTime: '10:00', endTime: '11:00', interviewers: ['Alice CEO'], status: 'scheduled', meetingLink: 'https://meet.google.com/abc-defg-hij' },
  { id: 'int-2', applicationId: 'app-3', candidateName: 'Amit Verma', positionApplied: 'HR Manager', roundNumber: 1, roundType: 'technical', mode: 'in-person', scheduledDate: '2026-07-08', startTime: '14:00', endTime: '15:30', interviewers: ['Charlie TechMgr'], status: 'completed', location: 'Office Floor 3' },
  { id: 'int-3', applicationId: 'app-4', candidateName: 'Sneha Gupta', positionApplied: 'Senior React Developer', roundNumber: 2, roundType: 'final', mode: 'video', scheduledDate: '2026-07-05', startTime: '11:00', endTime: '12:00', interviewers: ['Dave SrDev', 'Alice CEO'], status: 'completed', meetingLink: 'https://meet.google.com/xyz' },
];

// ─── APPLICATIONS INBOX PAGE ──────────────────────────────────────────────────
export function ApplicationsInboxPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [statusModal, setStatusModal] = useState(null);

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/applications`);
      const data = await res.json();
      setApplications(data.success && data.data.length > 0 ? data.data : MOCK_APPLICATIONS);
    } catch { setApplications(MOCK_APPLICATIONS); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/applications/${id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, stage: status })
      });
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      setStatusModal(null);
    } catch (e) {
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      setStatusModal(null);
    }
  };

  const filtered = applications.filter(a => {
    const q = search.toLowerCase();
    const matchesSearch = !q || `${a.firstName} ${a.lastName} ${a.positionApplied} ${a.email}`.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ALL_STATUSES = ['Applied', 'Screening', 'Shortlisted', 'Interview Scheduled', 'Interview Completed', 'Selected', 'Rejected', 'Hold', 'Joined'];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Applications Inbox</h1>
          <p className="text-slate-500 text-sm mt-0.5">All candidate applications from the website</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500"><span className="font-bold text-slate-700">{filtered.length}</span> applications</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, position…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">All Statuses</option>
          {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', count: applications.length, color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' },
          { label: 'New / Applied', count: applications.filter(a => a.status === 'Applied' || a.status === 'Screening').length, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
          { label: 'Shortlisted', count: applications.filter(a => a.status === 'Shortlisted').length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
          { label: 'Selected', count: applications.filter(a => a.status === 'Selected' || a.status === 'Joined').length, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Candidate', 'Position', 'Experience', 'Expected CTC', 'Notice', 'Applied', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={8} className="text-center py-12 text-slate-400">Loading applications…</td></tr>
              ) : filtered.map(app => (
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
                  <td className="px-4 py-4 text-sm text-slate-600">{app.noticePeriod}d</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(app)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors" title="View"><Eye size={15} /></button>
                      {app.resumeUrl && <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-green-50 text-slate-500 hover:text-green-600 transition-colors" title="Download Resume"><Download size={15} /></a>}
                      <button onClick={() => setStatusModal(app)} className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-500 hover:text-purple-600 transition-colors" title="Update Status"><ChevronDown size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-slate-400">No applications match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && <ApplicationDetailDrawer app={selected} onClose={() => setSelected(null)} onStatusChange={updateStatus} />}

      {/* Status Update Modal */}
      {statusModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-slate-800 mb-2">Update Status</h3>
            <p className="text-sm text-slate-500 mb-5">{statusModal.firstName} {statusModal.lastName}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {ALL_STATUSES.map(s => (
                <button key={s} onClick={() => updateStatus(statusModal.id, s)}
                  className={`text-xs py-2 px-3 rounded-xl border transition-all hover:border-indigo-300 ${statusModal.status === s ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-slate-200 text-slate-600'}`}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => setStatusModal(null)} className="w-full py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ApplicationDetailDrawer({ app, onClose, onStatusChange }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-lg">{app.firstName} {app.lastName}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
              {app.firstName?.[0]}{app.lastName?.[0]}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{app.firstName} {app.lastName}</h3>
              <p className="text-slate-500 text-sm">{app.positionApplied}</p>
              <StatusBadge status={app.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Email', value: app.email, icon: Mail },
              { label: 'Mobile', value: app.mobile, icon: Phone },
              { label: 'Location', value: app.currentLocation, icon: MapPin },
              { label: 'Experience', value: `${app.totalExperience} years`, icon: Briefcase },
              { label: 'Expected CTC', value: `₹${app.expectedCTC} LPA`, icon: Star },
              { label: 'Notice Period', value: `${app.noticePeriod} days`, icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-2 text-slate-600">
                <Icon size={14} className="text-indigo-400 mt-0.5" />
                <div><p className="text-xs text-slate-400">{label}</p><p className="font-medium">{value}</p></div>
              </div>
            ))}
          </div>

          {app.skills?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">{app.skills.map(s => <span key={s} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{s}</span>)}</div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={() => onStatusChange(app.id, 'Shortlisted')} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              ✓ Shortlist
            </button>
            <button onClick={() => onStatusChange(app.id, 'Rejected')} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
              ✕ Reject
            </button>
            {app.resumeUrl && <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors flex items-center gap-1"><Download size={14} />Resume</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INTERVIEWS PAGE (Full) ───────────────────────────────────────────────────
export function FullInterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(null);

  useEffect(() => { fetchInterviews(); }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/interviews`);
      const data = await res.json();
      setInterviews(data.success && data.data.length > 0 ? data.data : MOCK_INTERVIEWS);
    } catch { setInterviews(MOCK_INTERVIEWS); }
    finally { setLoading(false); }
  };

  const STATUS_BADGES = {
    scheduled: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700', 'no-show': 'bg-gray-100 text-gray-600', rescheduled: 'bg-orange-100 text-orange-700'
  };

  const ROUND_LABELS = {
    'hr-screening': 'HR Screening', technical: 'Technical', managerial: 'Managerial',
    client: 'Client', final: 'Final Round'
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Interview Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Schedule, manage, and track all interviews</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex items-center gap-2" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
          <Calendar size={16} /> Schedule Interview
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', count: interviews.length, color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' },
          { label: 'Scheduled', count: interviews.filter(i => i.status === 'scheduled').length, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
          { label: 'Completed', count: interviews.filter(i => i.status === 'completed').length, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
          { label: 'No Show', count: interviews.filter(i => i.status === 'no-show').length, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Candidate', 'Position', 'Round', 'Date & Time', 'Mode', 'Interviewer(s)', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={8} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : interviews.map(iv => (
                  <tr key={iv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-slate-800 text-sm">{iv.candidateName}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{iv.positionApplied}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                        R{iv.roundNumber} — {ROUND_LABELS[iv.roundType] || iv.roundType}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-700">{iv.scheduledDate}</p>
                      <p className="text-xs text-slate-400">{iv.startTime} – {iv.endTime}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 capitalize">{iv.mode?.replace('-', ' ')}</td>
                    <td className="px-4 py-4 text-xs text-slate-500">{(iv.interviewers || []).join(', ') || '—'}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_BADGES[iv.status] || 'bg-slate-100 text-slate-600'}`}>
                        {iv.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedInterview(iv)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600" title="View"><Eye size={14} /></button>
                        {iv.status === 'completed' && <button onClick={() => setShowFeedbackForm(iv)} className="p-1.5 rounded-lg hover:bg-green-50 text-slate-500 hover:text-green-600 text-xs font-medium" title="Add Feedback"><Star size={14} /></button>}
                        {iv.meetingLink && <a href={iv.meetingLink} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-500 hover:text-sky-600 text-xs">🔗</a>}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && <ScheduleInterviewModal onClose={() => setShowForm(false)} onSaved={fetchInterviews} />}
      {selectedInterview && <InterviewDetailModal interview={selectedInterview} onClose={() => setSelectedInterview(null)} />}
      {showFeedbackForm && <FeedbackModal interview={showFeedbackForm} onClose={() => setShowFeedbackForm(null)} onSaved={() => { setShowFeedbackForm(null); fetchInterviews(); }} />}
    </div>
  );
}

function ScheduleInterviewModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ applicationId: '', candidateName: '', positionApplied: '', roundNumber: 1, roundType: 'hr-screening', mode: 'video', scheduledDate: '', startTime: '', endTime: '', timezone: 'IST', location: '', meetingLink: '', interviewers: '', notes: '', requiredDocuments: '' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.candidateName || !form.scheduledDate || !form.startTime) return;
    setSaving(true);
    try {
      const payload = { ...form, interviewers: form.interviewers.split(',').map(s => s.trim()).filter(Boolean) };
      await fetch(`${API}/interviews`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      onSaved(); onClose();
    } catch { onSaved(); onClose(); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Schedule Interview</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          {[
            { label: 'Candidate Name *', field: 'candidateName', placeholder: 'Rahul Sharma' },
            { label: 'Position *', field: 'positionApplied', placeholder: 'Senior React Developer' },
            { label: 'Application ID', field: 'applicationId', placeholder: 'app-001' },
          ].map(({ label, field, placeholder }) => (
            <div key={field} className="col-span-2 md:col-span-1">
              <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
              <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Round Number</label>
            <input type="number" min="1" max="10" value={form.roundNumber} onChange={e => setForm(f => ({ ...f, roundNumber: e.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Round Type</label>
            <select value={form.roundType} onChange={e => setForm(f => ({ ...f, roundType: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
              {[['hr-screening','HR Screening'],['technical','Technical'],['managerial','Managerial'],['client','Client'],['final','Final Round']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Interview Mode</label>
            <select value={form.mode} onChange={e => setForm(f => ({ ...f, mode: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
              {[['video','Video Call'],['in-person','In-Person'],['phone','Phone Call'],['online-assessment','Online Assessment']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Date *</label>
            <input type="date" value={form.scheduledDate} onChange={e => setForm(f => ({ ...f, scheduledDate: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Start Time *</label>
            <input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">End Time</label>
            <input type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Interviewers (comma-separated)</label>
            <input value={form.interviewers} onChange={e => setForm(f => ({ ...f, interviewers: e.target.value }))} placeholder="Alice CEO, Charlie TechMgr" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
          </div>
          {form.mode === 'video' && <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 mb-1">Meeting Link</label><input value={form.meetingLink} onChange={e => setForm(f => ({ ...f, meetingLink: e.target.value }))} placeholder="https://meet.google.com/…" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>}
          {form.mode === 'in-person' && <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 mb-1">Location</label><input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Office Floor 3, Conference Room A" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>}
          <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 mb-1">Notes / Instructions</label><textarea rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Instructions for the candidate…" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" /></div>
        </div>
        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={save} disabled={saving} className="flex-1 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
            {saving ? 'Saving…' : 'Schedule Interview'}
          </button>
        </div>
      </div>
    </div>
  );
}

function InterviewDetailModal({ interview, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Interview Details</h2>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <div className="p-6 space-y-4 text-sm">
          {[
            ['Candidate', interview.candidateName], ['Position', interview.positionApplied],
            ['Round', `Round ${interview.roundNumber} — ${interview.roundType}`],
            ['Date', interview.scheduledDate], ['Time', `${interview.startTime} – ${interview.endTime}`],
            ['Mode', interview.mode], ['Status', interview.status],
            ['Interviewers', (interview.interviewers || []).join(', ')],
            ...(interview.meetingLink ? [['Meeting Link', interview.meetingLink]] : []),
            ...(interview.location ? [['Location', interview.location]] : []),
            ...(interview.notes ? [['Notes', interview.notes]] : []),
          ].map(([label, value]) => (
            <div key={label} className="flex gap-3">
              <span className="text-slate-400 w-28 flex-shrink-0">{label}:</span>
              <span className="text-slate-700 font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-slate-100">
          <button onClick={onClose} className="w-full py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">Close</button>
        </div>
      </div>
    </div>
  );
}

function FeedbackModal({ interview, onClose, onSaved }) {
  const [form, setForm] = useState({ interviewerName: '', technicalRating: 3, communicationRating: 3, experienceRelevanceRating: 3, behavioralRating: 3, problemSolvingRating: 3, overallRating: 7, strengths: '', weaknesses: '', detailedComments: '', recommendation: 'select', proposedSalary: '' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`${API}/interviews/${interview.id}/feedback`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submittedBy: form.interviewerName })
      });
      onSaved();
    } catch { onSaved(); }
    finally { setSaving(false); }
  };

  const RatingInput = ({ field, label }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        {[1,2,3,4,5].map(v => (
          <button key={v} onClick={() => setForm(f => ({ ...f, [field]: v }))}
            className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${form[field] >= v ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Submit Interview Feedback</h2>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <div className="p-6 space-y-5">
          <div className="p-4 bg-indigo-50 rounded-xl text-sm">
            <p className="font-medium text-indigo-800">{interview.candidateName} — {interview.positionApplied}</p>
            <p className="text-indigo-600 text-xs mt-1">Round {interview.roundNumber} • {interview.scheduledDate}</p>
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Interviewer Name</label>
            <input value={form.interviewerName} onChange={e => setForm(f => ({ ...f, interviewerName: e.target.value }))} placeholder="Your name" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <RatingInput field="technicalRating" label="Technical Skills" />
            <RatingInput field="communicationRating" label="Communication" />
            <RatingInput field="experienceRelevanceRating" label="Experience Relevance" />
            <RatingInput field="behavioralRating" label="Behavioral / Culture Fit" />
            <RatingInput field="problemSolvingRating" label="Problem Solving" />
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Overall Rating (1–10)</label>
              <input type="number" min="1" max="10" value={form.overallRating} onChange={e => setForm(f => ({ ...f, overallRating: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
            </div>
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Key Strengths</label>
            <textarea rows={2} value={form.strengths} onChange={e => setForm(f => ({ ...f, strengths: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Areas of Improvement</label>
            <textarea rows={2} value={form.weaknesses} onChange={e => setForm(f => ({ ...f, weaknesses: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Detailed Comments</label>
            <textarea rows={3} value={form.detailedComments} onChange={e => setForm(f => ({ ...f, detailedComments: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" /></div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Recommendation</label>
            <div className="flex flex-wrap gap-2">
              {[['select','✓ Select'],['reject','✕ Reject'],['hold','⏸ Hold'],['re-interview','↺ Re-Interview'],['next-round','→ Next Round']].map(([v,l]) => (
                <button key={v} onClick={() => setForm(f => ({ ...f, recommendation: v }))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${form.recommendation === v ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Proposed Salary (LPA, optional)</label>
            <input type="number" value={form.proposedSalary} onChange={e => setForm(f => ({ ...f, proposedSalary: e.target.value }))} placeholder="e.g. 15" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
        </div>
        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={save} disabled={saving} className="flex-1 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
            {saving ? 'Submitting…' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SELECTION PAGE (Full) ────────────────────────────────────────────────────
export function FullSelectionPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningModal, setJoiningModal] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/applications`).then(r => r.json()).then(d => {
      setApplications(d.success && d.data.length ? d.data.filter(a => ['Interview Completed','Selected','Rejected','Hold','Re-Interview'].includes(a.status)) : MOCK_APPLICATIONS.filter(a => ['Selected','Rejected'].includes(a.status)));
    }).catch(() => setApplications(MOCK_APPLICATIONS.filter(a => ['Selected','Rejected'].includes(a.status)))).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try { await fetch(`${API}/applications/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }); }
    catch {}
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Selection Management</h1>
        <p className="text-slate-500 text-sm mt-0.5">Review interview results and make final hiring decisions</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Candidate', 'Position', 'Experience', 'Expected CTC', 'Current Status', 'Decision', 'Actions'].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={7} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : applications.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>{app.firstName?.[0]}{app.lastName?.[0]}</div><div><p className="font-semibold text-slate-800 text-sm">{app.firstName} {app.lastName}</p><p className="text-slate-400 text-xs">{app.email}</p></div></div></td>
                  <td className="px-4 py-4 text-sm text-slate-700">{app.positionApplied}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{app.totalExperience} yrs</td>
                  <td className="px-4 py-4 text-sm text-slate-600">₹{app.expectedCTC} LPA</td>
                  <td className="px-4 py-4"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateStatus(app.id, 'Selected')} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">✓ Select</button>
                      <button onClick={() => updateStatus(app.id, 'Rejected')} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors">✕ Reject</button>
                      <button onClick={() => updateStatus(app.id, 'Hold')} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors">⏸ Hold</button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {app.status === 'Selected' && <button onClick={() => setJoiningModal(app)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100">Initiate Offer →</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {joiningModal && <InitiateJoiningModal app={joiningModal} onClose={() => setJoiningModal(null)} />}
    </div>
  );
}

function InitiateJoiningModal({ app, onClose }) {
  const [form, setForm] = useState({ offeredSalaryCTC: '', offerReleaseDate: '', expectedJoiningDate: '', hrRemarks: '' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`${API}/joinings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: app.id, candidateName: `${app.firstName} ${app.lastName}`, positionApplied: app.positionApplied, clientId: app.clientId, requisitionId: app.requisitionId, ...form })
      });
      onClose();
    } catch { onClose(); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-100"><h2 className="font-bold text-slate-800">Initiate Offer</h2><button onClick={onClose} className="text-slate-400">✕</button></div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-green-50 rounded-xl text-sm"><p className="font-medium text-green-800">{app.firstName} {app.lastName}</p><p className="text-green-600 text-xs">{app.positionApplied}</p></div>
          {[{l:'Offered CTC (LPA)',f:'offeredSalaryCTC',t:'number'},{l:'Offer Release Date',f:'offerReleaseDate',t:'date'},{l:'Expected Joining Date',f:'expectedJoiningDate',t:'date'}].map(({l,f,t}) => (
            <div key={f}><label className="block text-xs font-semibold text-slate-500 mb-1">{l}</label><input type={t} value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
          ))}
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">HR Remarks</label><textarea rows={2} value={form.hrRemarks} onChange={e => setForm(p => ({ ...p, hrRemarks: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" /></div>
        </div>
        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm text-slate-600">Cancel</button>
          <button onClick={save} disabled={saving} className="flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>{saving ? 'Saving…' : 'Create Offer'}</button>
        </div>
      </div>
    </div>
  );
}

// ─── JOINING TRACKER PAGE (Full) ──────────────────────────────────────────────
export function FullJoiningPage() {
  const [joinings, setJoinings] = useState([]);
  const [loading, setLoading] = useState(true);

  const JOINING_STATUSES = ['offer-pending','offer-released','offer-accepted','offer-rejected','joining-pending','joining-confirmed','joined','no-show','hold'];
  const STATUS_MAP_J = { 'offer-pending':'bg-yellow-100 text-yellow-700', 'offer-released':'bg-blue-100 text-blue-700', 'offer-accepted':'bg-teal-100 text-teal-700', 'offer-rejected':'bg-red-100 text-red-700', 'joining-pending':'bg-orange-100 text-orange-700', 'joining-confirmed':'bg-indigo-100 text-indigo-700', joined:'bg-green-100 text-green-800', 'no-show':'bg-gray-100 text-gray-600', hold:'bg-orange-100 text-orange-700' };

  useEffect(() => {
    fetch(`${API}/joinings`).then(r => r.json()).then(d => setJoinings(d.success ? d.data : MOCK_JOININGS)).catch(() => setJoinings(MOCK_JOININGS)).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, joiningStatus) => {
    try { await fetch(`${API}/joinings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ joiningStatus }) }); } catch {}
    setJoinings(prev => prev.map(j => j.id === id ? { ...j, joiningStatus } : j));
  };

  return (
    <div className="p-6">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-800">Joining Tracker</h1><p className="text-slate-500 text-sm mt-0.5">Track offer releases, acceptances, and final joining</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{l:'Total Offers',s:'all'},{l:'Offer Accepted',s:'offer-accepted'},{l:'Joining Confirmed',s:'joining-confirmed'},{l:'Joined',s:'joined'}].map(({l,s}) => (
          <div key={l} className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="text-2xl font-bold text-slate-700">{s==='all'?joinings.length:joinings.filter(j=>j.joiningStatus===s).length}</div>
            <div className="text-xs text-slate-500 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Candidate','Position','Offered CTC','Offer Status','Expected Joining','Joining Status','Update Status'].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={7} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : joinings.map(j => (
                <tr key={j.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-semibold text-slate-800 text-sm">{j.candidateName}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{j.positionApplied}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">₹{j.offeredSalaryCTC} LPA</td>
                  <td className="px-4 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_MAP_J[j.offerStatus] || 'bg-slate-100 text-slate-500'}`}>{j.offerStatus}</span></td>
                  <td className="px-4 py-4 text-sm text-slate-600">{j.expectedJoiningDate || '—'}</td>
                  <td className="px-4 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_MAP_J[j.joiningStatus] || 'bg-slate-100 text-slate-500'}`}>{j.joiningStatus?.replace(/-/g,' ')}</span></td>
                  <td className="px-4 py-4">
                    <select value={j.joiningStatus} onChange={e => updateStatus(j.id, e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none">
                      {JOINING_STATUSES.map(s => <option key={s} value={s}>{s.replace(/-/g,' ')}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {!loading && joinings.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-slate-400">No joining records yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MOCK_JOININGS = [
  { id: 'j-1', candidateName: 'Sneha Gupta', positionApplied: 'Senior React Developer', offeredSalaryCTC: 19, offerStatus: 'released', expectedJoiningDate: '2026-08-01', joiningStatus: 'offer-accepted' },
];
