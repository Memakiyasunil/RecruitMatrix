import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, CheckSquare, Square } from 'lucide-react';

/* ── tiny reusable pieces ─────────────────────────────────── */
const RMLogo = () => (
  <div className="flex flex-col items-center mb-6 select-none">
    {/* Icon mark */}
    <div className="relative mb-3">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
           style={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 100%)', boxShadow: '0 0 32px rgba(99,102,241,0.5)' }}>
        <svg viewBox="0 0 48 48" width="38" height="38" fill="none">
          {/* R */}
          <text x="2" y="36" fontFamily="Poppins,sans-serif" fontWeight="800" fontSize="32"
                fill="url(#lg1)">R</text>
          {/* M */}
          <text x="20" y="36" fontFamily="Poppins,sans-serif" fontWeight="800" fontSize="32"
                fill="url(#lg2)">M</text>
          {/* rocket spark */}
          <polygon points="43,6 46,14 39,12" fill="#f97316" />
          <defs>
            <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* glow ring */}
      <div className="absolute inset-0 rounded-2xl"
           style={{ boxShadow: '0 0 40px rgba(99,102,241,0.3)', animation: 'pulse 2s infinite' }} />
    </div>
    <h1 className="text-2xl font-bold text-white tracking-wide">
      Recruit<span className="text-indigo-400">Matrix</span>
    </h1>
    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
      <span className="text-gray-600">—</span>
      Right Talent. Right Future.
      <span className="text-gray-600">—</span>
    </p>
  </div>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
    <path d="M10 2L3 5v5c0 4.418 3.134 8.56 7 9.5C13.866 18.56 17 14.418 17 10V5L10 2z"
          fill="rgba(99,102,241,0.3)" stroke="#818cf8" strokeWidth="1.5"/>
    <path d="M7 10l2 2 4-4" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function InputField({ id, icon: Icon, placeholder, type = 'text', value, onChange, rightAction }) {
  return (
    <div className="relative group">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
        <Icon size={16} />
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white placeholder-gray-500
                   border border-white/10 outline-none transition-all
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />
      {rightAction && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-300 transition-colors">
          {rightAction}
        </div>
      )}
    </div>
  );
}

/* ── Login Tab ──────────────────────────────────────────────── */
function LoginTab({ onSuccess }) {
  const { loginWithEmail, loginWithGoogle, setOtpEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return; }
    setLoading(true); setError('');
    try {
      await loginWithEmail(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true); setError('');
    try {
      await loginWithGoogle();
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Google sign-in failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-white">Welcome Back! 👋</h2>
        <p className="text-sm text-gray-400 mt-1">Login to your account</p>
      </div>

      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center">
          {error}
        </div>
      )}

      <InputField id="login-email" icon={Mail} placeholder="Email" type="email"
                  value={email} onChange={e => setEmail(e.target.value)} />

      <InputField id="login-password" icon={Lock} placeholder="Password"
                  type={showPw ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  rightAction={
                    <span onClick={() => setShowPw(v => !v)}>
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </span>
                  } />

      <div className="flex justify-end">
        <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          Forgot Password?
        </button>
      </div>

      <button type="submit" disabled={loading}
              id="login-btn"
              className="w-full py-3 rounded-xl font-semibold text-white text-sm
                         btn-gradient-login disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
            Signing in…
          </span>
        ) : 'Login'}
      </button>

      <div className="flex items-center gap-3 text-gray-600">
        <div className="flex-1 h-px bg-white/10"/>
        <span className="text-xs">OR</span>
        <div className="flex-1 h-px bg-white/10"/>
      </div>

      <button type="button" onClick={handleGoogle} disabled={loading} id="google-login-btn"
              className="w-full py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-3
                         border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all">
        <GoogleIcon />
        Sign up with Google
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
        <ShieldIcon />
        <span><strong className="text-gray-300">Secure. Trusted. Reliable.</strong> Your data is safe with us.</span>
      </div>
    </form>
  );
}

/* ── Sign-Up Tab ────────────────────────────────────────────── */
function SignUpTab() {
  const { signupWithEmail, loginWithGoogle, setOtpEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]     = useState('');
  const [password, setPw]     = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed]   = useState(false);
  const [showPw, setShowPw]   = useState(false);
  const [showCp, setShowCp]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) { setError('Please fill in all fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters long.'); return; }
    if (password !== confirm)            { setError('Passwords do not match.'); return; }
    if (!agreed)                         { setError('Please accept the Terms of Service.'); return; }
    setLoading(true); setError('');
    try {
      await signupWithEmail(email, password);
      setOtpEmail(email);
      navigate('/verify-otp');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true); setError('');
    try {
      await loginWithGoogle();
      navigate('/admin/dashboard');
    } catch { setError('Google sign-in failed. Try again.'); }
    finally  { setLoading(false); }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-white">Create Account</h2>
        <p className="text-sm text-gray-400 mt-1">Let's get started with your account</p>
      </div>

      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center">
          {error}
        </div>
      )}

      <InputField id="signup-email" icon={Mail} placeholder="Email" type="email"
                  value={email} onChange={e => setEmail(e.target.value)} />

      <InputField id="signup-password" icon={Lock} placeholder="Password"
                  type={showPw ? 'text' : 'password'}
                  value={password} onChange={e => setPw(e.target.value)}
                  rightAction={<span onClick={() => setShowPw(v=>!v)}>{showPw?<EyeOff size={16}/>:<Eye size={16}/>}</span>} />

      <InputField id="signup-confirm" icon={Lock} placeholder="Confirm Password"
                  type={showCp ? 'text' : 'password'}
                  value={confirm} onChange={e => setConfirm(e.target.value)}
                  rightAction={<span onClick={() => setShowCp(v=>!v)}>{showCp?<EyeOff size={16}/>:<Eye size={16}/>}</span>} />

      <label className="flex items-start gap-2 cursor-pointer group">
        <button type="button" onClick={() => setAgreed(v=>!v)} className="mt-0.5 text-indigo-400 flex-shrink-0">
          {agreed ? <CheckSquare size={16}/> : <Square size={16} className="text-gray-500"/>}
        </button>
        <span className="text-xs text-gray-400">
          I agree to the{' '}
          <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
        </span>
      </label>

      <button type="submit" disabled={loading} id="create-account-btn"
              className="w-full py-3 rounded-xl font-semibold text-white text-sm
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg"
              style={{ background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
            Creating…
          </span>
        ) : 'Create Account'}
      </button>

      <div className="flex items-center gap-3 text-gray-600">
        <div className="flex-1 h-px bg-white/10"/>
        <span className="text-xs">OR</span>
        <div className="flex-1 h-px bg-white/10"/>
      </div>

      <button type="button" onClick={handleGoogle} disabled={loading} id="google-signup-btn"
              className="w-full py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-3
                         border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all">
        <GoogleIcon />
        Sign up with Google
      </button>
    </form>
  );
}

function getFriendlyError(code) {
  switch (code) {
    case 'auth/user-not-found':       return 'No account found with this email.';
    case 'auth/wrong-password':       return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use': return 'An account already exists with this email.';
    case 'auth/weak-password':        return 'Password must be at least 6 characters.';
    case 'auth/invalid-email':        return 'Please enter a valid email address.';
    case 'auth/too-many-requests':    return 'Too many attempts. Please try again later.';
    default:                          return 'Something went wrong. Please try again.';
  }
}

/* ── Main Page ──────────────────────────────────────────────── */
export default function LoginPage() {
  const [tab, setTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center login-bg relative overflow-hidden p-4">

      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 rounded-full blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none -translate-y-1/2"
           style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)' }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl fade-in-up"
           style={{ background: 'rgba(13,10,35,0.85)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(24px)' }}>

        <div className="p-8">
          <RMLogo />

          {/* Tab switcher */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {['login', 'signup'].map(t => (
              <button key={t}
                      id={`tab-${t}`}
                      onClick={() => setTab(t)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                        tab === t
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}>
                {t === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div key={tab} className="fade-in-up">
            {tab === 'login' ? <LoginTab /> : <SignUpTab />}
          </div>

          {/* Footer link */}
          <p className="text-center text-xs text-gray-500 mt-5">
            {tab === 'login'
              ? <>Don't have an account?{' '}<button onClick={() => setTab('signup')} className="text-indigo-400 hover:underline font-medium">Sign Up</button></>
              : <>Already have an account?{' '}<button onClick={() => setTab('login')} className="text-indigo-400 hover:underline font-medium">Login</button></>}
          </p>
        </div>
      </div>
    </div>
  );
}
