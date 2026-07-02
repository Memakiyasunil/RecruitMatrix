import React, { useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CompanyLoginPage() {
  const { loginWithEmail } = useAuth();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithEmail(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0c1a2e 0%, #0f2744 50%, #0a1628 100%)' }}>

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-3xl p-8"
        style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            <Building2 size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Company Portal</h1>
          <p className="text-slate-400 text-sm mt-1">RecruitMatrix Client Access</p>
        </div>

        {error && (
          <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" required placeholder="Company Email"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type={showPwd ? 'text' : 'password'} required placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
            <button type="button" onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-sky-400 hover:text-sky-300">Forgot Password?</button>
          </div>

          <button type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            Login to Company Portal <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Internal staff?{' '}
          <a href="/admin/login" className="text-sky-400 hover:text-sky-300">Admin Login →</a>
        </p>
      </div>
    </div>
  );
}
