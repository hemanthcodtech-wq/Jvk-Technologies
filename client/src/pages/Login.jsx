import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaShieldAlt, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { HiSparkles } from 'react-icons/hi2';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/common/SEO';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const InputField = ({ icon: Icon, label, children, extra }) => (
  <div>
    <div className="flex justify-between items-center mb-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      {extra}
    </div>
    <div className="relative flex items-center group">
      <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10">
        <Icon size={15} />
      </div>
      {children}
    </div>
  </div>
);

const Login = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { contact } = settings;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      emailOrPhone: data.emailOrPhone,
      name: data.name,
      avatar: data.avatar,
      role: data.role
    }));
    const searchParams = new URLSearchParams(location.search);
    const redirectUrl = searchParams.get('redirect') || '/dashboard';
    navigate(redirectUrl);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) { setError('Please agree to the Terms & Conditions and Privacy Policy.'); return; }
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, formData, { timeout: 10000 });
      if (response.data.success) redirectAfterLogin(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please verify your email/phone and password.');
    } finally { setIsLoading(false); }
  };

  const handleGoogleResponse = async (response) => {
    if (!agreed) { setError('Please agree to the Terms & Conditions and Privacy Policy.'); return; }
    setIsGoogleLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, { credential: response.credential });
      if (res.data.success) redirectAfterLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally { setIsGoogleLoading(false); }
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    const loadGoogleScript = () => {
      if (document.getElementById('google-identity-script')) { initGoogle(); return; }
      const script = document.createElement('script');
      script.id = 'google-identity-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true; script.defer = true; script.onload = initGoogle;
      document.body.appendChild(script);
    };
    const initGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleGoogleResponse });
      }
    };
    loadGoogleScript();
  }, []);

  const handleGoogleButtonClick = () => {
    if (!agreed) { setError('Please agree to the Terms & Conditions and Privacy Policy.'); return; }
    if (!GOOGLE_CLIENT_ID) { setError('Google login is not configured yet. Please use email & password to sign in.'); return; }
    if (window.google) window.google.accounts.id.prompt();
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-indigo-50/40 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 font-[Plus_Jakarta_Sans]";

  return (
    <div className="w-full flex-grow flex flex-col relative px-3.5 sm:px-6 py-6 bg-mesh overflow-hidden">
      <SEO
        title="Student Sign In | JVK Technologies Pvt Ltd"
        description="Sign in to your JVK Technologies student dashboard to access live classes, software engineering curriculum, assignments, and placement support."
      />

      {/* Ambient glow blobs */}
      <div className="glow-blob w-[420px] h-[420px] bg-indigo-400/15 top-[-80px] left-[-60px]" />
      <div className="glow-blob w-[350px] h-[350px] bg-violet-400/12 bottom-[-60px] right-[-40px]" style={{ animationDelay: '4s' }} />
      <div className="glow-blob w-[250px] h-[250px] bg-cyan-400/10 top-1/2 right-1/4" style={{ animationDelay: '8s' }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div className="w-full max-w-md mx-auto z-10 my-auto">

        {/* Help bar */}
        <div className="hidden sm:flex items-center justify-end mb-4">
          <span className="text-xs text-slate-500 font-medium">
            Need help?{' '}
            <a href={`tel:${contact.callNumber}`} className="text-indigo-600 font-bold hover:underline">{contact.callNumber}</a>
          </span>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/85 backdrop-blur-2xl border border-white/70 rounded-[28px] p-6 sm:p-9 shadow-[0_8px_48px_rgba(99,102,241,0.1),0_1px_0_rgba(255,255,255,0.8)_inset]"
        >
          {/* Header */}
          <div className="text-center mb-7">
            <div className="hidden sm:flex justify-center mb-4">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
                <img src="/logo.png" alt="JVK Technologies Pvt Ltd" className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm" />
              </Link>
            </div>

            <div className="badge-brand mx-auto w-fit mb-3">
              <HiSparkles size={11} /> Student & Alumni Portal
            </div>

            <h1 className="text-2xl sm:text-[1.75rem] font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 font-medium max-w-xs mx-auto leading-relaxed">
              Sign in to continue your software training journey
            </p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs sm:text-sm font-semibold text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <InputField icon={FaEnvelope} label="Email or Phone">
              <input
                name="emailOrPhone" type="text"
                placeholder="name@example.com or 9876543210"
                value={formData.emailOrPhone} onChange={handleChange} required
                className={inputClass}
              />
            </InputField>

            <InputField
              icon={FaLock} label="Password"
              extra={
                <Link to="/forgot-password" className="text-xs text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                  Forgot password?
                </Link>
              }
            >
              <input
                name="password" type={showPassword ? 'text' : 'password'}
                placeholder="Enter your account password"
                value={formData.password} onChange={handleChange} required
                className={`${inputClass} pr-11`}
              />
              <button
                type="button" aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 text-slate-400 hover:text-indigo-600 transition-colors z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </InputField>

            {/* Checkbox */}
            <div className="pt-0.5">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer accent-indigo-600"
                />
                <span className="leading-snug">
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" className="text-indigo-600 font-bold hover:underline">Terms & Conditions</Link>
                  {', '}
                  <Link to="/privacy" target="_blank" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>
                  {' and '}
                  <Link to="/refund-policy" target="_blank" className="text-indigo-600 font-bold hover:underline">Refund Policy</Link>.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-bold text-sm sm:text-[15px] shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60 disabled:transform-none relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to Dashboard →</span>
              )}
            </button>
          </form>

          {/* Create account */}
          <div className="mt-5 text-center text-xs sm:text-sm text-slate-600 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-extrabold hover:text-indigo-700 hover:underline transition-colors">
              Create student account
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <span className="px-3 text-[11px] uppercase font-bold text-slate-400 tracking-wider whitespace-nowrap">Or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          {/* Google */}
          <button
            type="button" onClick={handleGoogleButtonClick} disabled={isGoogleLoading}
            className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-700 font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-60 cursor-pointer hover:-translate-y-0.5 active:scale-[0.99]"
          >
            {isGoogleLoading
              ? <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              : <FcGoogle size={20} />}
            <span>Continue with Google</span>
          </button>

          {/* Security badge */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400 font-medium">
            <FaShieldAlt className="text-emerald-500" size={12} />
            <span>Secure 256-Bit SSL Encrypted Student Portal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
