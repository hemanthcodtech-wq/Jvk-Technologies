import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaEye, FaEyeSlash, FaUser, FaPhone, FaEnvelope, FaLock,
  FaCheckCircle, FaArrowLeft, FaShieldAlt, FaLaptopCode, FaRedoAlt
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/common/SEO';

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSettings();
  const { contact } = settings;

  const [step, setStep] = useState('FORM');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault(); setError('');
    if (!formData.name.trim()) return setError('Please enter your full name.');
    if (!formData.phone.trim()) return setError('Please enter your 10-digit phone number.');
    if (!formData.email.trim() || !formData.email.includes('@')) return setError('Please enter a valid email address.');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters long.');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
    if (!agreed) return setError('Please agree to the Terms & Conditions and Privacy Policy.');

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-send-otp`, {
        name: formData.name.trim(), phone: formData.phone.trim(),
        email: formData.email.trim(), password: formData.password
      });
      if (response.data.success) {
        setStep('OTP'); setCountdown(60);
        setSuccessMsg(`A 6-digit verification code has been sent to ${formData.email.trim()}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code. Please check your information.');
    } finally { setIsLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault(); setError('');
    if (otp.trim().length !== 6) return setError('Please enter the complete 6-digit verification code.');
    setIsVerifying(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-verify-otp`, {
        email: formData.email.trim(), otp: otp.trim()
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          _id: response.data._id, name: response.data.name,
          email: response.data.email, phone: response.data.phone,
          emailOrPhone: response.data.emailOrPhone, role: response.data.role
        }));
        setSuccessMsg('Account created successfully! Redirecting to student portal...');
        const searchParams = new URLSearchParams(location.search);
        setTimeout(() => navigate(searchParams.get('redirect') || '/dashboard'), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired verification code. Please try again.');
    } finally { setIsVerifying(false); }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setError(''); setSuccessMsg(''); setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-send-otp`, {
        name: formData.name.trim(), phone: formData.phone.trim(),
        email: formData.email.trim(), password: formData.password
      });
      if (response.data.success) { setCountdown(60); setSuccessMsg(`A fresh verification code was sent to ${formData.email.trim()}`); }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code.');
    } finally { setIsLoading(false); }
  };

  const inputClass = "w-full pl-10 pr-4 py-2.5 sm:py-3 bg-indigo-50/40 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200";

  return (
    <div className="w-full flex-grow flex flex-col relative px-3.5 sm:px-6 py-6 bg-mesh overflow-hidden">
      <SEO
        title="Student Registration | JVK Technologies Pvt Ltd"
        description="Enroll with JVK Technologies Pvt Ltd to launch your IT career with live software engineering batches, real-world project portfolios, and 100% placement support."
      />

      {/* Glow blobs */}
      <div className="glow-blob w-[400px] h-[400px] bg-violet-400/12 top-[-80px] right-[-60px]" />
      <div className="glow-blob w-[350px] h-[350px] bg-indigo-400/10 bottom-[-60px] left-[-40px]" style={{ animationDelay: '5s' }} />
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div className="w-full max-w-lg mx-auto z-10 my-auto">

        {/* Help bar */}
        <div className="hidden sm:flex items-center justify-end mb-4">
          <span className="text-xs text-slate-500 font-medium">
            Counseling: <a href={`tel:${contact.callNumber}`} className="text-indigo-600 font-bold hover:underline">{contact.callNumber}</a>
          </span>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/85 backdrop-blur-2xl border border-white/70 rounded-[28px] p-5 sm:p-9 shadow-[0_8px_48px_rgba(99,102,241,0.1),0_1px_0_rgba(255,255,255,0.8)_inset]"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="hidden sm:flex justify-center mb-4">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
                <img src="/logo.png" alt="JVK Technologies Pvt Ltd" className="h-14 w-auto object-contain drop-shadow-sm" />
              </Link>
            </div>
            <div className="badge-brand mx-auto w-fit mb-3">
              <HiSparkles size={11} /> Student Enrollment
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {step === 'FORM' ? 'Create Student Account' : 'Verify Email Address'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium max-w-sm mx-auto leading-relaxed">
              {step === 'FORM'
                ? 'Join JVK Technologies to enroll in software training tracks'
                : `Enter the 6-digit code sent to ${formData.email}`}
            </p>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs sm:text-sm font-semibold text-center"
              >
                {error}
              </motion.div>
            )}
            {successMsg && (
              <motion.div
                key="success"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2"
              >
                <FaCheckCircle className="shrink-0" /> <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">

            {/* ─── STEP 1: FORM ─── */}
            {step === 'FORM' && (
              <motion.form
                key="form-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSendOtp}
                className="space-y-3.5 sm:space-y-4"
              >
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Legal Name</label>
                    <div className="relative flex items-center group">
                      <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"><FaUser size={13} /></div>
                      <input name="name" type="text" placeholder="e.g. Rahul Sharma"
                        value={formData.name} onChange={handleChange} required className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                    <div className="relative flex items-center group">
                      <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"><FaPhone size={13} /></div>
                      <input name="phone" type="tel" placeholder="e.g. 9059519151"
                        value={formData.phone} onChange={handleChange} required className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                  <div className="relative flex items-center group">
                    <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"><FaEnvelope size={13} /></div>
                    <input name="email" type="email" placeholder="name@example.com"
                      value={formData.email} onChange={handleChange} required className={inputClass} />
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Password</label>
                    <div className="relative flex items-center group">
                      <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"><FaLock size={13} /></div>
                      <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Min 6 characters"
                        value={formData.password} onChange={handleChange} required className={`${inputClass} pr-10`} />
                      <button type="button" className="absolute right-3 text-slate-400 hover:text-indigo-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Confirm Password</label>
                    <div className="relative flex items-center group">
                      <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"><FaLock size={13} /></div>
                      <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter password"
                        value={formData.confirmPassword} onChange={handleChange} required className={`${inputClass} pr-10`} />
                      <button type="button" className="absolute right-3 text-slate-400 hover:text-indigo-600 transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer accent-indigo-600" />
                    <span className="leading-snug">
                      I agree to the{' '}
                      <Link to="/terms" target="_blank" className="text-indigo-600 font-bold hover:underline">Terms & Conditions</Link>{', '}
                      <Link to="/privacy" target="_blank" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>
                      {' and '}
                      <Link to="/refund-policy" target="_blank" className="text-indigo-600 font-bold hover:underline">Refund Policy</Link>.
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-bold text-sm sm:text-[15px] shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60 disabled:transform-none">
                  {isLoading ? (
                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Sending Verification Code...</span></>
                  ) : <span>Continue with Verification →</span>}
                </button>
              </motion.form>
            )}

            {/* ─── STEP 2: OTP ─── */}
            {step === 'OTP' && (
              <motion.form
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleVerifyOtp}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text" maxLength={6} placeholder="• • • • • •"
                    value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    required autoFocus
                    className="w-full py-4 tracking-[0.6em] text-3xl font-black text-slate-900 bg-indigo-50/60 border-2 border-slate-200 rounded-2xl text-center focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                  <p className="text-xs text-slate-500 text-center mt-2 font-medium">
                    Check your inbox and spam folder for the email from JVK Technologies
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-1">
                  <button type="button" onClick={() => { setStep('FORM'); setError(''); }}
                    className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5">
                    <FaArrowLeft size={11} /> Edit Information
                  </button>
                  <button type="button" onClick={handleResendOtp} disabled={countdown > 0 || isLoading}
                    className={`transition-colors flex items-center gap-1.5 ${countdown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-700 cursor-pointer'}`}>
                    <FaRedoAlt size={11} className={isLoading ? 'animate-spin' : ''} />
                    <span>{countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend Code'}</span>
                  </button>
                </div>

                <button type="submit" disabled={isVerifying || otp.length !== 6}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm sm:text-[15px] shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:transform-none">
                  {isVerifying ? (
                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Verifying & Activating Account...</span></>
                  ) : <span>Verify Code & Complete Registration ✓</span>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Sign in link */}
          <div className="mt-6 text-center text-xs sm:text-sm text-slate-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-extrabold hover:text-indigo-700 hover:underline transition-colors">
              Sign in to dashboard
            </Link>
          </div>

          {/* Security note */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400 font-medium">
            <FaShieldAlt className="text-emerald-500 shrink-0" size={12} />
            <span>Authorized Student Account • Guaranteed Placement Support</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
