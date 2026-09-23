import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaClock, FaAward, FaPlay, FaChevronRight, FaBookOpen, FaUser, FaFire, FaRocket } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } })
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [upcomingClass, setUpcomingClass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const coursesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/payments/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (coursesRes.data.success) setEnrolledCount(coursesRes.data.data.length);

        const classesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/classes/student`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (classesRes.data.success) {
          const now = new Date();
          const futureClasses = classesRes.data.data.filter(cls => {
            const classTime = new Date(`${cls.date.split('T')[0]}T${cls.time}:00`);
            return classTime > now;
          }).sort((a, b) => {
            const aTime = new Date(`${a.date.split('T')[0]}T${a.time}:00`);
            const bTime = new Date(`${b.date.split('T')[0]}T${b.time}:00`);
            return aTime - bTime;
          });
          if (futureClasses.length > 0) setUpcomingClass(futureClasses[0]);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const displayName = user?.name || user?.emailOrPhone?.split('@')[0] || 'Learner';

  const stats = [
    {
      label: 'Courses Enrolled',
      value: enrolledCount,
      icon: FaGraduationCap,
      gradient: 'from-indigo-500 to-violet-500',
      bg: 'from-indigo-50 to-violet-50',
      glow: 'rgba(99,102,241,0.15)'
    },
    {
      label: 'Hours Learned',
      value: '0',
      icon: FaClock,
      gradient: 'from-cyan-500 to-blue-500',
      bg: 'from-cyan-50 to-blue-50',
      glow: 'rgba(6,182,212,0.15)'
    },
    {
      label: 'Certificates Earned',
      value: '0',
      icon: FaAward,
      gradient: 'from-amber-400 to-orange-500',
      bg: 'from-amber-50 to-orange-50',
      glow: 'rgba(245,158,11,0.15)'
    },
  ];

  return (
    <div className="min-h-screen bg-mesh bg-dot-grid pt-20 pb-24 md:pb-12 md:pt-24 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-7">

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="badge-brand mb-2">
              <HiSparkles size={11} /> Student Dashboard
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-[2.1rem] font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Welcome back,{' '}
              <span className="gradient-text">{displayName}</span>{' '}
              <span className="animate-wave inline-block">👋</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Continue your journey in technology and growth.
            </p>
          </div>

          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all w-max"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <FaRocket size={13} /> Explore Courses
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="card-premium p-6 flex items-center gap-4 group cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-[0_4px_12px_${stat.glow}]`}>
                  <stat.icon size={18} />
                </div>
              </div>
              <div>
                <div className="stat-number text-3xl leading-none mb-0.5">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-[280px] md:h-[320px] rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(99,102,241,0.2)] group"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-[#0d0f1a]">
                <div className="absolute inset-0 bg-dot-grid opacity-30" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-10 w-60 h-60 bg-violet-500/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl" />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-indigo-950/50 to-transparent z-10" />

              {/* Content */}
              <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md px-3 py-1.5 rounded-full w-max mb-4 border border-indigo-400/20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {upcomingClass ? 'Up Next' : 'Learning Hub'}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white max-w-lg leading-tight mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {upcomingClass
                    ? (upcomingClass.title || upcomingClass.course?.title || 'Live Technical Session')
                    : 'Welcome to JVK Learning'}
                </h2>
                <p className="text-indigo-100/70 mb-7 max-w-md text-sm leading-relaxed font-medium line-clamp-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {upcomingClass
                    ? `Join your upcoming session on ${new Date(upcomingClass.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} at ${upcomingClass.time}.`
                    : 'Explore our catalog and start a new journey today.'}
                </p>

                <button
                  onClick={() => upcomingClass?.zoomLink ? window.open(upcomingClass.zoomLink, '_blank') : navigate('/dashboard/learning')}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold py-3 px-7 rounded-2xl shadow-[0_4px_20px_rgba(99,102,241,0.4)] w-max transition-all hover:-translate-y-0.5 active:scale-[0.98] text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <FaPlay size={11} />
                  {upcomingClass?.zoomLink ? 'Join Live Session' : 'Go to Classes'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Resume Learning */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="card-premium p-6"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-extrabold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Resume Learning
                </h3>
                <div className="badge-brand text-[10px] py-0.5 px-2.5">
                  <FaFire size={9} /> Active
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="w-full h-28 rounded-2xl overflow-hidden mb-4 relative bg-gradient-to-br from-indigo-900 to-violet-900">
                  <div className="absolute inset-0 bg-dot-grid opacity-20" />
                  <div className="w-full h-full flex items-center justify-center">
                    <FaBookOpen className="text-indigo-300/60" size={36} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(99,102,241,0.3)] transform group-hover:scale-110 transition-transform">
                      <FaPlay className="text-indigo-600 ml-0.5" size={14} />
                    </div>
                  </div>
                </div>

                <h4 className="font-bold text-slate-800 text-sm leading-tight mb-0.5 group-hover:text-indigo-600 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Enterprise Software
                </h4>
                <p className="text-xs text-slate-500 mb-3 font-medium">Module 3: Core Architecture</p>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="progress-bar-fill h-full" style={{ width: '65%' }} />
                  </div>
                  <span className="text-xs font-extrabold text-indigo-600">65%</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="card-premium p-6"
            >
              <h3 className="text-base font-extrabold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'My Courses', icon: FaBookOpen, color: 'text-indigo-600', bg: 'from-indigo-50 to-violet-50', path: '/dashboard/learning' },
                  { label: 'Edit Profile', icon: FaUser, color: 'text-slate-600', bg: 'from-slate-50 to-gray-50', path: '/dashboard/profile' },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/50 transition-all group border border-transparent hover:border-indigo-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center ${item.color}`}>
                        <item.icon size={15} />
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {item.label}
                      </span>
                    </div>
                    <FaChevronRight className="text-slate-300 group-hover:text-indigo-400 text-xs transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
