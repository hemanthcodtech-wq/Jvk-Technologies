import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaUsers, FaBookOpen, FaGraduationCap, FaVideo, FaRupeeSign, 
  FaUserCircle, FaPlus, FaFolderOpen, FaArrowRight, FaCalendarCheck, 
  FaClock, FaSlidersH, FaCheckCircle, FaTimes, FaSave, FaGlobe, FaAward
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalClasses: 0,
    totalRevenue: 0,
    recentActivity: [],
    upcomingClasses: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Platform Settings Modal State
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('contact'); // 'contact', 'stats', 'categories'
  const [platformSettings, setPlatformSettings] = useState({
    stats: {
      studentsCount: 5000,
      studentsSuffix: '+',
      studentsLabel: 'Transformed Seekers',
      coursesCount: 25,
      coursesSuffix: '+',
      coursesLabel: 'Master Curricula',
      instructorsCount: 15,
      instructorsSuffix: '+',
      instructorsLabel: 'Expert Gurus',
      satisfactionRate: 99,
      satisfactionSuffix: '%',
      satisfactionLabel: 'Satisfaction',
      communitiesCount: 15,
      communitiesSuffix: '+',
      communitiesLabel: 'Global Communities',
      lineageRate: 100,
      lineageSuffix: '%',
      lineageLabel: 'Authentic Vedic Lineage'
    },
    contact: {
      whatsappNumber: '+919059519151',
      callNumber: '+919059519151',
      email: 'support@jvktech.com',
      address: 'IT Hub, India'
    },
    categories: []
  });
  const [newCategory, setNewCategory] = useState('');
  const [savingStats, setSavingStats] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchStats();
    fetchPlatformSettings();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching analytics", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlatformSettings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/settings`);
      if (res.data.success && res.data.data) {
        setPlatformSettings(prev => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.error("Error fetching platform settings", err);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSavePlatformSettings = async (e) => {
    e.preventDefault();
    setSavingStats(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/settings`,
        platformSettings,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        showToast('Platform settings updated successfully across the app!');
        setSettingsModalOpen(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating platform settings');
    } finally {
      setSavingStats(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !platformSettings.categories.includes(newCategory.trim())) {
      setPlatformSettings({
        ...platformSettings,
        categories: [...platformSettings.categories, newCategory.trim()]
      });
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (cat) => {
    setPlatformSettings({
      ...platformSettings,
      categories: platformSettings.categories.filter(c => c !== cat)
    });
  };

  const statCards = [
    { 
      title: 'Total Revenue', 
      value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`, 
      icon: FaRupeeSign, 
      gradient: 'from-emerald-500 to-green-600',
      iconBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      subtitle: 'Verified course sales'
    },
    { 
      title: 'Active Students', 
      value: stats.totalUsers || 0, 
      icon: FaUsers, 
      gradient: 'from-orange-500 to-amber-600',
      iconBg: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      subtitle: 'Registered learners'
    },
    { 
      title: 'Live Programs', 
      value: stats.totalCourses || 0, 
      icon: FaBookOpen, 
      gradient: 'from-blue-500 to-cyan-600',
      iconBg: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      subtitle: 'Published curricula'
    },
    { 
      title: 'Total Enrollments', 
      value: stats.totalEnrollments || 0, 
      icon: FaGraduationCap, 
      gradient: 'from-purple-500 to-indigo-600',
      iconBg: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      subtitle: 'Active course seats'
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-inter">

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 bg-blue-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2 border border-blue-600-dark"
          >
            <FaCheckCircle className="text-yellow-300" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Top Banner with Glassmorphism */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-8 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/10 text-blue-600-dark text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Operational Intelligence
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">Admin Control Center</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time enrollment trends, revenue tracking, and live Zoom schedule.</p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Edit Platform Settings Button */}
          <button
            onClick={() => setSettingsModalOpen(true)}
            className="px-4 py-3 bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-800 border border-amber-300 rounded-2xl text-xs lg:text-sm font-bold shadow-xs transition-all flex items-center gap-2"
            title="Edit contact info, course categories, and public metrics"
          >
            <FaSlidersH size={13} />
            <span>Platform Settings</span>
          </button>

          <button
            onClick={() => navigate('/admin/courses')}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-600-dark text-white rounded-2xl text-xs lg:text-sm font-bold shadow-[0_4px_16px_rgba(41,120,56,0.3)] transition-all flex items-center gap-2 group"
          >
            <FaPlus size={12} className="group-hover:rotate-90 transition-transform" />
            <span>Create Course</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/materials')}
            className="px-5 py-3 bg-white/90 hover:bg-white text-gray-700 border border-gray-200/80 rounded-2xl text-xs lg:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
          >
            <FaFolderOpen className="text-blue-600" />
            <span>Upload Materials</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 lg:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mt-2 tracking-tight">{card.value}</h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">{card.subtitle}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${card.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                <card.icon size={22} />
              </div>
            </div>
            {/* Subtle bottom gradient line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          </motion.div>
        ))}
      </div>

      {/* Grid: Recent Activity & Upcoming Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Recent Enrollments */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80 p-6 lg:p-8 flex flex-col h-[480px]">
          <div className="flex items-center justify-between mb-6 shrink-0 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Recent Enrollments</h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Learners joining live wellness programs</p>
            </div>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-xs font-bold text-blue-600 hover:text-blue-600-dark flex items-center gap-1.5 transition-colors"
            >
              <span>View All Users</span>
              <FaArrowRight size={10} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 pr-1.5 space-y-3.5 custom-scrollbar">
            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl border border-gray-100/90 shadow-xs hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 border border-blue-600/20 font-bold">
                    <FaUserCircle size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{activity.studentEmail}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      Course: <span className="font-semibold text-blue-600-dark">{activity.course?.title || 'Program Enrollment'}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-gray-400 block">
                      {new Date(activity.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </span>
                    <span className="text-xs font-black text-blue-600 bg-green-50 border border-green-200/60 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                      +₹{activity.amountPaid || 0}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic py-16 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 h-full flex items-center justify-center">
                No recent enrollments recorded.
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Zoom Live Classes */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80 p-6 lg:p-8 flex flex-col h-[480px]">
          <div className="flex items-center justify-between mb-6 shrink-0 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Live Zoom Classes (Next 7 Days)</h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Automated schedule and instructor links</p>
            </div>
            <button 
              onClick={() => navigate('/admin/courses')}
              className="text-xs font-bold text-blue-600 hover:text-blue-600-dark flex items-center gap-1.5 transition-colors"
            >
              <span>Manage Sessions</span>
              <FaArrowRight size={10} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 pr-1.5 space-y-3.5 custom-scrollbar">
            {stats.upcomingClasses && stats.upcomingClasses.length > 0 ? (
              stats.upcomingClasses.map((cls, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl border border-gray-100/90 shadow-xs hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center shrink-0 border border-blue-100 font-bold">
                    <span className="text-[10px] uppercase tracking-wider">{new Date(cls.date).toLocaleString('en-US', { month: 'short' })}</span>
                    <span className="text-base font-black leading-tight">{new Date(cls.date).getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{cls.title || cls.courseId?.title}</h4>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mt-1">
                      <span className="flex items-center gap-1 text-blue-600"><FaClock size={11} /> {cls.time}</span>
                      {cls.meetingId && <span className="text-[11px] text-gray-400 font-mono">ID: {cls.meetingId}</span>}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {cls.zoomLink ? (
                      <a 
                        href={cls.zoomLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <FaVideo size={11} /> Launch
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl">No Link</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic py-16 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 h-full flex items-center justify-center">
                No classes scheduled for the next 7 days.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 🌟 EDIT PLATFORM SETTINGS MODAL */}
      <AnimatePresence>
        {settingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2.5rem] max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-white/80 my-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl border border-amber-200">
                    <FaSlidersH />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">Manage Platform Settings</h3>
                    <p className="text-xs text-gray-500">
                      Update contact info, course categories, and public metrics shown across the site.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSettingsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all"
                >
                  <FaTimes size={13} />
                </button>
              </div>

              {/* TABS */}
              <div className="flex border-b border-gray-200 gap-4 mb-4">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('contact')}
                  className={`pb-2 text-sm font-bold transition-all ${activeTab === 'contact' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                >
                  Contact Info
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('categories')}
                  className={`pb-2 text-sm font-bold transition-all ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                >
                  Course Categories
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('stats')}
                  className={`pb-2 text-sm font-bold transition-all ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                >
                  Platform Stats
                </button>
              </div>

              <form onSubmit={handleSavePlatformSettings} className="space-y-4">
                
                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">WhatsApp Number</label>
                        <input
                          type="text"
                          required
                          value={platformSettings.contact.whatsappNumber}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, contact: { ...platformSettings.contact, whatsappNumber: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600 focus:bg-white"
                          placeholder="+91..."
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Call Number</label>
                        <input
                          type="text"
                          required
                          value={platformSettings.contact.callNumber}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, contact: { ...platformSettings.contact, callNumber: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600 focus:bg-white"
                          placeholder="+91..."
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Support Email</label>
                        <input
                          type="email"
                          required
                          value={platformSettings.contact.email}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, contact: { ...platformSettings.contact, email: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600 focus:bg-white"
                          placeholder="support@domain.com"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-gray-700 block">Office Address</label>
                        <textarea
                          required
                          rows="2"
                          value={platformSettings.contact.address}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, contact: { ...platformSettings.contact, address: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600 focus:bg-white resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'categories' && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600 focus:bg-white"
                        placeholder="Add a new category (e.g., Salesforce)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                      />
                      <button 
                        type="button" 
                        onClick={handleAddCategory}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {platformSettings.categories.map((cat, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-200">
                          <span>{cat}</span>
                          <button type="button" onClick={() => handleRemoveCategory(cat)} className="text-gray-400 hover:text-red-500 focus:outline-none">
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                      {platformSettings.categories.length === 0 && (
                        <div className="text-sm text-gray-400">No categories found.</div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {/* Students Metric */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Students Count</label>
                        <input
                          type="number"
                          required
                          value={platformSettings.stats.studentsCount}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, studentsCount: Number(e.target.value) } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Suffix</label>
                        <input
                          type="text"
                          value={platformSettings.stats.studentsSuffix}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, studentsSuffix: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Label</label>
                        <input
                          type="text"
                          value={platformSettings.stats.studentsLabel}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, studentsLabel: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Courses Metric */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Courses Count</label>
                        <input
                          type="number"
                          required
                          value={platformSettings.stats.coursesCount}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, coursesCount: Number(e.target.value) } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Suffix</label>
                        <input
                          type="text"
                          value={platformSettings.stats.coursesSuffix}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, coursesSuffix: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Label</label>
                        <input
                          type="text"
                          value={platformSettings.stats.coursesLabel}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, coursesLabel: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Instructors Metric */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Instructors Count</label>
                        <input
                          type="number"
                          required
                          value={platformSettings.stats.instructorsCount}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, instructorsCount: Number(e.target.value) } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Suffix</label>
                        <input
                          type="text"
                          value={platformSettings.stats.instructorsSuffix}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, instructorsSuffix: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Label</label>
                        <input
                          type="text"
                          value={platformSettings.stats.instructorsLabel}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, instructorsLabel: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Satisfaction Rate */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Satisfaction Rate</label>
                        <input
                          type="number"
                          required
                          value={platformSettings.stats.satisfactionRate}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, satisfactionRate: Number(e.target.value) } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Suffix</label>
                        <input
                          type="text"
                          value={platformSettings.stats.satisfactionSuffix}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, satisfactionSuffix: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Label</label>
                        <input
                          type="text"
                          value={platformSettings.stats.satisfactionLabel}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, satisfactionLabel: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Global Communities */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Communities Count</label>
                        <input
                          type="number"
                          required
                          value={platformSettings.stats.communitiesCount}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, communitiesCount: Number(e.target.value) } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Suffix</label>
                        <input
                          type="text"
                          value={platformSettings.stats.communitiesSuffix}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, communitiesSuffix: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block">Label</label>
                        <input
                          type="text"
                          value={platformSettings.stats.communitiesLabel}
                          onChange={(e) => setPlatformSettings({ ...platformSettings, stats: { ...platformSettings.stats, communitiesLabel: e.target.value } })}
                          className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setSettingsModalOpen(false)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingStats}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-600-dark text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {savingStats ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <FaSave size={12} />
                        <span>Save Settings</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
