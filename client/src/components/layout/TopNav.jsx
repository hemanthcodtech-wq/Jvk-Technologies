import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBookOpen, FaUser, FaBell, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TopNav = () => {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: t('dash_nav_home'), path: '/dashboard', icon: FaHome },
    { name: t('dash_nav_courses'), path: '/dashboard/courses', icon: FaGraduationCap },
    { name: t('dash_nav_learning'), path: '/dashboard/learning', icon: FaBookOpen },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 xl:px-24 h-16 md:h-[72px] transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-2xl border-b border-slate-100 shadow-[0_4px_24px_rgba(99,102,241,0.07)]'
          : 'bg-white/70 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      {/* Left: Logo + Nav */}
      <div className="flex items-center h-full md:gap-10">
        {/* Desktop Logo */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => navigate('/')}>
            <img
              src="/logo.png" alt="JVK Technologies"
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col justify-center">
              <span className="text-[18px] font-black tracking-tight text-slate-900 leading-none">JVK</span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-indigo-600 leading-none mt-1">TECHNOLOGIES</span>
            </div>
          </div>
        </div>

        {/* Mobile centered logo */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center pointer-events-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/logo.png" alt="JVK Technologies"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col justify-center">
              <span className="text-[16px] font-black tracking-tight text-slate-900 leading-none">JVK</span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-indigo-600 leading-none mt-1">TECHNOLOGIES</span>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 h-full">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 shadow-[inset_0_1px_0_rgba(99,102,241,0.15)]'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={15} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="topNavIndicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 md:gap-3 relative z-10 ml-auto">
        {/* Language */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 transition-all shadow-sm">
          <FaGlobe className="text-indigo-500 text-xs" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-0.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <option value="en">EN</option>
            <option value="te">TE</option>
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 text-slate-500 hover:text-indigo-600 transition-colors bg-white hover:bg-indigo-50/40 rounded-xl border border-slate-200 hover:border-indigo-300 shadow-sm">
          <FaBell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
        </button>

        {/* Profile */}
        <NavLink
          to="/dashboard/profile"
          className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-200 hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
            <FaUser size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {user?.name || user?.emailOrPhone?.split('@')[0] || 'User'}
            </span>
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">
              {user?.role || 'Learner'}
            </span>
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default TopNav;
