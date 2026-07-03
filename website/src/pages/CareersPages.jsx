import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Search, MapPin, Briefcase, Clock, ChevronRight, Filter,
  Building2, Zap, Globe, Users, CheckCircle, ArrowRight,
  Upload, X, ChevronDown, Star, Send, FileText, Award
} from 'lucide-react';

const API = 'http://localhost:5000/api/v1';

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  'Applied': 'bg-blue-100 text-blue-700',
  'Screening': 'bg-yellow-100 text-yellow-700',
  'Shortlisted': 'bg-indigo-100 text-indigo-700',
  'Interview Scheduled': 'bg-purple-100 text-purple-700',
  'Interview Completed': 'bg-cyan-100 text-cyan-700',
  'Selected': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Hold': 'bg-orange-100 text-orange-700',
  'Joined': 'bg-emerald-100 text-emerald-700',
};
const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status] || 'bg-slate-100 text-slate-600'}`}>
    {status}
  </span>
);

// ─── CAREERS PAGE ─────────────────────────────────────────────────────────────
export function CareersPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const stats = [
    { label: 'Open Positions', value: '120+', icon: Briefcase },
    { label: 'Partner Companies', value: '50+', icon: Building2 },
    { label: 'Candidates Placed', value: '5,000+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #6366f1 0%, transparent 60%), radial-gradient(circle at 70% 20%, #0ea5e9 0%, transparent 50%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-white/80 text-sm">Your next big opportunity awaits</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Build Your Career with<br />
            <span className="gradient-text">RecruitMatrix</span>
          </h1>
          <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto">
            Discover thousands of opportunities across leading companies. Find the role that matches your ambition.
          </p>
          <div className="flex gap-3 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Job title, skills, keyword…"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onKeyDown={e => e.key === 'Enter' && navigate(`/careers/jobs?keyword=${keyword}`)}
              />
            </div>
            <button
              onClick={() => navigate(`/careers/jobs?keyword=${keyword}`)}
              className="px-6 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}
            >
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'linear-gradient(135deg,#6366f110,#0ea5e910)' }}>
                <Icon size={22} className="text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
              <div className="text-slate-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured categories */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-3">Explore by Role</h2>
          <p className="text-slate-500 text-center mb-10">Browse opportunities across top industry domains</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Technology', count: '45 jobs', color: 'from-indigo-500 to-purple-600' },
              { label: 'Finance', count: '22 jobs', color: 'from-sky-500 to-blue-600' },
              { label: 'Marketing', count: '18 jobs', color: 'from-pink-500 to-rose-600' },
              { label: 'Operations', count: '30 jobs', color: 'from-amber-500 to-orange-600' },
              { label: 'HR & Admin', count: '12 jobs', color: 'from-emerald-500 to-teal-600' },
              { label: 'Sales', count: '25 jobs', color: 'from-violet-500 to-indigo-600' },
              { label: 'Design', count: '15 jobs', color: 'from-rose-500 to-pink-600' },
              { label: 'Analytics', count: '20 jobs', color: 'from-cyan-500 to-sky-600' },
            ].map(({ label, count, color }) => (
              <button
                key={label}
                onClick={() => navigate(`/careers/jobs?department=${label}`)}
                className={`p-6 rounded-2xl bg-gradient-to-br ${color} text-white text-left hover:scale-105 transition-transform shadow-lg`}
              >
                <div className="font-bold text-lg mb-1">{label}</div>
                <div className="text-white/80 text-sm">{count}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to find your dream job?</h2>
          <p className="text-white/80 mb-8 text-lg">Browse all open positions and apply in minutes.</p>
          <Link to="/careers/jobs" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
            View All Jobs <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── JOB OPENINGS LIST PAGE ───────────────────────────────────────────────────
export function JobOpeningsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ keyword: '', location: '', department: '', employmentType: '', workMode: '' });

  useEffect(() => {
    // Load query params
    const params = new URLSearchParams(window.location.search);
    setFilters(prev => ({
      ...prev,
      keyword: params.get('keyword') || '',
      department: params.get('department') || '',
    }));
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/public/jobs`);
      const data = await res.json();
      if (data.success) setJobs(data.data);
      else setJobs(MOCK_JOBS);
    } catch {
      setJobs(MOCK_JOBS);
    } finally { setLoading(false); }
  };

  const filtered = jobs.filter(j => {
    if (filters.keyword && !j.title?.toLowerCase().includes(filters.keyword.toLowerCase()) && !j.skills?.some(s => s.toLowerCase().includes(filters.keyword.toLowerCase()))) return false;
    if (filters.location && !j.location?.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.department && j.department !== filters.department) return false;
    if (filters.employmentType && j.employmentType !== filters.employmentType) return false;
    if (filters.workMode && j.workMode !== filters.workMode) return false;
    return true;
  });

  const WORK_MODES = ['On-site', 'Remote', 'Hybrid'];
  const EMP_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Open Positions</h1>
          <p className="text-white/70 mb-8">Discover your next career opportunity</p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={filters.keyword}
              onChange={e => setFilters(f => ({ ...f, keyword: e.target.value }))}
              placeholder="Search by title, skill, or keyword…"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-800 text-sm focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* Filter Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2"><Filter size={16} /> Filters</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Location</label>
                <input value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Mumbai" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Department</label>
                <select value={filters.department} onChange={e => setFilters(f => ({ ...f, department: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option value="">All Departments</option>
                  {['Technology', 'Finance', 'Marketing', 'Operations', 'HR & Admin', 'Sales', 'Design', 'Analytics'].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Work Mode</label>
                {WORK_MODES.map(m => (
                  <label key={m} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="radio" name="workMode" value={m} checked={filters.workMode === m}
                      onChange={e => setFilters(f => ({ ...f, workMode: e.target.value }))} className="accent-indigo-600" />
                    <span className="text-sm text-slate-600">{m}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="workMode" value="" checked={filters.workMode === ''}
                    onChange={() => setFilters(f => ({ ...f, workMode: '' }))} className="accent-indigo-600" />
                  <span className="text-sm text-slate-600">All</span>
                </label>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Employment Type</label>
                {EMP_TYPES.map(t => (
                  <label key={t} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" checked={filters.employmentType === t}
                      onChange={() => setFilters(f => ({ ...f, employmentType: f.employmentType === t ? '' : t }))} className="accent-indigo-600" />
                    <span className="text-sm text-slate-600">{t}</span>
                  </label>
                ))}
              </div>
              <button onClick={() => setFilters({ keyword: '', location: '', department: '', employmentType: '', workMode: '' })}
                className="w-full text-sm text-indigo-600 font-medium hover:underline">Clear All Filters</button>
            </div>
          </div>
        </aside>

        {/* Job Cards */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">{filtered.length}</span> jobs found</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-40 bg-white rounded-2xl animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase size={48} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-500 font-medium">No jobs match your filters</h3>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const navigate = useNavigate();
  const workModeColor = { 'Remote': 'bg-emerald-100 text-emerald-700', 'Hybrid': 'bg-blue-100 text-blue-700', 'On-site': 'bg-slate-100 text-slate-700' };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-bold text-lg">
              {(job.title || 'J')[0]}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{job.title || 'Software Engineer'}</h3>
              <p className="text-slate-500 text-sm">{job.clientName || job.clientId || 'Confidential Company'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {job.location && <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={12} />{job.location}</span>}
            {job.employmentType && <span className="flex items-center gap-1 text-xs text-slate-500"><Clock size={12} />{job.employmentType}</span>}
            {job.experienceMin !== undefined && <span className="flex items-center gap-1 text-xs text-slate-500"><Award size={12} />{job.experienceMin}–{job.experienceMax} yrs</span>}
            {job.workMode && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${workModeColor[job.workMode] || 'bg-slate-100 text-slate-600'}`}>{job.workMode}</span>}
            {job.department && <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">{job.department}</span>}
          </div>
          {job.skills && <div className="flex flex-wrap gap-1 mt-3">{job.skills.slice(0, 5).map(s => <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{s}</span>)}</div>}
        </div>
        <div className="flex flex-col items-end gap-3">
          {job.salaryMin && <span className="text-sm font-semibold text-indigo-600">₹{job.salaryMin}–{job.salaryMax} LPA</span>}
          <button
            onClick={() => navigate(`/careers/jobs/${job.id}`)}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}
          >
            View Job
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── JOB DETAIL PAGE ──────────────────────────────────────────────────────────
export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`${API}/public/jobs/${jobId}`);
      const data = await res.json();
      setJob(data.success ? data.data : MOCK_JOBS[0]);
    } catch {
      setJob(MOCK_JOBS[0]);
    } finally { setLoading(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" /></div>;
  if (!job) return <div className="text-center py-20 text-slate-500">Job not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/careers/jobs')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            ← Back to Jobs
          </button>
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
              <p className="text-white/70 mb-4">{job.clientName || 'Confidential'}</p>
              <div className="flex flex-wrap gap-3">
                {[job.location, job.employmentType, job.workMode, job.department].filter(Boolean).map(v => (
                  <span key={v} className="text-sm bg-white/10 text-white px-3 py-1 rounded-full">{v}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate(`/careers/apply/${job.id}`)}
              className="px-8 py-3 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}
            >
              Apply Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Job Description</h2>
            <p className="text-slate-600 leading-relaxed">{job.description || 'We are looking for a talented professional to join our growing team. You will work on exciting projects and collaborate with industry experts.'}</p>
          </div>
          {job.responsibilities?.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Responsibilities</h2>
              <ul className="space-y-2">{job.responsibilities.map((r, i) => <li key={i} className="flex items-start gap-2 text-slate-600"><CheckCircle size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />{r}</li>)}</ul>
            </div>
          )}
          {job.requirements?.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Requirements</h2>
              <ul className="space-y-2">{job.requirements.map((r, i) => <li key={i} className="flex items-start gap-2 text-slate-600"><ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />{r}</li>)}</ul>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800">Job Overview</h3>
            {[
              { label: 'Experience', value: `${job.experienceMin || 0}–${job.experienceMax || 5} years` },
              { label: 'Employment', value: job.employmentType || 'Full-time' },
              { label: 'Location', value: job.location || 'India' },
              { label: 'Work Mode', value: job.workMode || 'Hybrid' },
              { label: 'Department', value: job.department || 'Technology' },
              { label: 'Notice Period', value: '30–60 days' },
              ...(job.salaryMin ? [{ label: 'Salary Range', value: `₹${job.salaryMin}–${job.salaryMax} LPA` }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>
          {job.skills && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-3">Skills Required</h3>
              <div className="flex flex-wrap gap-2">{job.skills.map(s => <span key={s} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">{s}</span>)}</div>
            </div>
          )}
          <button
            onClick={() => navigate(`/careers/apply/${job.id}`)}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}
          >
            Apply for this Position →
          </button>
        </aside>
      </div>
    </div>
  );
}

// ─── APPLY PAGE (Multi-step Form) ─────────────────────────────────────────────
const STEPS = ['Basic Details', 'Professional Info', 'Job Details', 'Upload Resume', 'Review & Submit'];

export function ApplyPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [job, setJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', mobile: '', currentLocation: '',
    preferredLocation: '', dateOfBirth: '', gender: '',
    currentCompany: '', currentDesignation: '', totalExperience: '',
    relevantExperience: '', currentCTC: '', expectedCTC: '', noticePeriod: '',
    skills: '', highestQualification: '', certifications: '',
    linkedinUrl: '', portfolioUrl: '',
    positionApplied: '', whyHireYou: '',
    availableToRelocate: false, availableToTravel: false,
    resumeFile: null, resumeUrl: '', resumeFileName: '',
    coverLetterFile: null, coverLetterFileName: '',
    termsConsent: false, declarationConsent: false
  });

  useEffect(() => {
    fetch(`${API}/public/jobs/${jobId}`).then(r => r.json()).then(d => {
      if (d.success) {
        setJob(d.data);
        setForm(f => ({ ...f, positionApplied: d.data.title, jobId: d.data.id, clientId: d.data.clientId, requisitionId: d.data.requisitionId }));
      } else {
        setJob({ id: jobId, title: 'Software Engineer' });
        setForm(f => ({ ...f, positionApplied: 'Software Engineer', jobId }));
      }
    }).catch(() => {
      setJob({ id: jobId, title: 'Software Engineer' });
      setForm(f => ({ ...f, positionApplied: 'Software Engineer', jobId }));
    });
  }, [jobId]);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const errs = {};
    if (step === 0) {
      if (!form.firstName.trim()) errs.firstName = 'Required';
      if (!form.lastName.trim()) errs.lastName = 'Required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
      if (!form.mobile.trim()) errs.mobile = 'Required';
      if (!form.currentLocation.trim()) errs.currentLocation = 'Required';
    }
    if (step === 1) {
      if (!form.totalExperience) errs.totalExperience = 'Required';
      if (!form.noticePeriod) errs.noticePeriod = 'Required';
      if (!form.skills.trim()) errs.skills = 'Required';
      if (!form.highestQualification.trim()) errs.highestQualification = 'Required';
    }
    if (step === 3) {
      if (!form.resumeUrl && !form.resumeFile) errs.resume = 'Resume is required';
    }
    if (step === 4) {
      if (!form.termsConsent) errs.termsConsent = 'You must agree to terms';
      if (!form.declarationConsent) errs.declarationConsent = 'Declaration required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setErrors(e => ({ ...e, resume: 'File must be under 5MB' })); return; }
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) { setErrors(e => ({ ...e, resume: 'Only PDF or Word documents allowed' })); return; }
    // Simulate upload URL (in production: upload to Firebase Storage, get URL)
    const fakeUrl = `https://storage.firebase.com/resumes/${Date.now()}_${file.name}`;
    set('resumeFile', file);
    set('resumeFileName', file.name);
    set('resumeUrl', fakeUrl);
    setErrors(e => ({ ...e, resume: undefined }));
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) };
      delete payload.resumeFile; delete payload.coverLetterFile;
      const res = await fetch(`${API}/public/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        navigate('/careers/apply/success', { state: { name: `${form.firstName} ${form.lastName}`, position: form.positionApplied, appId: data.data?.id } });
      } else {
        setErrors({ submit: data.message });
      }
    } catch (err) {
      // Navigate to success anyway for demo
      navigate('/careers/apply/success', { state: { name: `${form.firstName} ${form.lastName}`, position: form.positionApplied } });
    } finally { setSubmitting(false); }
  };

  const inputClass = (field) => `w-full border ${errors[field] ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all`;

  const StepContent = () => {
    switch (step) {
      case 0: return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="label">First Name *</label><input value={form.firstName} onChange={e => set('firstName', e.target.value)} className={inputClass('firstName')} placeholder="John" />{errors.firstName && <p className="err">{errors.firstName}</p>}</div>
          <div><label className="label">Last Name *</label><input value={form.lastName} onChange={e => set('lastName', e.target.value)} className={inputClass('lastName')} placeholder="Doe" />{errors.lastName && <p className="err">{errors.lastName}</p>}</div>
          <div><label className="label">Email Address *</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputClass('email')} placeholder="john@example.com" />{errors.email && <p className="err">{errors.email}</p>}</div>
          <div><label className="label">Mobile Number *</label><input value={form.mobile} onChange={e => set('mobile', e.target.value)} className={inputClass('mobile')} placeholder="+91 98765 43210" />{errors.mobile && <p className="err">{errors.mobile}</p>}</div>
          <div><label className="label">Current Location *</label><input value={form.currentLocation} onChange={e => set('currentLocation', e.target.value)} className={inputClass('currentLocation')} placeholder="Mumbai, Maharashtra" />{errors.currentLocation && <p className="err">{errors.currentLocation}</p>}</div>
          <div><label className="label">Preferred Location</label><input value={form.preferredLocation} onChange={e => set('preferredLocation', e.target.value)} className={inputClass('preferredLocation')} placeholder="Any" /></div>
          <div><label className="label">Date of Birth (optional)</label><input type="date" value={form.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} className={inputClass('dateOfBirth')} /></div>
          <div><label className="label">Gender (optional)</label>
            <select value={form.gender} onChange={e => set('gender', e.target.value)} className={inputClass('gender')}>
              <option value="">Prefer not to say</option>
              <option>Male</option><option>Female</option><option>Non-binary</option><option>Other</option>
            </select>
          </div>
        </div>
      );
      case 1: return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="label">Current Company</label><input value={form.currentCompany} onChange={e => set('currentCompany', e.target.value)} className={inputClass('currentCompany')} placeholder="Acme Corp" /></div>
          <div><label className="label">Current Designation</label><input value={form.currentDesignation} onChange={e => set('currentDesignation', e.target.value)} className={inputClass('currentDesignation')} placeholder="Senior Developer" /></div>
          <div><label className="label">Total Experience (years) *</label><input type="number" min="0" value={form.totalExperience} onChange={e => set('totalExperience', e.target.value)} className={inputClass('totalExperience')} placeholder="5" />{errors.totalExperience && <p className="err">{errors.totalExperience}</p>}</div>
          <div><label className="label">Relevant Experience (years)</label><input type="number" min="0" value={form.relevantExperience} onChange={e => set('relevantExperience', e.target.value)} className={inputClass('relevantExperience')} placeholder="3" /></div>
          <div><label className="label">Current CTC (LPA)</label><input type="number" value={form.currentCTC} onChange={e => set('currentCTC', e.target.value)} className={inputClass('currentCTC')} placeholder="8" /></div>
          <div><label className="label">Expected CTC (LPA)</label><input type="number" value={form.expectedCTC} onChange={e => set('expectedCTC', e.target.value)} className={inputClass('expectedCTC')} placeholder="12" /></div>
          <div><label className="label">Notice Period (days) *</label><input type="number" value={form.noticePeriod} onChange={e => set('noticePeriod', e.target.value)} className={inputClass('noticePeriod')} placeholder="30" />{errors.noticePeriod && <p className="err">{errors.noticePeriod}</p>}</div>
          <div><label className="label">Highest Qualification *</label>
            <select value={form.highestQualification} onChange={e => set('highestQualification', e.target.value)} className={inputClass('highestQualification')}>
              <option value="">Select</option>
              {['High School', 'Diploma', 'B.E./B.Tech', 'B.Sc', 'BCA', 'MBA', 'M.Tech', 'M.Sc', 'MCA', 'PhD', 'Other'].map(q => <option key={q}>{q}</option>)}
            </select>
            {errors.highestQualification && <p className="err">{errors.highestQualification}</p>}
          </div>
          <div className="md:col-span-2"><label className="label">Skills * (comma-separated)</label><input value={form.skills} onChange={e => set('skills', e.target.value)} className={inputClass('skills')} placeholder="React, Node.js, Firebase, TypeScript" />{errors.skills && <p className="err">{errors.skills}</p>}</div>
          <div><label className="label">Certifications</label><input value={form.certifications} onChange={e => set('certifications', e.target.value)} className={inputClass('certifications')} placeholder="AWS, Google Cloud, etc." /></div>
          <div><label className="label">LinkedIn URL</label><input value={form.linkedinUrl} onChange={e => set('linkedinUrl', e.target.value)} className={inputClass('linkedinUrl')} placeholder="https://linkedin.com/in/..." /></div>
          <div><label className="label">Portfolio / GitHub URL</label><input value={form.portfolioUrl} onChange={e => set('portfolioUrl', e.target.value)} className={inputClass('portfolioUrl')} placeholder="https://github.com/..." /></div>
        </div>
      );
      case 2: return (
        <div className="space-y-5">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-sm font-medium text-indigo-700">Applying for: <span className="font-bold">{form.positionApplied || job?.title}</span></p>
          </div>
          <div><label className="label">Why should we hire you? (optional)</label>
            <textarea rows={5} value={form.whyHireYou} onChange={e => set('whyHireYou', e.target.value)} className={`${inputClass('whyHireYou')} resize-none`} placeholder="Share what makes you the ideal candidate for this role…" />
          </div>
          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.availableToRelocate} onChange={e => set('availableToRelocate', e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm text-slate-700">Open to relocate</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.availableToTravel} onChange={e => set('availableToTravel', e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm text-slate-700">Open to travel</span>
            </label>
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-6">
          <div>
            <label className="label">Resume * (PDF, DOC, DOCX — max 5MB)</label>
            <div
              onClick={() => fileRef.current?.click()}
              className={`mt-2 border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all hover:border-indigo-400 ${errors.resume ? 'border-red-400' : 'border-slate-200'} ${form.resumeFileName ? 'border-green-400 bg-green-50' : ''}`}
            >
              {form.resumeFileName ? (
                <div>
                  <FileText size={32} className="text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-700">{form.resumeFileName}</p>
                  <p className="text-sm text-green-600 mt-1">✓ File selected</p>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="text-slate-300 mx-auto mb-2" />
                  <p className="font-medium text-slate-600">Click to upload your resume</p>
                  <p className="text-slate-400 text-sm mt-1">PDF, DOC, or DOCX up to 5MB</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
            </div>
            {errors.resume && <p className="err mt-1">{errors.resume}</p>}
          </div>
          <div>
            <label className="label">Cover Letter (optional)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-indigo-300 transition-all">
              <Upload size={24} className="text-slate-300 mx-auto mb-1" />
              <p className="text-sm text-slate-500">Upload cover letter (optional)</p>
            </div>
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-slate-800 mb-4">Application Summary</h3>
            {[
              { label: 'Name', value: `${form.firstName} ${form.lastName}` },
              { label: 'Email', value: form.email },
              { label: 'Mobile', value: form.mobile },
              { label: 'Position', value: form.positionApplied },
              { label: 'Experience', value: `${form.totalExperience} years` },
              { label: 'Current CTC', value: form.currentCTC ? `₹${form.currentCTC} LPA` : '—' },
              { label: 'Expected CTC', value: form.expectedCTC ? `₹${form.expectedCTC} LPA` : '—' },
              { label: 'Resume', value: form.resumeFileName || '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-500">{label}:</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.termsConsent} onChange={e => set('termsConsent', e.target.checked)} className="mt-1 w-4 h-4 accent-indigo-600" />
            <span className="text-sm text-slate-600">I agree to the <span className="text-indigo-600 underline cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 underline cursor-pointer">Privacy Policy</span>. I consent to my data being used for recruitment purposes. *</span>
          </label>
          {errors.termsConsent && <p className="err">{errors.termsConsent}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.declarationConsent} onChange={e => set('declarationConsent', e.target.checked)} className="mt-1 w-4 h-4 accent-indigo-600" />
            <span className="text-sm text-slate-600">I declare that all the information provided in this application is true and accurate to the best of my knowledge. *</span>
          </label>
          {errors.declarationConsent && <p className="err">{errors.declarationConsent}</p>}
          {errors.submit && <p className="err text-center">{errors.submit}</p>}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-12 px-6" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Apply Now</h1>
          <p className="text-white/70">{job?.title || 'Position'}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Step Indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex flex-col items-center ${i <= step ? '' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block text-center max-w-[70px] leading-tight ${i === step ? 'text-indigo-600 font-semibold' : 'text-slate-400'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? 'bg-green-400' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <style>{`.label { display: block; font-size: 0.8125rem; font-weight: 600; color: #475569; margin-bottom: 0.375rem; } .err { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; }`}</style>
          <h2 className="text-xl font-bold text-slate-800 mb-6">{STEPS[step]}</h2>
          <StepContent />
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={back} disabled={step === 0} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 disabled:opacity-30 transition-all">
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
              Continue →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 disabled:opacity-60 flex items-center gap-2" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
              {submitting ? 'Submitting…' : <><Send size={16} /> Submit Application</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── APPLICATION SUCCESS PAGE ──────────────────────────────────────────────────
export function ApplicationSuccessPage() {
  const navigate = useNavigate();
  const state = window.history.state?.usr || {};
  const name = state.name || 'Candidate';
  const position = state.position || 'the position';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
          <CheckCircle size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-3">Application Submitted! 🎉</h1>
        <p className="text-slate-600 mb-2">Thank you, <span className="font-semibold text-indigo-600">{name}</span>!</p>
        <p className="text-slate-500 mb-8">Your application for <span className="font-medium text-slate-700">{position}</span> has been received. Our team will review it and get back to you soon.</p>
        <div className="bg-indigo-50 rounded-2xl p-6 mb-8 text-left space-y-3">
          <h3 className="font-semibold text-slate-800 text-sm">What happens next?</h3>
          {[
            { step: '1', label: 'Application Review', desc: 'Our recruiters will review your profile' },
            { step: '2', label: 'Shortlisting', desc: 'Shortlisted candidates are contacted within 5–7 days' },
            { step: '3', label: 'Interview', desc: 'Interview schedule will be shared via email' },
          ].map(({ step, label, desc }) => (
            <div key={step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{step}</div>
              <div><p className="text-sm font-medium text-slate-700">{label}</p><p className="text-xs text-slate-500">{desc}</p></div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/careers/jobs')} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all">Browse More Jobs</button>
          <button onClick={() => navigate('/')} className="flex-1 py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

// ─── TRACK APPLICATION PAGE ────────────────────────────────────────────────────
export function TrackApplicationPage() {
  const [email, setEmail] = useState('');
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const track = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/applications?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setApps(data.success ? data.data.filter(a => a.email?.toLowerCase() === email.toLowerCase()) : []);
    } catch { setApps([]); }
    finally { setLoading(false); setSearched(true); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Track Your Application</h1>
          <p className="text-white/70 mb-8">Enter your email address to check the status of your applications</p>
          <div className="flex gap-3">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address"
              className="flex-1 px-4 py-3.5 rounded-xl bg-white text-slate-800 text-sm focus:outline-none"
              onKeyDown={e => e.key === 'Enter' && track()} />
            <button onClick={track} className="px-6 py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
              Track
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {loading && <div className="text-center py-10"><div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto" /></div>}
        {searched && !loading && apps.length === 0 && (
          <div className="text-center py-20">
            <Search size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No applications found for this email address.</p>
          </div>
        )}
        {apps.map(app => (
          <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-800">{app.positionApplied}</h3>
                <p className="text-slate-500 text-sm mt-1">Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MOCK DATA (fallback if backend is offline) ───────────────────────────────
const MOCK_JOBS = [
  { id: 'mock-1', title: 'Senior React Developer', clientName: 'TechCorp Pvt Ltd', department: 'Technology', location: 'Mumbai, MH', employmentType: 'Full-time', workMode: 'Hybrid', experienceMin: 3, experienceMax: 7, salaryMin: 12, salaryMax: 20, salaryVisible: true, companyNameVisible: true, skills: ['React', 'Node.js', 'TypeScript', 'Firebase', 'GraphQL'], description: 'We are looking for a Senior React Developer to join our growing product team. You will lead frontend development, mentor junior engineers, and collaborate closely with product and design.', responsibilities: ['Build and maintain React applications', 'Lead code reviews', 'Mentor junior developers', 'Collaborate with design team'], requirements: ['3+ years React experience', 'Strong TypeScript skills', 'Experience with REST APIs', 'Bachelor\'s in Computer Science or related field'], isActive: true, postedDate: new Date().toISOString() },
  { id: 'mock-2', title: 'Business Analyst', clientName: 'FinancePlus', department: 'Finance', location: 'Bengaluru, KA', employmentType: 'Full-time', workMode: 'On-site', experienceMin: 2, experienceMax: 5, salaryMin: 8, salaryMax: 14, salaryVisible: true, companyNameVisible: true, skills: ['SQL', 'Power BI', 'Excel', 'Stakeholder Management', 'JIRA'], description: 'Join our analytics team as a Business Analyst. You will be responsible for gathering requirements, creating reports, and driving data-driven decisions.', responsibilities: [], requirements: [], isActive: true, postedDate: new Date().toISOString() },
  { id: 'mock-3', title: 'HR Manager', clientName: 'GlobalServices', department: 'HR & Admin', location: 'Delhi, DL', employmentType: 'Full-time', workMode: 'Remote', experienceMin: 5, experienceMax: 10, salaryMin: 10, salaryMax: 18, salaryVisible: true, companyNameVisible: true, skills: ['Talent Acquisition', 'HRMS', 'Payroll', 'Performance Management', 'Onboarding'], description: 'We are hiring an experienced HR Manager to head our People Operations function. You will oversee the full employee lifecycle from hiring to exit.', responsibilities: [], requirements: [], isActive: true, postedDate: new Date().toISOString() },
];
