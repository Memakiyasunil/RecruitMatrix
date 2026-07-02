import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Briefcase, BarChart3, Shield, Zap, Globe } from 'lucide-react';

// Section 25.1
const FEATURES = [
  { icon: Briefcase, title: 'Talent Requisition', desc: 'Create and manage job requisitions with full approval workflows.' },
  { icon: Users, title: 'Candidate Pipeline', desc: 'Track candidates through every stage — tagging to joining.' },
  { icon: BarChart3, title: 'Reports & Analytics', desc: 'Real-time dashboards and custom reports for all stakeholders.' },
  { icon: Shield, title: 'Role-Based Access', desc: '13 admin roles + 5 company roles, each with granular permissions.' },
  { icon: Zap, title: 'Interview Management', desc: 'Schedule, track, and collect feedback across all interview rounds.' },
  { icon: Globe, title: 'Client Portal', desc: 'Your clients get their own branded portal to track hiring progress.' },
];

const BENEFITS = [
  'End-to-end recruitment lifecycle management',
  'Multi-role RBAC with granular permissions',
  'Client portal for real-time hiring visibility',
  'Interview scheduling and feedback capture',
  'Offer and joining management workflows',
  'Custom reports and analytics dashboards',
];

const STEPS = [
  { step: '01', title: 'Client Creates Requisition', desc: 'Client HR creates a detailed talent requisition in the company portal.' },
  { step: '02', title: 'Admin Approval', desc: 'Internal admin reviews and approves or rejects the requisition.' },
  { step: '03', title: 'Recruiter Allocation', desc: 'Manager assigns recruiters to the approved requisition.' },
  { step: '04', title: 'Sourcing & Tagging', desc: 'Recruiter sources, screens, and tags candidates to the position.' },
  { step: '05', title: 'Interview & Selection', desc: 'Candidates are scheduled for interviews, feedback captured, selection made.' },
  { step: '06', title: 'Offer & Joining', desc: 'Offer letter released, joining tracked, position closed.' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-indigo-200 mb-8" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
            🚀 Enterprise Recruitment ERP + CRM + ATS
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Hire Smarter.<br />
            <span className="gradient-text">Grow Faster.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            RecruitMatrix is the complete enterprise recruitment platform — from talent requisition to candidate joining, managed in one powerful system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white hover:opacity-90 transition-all text-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
              Request Demo <ArrowRight size={16} />
            </Link>
            <Link to="/features" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all text-sm">
              Explore Features
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-14 pt-14 border-t border-white/10">
            {[['500+','Clients Served'],['50K+','Candidates Placed'],['99.9%','Uptime'],['13+','User Roles']].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-white">{num}</p>
                <p className="text-xs text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Everything You Need to <span className="gradient-text">Hire Better</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto">A complete suite of tools designed for recruitment agencies and enterprise HR teams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-3xl p-7 border border-slate-100 card-hover">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg,#6366f120,#0ea5e920)' }}>
                  <Icon size={22} className="text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">Why Choose <span className="gradient-text">RecruitMatrix?</span></h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Built for recruitment agencies handling enterprise clients, RecruitMatrix provides unmatched visibility and control across the entire hiring lifecycle.</p>
              <div className="space-y-3">
                {BENEFITS.map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-indigo-500 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
                  Get Started <ArrowRight size={15} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['#6366f1','Admin Panel','Role-based internal recruitment operations'],['#0ea5e9','Company Portal','Client-side hiring visibility and tracking'],['#10b981','RBAC Security','13 admin + 5 company roles with action-level control'],['#f59e0b','Reports','Real-time analytics and custom hiring reports']].map(([color, title, desc]) => (
                <div key={title} className="rounded-2xl p-5" style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                  <div className="w-8 h-8 rounded-xl mb-3" style={{ background: color }} />
                  <p className="font-bold text-slate-800 text-sm mb-1">{title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">From client requisition to candidate joining — the complete workflow in 6 steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-4xl font-black gradient-text mb-4">{step}</div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Transform Your Recruitment?</h2>
          <p className="text-indigo-100 mb-8">Join hundreds of recruitment agencies already using RecruitMatrix to hire faster and smarter.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-white rounded-2xl font-bold text-indigo-600 hover:shadow-xl transition-all text-sm">Request Demo</Link>
            <Link to="/login" className="px-8 py-4 border-2 border-white/50 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all text-sm">View Panels</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
