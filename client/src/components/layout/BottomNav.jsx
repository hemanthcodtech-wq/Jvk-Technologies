import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaBookOpen, FaUser, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BottomNav = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const pathname = location.pathname;

  const isProfileActive = [
    '/dashboard/profile', '/dashboard/settings',
    '/dashboard/payment-history', '/dashboard/wishlist',
    '/dashboard/support', '/dashboard/certificates'
  ].some(route => pathname.startsWith(route));

  const navItems = [
    { name: t('dash_nav_home'), path: '/dashboard', icon: FaHome, active: pathname === '/dashboard' },
    { name: t('dash_nav_courses'), path: '/dashboard/courses', icon: FaGraduationCap, active: pathname.startsWith('/dashboard/courses') },
    { name: t('dash_nav_learning'), path: '/dashboard/learning', icon: FaBookOpen, active: pathname.startsWith('/dashboard/learning') },
    { name: t('dash_nav_profile'), path: '/dashboard/profile', icon: FaUser, active: isProfileActive },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl border-t border-slate-100 shadow-[0_-4px_24px_rgba(99,102,241,0.08)] z-50 md:hidden">
      <div className="flex justify-around items-center h-16 pb-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex flex-col items-center justify-center w-full h-full py-1 gap-1 transition-all"
          >
            <motion.div
              whileTap={{ scale: 0.82 }}
              animate={item.active ? { y: -2 } : { y: 0 }}
              className="relative flex flex-col items-center"
            >
              {/* Active pill indicator at top */}
              {item.active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-[0_2px_8px_rgba(99,102,241,0.5)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                />
              )}

              {/* Icon with colored background when active */}
              <div className={`w-10 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                item.active
                  ? 'bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600'
                  : 'text-slate-400'
              }`}>
                <item.icon size={18} />
              </div>
            </motion.div>

            <span
              className={`text-[10px] leading-none tracking-tight font-bold transition-colors ${
                item.active ? 'text-indigo-600' : 'text-slate-400'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
