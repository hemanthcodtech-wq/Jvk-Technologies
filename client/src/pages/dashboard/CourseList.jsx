import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaUserTie, FaClock, FaSignal, FaLaptopCode, FaHeart, FaRegHeart, FaCheckCircle } from 'react-icons/fa';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

const courseImageMap = {
  'java-full-stack': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  'python-full-stack': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  'mern-stack': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
  'aws-devops': 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
  'software-testing': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
};

const getCourseImage = (course) => {
  if (course?.thumbnailUrl && course.thumbnailUrl.startsWith('http')) return course.thumbnailUrl;
  const slug = (course?.slug || course?._id || course?.category || '').toLowerCase();
  if (slug.includes('java')) return courseImageMap['java-full-stack'];
  if (slug.includes('python') || slug.includes('ai')) return courseImageMap['python-full-stack'];
  if (slug.includes('mern') || slug.includes('react') || slug.includes('web')) return courseImageMap['mern-stack'];
  if (slug.includes('aws') || slug.includes('devops') || slug.includes('cloud')) return courseImageMap['aws-devops'];
  if (slug.includes('test') || slug.includes('qa') || slug.includes('selenium')) return courseImageMap['software-testing'];
  return courseImageMap['java-full-stack'];
};

// Sub-component so useAutoTranslate hook can be called per card
const CourseCard = ({ course, isEnrolled, isWishlisted, onToggleWishlist, onClick }) => {
  const titleTe = useAutoTranslate(course.title, course.title_te);
  const imageSrc = getCourseImage(course);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-200 flex flex-row md:flex-col gap-4 md:gap-5 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="w-[110px] h-[110px] md:w-full md:h-52 shrink-0 relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200">
        <img 
          src={imageSrc} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          onError={(e) => {
            e.target.src = courseImageMap['java-full-stack'];
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

        <div className="hidden md:block absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-blue-600 border border-slate-200 shadow-xs uppercase tracking-wider z-10">
          {course.category || 'Software'}
        </div>
        
        {/* Top Right Badges: Enrolled & Wishlist */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1.5 z-10">
          {isEnrolled && (
            <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-extrabold shadow-xs flex items-center gap-1">
              ✓ Enrolled
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(course._id);
            }}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-xs"
            title="Add to Wishlist"
          >
            {isWishlisted ? <FaHeart className="text-red-500 text-xs md:text-sm" /> : <FaRegHeart className="text-xs md:text-sm" />}
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center md:justify-start py-1 pr-2 md:pr-0 md:px-1">
        <h3 className="text-[15px] md:text-lg font-black text-slate-900 leading-snug line-clamp-2 md:mb-1.5 group-hover:text-blue-600 transition-colors">{titleTe}</h3>
        <p className="text-[11px] md:text-xs font-semibold text-slate-500 mt-1 md:mb-4">{course.level || 'Beginner to Advanced (Job Ready)'}</p>
        <div className="mt-auto pt-2 md:pt-0 flex items-center justify-start text-[11px] md:text-xs text-slate-600 font-bold mb-1 md:mb-4">
          <div className="text-blue-600 font-medium flex items-center gap-1">
            <FaClock className="text-blue-600" /> {course.duration || '3-4 Months'}
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block">Fee starts from</span>
            <span className="text-base md:text-lg font-black text-slate-900 tracking-tight">₹{course.price || '18,999'}</span>
          </div>
          <span className="text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 rounded-xl shadow-xs">
            View Syllabus
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const defaultSoftwareCourses = [
  {
    _id: 'java-full-stack',
    slug: 'java-full-stack',
    title: 'Java Full Stack Development with Spring Boot & React',
    category: 'Full Stack Java',
    level: 'Comprehensive • 100% Placement',
    duration: '3.5 Months',
    price: '18,999',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    description: 'Master Core Java, Spring Boot microservices, Hibernate, REST APIs, React 19, and AWS deployment with real projects.'
  },
  {
    _id: 'python-full-stack',
    slug: 'python-full-stack',
    title: 'Python Full Stack & AI Machine Learning Track',
    category: 'Python & AI',
    level: 'Beginner to Advanced',
    duration: '3 Months',
    price: '16,999',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'Build robust web applications with Python, Django/FastAPI, PostgreSQL, React, and explore Machine Learning basics.'
  },
  {
    _id: 'mern-stack',
    slug: 'mern-stack',
    title: 'MERN Stack Web Development Masterclass',
    category: 'MERN Stack',
    level: 'Job-Oriented Bootcamp',
    duration: '3 Months',
    price: '17,499',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    description: 'Become a complete MERN stack engineer with MongoDB, Express.js, React 19, Node.js, Next.js, and TypeScript.'
  },
  {
    _id: 'aws-devops',
    slug: 'aws-devops',
    title: 'Cloud AWS, Azure & DevOps Engineering',
    category: 'Cloud & DevOps',
    level: 'Industry Standard Lab',
    duration: '3 Months',
    price: '19,999',
    thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    description: 'Hands-on training in Linux, Docker, Kubernetes, Jenkins CI/CD, Terraform, AWS Services, and automated pipelines.'
  },
  {
    _id: 'software-testing',
    slug: 'software-testing',
    title: 'Software Automation Testing (Selenium, Java & API)',
    category: 'Software Testing',
    level: 'Manual + Automation',
    duration: '2.5 Months',
    price: '14,999',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    description: 'Master Core Java for testing, Selenium WebDriver, TestNG, Cucumber BDD, Postman API Testing, and Jenkins integration.'
  }
];

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
    fetchWishlist();
  }, []);

  const fetchCourses = async () => {
    try {
      const rawList = response?.data?.data || (Array.isArray(response?.data) ? response.data : []);
      const softwareList = Array.isArray(rawList) ? rawList.filter(c => {
        const text = (c.title + ' ' + (c.category || '')).toLowerCase();
        return !['trading', 'intraday', 'nism', 'stock', 'options', 'derivatives'].some(w => text.includes(w));
      }) : [];
      if (softwareList.length > 0) {
        setCourses(softwareList);
      } else {
        setCourses(defaultSoftwareCourses);
      }
    } catch (error) {
      setCourses(defaultSoftwareCourses);
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

  const categories = ['All', 'Full Stack Java', 'Python & AI', 'MERN Stack', 'Cloud & DevOps', 'Software Testing'];

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
                onClick={() => navigate(`/courses/${course.slug || course._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
