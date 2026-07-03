import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

// Section 25.10 & 26.1
export function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', mobile: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(form.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setStatus('Sending...');
      setTimeout(() => {
        setStatus('Message sent successfully!');
        setForm({ name: '', company: '', email: '', mobile: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      }, 1000);
    }
  };

  const inputClass = (field) => `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-200'} text-sm focus:outline-none focus:ring-2 transition-all`;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Get in <span style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Touch</span></h1>
          <p className="text-slate-500">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-6">Send us a Message</h2>
            {status && <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${status.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-indigo-50 text-indigo-700'}`}>{status}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Name *</label>
                  <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass('name')} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Name</label>
                  <input type="text" placeholder="Your company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className={inputClass('company')} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email *</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass('email')} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mobile *</label>
                  <input type="tel" placeholder="+91 99999 99999" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} className={inputClass('mobile')} />
                  {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject *</label>
                <input type="text" placeholder="How can we help?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className={inputClass('subject')} />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message *</label>
                <textarea rows={4} placeholder="Tell us more about your requirements..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputClass('message')} resize-none`} />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === 'Sending...'} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-all disabled:opacity-70" style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
                <Send size={15} /> {status === 'Sending...' ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[[Mail,'Email','support@recruitmatrix.com'],[Phone,'Phone','+91 98765 43210'],[MapPin,'Address','Mumbai, Maharashtra, India']].map(([Icon, label, value]) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'linear-gradient(135deg,#6366f120,#0ea5e920)' }}>
                      <Icon size={18} className="text-indigo-600" />
                    </div>
                    <div><p className="text-xs font-semibold text-slate-400 uppercase mb-0.5">{label}</p><p className="text-sm text-slate-700">{value}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Request a Demo</h3>
              <p className="text-slate-500 text-sm mb-4">See RecruitMatrix in action with a personalized demo.</p>
              <button className="w-full py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90" style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>Schedule Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section 25.8
export function PricingPage() {
  const plans = [
    { name: 'Starter', price: '₹9,999', per: '/month', features: ['Up to 5 Users','3 Client Portals','Basic Reports','Email Support'], color: '#6366f1', popular: false },
    { name: 'Growth', price: '₹24,999', per: '/month', features: ['Up to 25 Users','Unlimited Clients','Advanced Reports','RBAC Module','Priority Support'], color: '#0ea5e9', popular: true },
    { name: 'Enterprise', price: 'Custom', per: '', features: ['Unlimited Users','Unlimited Clients','Custom Integrations','Dedicated Manager','SLA Support'], color: '#10b981', popular: false },
  ];
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Simple, Transparent <span style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Pricing</span></h1>
          <p className="text-slate-500">Choose the plan that fits your team size and requirements.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(p => (
            <div key={p.name} className={`bg-white rounded-3xl p-8 border shadow-sm relative ${p.popular ? 'border-indigo-300 shadow-lg shadow-indigo-100' : 'border-slate-100'}`}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>Most Popular</div>}
              <div className="w-12 h-12 rounded-2xl mb-5" style={{ background:`${p.color}15` }}>
                <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{ background:`${p.color}20` }} />
              </div>
              <h3 className="font-black text-slate-900 text-xl mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-black" style={{ color:p.color }}>{p.price}</span><span className="text-slate-400 text-sm">{p.per}</span></div>
              <ul className="space-y-3 mb-8">
                {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:`${p.color}15` }}><div className="w-2 h-2 rounded-full" style={{ background:p.color }} /></div>{f}</li>)}
              </ul>
              <button className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90" style={p.popular ? { background:`linear-gradient(135deg,${p.color},#0ea5e9)`, color:'white' } : { border:`2px solid ${p.color}`, color:p.color }}>
                {p.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section 25.2
export function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-black text-slate-900 mb-6">About <span style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>RecruitMatrix</span></h1>
        <p className="text-xl text-slate-500 mb-12 leading-relaxed">RecruitMatrix is an enterprise-grade Recruitment ERP + CRM + ATS platform built to streamline the entire hiring lifecycle for recruitment agencies and enterprise HR teams.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[['🎯 Our Mission','To empower recruitment teams with the technology they need to place the right talent at the right time, every time.'],['🔭 Our Vision','To become the most trusted recruitment operations platform for enterprises and staffing agencies across India and beyond.']].map(([title, desc]) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section 25.3
export function ServicesPage() {
  const services = [
    { title: 'Recruitment Management', desc: 'End-to-end recruitment lifecycle from TR creation to joining.' },
    { title: 'Hiring Operations', desc: 'Internal operations panel for all recruitment team members.' },
    { title: 'Candidate Tracking', desc: 'Complete candidate database with pipeline stage tracking.' },
    { title: 'Client Hiring Portal', desc: 'Branded company portal for client-side hiring visibility.' },
    { title: 'Reporting & Analytics', desc: 'Custom reports, KPIs, and performance dashboards.' },
    { title: 'Workflow Automation', desc: 'Automated approval workflows and notification systems.' },
  ];
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Our <span style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Services</span></h1>
          <p className="text-slate-500">A complete suite of recruitment services powered by technology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ title, desc }) => (
            <div key={title} className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl mb-4" style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)' }} />
              <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section 25.4
export function FeaturesPage() {
  const groups = [
    { group: 'Client Management', items: ['Client onboarding', 'Contact management', 'Document storage', 'Client portal access'] },
    { group: 'Talent Requisition', items: ['Full TR form with 30+ fields', 'Approval workflows', 'TR timeline tracking', 'Draft and edit support'] },
    { group: 'Candidate Pipeline', items: ['9-stage pipeline', 'Stage history with timestamps', 'Activity log per candidate', 'Notes per stage'] },
    { group: 'Interview Management', items: ['Multi-round scheduling', 'Feedback collection', 'Calendar view', 'Reschedule tracking'] },
    { group: 'Offer & Joining', items: ['Offer letter management', 'Joining date tracking', 'No-show handling', 'Joining confirmation'] },
    { group: 'Reports & Analytics', items: ['10+ report types', 'Role-based dashboards', 'Export to CSV/PDF', 'Custom date filters'] },
    { group: 'Role-Based Access', items: ['13 admin roles', '5 company roles', 'Module-level control', 'Action-level permissions'] },
    { group: 'Dashboard & Tracking', items: ['KPI cards per role', 'Real-time charts', 'Activity feeds', 'Quick action panels'] },
  ];
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Platform <span style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Features</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto">Everything you need to run a world-class recruitment operation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map(({ group, items }) => (
            <div key={group} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 text-sm">{group}</h3>
              <ul className="space-y-2">{items.map(i => <li key={i} className="text-xs text-slate-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Login Redirect Page (Section 25.12)
export function LoginRedirectPage() {
  return (
    <div className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-6">
        <h1 className="text-5xl font-black text-white mb-4">Choose Your <span className="gradient-text">Login Portal</span></h1>
        <p className="text-slate-300 mb-12 text-lg">Select the portal that matches your role</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="http://localhost:5173/login"
            className="group w-64 bg-white rounded-3xl p-8 text-left hover:shadow-2xl hover:shadow-indigo-500/20 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ background:'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Admin Login</h3>
            <p className="text-slate-400 text-sm">For internal staff and management</p>
          </a>
          <a href="http://localhost:5174/login"
            className="group w-64 bg-white rounded-3xl p-8 text-left hover:shadow-2xl hover:shadow-sky-500/20 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ background:'linear-gradient(135deg,#0ea5e9,#0284c7)' }}>
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Company Login</h3>
            <p className="text-slate-400 text-sm">For client company users</p>
          </a>
        </div>
      </div>
    </div>
  );
}
