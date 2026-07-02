import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
                <Briefcase size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">Recruit<span className="text-indigo-400">Matrix</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">Enterprise Recruitment ERP + CRM + ATS + Client Hiring Portal. Right Talent. Right Future.</p>
            <div className="flex gap-3 mt-4">
              <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"><Mail size={14} /></button>
              <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-colors"><Globe size={14} /></button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-200">Product</h4>
            {['Features','Services','Pricing','How It Works','Industries'].map(l => (
              <Link key={l} to={`/${l.toLowerCase().replace(/ /g,'-')}`} className="block text-slate-400 hover:text-white text-sm mb-2 transition-colors">{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-200">Company</h4>
            {['About Us','Careers','Testimonials','Contact Us','Login'].map(l => (
              <Link key={l} to={`/${l.toLowerCase().replace(/ /g,'-')}`} className="block text-slate-400 hover:text-white text-sm mb-2 transition-colors">{l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-200">Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-start gap-2"><Mail size={14} className="mt-0.5 flex-shrink-0 text-indigo-400" /> support@recruitmatrix.com</p>
              <p className="flex items-start gap-2"><Phone size={14} className="mt-0.5 flex-shrink-0 text-indigo-400" /> +91 98765 43210</p>
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 flex-shrink-0 text-indigo-400" /> Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 RecruitMatrix. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
