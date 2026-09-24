import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaUserTie, FaClock, FaSignal, FaLaptopCode, FaHeart, FaRegHeart, FaCheckCircle } from 'react-icons/fa';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import SEO from '../../components/common/SEO';

import CourseCard from '../../components/courses/CourseCard';

// Default courses removed
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, t } = useLanguage();
  const { settings } = useSettings();

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
    fetchWishlist();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public`);
      const rawList = response?.data?.data || (Array.isArray(response?.data) ? response.data : []);
      const softwareList = Array.isArray(rawList) ? rawList.filter(c => {
        const text = (c.title + ' ' + (c.category || '')).toLowerCase();
        return !['trading', 'intraday', 'nism', 'stock', 'options', 'derivatives'].some(w => text.includes(w));
      }) : [];
      if (softwareList.length > 0) {
        setCourses(softwareList);
      } else {
        setCourses([]);
      }
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payments/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        const ids = res.data.data.map(en => en.course?._id || en.course).filter(Boolean);
        setEnrolledCourseIds(ids);
      }
    } catch(e) {}
  };

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setWishlistIds(res.data.data.map(c => c._id || c));
      }
    } catch(e) {}
  };

  const handleToggleWishlist = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/wishlist/toggle/${courseId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setWishlistIds(res.data.data.map(c => c._id || c));
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const categories = ['All', ...(settings.categories.length > 0 ? settings.categories : ['Full Stack Java', 'Python & AI', 'MERN Stack', 'Cloud & DevOps', 'Software Testing'])];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (course.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                            course.category === selectedCategory ||
                            (course.title && course.title.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      <SEO 
        title="Software Engineering Programs & Tech Tracks | JVK Technologies Pvt Ltd"
        description="Master Java Full Stack, Python, MERN Stack, Cloud AWS, and DevOps with real-time projects and 100% placement assistance at JVK Technologies Pvt Ltd."
        keywords="Java Full Stack course, Python AI training, MERN Stack Hyderabad, AWS DevOps training, software placement institute"
        url="https://jvktechnologies.com/courses"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 md:py-10">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <FaLaptopCode /> Industry-Aligned Curricula
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 font-outfit tracking-tight">
            {t('course_all')}
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            {t('course_discover')}
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input 
              type="text" 
              placeholder={t('course_search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:border-blue-600 outline-none transition-colors shadow-xs"
            />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar gap-2 py-1 justify-start md:justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 max-w-2xl mx-auto p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('course_no_found')}</h3>
            <p className="text-slate-500 text-sm">{t('course_no_found_sub')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isEnrolled={enrolledCourseIds.includes(course._id)}
                isWishlisted={wishlistIds.includes(course._id)}
                onToggleWishlist={handleToggleWishlist}
                onClick={() => {
                  if (location.pathname.startsWith('/dashboard')) {
                    navigate(`/dashboard/courses/${course.slug || course._id}`);
                  } else {
                    navigate(`/courses/${course.slug || course._id}`);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
