import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaLaptopCode, FaInfoCircle, FaEnvelope, FaGlobe, FaArrowLeft, FaPhoneAlt, FaWhatsapp, FaBolt } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';

const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const { lang, setLang, t } = useLanguage();
  const { settings } = useSettings();
  const { contact, categories } = settings;
  const cleanWhatsapp = contact.whatsappNumber.replace(/[^0-9]/g, '');

  const isCourseDetails = location.pathname.startsWith('/courses/') && location.pathname !== '/courses';
  const isCourseList = location.pathname === '/courses';
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_courses'), path: '/courses' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_contact'), path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* 🚀 Top Announcement & Contact Ticker (Hidden on Auth Pages) */}
      {!isAuthPage && (
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-xs py-1.5 px-4 text-slate-200 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex items-center gap-1.5 bg-blue-500/30 text-[#00d2ff] px-2.5 py-0.5 rounded-full font-bold text-[11px] tracking-wider uppercase border border-blue-400/40 shrink-0 animate-pulse">
              <FaBolt className="text-amber-400" /> Admissions Open
            </span>
            <span className="text-xs text-slate-200 hidden sm:inline font-medium">
              Software Training Tracks: <strong>{categories.join(' • ')}</strong>
            </span>
            <span className="text-xs text-slate-200 sm:hidden truncate font-medium">
              Software Training Admissions Open! Call Now
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs font-semibold">
            <a 
              href={`tel:${contact.callNumber}`} 
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
              title="Direct Call"
            >
              <FaPhoneAlt className="text-amber-400 text-[11px]" />
              <span className="hidden md:inline">{contact.callNumber}</span>
              <span className="md:hidden font-bold">Call</span>
            </a>
            <span className="text-blue-400/40">|</span>
            <a 
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20want%20to%20know%20about%20software%20programs%20and%20course%20details.`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="WhatsApp Chat"
            >
              <FaWhatsapp className="text-[13px]" />
              <span className="hidden md:inline font-bold">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      )}

      {/* 🌟 Main Navigation Bar (Clean Light Theme) */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-b border-slate-200/80 py-2 md:py-2.5' 
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-2.5 md:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center w-full">
            
            {/* Left Brand: Large prominent logo without text beside it */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center group py-0.5" title="JVK Technologies Pvt Ltd">
                <img 
                  src="/logo.png" 
                  alt="JVK Technologies Pvt Ltd" 
                  className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs" 
                />
              </Link>
            </div>

            {/* Desktop Navigation Links: Clean (Home, Programs, About, Contact) */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl font-outfit font-semibold text-[15px] transition-all duration-200 ${
                    isActive(link.path) 
                      ? 'text-blue-600 bg-blue-50/80' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side: Language Switcher + Demo CTA + Auth */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Switch */}
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors">
                <FaGlobe className="text-blue-600 text-xs" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 font-outfit outline-none cursor-pointer pr-1"
                >
                  <option value="en">EN</option>
                  <option value="te">TE</option>
                </select>
              </div>

              {/* Book Free Demo Button */}
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20would%20like%20to%20register%20for%20the%20Free%20Demo%20Session.`}
                target="_blank"
                rel="noreferrer"
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold font-outfit text-sm shadow-[0_4px_15px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <FaBolt size={12} />
                  <span>Book Free Demo</span>
                </span>
              </a>

              {/* Auth or Dashboard */}
              {token ? (
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold font-outfit text-sm shadow-sm transition-all"
                >
                  {t('nav_dashboard')}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-semibold font-outfit text-sm transition-all"
                >
                  {t('nav_login')}
                </Link>
              )}
            </div>

            {/* Mobile Hamburger & Language */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                <FaGlobe className="text-blue-600 text-[10px]" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-[11px] font-bold text-slate-800 outline-none"
                >
                  <option value="en">EN</option>
                  <option value="te">TE</option>
                </select>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-800 hover:text-blue-600 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl font-outfit font-semibold text-base transition-colors ${
                    isActive(link.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2.5">
                <a
                  href={`tel:${contact.callNumber}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold font-outfit text-sm"
                >
                  <FaPhoneAlt className="text-blue-600" />
                  <span>Call: {contact.callNumber}</span>
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20want%20to%20register%20for%20the%20Free%20Demo%20Session.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black font-outfit text-sm shadow-md"
                >
                  <FaBolt />
                  <span>Book Free Demo Session</span>
                </a>

                {token ? (
                  <Link
                    to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white font-semibold font-outfit text-sm"
                  >
                    {t('nav_dashboard')}
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold font-outfit text-sm hover:bg-slate-50"
                    >
                      {t('nav_login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl bg-blue-600 text-white font-semibold font-outfit text-sm hover:bg-blue-700"
                    >
                      {t('nav_register')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default PublicNavbar;
