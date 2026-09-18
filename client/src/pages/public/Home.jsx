import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaClock, FaGlobe, FaStar, FaArrowRight, FaCheckCircle, FaAward, 
  FaLaptopCode, FaGraduationCap, FaPhoneAlt, FaWhatsapp, FaBolt, 
  FaCalendarAlt, FaCode, FaServer, FaCloud, FaDatabase, FaUsers, 
  FaBriefcase, FaUserTie, FaRocket, FaShieldAlt, FaBuilding,
  FaJava, FaPython, FaReact, FaNodeJs, FaDocker, FaAws
} from 'react-icons/fa';
import { 
  SiSpringboot, SiMongodb, SiPostgresql, SiKubernetes
} from 'react-icons/si';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

// --- Typewriter Component ---
const TypewriterText = ({ text = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const chars = Array.from(text || '');
    let i = 0;
    setDisplayText('');
    setIsTyping(true);

    if (chars.length === 0) {
      setIsTyping(false);
      return;
    }

    const intervalId = setInterval(() => {
      setDisplayText(chars.slice(0, i + 1).join(''));
      i++;
      if (i >= chars.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 70);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span>
      {displayText}
      {isTyping && <span className="animate-pulse ml-0.5 text-blue-600">|</span>}
    </span>
  );
};

// --- Animated Counter Component ---
const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const nodeRef = React.useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated && nodeRef.current) {
      let startTimestamp = null;
      const targetVal = Number(to) || 0;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(easeProgress * (targetVal - from) + from);

        if (nodeRef.current) {
          nodeRef.current.textContent = currentVal.toLocaleString('en-IN') + suffix;
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [from, to, duration, suffix, hasAnimated]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

// --- Tilted Card Component ---
const TiltedCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="tilted-card-wrapper w-full h-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`w-full h-full relative ${className}`}>
        {children}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const [platformStats, setPlatformStats] = useState({
    studentsCount: 10000,
    studentsSuffix: '+',
    coursesCount: 20,
    coursesSuffix: '+',
    instructorsCount: 15,
    instructorsSuffix: '+',
    satisfactionRate: 98,
    satisfactionSuffix: '%'
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/settings/stats`)
      .then(res => {
        if (res.data?.success && res.data?.data) {
          setPlatformStats(prev => ({
            ...prev,
            ...res.data.data
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Hot technologies for marquee
  const techMarquee = [
    { name: 'Full Stack Java', icon: FaJava, color: 'text-amber-600' },
    { name: 'Spring Boot & Microservices', icon: SiSpringboot, color: 'text-emerald-600' },
    { name: 'Python Full Stack', icon: FaPython, color: 'text-blue-600' },
    { name: 'React 19 & Next.js', icon: FaReact, color: 'text-cyan-600' },
    { name: 'Node.js & Express', icon: FaNodeJs, color: 'text-green-600' },
    { name: 'AWS Cloud Solutions', icon: FaAws, color: 'text-amber-600' },
    { name: 'Docker & Kubernetes', icon: FaDocker, color: 'text-blue-600' },
    { name: 'MongoDB & PostgreSQL', icon: SiMongodb, color: 'text-teal-600' }
  ];

  // Top hiring partners
  const hiringPartners = [
    "TATA CONSULTANCY SERVICES", "INFOSYS", "WIPRO", "COGNIZANT", 
    "ACCENTURE", "AMAZON", "CAPGEMINI", "TECH MAHINDRA", 
    "HCL TECHNOLOGIES", "DELOITTE", "ORACLE", "IBM"
  ];

  // Upcoming Batch Schedules
  const upcomingBatches = [
    {
      course: 'Java Full Stack Development',
      date: 'Next Monday',
      time: '07:30 AM - 09:00 AM IST',
      mode: 'Live Online & Classroom',
      trainerExp: '12+ Years (Ex-TCS Lead)',
      seats: 'Only 5 Seats Left',
      status: 'Admissions Open',
      highlight: 'Top Seller'
    },
    {
      course: 'Python Full Stack & AI',
      date: 'Wednesday',
      time: '07:00 PM - 08:30 PM IST',
      mode: 'Live Interactive Online',
      trainerExp: '10+ Years (Senior AI Eng.)',
      seats: 'Only 7 Seats Left',
      status: 'Admissions Open',
      highlight: 'Trending'
    },
    {
      course: 'Cloud AWS, Azure & DevOps',
      date: 'Next Saturday (Weekend)',
      time: '10:00 AM - 01:00 PM IST',
      mode: 'Live Online + Lab Sessions',
      trainerExp: '14+ Years (Principal Architect)',
      seats: 'Fast Filling',
      status: 'Admissions Open',
      highlight: 'High Package'
    },
    {
      course: 'MERN Stack Web Development',
      date: 'Thursday',
      time: '06:00 PM - 07:30 PM IST',
      mode: 'Live Interactive Online',
      trainerExp: '9+ Years (Full Stack Lead)',
      seats: 'Only 4 Seats Left',
      status: 'Admissions Open',
      highlight: 'Popular'
    }
  ];

  // Static curriculum tracks for interactive tabs
  const techTracks = [
    {
      id: 'java',
      category: 'fullstack',
      title: 'Java Full Stack Development',
      badge: 'Highest Placement Demand',
      duration: '3.5 Months',
      projects: '4 Real Enterprise Projects',
      topics: ['Core Java & OOP', 'Spring Boot 3 & Hibernate', 'Microservices Architecture', 'React.js & REST APIs', 'MySQL & AWS Deployment'],
      callout: 'Trained by 12+ years experienced MNC Leads'
    },
    {
      id: 'python',
      category: 'ai',
      title: 'Python Full Stack & Data Engineering',
      badge: 'High Salary Growth',
      duration: '3 Months',
      projects: '3 Capstone Projects',
      topics: ['Python Programming', 'Django & FastAPI Framework', 'PostgreSQL & ORM', 'Machine Learning & GenAI APIs', 'Docker Containerization'],
      callout: 'Perfect for freshers & career switchers'
    },
    {
      id: 'mern',
      category: 'fullstack',
      title: 'MERN Stack Web Development',
      badge: 'Product Company Favorite',
      duration: '3 Months',
      projects: '5 Modern Web Apps',
      topics: ['Modern JavaScript (ES6+)', 'React 19 & Redux Toolkit', 'Node.js & Express.js', 'MongoDB Atlas & Aggregations', 'Full-stack Authentication & CI/CD'],
      callout: 'Complete hands-on Git portfolio'
    },
    {
      id: 'devops',
      category: 'cloud',
      title: 'AWS Cloud & DevOps Engineering',
      badge: 'Cloud Enterprise Standard',
      duration: '3 Months',
      projects: '3 Production Pipelines',
      topics: ['Linux Administration & Shell', 'AWS Cloud Architecture (EC2, S3, RDS)', 'Docker & Kubernetes Clusters', 'Jenkins CI/CD & GitHub Actions', 'Terraform Infrastructure as Code'],
      callout: 'Industry-standard infrastructure mastery'
    }
  ];

  const filteredTracks = activeTab === 'all' 
    ? techTracks 
    : techTracks.filter(t => t.category === activeTab);

  return (
    <div className="bg-[#f8fafc] text-slate-900 overflow-hidden min-h-screen">
      <SEO 
        title="JVK Technologies – Learn New Technologies, Build Strong Skills, and Move Towards Your Dream Job!"
        description="Master Java Full Stack, Python, MERN Stack, Cloud AWS, and DevOps with real-time projects and 100% placement assistance at JVK Technologies Pvt Ltd."
        keywords="JVK Technologies, Java Full Stack training Hyderabad, Python Full Stack, MERN Stack, AWS DevOps, IT training placement, Hyderabad software coaching"
        url="https://jvktechnologies.com"
      />

      {/* ========================================================================= */}
      {/* 🚀 HERO SECTION (Bright, Modern, High-Impact Light Aesthetic)             */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50/50 bg-light-grid">
        
        {/* Soft Ambient Radial Accents */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-200/35 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-sky-200/35 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 font-outfit text-xs md:text-sm font-bold tracking-wider uppercase mb-6 shadow-xs"
          >
            <FaBolt className="text-amber-500" />
            <span>{t('hero_badge')}</span>
          </motion.div>

          {/* Main Slogan & Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-outfit text-slate-900 tracking-tight leading-[1.14] mb-6 max-w-5xl mx-auto"
          >
            {t('hero_title_1')} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 animate-text-shimmer drop-shadow-xs">
              <TypewriterText text={t('hero_title_2')} />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 font-inter mb-10 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* Action & Direct Contact Triggers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
          >
            {/* Free Demo CTA */}
            <a 
              href="https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20I%20want%20to%20reserve%20a%20seat%20for%20the%20Free%20Live%20Demo%20Session."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto relative group overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-8 py-4 rounded-2xl font-black font-outfit text-base md:text-lg hover:brightness-105 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2.5"
            >
              <FaBolt size={16} />
              <span>{t('hero_start')}</span>
            </a>

            {/* Direct Call Button */}
            <a 
              href="tel:+919059519151" 
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold font-outfit text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2.5"
            >
              <FaPhoneAlt size={15} className="text-white" />
              <span>{t('hero_call_now')}</span>
            </a>

            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20please%20share%20all%20course%20details." 
              target="_blank" 
              rel="noreferrer" 
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold font-outfit text-base transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-200"
            >
              <FaWhatsapp size={18} className="text-emerald-600" />
              <span>{t('hero_whatsapp')}</span>
            </a>
          </motion.div>

          {/* Dynamic Platform Stats with Crisp White Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-300 transition-all text-center">
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 font-outfit">
                <AnimatedCounter from={0} to={platformStats.studentsCount || 10000} suffix={platformStats.studentsSuffix || '+'} duration={2.5} />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Students Trained
              </div>
            </div>

            <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-300 transition-all text-center">
              <div className="text-3xl md:text-4xl font-black text-blue-600 mb-1 font-outfit">
                <AnimatedCounter from={0} to={platformStats.satisfactionRate || 98} suffix={platformStats.satisfactionSuffix || '%'} duration={2} />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Placement Success Rate
              </div>
            </div>

            <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-300 transition-all text-center">
              <div className="text-3xl md:text-4xl font-black text-amber-600 mb-1 font-outfit">
                <AnimatedCounter from={0} to={150} suffix="+" duration={2} />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Hiring MNC Partners
              </div>
            </div>

            <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-300 transition-all text-center">
              <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1 font-outfit">
                <AnimatedCounter from={0} to={platformStats.instructorsCount || 15} suffix={platformStats.instructorsSuffix || '+'} duration={2} />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Corporate Mentors
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* ⚡ HOT TECH STACK INFINITE MARQUEE                                      */}
      {/* ========================================================================= */}
      <section className="py-6 bg-white border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Industry-Demanded Stacks Taught with Real-World Coding
          </p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center py-2">
            {techMarquee.concat(techMarquee).map((tech, index) => (
              <div 
                key={index} 
                className="mx-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-slate-800 text-sm font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-white transition-all cursor-pointer shrink-0 shadow-xs"
              >
                <tech.icon className={`text-lg ${tech.color}`} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎯 INTERACTIVE CURRICULUM TRACKS & CARDS                                */}
      {/* ========================================================================= */}
      <section className="py-20 relative bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <FaLaptopCode /> Curated Job-Ready Curricula
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight">
                Specialized Software Engineering Programs
              </h2>
              <p className="text-slate-600 font-medium text-base mt-2 max-w-xl">
                Structured step-by-step from core programming fundamentals to production cloud deployment and interview cracking.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 bg-slate-200/70 p-1.5 rounded-2xl border border-slate-300/60">
              {[
                { id: 'all', label: 'All Tracks' },
                { id: 'fullstack', label: 'Full Stack' },
                { id: 'ai', label: 'Python & AI' },
                { id: 'cloud', label: 'Cloud & DevOps' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      {track.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                      <FaClock className="text-amber-500" /> {track.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {track.title}
                  </h3>

                  <p className="text-xs text-emerald-600 font-bold mb-4 flex items-center gap-1.5">
                    <FaCheckCircle size={12} /> {track.projects}
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-slate-600">
                    {track.topics.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 mb-3 italic">
                    {track.callout}
                  </div>
                  <a
                    href={`https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20please%20send%20me%20the%20detailed%20syllabus%20for%20${encodeURIComponent(track.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-outfit shadow-sm transition-all"
                  >
                    <span>Get Syllabus & Demo</span>
                    <FaArrowRight size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 text-slate-800 hover:text-blue-600 font-outfit font-bold text-sm transition-all shadow-sm"
            >
              <span>Explore All 20+ Tech Courses</span>
              <FaArrowRight size={12} />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📅 UPCOMING BATCHES & DEMO SCHEDULE                                       */}
      {/* ========================================================================= */}
      <section id="batches" className="py-20 relative bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <FaCalendarAlt /> Live Schedule
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight">
              Upcoming Batches & Free Demo Sessions
            </h2>
            <p className="text-slate-600 font-medium text-base mt-2">
              Attend a free interactive demo class led by senior MNC software architects before you enroll.
            </p>
          </div>

          {/* Batches Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBatches.map((batch, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                      {batch.highlight}
                    </span>
                    <span className="text-xs font-bold text-red-600 flex items-center gap-1.5 animate-pulse">
                      <FaBolt /> {batch.seats}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 font-outfit mb-3">
                    {batch.course}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 mb-5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Start Date:</span>
                      <strong className="text-slate-800 text-xs">{batch.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Daily Timing:</span>
                      <strong className="text-amber-700 text-xs">{batch.time}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Training Mode:</span>
                      <strong className="text-blue-600 text-xs">{batch.mode}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Mentor Profile:</span>
                      <strong className="text-emerald-700 text-xs">{batch.trainerExp}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20I%20want%20to%20reserve%20a%20seat%20for%20the%20upcoming%20batch%20of%20${encodeURIComponent(batch.course)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-slate-950 font-black font-outfit text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <FaBolt />
                    <span>Reserve Free Demo Seat</span>
                  </a>

                  <a
                    href="tel:+919059519151"
                    className="p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-600 hover:text-white text-blue-700 transition-colors"
                    title="Call for batch confirmation"
                  >
                    <FaPhoneAlt size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help Callout */}
          <div className="mt-10 p-5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <FaPhoneAlt size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Need a customized batch timing or 1-on-1 counseling?</h4>
                <p className="text-xs text-slate-600">Our senior career counselors are available from 8:00 AM to 8:00 PM IST.</p>
              </div>
            </div>
            <a
              href="tel:+919059519151"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-outfit shrink-0 transition-colors shadow-xs"
            >
              Call +91-9059519151
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🚀 4-STAGE LEARNING & PLACEMENT ROADMAP                                  */}
      {/* ========================================================================= */}
      <section className="py-20 relative bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <FaRocket /> Step-By-Step Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight">
              {t('home_how_title')}
            </h2>
            <p className="text-slate-600 font-medium text-base mt-2">
              {t('home_how_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: t('home_step1_title'),
                desc: t('home_step1_desc'),
                icon: FaCode,
                color: 'bg-blue-600 text-white'
              },
              {
                step: '02',
                title: t('home_step2_title'),
                desc: t('home_step2_desc'),
                icon: FaServer,
                color: 'bg-indigo-600 text-white'
              },
              {
                step: '03',
                title: t('home_step3_title'),
                desc: t('home_step3_desc'),
                icon: FaCloud,
                color: 'bg-cyan-600 text-white'
              },
              {
                step: '04',
                title: t('home_step4_title'),
                desc: t('home_step4_desc'),
                icon: FaBriefcase,
                color: 'bg-amber-600 text-white'
              }
            ].map((s, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all relative overflow-hidden group shadow-sm"
              >
                <div className="text-4xl font-black text-slate-100 font-outfit absolute top-4 right-4">
                  {s.step}
                </div>
                <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center text-xl mb-4 font-bold shadow-sm`}>
                  <s.icon />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-outfit mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 💼 TOP HIRING MNC PARTNERS (Placements Section)                          */}
      {/* ========================================================================= */}
      <section id="placements" className="py-16 bg-white border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            Placement Ecosystem
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-outfit">
            {t('home_trusted')}
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative flex overflow-x-hidden mb-4">
          <div className="animate-marquee whitespace-nowrap flex items-center py-2">
            {hiringPartners.concat(hiringPartners).map((partner, index) => (
              <div 
                key={index} 
                className="mx-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-outfit font-black text-sm tracking-wider uppercase hover:border-blue-400 hover:text-blue-600 hover:bg-white transition-all cursor-pointer shrink-0 shadow-xs flex items-center gap-2"
              >
                <FaBuilding className="text-blue-600 text-xs" />
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="max-w-4xl mx-auto px-4 mt-6 text-center">
          <p className="text-xs md:text-sm text-slate-600">
            ⭐ Over <strong className="text-slate-900">10,000+ graduates</strong> placed across leading IT product and consulting giants with average packages from <strong>4.5 LPA to 12+ LPA</strong>.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 WHY CHOOSE JVK TECHNOLOGIES                                            */}
      {/* ========================================================================= */}
      <section className="py-20 relative bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <FaAward /> The JVK Advantage
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight">
              {t('home_why_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-400 transition-all hover:-translate-y-1.5 text-center group shadow-sm hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform border border-blue-100">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-outfit mb-3">
                {t('home_why1_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home_why1_desc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-amber-400 transition-all hover:-translate-y-1.5 text-center group shadow-sm hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform border border-amber-100">
                <FaLaptopCode />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-outfit mb-3">
                {t('home_why2_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home_why2_desc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-400 transition-all hover:-translate-y-1.5 text-center group shadow-sm hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform border border-emerald-100">
                <FaAward />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-outfit mb-3">
                {t('home_why3_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home_why3_desc')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🚀 HIGH-CONVERSION CTA BANNER WITH DIRECT PHONE & WHATSAPP              */}
      {/* ========================================================================= */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider mb-4 border border-white/30">
            <FaBolt className="text-amber-300" /> Next Batch Starting This Week
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white font-outfit drop-shadow-sm">
            {t('home_cta_title')}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('home_cta_sub')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:+919059519151" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-blue-700 font-black font-outfit text-base shadow-xl transition-all flex items-center justify-center gap-2.5"
            >
              <FaPhoneAlt />
              <span>Call Admissions: +91-9059519151</span>
            </a>

            <a 
              href="https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20I%20would%20like%20to%20join%20the%20next%20batch."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black font-outfit text-base shadow-xl transition-all flex items-center justify-center gap-2.5"
            >
              <FaWhatsapp size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-blue-200 mt-6">
            📍 Campus: Plot No 42, Tech Cyber Zone, Near Cyber Towers, HITEC City, Madhapur, Hyderabad
          </p>

        </div>
      </section>

    </div>
  );
};

export default Home;
