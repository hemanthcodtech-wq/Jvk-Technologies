import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaClock, FaGlobe, FaStar, FaArrowRight, FaCheckCircle, FaAward, 
  FaLaptopCode, FaGraduationCap, FaPhoneAlt, FaWhatsapp, FaBolt, 
  FaCalendarAlt, FaCode, FaServer, FaCloud, FaDatabase, FaUsers, 
  FaBriefcase, FaUserTie, FaRocket, FaShieldAlt, FaBuilding,
  FaJava, FaPython, FaReact, FaNodeJs, FaDocker, FaAws, FaChevronRight,
  FaFireAlt, FaRegCheckCircle, FaLayerGroup, FaQuoteLeft, FaBookOpen,
  FaDesktop, FaCheck, FaChartBar
} from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiPostgresql, SiKubernetes, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi2';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import SEO from '../../components/common/SEO';
import CourseCard from '../../components/courses/CourseCard';

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
    }, 60);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span>
      {displayText}
      {isTyping && <span className="animate-pulse ml-0.5 text-indigo-600 font-normal">|</span>}
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
      { threshold: 0.1 }
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

  return <span ref={nodeRef}>{(Number(to) || 0).toLocaleString('en-IN')}{suffix}</span>;
};

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState('all');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public`);
        const rawList = response?.data?.data || (Array.isArray(response?.data) ? response.data : []);
        setCourses(rawList);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const { stats, contact } = settings;
  const cleanWhatsapp = (contact?.whatsappNumber || '9059519151').replace(/[^0-9]/g, '');

  const defaultHeroSlides = [
    {
      title: 'Build skills that move your career forward',
      subtitle: 'Practical software training with real projects and experienced mentors.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85'
    },
    {
      title: 'Learn with production-focused projects',
      subtitle: 'Turn modern Java, Python, React and cloud skills into a portfolio employers can see.',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=85'
    },
    {
      title: 'Your next opportunity starts here',
      subtitle: 'Choose a track, register today and start building your next chapter.',
      imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85'
    }
  ];

  const heroSlides = (settings.heroSlides || []).filter(slide => slide.active !== false && slide.imageUrl).sort((a, b) => (a.order || 0) - (b.order || 0));
  const visibleHeroSlides = heroSlides.length ? heroSlides : defaultHeroSlides;
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    setActiveHeroSlide(current => current >= visibleHeroSlides.length ? 0 : current);
    const timer = setInterval(() => {
      setActiveHeroSlide(current => (current + 1) % visibleHeroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [visibleHeroSlides.length]);

  // Tech stack items for marquee
  const techMarquee = [
    { name: 'Java 21 & Spring Boot 3', icon: FaJava, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { name: 'Microservices & Kafka', icon: SiSpringboot, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    { name: 'Python & FastAPI', icon: FaPython, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    { name: 'React 19 & Next.js', icon: FaReact, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-200' },
    { name: 'TypeScript & Node.js', icon: SiTypescript, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
    { name: 'AWS Cloud Architecture', icon: FaAws, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { name: 'Docker & Kubernetes', icon: FaDocker, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
    { name: 'PostgreSQL & MongoDB', icon: SiPostgresql, color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200' },
    { name: 'ServiceNow', icon: FaBriefcase, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
    { name: 'Salesforce', icon: FaCloud, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' }
  ];

  // Top hiring partners
  const defaultHiringPartners = [
    "TATA CONSULTANCY SERVICES", "INFOSYS", "WIPRO", "COGNIZANT", 
    "ACCENTURE", "AMAZON", "CAPGEMINI", "TECH MAHINDRA", 
    "HCL TECHNOLOGIES", "DELOITTE", "ORACLE", "IBM"
  ];

  // Program Tracks details for Hero spotlight & Curriculum
  const pathwayData = {
    java: {
      category: 'fullstack',
      title: 'Java Full Stack Development',
      badge: 'Highest Placement Demand',
      duration: '3.5 Months',
      projects: '4 Real Enterprise Projects',
      salary: 'Avg. ₹5 – 14 LPA',
      icon: FaJava,
      color: 'text-amber-600',
      topGradient: 'from-amber-500 via-orange-500 to-indigo-600',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200/90',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'Master Core Java, Spring Boot 3, Hibernate 6, Microservices Architecture, and React 19 with AWS EC2 & RDS deployment.',
      skills: ['Spring Boot 3', 'Microservices', 'React 19', 'Kafka', 'Docker & AWS', 'Hibernate 6'],
      highlights: [
        'Spring Boot 3 + Microservices Architecture',
        'React 19, Redux Toolkit & Modern Web UI',
        'Kafka Event Streaming & Redis Caching',
        'AWS Deployment & Dockerized Pipelines'
      ],
      nextBatch: 'Starts Next Monday, 07:30 AM IST',
      mentor: '12+ Yrs Exp (Ex-TCS Lead)'
    },
    python: {
      category: 'ai',
      title: 'Python Full Stack & AI Engineering',
      badge: 'High Growth & Fast Hiring',
      duration: '3 Months',
      projects: '3 Capstone AI Projects',
      salary: 'Avg. ₹5 – 12 LPA',
      icon: FaPython,
      color: 'text-blue-600',
      topGradient: 'from-blue-600 via-indigo-600 to-cyan-500',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200/90',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      description: 'Learn Python 3.12, Django, high-performance FastAPI, PostgreSQL, Docker, and AI/LLM integration for production products.',
      skills: ['Python 3.12', 'FastAPI', 'Django', 'PostgreSQL', 'GenAI & LLMs', 'Docker'],
      highlights: [
        'Python 3.12 & OOP Best Practices',
        'Django & Asynchronous FastAPI Framework',
        'PostgreSQL & Vector Database Integrations',
        'Generative AI API & Prompt Engineering'
      ],
      nextBatch: 'Starts This Wednesday, 07:00 PM IST',
      mentor: '10+ Yrs Exp (Senior AI Architect)'
    },
    mern: {
      category: 'fullstack',
      title: 'MERN Stack Web Development',
      badge: 'Product Startup Favorite',
      duration: '3 Months',
      projects: '5 Production Web Apps',
      salary: 'Avg. ₹4.5 – 11 LPA',
      icon: FaReact,
      color: 'text-cyan-600',
      topGradient: 'from-cyan-500 via-teal-500 to-indigo-600',
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200/90',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      description: 'Build modern full-stack web applications with React 19, Node.js, Express, MongoDB Atlas, TailwindCSS, and cloud CI/CD.',
      skills: ['React 19', 'Node.js', 'Express', 'MongoDB Atlas', 'TailwindCSS', 'REST APIs'],
      highlights: [
        'Modern JavaScript (ES2024) & TypeScript',
        'React 19 State Architecture & Hooks',
        'Node.js REST & GraphQL APIs',
        'MongoDB Atlas Aggregations & JWT Auth'
      ],
      nextBatch: 'Starts Thursday, 06:00 PM IST',
      mentor: '9+ Yrs Exp (Full Stack Lead)'
    },
    cloud: {
      category: 'cloud',
      title: 'AWS Cloud & DevOps Engineering',
      badge: 'Enterprise Infrastructure Standard',
      duration: '3 Months',
      projects: '3 Production Cloud Pipelines',
      salary: 'Avg. ₹6 – 15 LPA',
      icon: FaAws,
      color: 'text-violet-600',
      topGradient: 'from-violet-600 via-purple-600 to-indigo-600',
      iconBg: 'bg-violet-50 text-violet-600 border-violet-200/90',
      badgeColor: 'bg-violet-50 text-violet-800 border-violet-200',
      description: 'Master Linux administration, AWS Solutions Architect suite, Docker containers, Kubernetes clusters, Jenkins, and Terraform.',
      skills: ['AWS Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Linux'],
      highlights: [
        'Linux Administration & Shell Scripting',
        'AWS Cloud (EC2, S3, VPC, IAM, RDS, Route53)',
        'Docker & Kubernetes (EKS) Production Setup',
        'Terraform Infrastructure as Code & CI/CD'
      ],
      nextBatch: 'Starts Next Saturday (Weekend), 10:00 AM',
      mentor: '14+ Yrs Exp (Principal Architect)'
    },
    testing: {
      category: 'fullstack',
      title: 'QA Automation Engineering',
      badge: 'Fast-Track Quality Careers',
      duration: '3 Months',
      projects: '4 Automation Projects',
      salary: 'Avg. ₹4.5 – 10 LPA',
      icon: FaShieldAlt,
      color: 'text-rose-600',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-200/90',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      description: 'Build reliable test automation suites with Java, Selenium, API testing, CI pipelines, and modern quality engineering practices.',
      skills: ['Java', 'Selenium', 'API Testing', 'TestNG', 'Jenkins', 'SQL'],
      highlights: ['Java and Selenium WebDriver Automation', 'API Testing with Postman and Rest Assured', 'Page Object Model and TestNG Frameworks', 'CI Pipelines with Jenkins and Git'],
      nextBatch: 'Starts Tuesday, 07:00 PM IST',
      mentor: '8+ Yrs Exp (QA Automation Lead)'
    },
    data: {
      category: 'ai',
      title: 'Data Engineering with Python',
      badge: 'High-Demand Data Track',
      duration: '3.5 Months',
      projects: '3 Production Data Pipelines',
      salary: 'Avg. ₹6 – 16 LPA',
      icon: FaDatabase,
      color: 'text-teal-600',
      iconBg: 'bg-teal-50 text-teal-600 border-teal-200/90',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      description: 'Learn Python data systems, SQL, Spark, Airflow, cloud storage, and production pipelines used by modern analytics teams.',
      skills: ['Python', 'SQL', 'Apache Spark', 'Airflow', 'AWS', 'ETL Pipelines'],
      highlights: ['Advanced Python and SQL for Data Systems', 'ETL Pipelines with Airflow and Spark', 'Cloud Data Lakes on AWS S3', 'Data Quality, Testing and Observability'],
      nextBatch: 'Starts Friday, 07:30 PM IST',
      mentor: '11+ Yrs Exp (Data Platform Architect)'
    },
    salesforce: {
      category: 'cloud',
      title: 'Salesforce Development',
      badge: 'Enterprise CRM Specialization',
      duration: '3 Months',
      projects: '3 Salesforce Implementations',
      salary: 'Avg. ₹5 – 13 LPA',
      icon: FaCloud,
      color: 'text-sky-600',
      iconBg: 'bg-sky-50 text-sky-600 border-sky-200/90',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      description: 'Build enterprise CRM solutions with Salesforce configuration, Apex, Lightning Web Components, integrations, and deployment.',
      skills: ['Salesforce', 'Apex', 'LWC', 'SOQL', 'REST APIs', 'Flows'],
      highlights: ['Salesforce Admin and Data Model Foundations', 'Apex Classes, Triggers and Test Coverage', 'Lightning Web Components and UI Design', 'Integrations, Security and Deployment'],
      nextBatch: 'Starts Monday, 06:30 PM IST',
      mentor: '9+ Yrs Exp (CRM Technical Lead)'
    },
    servicenow: {
      category: 'cloud',
      title: 'ServiceNow Development',
      badge: 'Digital Workflow Careers',
      duration: '3 Months',
      projects: '3 Workflow Automation Apps',
      salary: 'Avg. ₹5 – 12 LPA',
      icon: FaBriefcase,
      color: 'text-purple-600',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200/90',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      description: 'Create enterprise workflows on ServiceNow with scripting, ITSM, integrations, catalog design, and practical implementation projects.',
      skills: ['ServiceNow', 'ITSM', 'JavaScript', 'GlideScript', 'REST', 'Workflows'],
      highlights: ['ITSM Modules and ServiceNow Administration', 'JavaScript and Glide API Scripting', 'Catalog Items, Flows and Approvals', 'REST Integrations and Update Sets'],
      nextBatch: 'Starts Wednesday, 06:30 PM IST',
      mentor: '10+ Yrs Exp (ServiceNow Architect)'
    }
  };

  // Upcoming Batch Schedules
  const upcomingBatches = [
    {
      course: 'Java Full Stack Development',
      date: 'Next Monday',
      time: '07:30 AM - 09:00 AM IST',
      mode: 'Live Online + Classroom Lab',
      trainerExp: '12+ Years (Ex-TCS Lead)',
      seatsLeft: 4,
      status: 'Admissions Open',
      highlight: 'Top Seller',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      course: 'Python Full Stack & AI',
      date: 'Wednesday',
      time: '07:00 PM - 08:30 PM IST',
      mode: 'Live Interactive Online',
      trainerExp: '10+ Years (Senior AI Architect)',
      seatsLeft: 6,
      status: 'Admissions Open',
      highlight: 'Trending Track',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      course: 'AWS Cloud & DevOps Engineering',
      date: 'Next Saturday (Weekend)',
      time: '10:00 AM - 01:00 PM IST',
      mode: 'Live Labs + Architecture',
      trainerExp: '14+ Years (Principal Architect)',
      seatsLeft: 3,
      status: 'Admissions Open',
      highlight: 'High Package',
      badgeClass: 'bg-violet-100 text-violet-800 border-violet-200'
    },
    {
      course: 'MERN Stack Web Development',
      date: 'Thursday',
      time: '06:00 PM - 07:30 PM IST',
      mode: 'Live Interactive Online',
      trainerExp: '9+ Years (Full Stack Lead)',
      seatsLeft: 5,
      status: 'Admissions Open',
      highlight: 'Product Startups',
      badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200'
    }
  ];

  // Testimonials & Logos
  const testimonials = settings.testimonials || [];
  const alumniLogos = settings.alumniLogos || [];

  const currentHeroSlide = visibleHeroSlides[activeHeroSlide] || visibleHeroSlides[0];

  const statCards = [
    { label: 'Students trained', value: `${stats.studentsCount || 10000}+`, icon: FaUsers, className: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { label: 'Placement rate', value: `${stats.satisfactionRate || 98}%`, icon: FaAward, className: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
    { label: 'Hiring partners', value: '150+', icon: FaBuilding, className: 'bg-amber-50 text-amber-600 border-amber-100' },
    { label: 'Mentors', value: `${stats.instructorsCount || 15}+`, icon: FaUserTie, className: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <SEO 
        title="JVK Technologies – Learn New Technologies, Build Strong Skills & Move Towards Your Dream Job!"
        description="Master Java Full Stack, Python, MERN Stack, Cloud AWS, and DevOps with real-time projects and 100% placement assistance at JVK Technologies Pvt Ltd."
        keywords="JVK Technologies, Java Full Stack training Hyderabad, Python Full Stack, MERN Stack, AWS DevOps, IT training placement, Hyderabad software coaching"
        url="https://jvktechnologies.com"
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F7FB] via-[#F8FAFC] to-[#F0F4FA] pt-6 sm:pt-8 lg:pt-10 pb-16 font-sans">
        {/* Subtle decorative contour waves at bottom-left */}
        <div className="absolute left-0 bottom-0 w-[420px] h-[260px] pointer-events-none opacity-50 overflow-hidden">
          <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-indigo-200/70">
            <path d="M-50 350 C 50 300, 150 260, 200 180 C 250 100, 300 80, 450 60" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3"/>
            <path d="M-50 310 C 60 260, 160 220, 210 140 C 260 60, 310 40, 470 20" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M-50 270 C 70 220, 170 180, 220 100 C 270 20, 320 0, 490 -20" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
            <path d="M-50 230 C 80 180, 180 140, 230 60 C 280 -20, 330 -40, 500 -60" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </div>

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-60 -left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">
            
            {/* Left Content */}
            <div className="w-full lg:w-[48%] flex flex-col items-start text-left">
              
              {/* Badge */}
              <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full bg-[#EDE9FE]/80 px-4 py-1.5 text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#6366F1] shadow-xs border border-indigo-100/70">
                <FaRocket size={13} className="text-[#6366F1] -rotate-12" />
                <span>LEARN · BUILD · GET HIRED</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[2.2rem] font-black leading-[1.1] tracking-tight text-[#0F172A] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]">
                <span className="block">Learn. Build.</span>
                <span className="block text-[#6366F1]">Transform Your Career</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-[500px] text-[15.5px] leading-[1.65] text-[#475569] sm:text-[16.5px] font-medium">
                Master ServiceNow, AI & Java Full Stack with AI through practical, industry-focused training designed to turn your skills into real career opportunities.
              </p>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_25px_rgba(99,102,241,0.38)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaBolt className="text-[#FDE047] text-[14px]" />
                  <span>Book Free Demo</span>
                  <FaArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:${contact.callNumber}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-[15px] font-bold text-[#1E293B] shadow-xs transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  <FaPhoneAlt size={13} className="text-[#6366F1]" />
                  <span>Call: +91-9059519151</span>
                </a>
              </div>

              {/* Badges Below Buttons */}
              <div className="mt-7 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 w-full">
                {[
                  { icon: FaGraduationCap, text: '100% Practical Labs' },
                  { icon: FaUsers, text: 'Dedicated Placement Support' },
                  { icon: FaBriefcase, text: 'Career-focused Mentors' }
                ].map((item, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200/90 bg-white px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-[12px] font-bold text-slate-700 shadow-2xs whitespace-nowrap">
                    <item.icon className="text-[#6366F1] text-[14px]" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Stats Grid (Moved to Left Content) */}
              <div className="mt-8 w-full max-w-[500px] relative z-20">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: stats.studentsCount || 10000, suffix: stats.studentsSuffix || '+', label: 'Engineers Trained', icon: FaUsers, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
                    { value: stats.coursesCount || 20, suffix: stats.coursesSuffix || '+', label: 'Tech Specializations', icon: FaLaptopCode, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100' },
                    { value: stats.satisfactionRate || 98, suffix: '%', label: 'Placement Success', icon: FaAward, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
                    { value: 150, suffix: '+', label: 'Hiring Partners', icon: FaBuilding, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' }
                  ].map((s, idx) => (
                    <div 
                      key={idx} 
                      className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-3 hover:shadow-sm hover:border-indigo-300 hover:bg-white transition-all group text-left"
                    >
                      <div className={`w-8 h-8 shrink-0 rounded-lg ${s.bg} ${s.color} border flex items-center justify-center text-sm group-hover:scale-110 transition-transform`}>
                        <s.icon />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-black text-slate-900 font-['Sora'] leading-none tracking-tight mb-1">
                          <AnimatedCounter from={0} to={s.value} suffix={s.suffix} duration={2} />
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">
                          {s.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile Tech Icons Grid (Visible on small screens) */}
              <div className="mt-10 grid grid-cols-4 gap-3 w-full lg:hidden">
                {[
                  { name: 'Java', icon: FaJava, color: 'text-[#e32d2d]' },
                  { name: 'Python', icon: FaPython, color: 'text-[#3776ab]' },
                  { name: 'React', icon: FaReact, color: 'text-[#00d8ff]' },
                  { name: 'Node.js', icon: FaNodeJs, color: 'text-[#3c873a]' },
                  { name: 'AWS', icon: FaAws, color: 'text-[#ff9900]' },
                  { name: 'Docker', icon: FaDocker, color: 'text-[#0db7ed]' },
                  { name: 'MongoDB', icon: SiMongodb, color: 'text-[#4db33d]' },
                  { name: 'More', icon: null, text: '+' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center py-4 rounded-2xl bg-white shadow-xs border border-slate-100">
                    {item.icon ? (
                       <item.icon className={`text-[26px] mb-1.5 ${item.color}`} />
                    ) : (
                       <div className="text-[26px] mb-1.5 text-[#6366f1] font-bold leading-none">{item.text}</div>
                    )}
                    <span className="text-[11px] font-bold text-slate-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Full 3D Laptop Showcase Graphic */}
            <div className="w-full lg:w-[50%] relative mt-6 lg:mt-0 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[660px]">
                <img 
                  src="/images/hero-showcase.png" 
                  alt="Learn New Technologies - JVK Technologies" 
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Removed Stats Bar from here as it was moved into the left column */}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Trusted technology stack</p>
          </div>
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center py-2">
              {techMarquee.concat(techMarquee).map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className={`mx-3 flex items-center gap-2.5 rounded-2xl border ${tech.bg} px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm shrink-0`}
                >
                  <tech.icon className={`text-xl ${tech.color}`} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center flex flex-col items-center">
            <div className="mb-3 inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#6366F1]">
              <span className="w-8 h-[1.5px] bg-[#6366F1]/50 rounded-full" />
              <span>OUR TECHNOLOGY TRACKS</span>
              <span className="w-8 h-[1.5px] bg-[#6366F1]/50 rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0F172A]">
              Choose Your Path to a Successful Career
            </h2>
            <p className="mt-3.5 max-w-2xl text-[16px] text-slate-600 font-medium">
              Industry-aligned curriculum designed by experts to help you gain in-demand skills
            </p>

            <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-200/80 p-1.5">
              {[
                { id: 'all', label: 'All tracks' },
                { id: 'fullstack', label: 'Full stack' },
                { id: 'ai', label: 'Python & AI' },
                { id: 'cloud', label: 'Cloud & DevOps' },
                { id: 'servicenow', label: 'ServiceNow' },
                { id: 'salesforce', label: 'Salesforce' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter((course) => {
                 if (activeTab === 'all') return true;
                 const title = (course.title || '').toLowerCase();
                 const cat = (course.category || '').toLowerCase();
                 if (activeTab === 'fullstack' && (title.includes('full stack') || cat.includes('stack'))) return true;
                 if (activeTab === 'ai' && (title.includes('python') || title.includes('ai') || cat.includes('ai'))) return true;
                 if (activeTab === 'cloud' && (title.includes('cloud') || title.includes('devops') || cat.includes('cloud'))) return true;
                 if (activeTab === 'servicenow' && title.includes('servicenow')) return true;
                 if (activeTab === 'salesforce' && title.includes('salesforce')) return true;
                 return false;
              })
              .slice(0, 6)
              .map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isEnrolled={false}
                isWishlisted={false}
                onClick={() => navigate(`/courses/${course.slug || course._id}`)}
              />
            ))}
            {courses.length === 0 && (
              <div className="col-span-full py-10 text-center text-slate-500">
                No courses available at the moment.
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link to="/courses" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600">
              Explore all courses
              <FaArrowRight size={12} className="text-indigo-600" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700">
              <FaRocket /> Our learning system
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{t('home_how_title')}</h2>
            <p className="mt-3 text-base text-slate-600">{t('home_how_sub')}</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { step: '01', title: t('home_step1_title'), desc: t('home_step1_desc'), icon: FaCode, color: 'from-blue-500 to-indigo-600' },
              { step: '02', title: t('home_step2_title'), desc: t('home_step2_desc'), icon: FaServer, color: 'from-indigo-500 to-violet-600' },
              { step: '03', title: t('home_step3_title'), desc: t('home_step3_desc'), icon: FaCloud, color: 'from-cyan-500 to-blue-600' },
              { step: '04', title: t('home_step4_title'), desc: t('home_step4_desc'), icon: FaBriefcase, color: 'from-amber-500 to-orange-600' }
            ].map((item) => (
              <div key={item.step} className="group relative rounded-[28px] border border-slate-200 bg-slate-50 p-7 shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-all hover:-translate-y-1 hover:border-indigo-200 hover:bg-white">
                <div className="absolute right-4 top-4 text-5xl font-black text-slate-200">{item.step}</div>
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-2xl text-white shadow-lg`}>
                  <item.icon />
                </div>
                <h3 className="relative z-10 text-xl font-black text-slate-900">{item.title}</h3>
                <p className="relative z-10 mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="placements" className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600">Corporate hiring network</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{t('home_trusted')}</h2>
          </div>

          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex items-center whitespace-nowrap py-2">
              {alumniLogos.concat(alumniLogos).map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="mx-3 flex shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm w-[200px] h-[90px] transition-all hover:shadow-md hover:border-indigo-100"
                >
                  {partner.logoUrl ? <img src={partner.logoUrl} alt={partner.name} className="h-full w-full object-contain" /> : <span className="text-sm font-bold uppercase tracking-[0.14em] text-slate-800 text-center">{partner.name}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-slate-600">
            Over <strong className="text-slate-950">10,000+ engineers</strong> placed across top product and IT companies with salaries from <strong className="text-indigo-600">4.5 LPA to 14+ LPA</strong>.
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700">
              <FaStar className="text-amber-500" /> Student success stories
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Real placements. Real careers.</h2>
            <p className="mt-3 text-base text-slate-600">Hear directly from our alumni who turned learning into job opportunities.</p>
          </div>

          <div className="mt-14 relative flex overflow-x-hidden group">
            <div className="animate-marquee flex items-stretch gap-6 py-4 hover:[animation-play-state:paused]">
              {testimonials.concat(testimonials).map((t, idx) => (
                <div key={`${t.name}-${idx}`} className="flex w-[350px] shrink-0 flex-col rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-[0_10px_30px_rgba(15,23,42,0.02)] transition-all hover:-translate-y-1 hover:border-indigo-200 hover:bg-white whitespace-normal">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (<FaStar key={i} />))}
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">{t.package}</span>
                  </div>

                  <p className="flex-1 text-base leading-8 text-slate-600 italic">“{t.content}”</p>

                  <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-5">
                    <div className="flex h-12 w-12 shrink-0 overflow-hidden items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-sm font-black text-white">
                      {t.imageUrl ? (
                        <img src={t.imageUrl} alt={t.name} className="h-full w-full object-cover" />
                      ) : (
                        t.initials || t.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{t.name}</h4>
                      <p className="text-xs font-semibold text-indigo-600">{t.role}</p>
                      <p className="text-[11px] text-slate-500">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700">
              <FaAward /> The JVK advantage
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{t('home_why_title')}</h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { title: 'Career-Focused Training', desc: 'JVK Technologies is a career-focused technology training platform specializing in ServiceNow, AI, and Java Full Stack with AI.', icon: FaLaptopCode, bg: 'bg-indigo-100 text-indigo-600 border-indigo-200' },
              { title: 'Industry-Ready Professionals', desc: 'We provide practical, project-based training, real-time scenarios, interview preparation, career guidance, and placement assistance to build industry-ready professionals.', icon: FaUserTie, bg: 'bg-amber-100 text-amber-600 border-amber-200' },
              { title: 'Our Mission', desc: 'Our mission is to transform Learning into Skills, Skills into Confidence, and Confidence into Career Opportunities.', icon: FaAward, bg: 'bg-emerald-100 text-emerald-600 border-emerald-200' }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${item.bg} text-xl`}>
                  <item.icon />
                </div>
                <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 py-16 text-white">
        <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-50">
            <FaBolt className="text-amber-300" /> Next batch starts this week
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">{t('home_cta_title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-indigo-100 sm:text-base">{t('home_cta_sub')}</p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`tel:${contact.callNumber}`} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-indigo-900 shadow-lg transition-all hover:bg-slate-50 hover:-translate-y-0.5 sm:w-auto">
              <FaPhoneAlt />
              Call Admissions: {contact.callNumber}
            </a>

            <a href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20would%20like%20to%20join%20the%20next%20batch.`} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-emerald-600 hover:-translate-y-0.5 sm:w-auto">
              <FaWhatsapp size={16} />
              Chat on WhatsApp
            </a>
          </div>

          <p className="mt-5 text-[11px] text-indigo-200">📍 {contact.address}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
