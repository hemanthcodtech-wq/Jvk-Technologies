import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import PublicNavbar from './PublicNavbar';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { 
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaShieldAlt, 
  FaAward, FaWhatsapp, FaArrowRight, FaCode, FaLaptopCode,
  FaCheckCircle, FaGraduationCap, FaExternalLinkAlt, FaClock,
  FaHome, FaInfoCircle, FaUserGraduate
} from 'react-icons/fa';

const PublicLayout = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const { settings } = useSettings();
  const { contact } = settings;
  const cleanWhatsapp = contact.whatsappNumber.replace(/[^0-9]/g, '');

  const [livePrograms, setLivePrograms] = useState([]);
  const [certIdToVerify, setCertIdToVerify] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyCertificate = async () => {
    if (!certIdToVerify.trim()) {
      alert('Please enter a valid Certificate ID');
      return;
    }
    setIsVerifying(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public/verify-certificate/${certIdToVerify.trim()}`);
      if (res.data.success && res.data.certificateUrl) {
        window.open(res.data.certificateUrl, '_blank');
      } else {
        alert('Certificate not found. Please verify the ID and try again.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error verifying certificate. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    const fetchLivePrograms = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public`);
        if (res.data.success && Array.isArray(res.data.data)) {
          const softwareOnly = res.data.data.filter(c => {
            const text = (c.title + ' ' + (c.category || '')).toLowerCase();
            return !['trading', 'intraday', 'nism', 'stock', 'options', 'derivatives'].some(w => text.includes(w));
          });
          setLivePrograms(softwareOnly.length > 0 ? softwareOnly : [
            { _id: '1', title: 'Java Full Stack Development with Spring Boot & React', slug: 'java-full-stack' },
            { _id: '2', title: 'Python Full Stack & AI Machine Learning', slug: 'python-full-stack' },
            { _id: '3', title: 'MERN Stack Developer Masterclass', slug: 'mern-stack' },
            { _id: '4', title: 'Cloud AWS, Azure & DevOps Engineering', slug: 'aws-devops' },
            { _id: '5', title: 'Software Testing & Automation (Selenium & API)', slug: 'software-testing' }
          ]);
        }
      } catch (err) {
        // Fallback default tracks
        setLivePrograms([
          { _id: '1', title: 'Java Full Stack Development with Spring Boot & React', slug: 'java-full-stack' },
          { _id: '2', title: 'Python Full Stack & AI Machine Learning', slug: 'python-full-stack' },
          { _id: '3', title: 'MERN Stack Developer Masterclass', slug: 'mern-stack' },
          { _id: '4', title: 'Cloud AWS, Azure & DevOps Engineering', slug: 'aws-devops' },
          { _id: '5', title: 'Software Testing & Automation (Selenium & API)', slug: 'software-testing' }
        ]);
      }
    };
    fetchLivePrograms();
  }, []);

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-inter bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {isLoggedIn && !isAuthPage ? <TopNav /> : <PublicNavbar />}
      
      {/* Main Content Area */}
      <main className={`flex-grow w-full flex flex-col ${isAuthPage ? 'pt-[72px] pb-16 md:pt-20 md:pb-0' : 'pt-[88px] md:pt-[92px] pb-24 lg:pb-0'}`}>
        <Outlet />
      </main>

      {/* 🚀 Persistent Floating Quick Action Buttons (Hidden on Auth pages to avoid overlapping forms) */}
      {!isAuthPage && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Floating Call Button */}
        <a 
          href={`tel:${contact.callNumber}`} 
          className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_4px_25px_rgba(37,99,235,0.6)] hover:shadow-[0_6px_35px_rgba(37,99,235,0.8)] hover:scale-110 active:scale-95 transition-all duration-300"
          title={`Direct Call Admissions: ${contact.callNumber}`}
          aria-label="Call JVK Technologies Admissions"
        >
          <FaPhoneAlt className="text-lg sm:text-xl animate-bounce" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900/95 border border-blue-500/30 text-white font-outfit text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Call {contact.callNumber}
          </span>
        </a>

        {/* Floating WhatsApp Button */}
        <a 
          href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20am%20interested%20in%20learning%20more%20about%20your%20software%20courses%20and%20upcoming%20batches.`} 
          target="_blank" 
          rel="noreferrer"
          className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:shadow-[0_6px_35px_rgba(16,185,129,0.8)] hover:scale-110 active:scale-95 transition-all duration-300"
          title={`Chat with Us on WhatsApp: ${contact.whatsappNumber}`}
          aria-label="WhatsApp JVK Technologies"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none"></span>
          <FaWhatsapp className="relative text-2xl sm:text-3xl" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900/95 border border-emerald-500/30 text-white font-outfit text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>

        </div>
      )}

      {/* 🌟 Professional Institutional Footer (Hidden on Login/Register to keep auth flow focused) */}
      {!isAuthPage && (
        <footer className="bg-[#020611] text-gray-300 pt-16 pb-24 lg:pb-12 border-t border-blue-500/20 relative overflow-hidden">
        
        {/* Subtle Ambient High-Tech Light Backgrounds */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-blue-900/30">
            
            {/* Column 1: Organization Branding (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-block group">
                <img 
                  src="/logo.png" 
                  alt="JVK Technologies Pvt Ltd" 
                  className="h-14 sm:h-16 w-auto object-contain bg-white/95 p-2.5 rounded-2xl shadow-md transition-transform group-hover:scale-105" 
                />
              </Link>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Learn New Technologies, Build Strong Skills, and Move Towards Your Dream Job! JVK Technologies Pvt Ltd provides industry-aligned software engineering education, live project immersion, and 100% placement support.
              </p>

              {/* Direct Contact Coordinates */}
              <div className="space-y-3 text-xs text-gray-300 pt-2">
                <div className="flex items-start gap-2.5">
                  <FaMapMarkerAlt className="text-[#00d2ff] shrink-0 mt-0.5" size={14} />
                  <span className="leading-relaxed">
                    {contact.address}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaPhoneAlt className="text-amber-400 shrink-0" size={13} />
                  <a href={`tel:${contact.callNumber}`} className="hover:text-white transition-colors font-semibold">
                    {contact.callNumber} (Admissions & Support)
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaWhatsapp className="text-emerald-400 shrink-0" size={15} />
                  <a 
                    href={`https://wa.me/${cleanWhatsapp}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white transition-colors font-semibold"
                  >
                    {contact.whatsappNumber} (WhatsApp Counseling)
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaEnvelope className="text-[#00d2ff] shrink-0" size={13} />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href={`tel:${contact.callNumber}`}
                  className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <FaPhoneAlt size={11} /> Call Now
                </a>
                <a 
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20please%20send%20me%20the%20course%20brochure.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-200 hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <FaWhatsapp size={13} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Column 2: Flagship Software Tracks (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-extrabold text-white tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff]"></span>
                In-Demand Tech Tracks
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 font-medium">
                {livePrograms.length > 0 ? (
                  livePrograms.slice(0, 5).map((course) => (
                    <li key={course._id}>
                      <Link 
                        to={`/courses/${course.slug || course._id}`} 
                        className="hover:text-[#00d2ff] transition-colors flex items-center gap-2 group"
                        title={course.title}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 group-hover:bg-[#00d2ff] shrink-0 transition-colors"></span>
                        <span className="truncate">{course.title}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li><Link to="/courses" className="hover:text-[#00d2ff] transition-colors">Java Full Stack Development</Link></li>
                    <li><Link to="/courses" className="hover:text-[#00d2ff] transition-colors">Python Full Stack & AI</Link></li>
                    <li><Link to="/courses" className="hover:text-[#00d2ff] transition-colors">MERN Stack Web Development</Link></li>
                    <li><Link to="/courses" className="hover:text-[#00d2ff] transition-colors">AWS Cloud & DevOps</Link></li>
                    <li><Link to="/courses" className="hover:text-[#00d2ff] transition-colors">Software Automation & QA</Link></li>
                  </>
                )}
                <li className="pt-2">
                  <Link 
                    to="/courses" 
                    className="text-[#00d2ff] hover:underline text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Browse All Technology Programs</span>
                    <FaArrowRight size={10} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigation & Highlights (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-extrabold text-white tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 font-medium">
                <li><Link to="/" className="hover:text-white transition-colors">{t('nav_home')}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t('nav_about')}</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">{t('nav_courses')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav_contact')}</Link></li>
                <li><Link to="/admin/login" className="text-gray-500 hover:text-gray-300 transition-colors">Admin Portal</Link></li>
              </ul>
            </div>

            {/* Column 4: Compliance, Placement & Training Modes (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-extrabold text-white tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Trust & Support
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 font-medium">
                <li><span className="text-emerald-400 font-semibold">✓ 100% Dedicated Placement Assistance</span></li>
                <li><span className="text-blue-300">✓ Live Online & Classroom Sessions</span></li>
                <li><span className="text-amber-300">✓ Capstone Projects with Git & CI/CD</span></li>
                <li><Link to="/terms" className="hover:text-[#00d2ff] transition-colors">Terms and Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-[#00d2ff] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-[#00d2ff] transition-colors">Refund & Cancellation Policy</Link></li>
              </ul>

              {/* Certificate Verification Input Box */}
              <div className="pt-4 mt-2 border-t border-slate-700/50">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]"></span>
                  Verify Certificate
                </h4>
                <div className="flex w-full max-w-sm">
                  <input 
                    type="text" 
                    value={certIdToVerify}
                    onChange={(e) => setCertIdToVerify(e.target.value)}
                    placeholder="Enter Certificate ID..." 
                    className="flex-1 bg-slate-800/80 border border-slate-700 text-white text-xs px-3 py-2.5 rounded-l-lg focus:outline-none focus:border-[#00d2ff] placeholder:text-gray-500 transition-colors"
                  />
                  <button 
                    onClick={handleVerifyCertificate}
                    disabled={isVerifying}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2.5 rounded-r-lg transition-colors border border-blue-600 hover:border-blue-500"
                  >
                    {isVerifying ? 'Wait...' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-white font-bold">JVK Technologies Pvt Ltd</strong>. All rights reserved.
            </p>
            <p className="text-gray-400 text-center md:text-right">
              Learn New Technologies • Build Strong Skills • Move Towards Your Dream Job!
            </p>
          </div>

        </div>
      </footer>
      )}

      {/* 📱 STICKY MOBILE BOTTOM NAVIGATION BAR (ALWAYS VISIBLE & FIXED ON MOBILE) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/90 z-[100] py-1.5 px-2 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+0.4rem)]"
      >
        <div className="grid grid-cols-5 items-center text-center max-w-lg mx-auto">
          {/* 1. Home */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname === '/' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FaHome size={19} />
            <span className="text-[10px] mt-1 font-medium leading-tight">Home</span>
          </Link>

          {/* 2. Programs */}
          <Link
            to="/courses"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname.startsWith('/courses') ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FaLaptopCode size={19} />
            <span className="text-[10px] mt-1 font-medium leading-tight">Programs</span>
          </Link>

          {/* 3. About */}
          <Link
            to="/about"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname === '/about' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FaInfoCircle size={19} />
            <span className="text-[10px] mt-1 font-medium leading-tight">About</span>
          </Link>

          {/* 4. Contact */}
          <Link
            to="/contact"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname === '/contact' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FaEnvelope size={19} />
            <span className="text-[10px] mt-1 font-medium leading-tight">Contact</span>
          </Link>

          {/* 5. Portal / Login */}
          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/dashboard')
                ? 'text-blue-600 font-bold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FaUserGraduate size={19} />
            <span className="text-[10px] mt-1 font-medium leading-tight">{isLoggedIn ? 'Portal' : 'Login'}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PublicLayout;
