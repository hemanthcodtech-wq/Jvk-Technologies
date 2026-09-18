import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaEye, FaEyeSlash, FaUser, FaPhone, FaEnvelope, FaLock, 
  FaCheckCircle, FaArrowLeft, FaShieldAlt, FaLaptopCode, FaRedoAlt 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/common/SEO';

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState('FORM'); // 'FORM' | 'OTP'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [otp, setOtp] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Resend OTP Countdown
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name.trim()) {
      return setError('Please enter your full name.');
    }
    if (!formData.phone.trim()) {
      return setError('Please enter your 10-digit phone number.');
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      return setError('Please enter a valid email address.');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (!agreed) {
      return setError('Please agree to the Terms & Conditions and Privacy Policy.');
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-send-otp`, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      if (response.data.success) {
        setStep('OTP');
        setCountdown(60);
        setSuccessMsg(`A 6-digit verification code has been sent to ${formData.email.trim()}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code. Please check your information.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP & Complete Registration
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.trim().length !== 6) {
      return setError('Please enter the complete 6-digit verification code.');
    }

    setIsVerifying(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-verify-otp`, {
        email: formData.email.trim(),
        otp: otp.trim()
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          emailOrPhone: response.data.emailOrPhone,
          role: response.data.role
        }));

        setSuccessMsg('Account created successfully! Redirecting to student portal...');
        
        const searchParams = new URLSearchParams(location.search);
        const redirectUrl = searchParams.get('redirect') || '/dashboard';
        
        setTimeout(() => {
          navigate(redirectUrl);
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-send-otp`, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      if (response.data.success) {
        setCountdown(60);
        setSuccessMsg(`A fresh verification code was sent to ${formData.email.trim()}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col relative font-inter px-3.5 sm:px-6 py-4">
      <SEO 
        title="Student Registration | JVK Technologies Pvt Ltd"
        description="Enroll with JVK Technologies Pvt Ltd to launch your IT career with live software engineering batches, real-world project portfolios, and 100% placement support."
      />

      {/* Decorative ambient background glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg mx-auto z-10 my-auto">
        
        {/* Help Bar (Desktop) */}
        <div className="hidden sm:flex items-center justify-end mb-3">
          <span className="text-xs text-slate-500 font-medium">
            Counseling: <a href="tel:+919059519151" className="text-blue-600 font-bold hover:underline">+91-9059519151</a>
          </span>
        </div>

        {/* Card Container */}
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
              <FaLaptopCode size={11} /> Student Enrollment
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {step === 'FORM' ? 'Create Student Account' : 'Verify Email Address'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium max-w-sm mx-auto">
              {step === 'FORM' 
                ? 'Join JVK Technologies to enroll in software training tracks' 
                : `Enter the 6-digit code sent to ${formData.email}`}
            </p>
          </div>

          {/* Feedback messages */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-semibold text-center"
            >
              {error}
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2"
            >
              <FaCheckCircle className="shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            
            {/* ─── STEP 1: REGISTRATION FORM ─── */}
            {step === 'FORM' && (
              <motion.form 
                key="form-step"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                onSubmit={handleSendOtp} 
                className="space-y-3.5 sm:space-y-4"
              >
                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {/* Full Legal Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Legal Name
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                        <FaUser size={13} />
                      </div>
                      <input 
                        name="name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                        <FaPhone size={13} />
                      </div>
                      <input 
                        name="phone"
                        type="tel"
                        placeholder="e.g. 9059519151"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <FaEnvelope size={13} />
                    </div>
                    <input 
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
                
                {/* Passwords Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                        <FaLock size={13} />
                      </div>
                      <input 
                        name="password"
                        type={showPassword ? "text" : "password"} 
                        placeholder="Min 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                      <button 
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                        <FaLock size={13} />
                      </div>
                      <input 
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                      <button 
                        type="button"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms and Privacy Checkbox */}
                <div className="pt-1">
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
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <span>Continue with Verification</span>
                  )}
                </button>
              </motion.form>
            )}

            {/* ─── STEP 2: OTP VERIFICATION ─── */}
            {step === 'OTP' && (
              <motion.form 
                key="otp-step"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                onSubmit={handleVerifyOtp} 
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
                    Enter 6-Digit Verification Code
                  </label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    required
                    autoFocus
                    className="w-full py-3.5 text-center tracking-[0.6em] text-2xl font-black text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <p className="text-xs text-slate-500 text-center mt-2">
                    Check your inbox and spam folder for the email from JVK Technologies
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-1">
                  <button 
                    type="button" 
                    onClick={() => { setStep('FORM'); setError(''); }}
                    className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <FaArrowLeft size={11} /> Edit Information
                  </button>

                  <button 
                    type="button" 
                    onClick={handleResendOtp}
                    disabled={countdown > 0 || isLoading}
                    className={`transition-colors flex items-center gap-1.5 ${
                      countdown > 0 
                        ? 'text-slate-400 cursor-not-allowed' 
                        : 'text-blue-600 hover:text-blue-700 cursor-pointer'
                    }`}
                  >
                    <FaRedoAlt size={11} className={isLoading ? 'animate-spin' : ''} />
                    <span>{countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend Code'}</span>
                  </button>
                </div>

                <button 
                  type="submit" 
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Verifying & Activating Account...</span>
                    </>
                  ) : (
                    <span>Verify Code & Complete Registration</span>
                  )}
                </button>
              </motion.form>
            )}

          </AnimatePresence>

          {/* Already have an account */}
          <div className="mt-6 text-center text-xs sm:text-sm text-slate-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-extrabold hover:text-blue-700 hover:underline transition-colors">
              Sign in to dashboard
            </Link>
          </div>

          {/* Security note */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500 font-medium">
            <FaShieldAlt className="text-emerald-600 shrink-0" size={13} />
            <span>Authorized Student Account • Guaranteed Placement Support</span>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Register;
