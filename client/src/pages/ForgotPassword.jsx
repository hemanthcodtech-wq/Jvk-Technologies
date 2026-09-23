import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaKey, FaShieldAlt, FaEye, FaEyeSlash, FaCheckCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/common/SEO';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { contact } = settings;
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return setError('Please enter your registered email address.');
    setError(''); setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, { emailOrPhone: emailOrPhone.trim() });
      if (res.data.success) { setMessage(res.data.message || 'Verification code sent to your email.'); setStep(2); }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code. Please check your email.');
    } finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 6) return setError('Please enter the complete 6-digit OTP code.');
    if (newPassword.length < 6) return setError('Password must be at least 6 characters long.');
    if (newPassword !== confirmPassword) return setError('Passwords do not match.');
    setError(''); setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, {
        emailOrPhone: emailOrPhone.trim(), otp: otp.trim(), newPassword
      });
      if (res.data.success) setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired verification code.');
    } finally { setLoading(false); }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-indigo-50/40 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200";
  const btnClass = "w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-bold text-sm shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60 disabled:transform-none";

  const stepTitles = ['Reset Password', 'Enter Security Code', 'Password Updated!'];
  const stepDesc = [
    'Enter your registered student email to receive a secure verification code.',
    `Code sent to ${emailOrPhone}. Enter it below and create a new password.`,
    'Your account password has been updated securely.'
  ];

  return (
    <div className="min-h-screen bg-mesh flex flex-col justify-center py-10 px-4 sm:px-6 relative overflow-hidden">
      <SEO
        title="Reset Password | JVK Technologies Pvt Ltd"
        description="Reset your JVK Technologies student account password securely."
      />

      {/* Glow blobs */}
      <div className="glow-blob w-[400px] h-[400px] bg-indigo-400/14 top-[-100px] left-[-60px]" />
      <div className="glow-blob w-[320px] h-[320px] bg-violet-400/12 bottom-[-60px] right-[-40px]" style={{ animationDelay: '5s' }} />
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div className="w-full max-w-md mx-auto z-10">

        {/* Top bar */}
        <div className="mb-5 flex items-center justify-between">
          <Link to="/login" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors py-1.5 px-3 rounded-xl hover:bg-white/80">
            <FaArrowLeft size={12} /> Back to Sign In
          </Link>
          <span className="text-xs text-slate-500 font-medium">
            Help: <a href={`tel:${contact.callNumber}`} className="text-indigo-600 font-bold hover:underline">{contact.callNumber}</a>
          </span>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/85 backdrop-blur-2xl border border-white/70 rounded-[28px] p-7 sm:p-9 shadow-[0_8px_48px_rgba(99,102,241,0.1),0_1px_0_rgba(255,255,255,0.8)_inset]"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-7">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity mb-4">
              <img src="/logo.png" alt="JVK Technologies Pvt Ltd" className="h-14 w-auto object-contain drop-shadow-sm" />
            </Link>

            {step < 3 ? (
              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white mb-4 shadow-[0_6px_20px_rgba(99,102,241,0.35)]">
                <FaKey size={22} />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white mb-4 shadow-[0_6px_20px_rgba(16,185,129,0.35)]">
                <FaCheckCircle size={24} />
              </div>
            )}

            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight text-center" style={{ fontFamily: "'Sora', sans-serif" }}>
              {stepTitles[step - 1]}
            </h1>
            <p className="text-sm text-slate-500 text-center mt-1.5 max-w-xs leading-relaxed">
              {stepDesc[step - 1]}
            </p>

            {/* Step indicator */}
            {step < 3 && (
              <div className="flex items-center gap-2 mt-4">
                {[1, 2].map(s => (
                  <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-indigo-500' : s < step ? 'w-4 bg-emerald-400' : 'w-4 bg-slate-200'}`} />
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs sm:text-sm text-center font-semibold"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success message */}
          {message && step === 2 && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm text-center font-semibold">
              {message}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">
                  Registered Email
                </label>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
                    <FaEnvelope size={14} />
                  </div>
                  <input
                    type="email" required value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="student@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className={btnClass}>
                {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Sending Code...</span></> : <span>Send Verification Code →</span>}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest text-center">
                  6-Digit OTP
                </label>
                <input
                  type="text" maxLength={6} required value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full py-4 bg-indigo-50/50 border-2 border-slate-200 rounded-2xl text-center text-3xl font-mono tracking-[0.5em] font-black text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">New Password</label>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"><FaLock size={14} /></div>
                  <input type={showPassword ? 'text' : 'password'} required value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 6 characters"
                    className={`${inputClass} pr-11`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-slate-400 hover:text-indigo-600 transition-colors">
                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">Confirm Password</label>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"><FaLock size={14} /></div>
                  <input type={showPassword ? 'text' : 'password'} required value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat new password"
                    className={inputClass} />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button type="button" onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-800 font-bold transition-colors">
                  ← Back to Email
                </button>
                <button type="button" onClick={handleSendOtp} className="text-indigo-600 hover:underline font-bold">
                  Resend Code
                </button>
              </div>

              <button type="submit" disabled={loading} className={btnClass}>
                {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Updating Password...</span></> : <span>Reset & Save Password →</span>}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="text-center space-y-5 py-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto text-white shadow-[0_8px_30px_rgba(16,185,129,0.4)]">
                <FaCheckCircle size={36} />
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto">
                Your password has been updated successfully. You can now sign in with your new credentials.
              </p>
              <button type="button" onClick={() => navigate('/login')}
                className={btnClass + " mx-auto"}>
                Sign In Now →
              </button>
            </div>
          )}

          {/* Security badge */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <FaShieldAlt className="text-emerald-500" />
            <span>256-Bit SSL Encrypted Account Recovery</span>
          </div>
        </motion.div>

        <p className="mt-5 text-center text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} JVK Technologies Pvt Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
