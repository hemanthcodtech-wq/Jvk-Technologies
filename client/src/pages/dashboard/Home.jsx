import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaClock, FaAward, FaPlay, FaChevronRight, FaBookOpen, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [upcomingClass, setUpcomingClass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch enrolled courses
        const coursesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/payments/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (coursesRes.data.success) {
          setEnrolledCount(coursesRes.data.data.length);
        }

        // Fetch classes
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
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const displayName = user?.name || user?.emailOrPhone?.split('@')[0] || 'Learner';

  const stats = [
    { label: 'Courses Enrolled', value: enrolledCount, icon: FaGraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Hours Learned', value: '0', icon: FaClock, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Certificates Earned', value: '0', icon: FaAward, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 md:pb-12 md:pt-28 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Welcome back, <span className="text-blue-600">{displayName}</span> <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Continue your journey in technology and growth.</p>
          </div>
          <button onClick={() => navigate('/courses')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all w-max">
            Explore Courses
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero / Next Class Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="relative w-full h-[280px] md:h-[320px] rounded-3xl overflow-hidden shadow-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900/90 to-slate-900/80 z-10"></div>
              {/* Modern Tech Pattern */}
              <div className="absolute inset-0 bg-slate-950 w-full h-full bg-[radial-gradient(rgba(37,99,235,0.15)_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl"></div>
              </div>
              
              <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-full w-max mb-4 border border-blue-400/20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">Up Next</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white max-w-lg leading-tight mb-2">
                  {upcomingClass ? (upcomingClass.title || upcomingClass.course?.title || 'Live Technical Session') : 'Welcome to JVK Learning'}
                </h2>
                <p className="text-blue-100/80 mb-8 max-w-md line-clamp-2">
                  {upcomingClass ? `Join your upcoming session on ${new Date(upcomingClass.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} at ${upcomingClass.time}.` : 'Explore our catalog and start a new journey today.'}
                </p>
                
                <button 
                  onClick={() => upcomingClass?.zoomLink ? window.open(upcomingClass.zoomLink, '_blank') : navigate('/dashboard/learning')} 
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.4)] w-max transition-all hover:scale-105 flex items-center gap-2"
                >
                  <FaPlay size={12}/> {upcomingClass?.zoomLink ? 'Join Live Session' : 'Go to Classes'}
                </button>
              </div>
            </motion.div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            {/* Resume Learning Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Resume Learning</h3>
              </div>

              <div className="group cursor-pointer">
                <div className="w-full h-32 rounded-xl bg-slate-100 overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/5 transition-colors z-10"></div>
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                    <FaBookOpen className="text-blue-500 opacity-50" size={40}/>
                  </div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.2)] transform group-hover:scale-110 transition-transform">
                      <FaPlay className="text-blue-600 ml-1" size={14}/>
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors">Enterprise Software</h4>
                <p className="text-xs text-slate-500 mb-3">Module 3: Core Architecture</p>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">65%</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => navigate('/dashboard/learning')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <FaBookOpen size={16}/>
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">My Courses</span>
                  </div>
                  <FaChevronRight className="text-slate-400 group-hover:text-blue-600 text-xs"/>
                </button>
                
                <button onClick={() => navigate('/dashboard/profile')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <FaUser size={16}/>
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">Edit Profile</span>
                  </div>
                  <FaChevronRight className="text-slate-400 group-hover:text-slate-600 text-xs"/>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
