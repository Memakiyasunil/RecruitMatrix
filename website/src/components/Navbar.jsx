import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isLightHeader = !['/', '/careers', '/careers/jobs', '/careers/track'].includes(pathname) && !pathname.startsWith('/careers/apply/');
  const effectiveScrolled = scrolled || isLightHeader;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${effectiveScrolled ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
            <Briefcase size={18} className="text-white" />
          </div>
          <span className={`font-bold text-lg ${effectiveScrolled ? 'text-slate-800' : 'text-white'}`}>
            Recruit<span className="text-indigo-400">Matrix</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path}
              className={`text-sm font-medium transition-colors ${pathname === path
                ? 'text-indigo-400'
                : effectiveScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="http://localhost:5173/login" className={`text-sm font-medium px-4 py-2 rounded-xl border transition-all ${effectiveScrolled ? 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600' : 'border-white/30 text-white hover:border-white'}`}>
            Admin Login
          </a>
          <a href="http://localhost:5174/login"
            className="text-sm font-medium px-4 py-2 rounded-xl text-white hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>
            Company Login
          </a>
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden ${effectiveScrolled ? 'text-slate-700' : 'text-white'}`} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} onClick={() => setOpen(false)} className="block text-sm font-medium text-slate-600 hover:text-indigo-600 py-2">{label}</Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a href="http://localhost:5173/login" className="text-sm text-center py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Admin Login</a>
            <a href="http://localhost:5174/login" className="text-sm text-center py-2.5 rounded-xl text-white font-medium" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}>Company Login</a>
          </div>
        </div>
      )}
    </nav>
  );
}
