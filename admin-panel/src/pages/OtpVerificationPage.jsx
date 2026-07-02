import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, RefreshCw } from 'lucide-react';

/* ── Animated Envelope SVG ──────────────────────────────────── */
function EnvelopeIcon() {
  return (
    <div className="relative flex items-center justify-center mb-8">
      {/* Outer glow ring */}
      <div className="absolute w-36 h-36 rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)' }} />
      {/* Icon container */}
      <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center"
           style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.3) 100%)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    boxShadow: '0 0 48px rgba(16,185,129,0.2)' }}>
        {/* Envelope */}
        <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
          {/* Envelope body */}
          <rect x="6" y="16" width="52" height="36" rx="4" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2"/>
          {/* Envelope flap */}
          <path d="M6 20l26 18 26-18" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Check circle */}
          <circle cx="48" cy="44" r="10" fill="#10b981"/>
          <path d="M44 44l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {/* Floating paper-plane */}
        <div className="absolute -top-4 -right-3" style={{ animation: 'float 3s ease-in-out infinite' }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#10b981" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Sparkle dots */}
      <span className="absolute top-2 left-8 w-2 h-2 rounded-full bg-teal-400 opacity-60 pulse-dot" />
      <span className="absolute bottom-4 right-8 w-1.5 h-1.5 rounded-full bg-emerald-300 opacity-50 pulse-dot" style={{ animationDelay: '0.7s' }} />
    </div>
  );
}

/* ── Single OTP digit box ───────────────────────────────────── */
function OtpBox({ inputRef, value, onChange, onKeyDown, onPaste, index }) {
  return (
    <input
      ref={inputRef}
      id={`otp-${index}`}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={index === 0 ? onPaste : undefined}
      className={`otp-input ${value ? 'filled' : ''}`}
      autoComplete="one-time-code"
    />
  );
}

/* ── Main Page ──────────────────────────────────────────────── */
export default function OtpVerificationPage() {
  const { otpEmail } = useAuth();
  const navigate = useNavigate();

  const [digits, setDigits]       = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [verified, setVerified]   = useState(false);

  const inputRefs = useRef([]);

  /* countdown timer */
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (idx, e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) { updateDigit(idx, ''); return; }
    updateDigit(idx, val[0]);
    if (idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace') {
      if (digits[idx]) { updateDigit(idx, ''); }
      else if (idx > 0) { updateDigit(idx - 1, ''); inputRefs.current[idx - 1]?.focus(); }
    }
    if (e.key === 'ArrowLeft' && idx > 0)  inputRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...digits];
    text.split('').forEach((ch, i) => { newDigits[i] = ch; });
    setDigits(newDigits);
    const nextEmpty = newDigits.findIndex(d => !d);
    inputRefs.current[nextEmpty !== -1 ? nextEmpty : 5]?.focus();
  };

  const updateDigit = (idx, val) => {
    setDigits(prev => { const d = [...prev]; d[idx] = val; return d; });
  };

  const handleResend = () => {
    setCanResend(false);
    setCountdown(45);
    setError('');
    setDigits(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // TODO: Call backend resend OTP endpoint
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < 6) { setError('Please enter all 6 digits.'); return; }

    setLoading(true); setError('');
    try {
      // Mock OTP verification (replace with real backend call)
      await new Promise(r => setTimeout(r, 1200));
      setVerified(true);
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch {
      setError('Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fmt = n => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
         style={{ background: 'linear-gradient(135deg, #0d1f1a 0%, #0a1628 50%, #0d1f1a 100%)' }}>

      {/* Background glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-96 h-96 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-80 h-80 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm rounded-3xl p-8 shadow-2xl fade-in-up"
           style={{ background: 'rgba(10,22,40,0.90)', border: '1px solid rgba(16,185,129,0.15)', backdropFilter: 'blur(24px)' }}>

        {/* Back button */}
        <button onClick={() => navigate('/login')} id="otp-back-btn"
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-4 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>

        <EnvelopeIcon />

        {verified ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                 style={{ background: 'rgba(16,185,129,0.2)', border: '2px solid #10b981' }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Email Verified!</h2>
            <p className="text-sm text-gray-400">Redirecting to dashboard…</p>
          </div>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
              <p className="text-sm text-gray-400">
                We've sent a 6-digit code to
              </p>
              <p className="text-sm font-medium mt-1" style={{ color: '#10b981' }}>
                {otpEmail || 'your email address'}
              </p>
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center mb-4">
                {error}
              </div>
            )}

            {/* OTP boxes */}
            <div className="flex gap-2 justify-center mb-6">
              {digits.map((d, i) => (
                <OtpBox
                  key={i}
                  index={i}
                  value={d}
                  inputRef={el => (inputRefs.current[i] = el)}
                  onChange={e => handleChange(i, e)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            {/* Resend row */}
            <div className="flex items-center justify-center gap-1 mb-6 text-xs text-gray-400">
              <span>Didn't receive the code?</span>
              {canResend ? (
                <button type="button" onClick={handleResend}
                        className="flex items-center gap-1 font-semibold transition-colors"
                        style={{ color: '#10b981' }}>
                  <RefreshCw size={12} /> Resend
                </button>
              ) : (
                <span className="font-semibold" style={{ color: '#10b981' }}>
                  Resend (00:{fmt(countdown)})
                </span>
              )}
            </div>

            {/* Verify button */}
            <button type="submit" disabled={loading} id="verify-otp-btn"
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all
                               hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                    style={{ background: 'linear-gradient(90deg, #10b981, #059669)' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Verifying…
                </span>
              ) : 'Verify Code'}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                <rect x="3" y="7" width="10" height="8" rx="2" stroke="#6b7280" strokeWidth="1.5"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              This code will expire in 10 minutes.
            </p>
          </form>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50%       { transform: translateY(-8px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
