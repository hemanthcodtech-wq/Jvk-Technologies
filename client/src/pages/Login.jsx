import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaShieldAlt, FaArrowLeft, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/common/SEO';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, formData, { timeout: 10000 });
      if (response.data.success) {
        redirectAfterLogin(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please verify your email/phone and password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Identity Services callback
  const handleGoogleResponse = async (response) => {
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    setIsGoogleLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, {
        credential: response.credential,
      });
      if (res.data.success) {
        redirectAfterLogin(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Load Google Identity Services script and initialize
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const loadGoogleScript = () => {
      if (document.getElementById('google-identity-script')) {
        initGoogle();
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-identity-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGoogle;
      document.body.appendChild(script);
    };

    const initGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
      }
    };

    loadGoogleScript();
  }, []);

  const handleGoogleButtonClick = () => {
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    if (!GOOGLE_CLIENT_ID) {
      setError('Google login is not configured yet. Please use email & password to sign in.');
      return;
    }
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col relative font-inter px-3.5 sm:px-6 py-4">
      <SEO 
        title="Student Sign In | JVK Technologies Pvt Ltd"
        description="Sign in to your JVK Technologies student dashboard to access live classes, software engineering curriculum, assignments, and placement support."
      />

      {/* Decorative ambient light circles */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto z-10 my-auto">
        
        {/* Help Bar (Desktop) */}
        <div className="hidden sm:flex items-center justify-end mb-3">
          <span className="text-xs text-slate-500 font-medium">
            Need help? <a href={`tel:${contact.callNumber}`} className="text-blue-600 font-bold hover:underline">{contact.callNumber}</a>
          </span>
        </div>

        {/* Main Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-2xl sm:rounded-3xl p-4 sm:p-8"
        >
          {/* Header Section */}
          <div className="text-center mb-5 sm:mb-6">
            <div className="hidden sm:flex justify-center mb-3">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
                <img 
                  src="/logo.png" 
                  alt="JVK Technologies Pvt Ltd" 
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-xs" 
                />
              </Link>
            </div>
            
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-blue-50 text-blue-700 text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-blue-100">
              <FaLaptopCode size={11} /> Student & Alumni Portal
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium max-w-xs mx-auto">
              Sign in to continue your software training journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-semibold text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email / Phone Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address or Phone
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <FaEnvelope size={14} />
                </div>
                <input 
                  name="emailOrPhone"
                  type="text"
                  placeholder="name@example.com or 9876543210"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <FaLock size={14} />
                </div>
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your account password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
                <button 
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms and Privacy Checkbox */}
            <div className="pt-0.5">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                />
                <span className="leading-snug">
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" className="text-blue-600 font-bold hover:underline">
                    Terms & Conditions
                  </Link>
                  {', '}
                  <Link to="/privacy" target="_blank" className="text-blue-600 font-bold hover:underline">
                    Privacy Policy
                  </Link>
                  {' and '}
                  <Link to="/refund-policy" target="_blank" className="text-blue-600 font-bold hover:underline">
                    Refund Policy
                  </Link>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Don't have an account */}
          <div className="mt-6 text-center text-xs sm:text-sm text-slate-600 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-extrabold hover:text-blue-700 hover:underline transition-colors">
              Create student account
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-5 sm:my-6">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-3 text-xs uppercase font-bold text-slate-400 tracking-wider whitespace-nowrap">
              Or continue with
            </span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* Social Sign-In */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleButtonClick}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <FcGoogle size={20} />
              )}
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Career Support Footer note */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500 font-medium">
            <FaShieldAlt className="text-emerald-600 shrink-0" size={13} />
            <span>Secure 256-Bit SSL Encrypted Student Portal</span>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Login;
