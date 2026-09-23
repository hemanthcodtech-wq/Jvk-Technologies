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
  FaDesktop, FaCheck
} from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiPostgresql, SiKubernetes, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi2';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
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
  const [activePathway, setActivePathway] = useState('java');
  const [activeTab, setActiveTab] = useState('all');

  const { stats, contact } = settings;
  const cleanWhatsapp = (contact.whatsappNumber || '9059519151').replace(/[^0-9]/g, '');

  // Tech stack items for marquee
  const techMarquee = [
    { name: 'Java 21 & Spring Boot 3', icon: FaJava, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { name: 'Microservices & Kafka', icon: SiSpringboot, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    { name: 'Python & FastAPI', icon: FaPython, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    { name: 'React 19 & Next.js', icon: FaReact, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-200' },
    { name: 'TypeScript & Node.js', icon: SiTypescript, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
    { name: 'AWS Cloud Architecture', icon: FaAws, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { name: 'Docker & Kubernetes', icon: FaDocker, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
    { name: 'PostgreSQL & MongoDB', icon: SiPostgresql, color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200' }
  ];

  // Top hiring partners
  const hiringPartners = [
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

  // Testimonials
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      company: "Tata Consultancy Services",
      package: "₹7.2 LPA",
      initials: "RS",
      gradient: "from-blue-600 to-indigo-600",
      content: "The real-time Spring Boot microservices project helped me crack the TCS technical interview on my first attempt. The mentors explained internals that no college ever covered."
    },
    {
      name: "Sneha Reddy",
      role: "Associate Cloud Engineer",
      company: "Accenture",
      package: "₹6.8 LPA",
      initials: "SR",
      gradient: "from-violet-600 to-purple-600",
      content: "Coming from a non-IT background, JVK's step-by-step practical labs, daily coding challenges, and mock interviews changed my career trajectory completely."
    },
    {
      name: "Vikram Naidu",
      role: "Full Stack Developer",
      company: "Cognizant",
      package: "₹8.5 LPA",
      initials: "VN",
      gradient: "from-amber-500 to-orange-600",
      content: "Real production labs and GitHub reviews were the game changer. In the interview, I demonstrated my live deployed apps on AWS. I received 3 offers through JVK placement drives."
    }
  ];

  const currentPathway = pathwayData[activePathway];

  return (
    <div className="bg-[#f8fafc] text-slate-900 overflow-hidden min-h-screen selection:bg-indigo-600 selection:text-white font-sans">
      <SEO 
        title="JVK Technologies – Learn New Technologies, Build Strong Skills & Move Towards Your Dream Job!"
        description="Master Java Full Stack, Python, MERN Stack, Cloud AWS, and DevOps with real-time projects and 100% placement assistance at JVK Technologies Pvt Ltd."
        keywords="JVK Technologies, Java Full Stack training Hyderabad, Python Full Stack, MERN Stack, AWS DevOps, IT training placement, Hyderabad software coaching"
        url="https://jvktechnologies.com"
      />

      {/* ========================================================================= */}
      {/* 🚀 NEW FORMAT: SPLIT HERO SECTION WITH INTERACTIVE PATHWAY PREVIEW         */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-slate-50">
        
        {/* Soft Ambient Radial Lights (Light Theme) */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-sky-200/35 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines, Pathway Quick Selector & Primary CTAs (7 Cols) */}
            <div className="lg:col-span-7 text-center lg:text-left">
              
              {/* Top Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-indigo-200/80 text-indigo-700 font-sans text-xs md:text-sm font-bold tracking-wide mb-6 shadow-sm"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                </span>
                <span>{t('hero_badge')}</span>
                <HiSparkles className="text-amber-500 text-sm" />
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black font-['Sora'] text-slate-900 tracking-tight leading-[1.14] mb-6"
              >
                {t('hero_title_1')}{' '}
                <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  <TypewriterText text={t('hero_title_2')} />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 font-normal mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                {t('hero_subtitle')}
              </motion.p>

              {/* Interactive Pathway Selector Tabs in Hero */}
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center lg:justify-start gap-2">
                  <FaLaptopCode className="text-indigo-600" />
                  <span>Select Your Career Goal to Preview:</span>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {[
                    { id: 'java', label: 'Java Full Stack', icon: FaJava },
                    { id: 'python', label: 'Python & AI', icon: FaPython },
                    { id: 'mern', label: 'MERN Stack', icon: FaReact },
                    { id: 'cloud', label: 'Cloud & DevOps', icon: FaAws }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePathway(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all font-['Sora'] cursor-pointer ${
                        activePathway === tab.id
                          ? 'bg-indigo-600 text-white shadow-md scale-105'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                    >
                      <tab.icon size={13} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
              >
                {/* Book Free Demo Button */}
                <a 
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20want%20to%20reserve%20a%20seat%20for%20the%20Free%20Live%20Demo%20Session.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold font-['Sora'] text-base md:text-lg shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
                >
                  <FaBolt className="text-amber-300 animate-pulse" />
                  <span>{t('hero_start')}</span>
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Call Helpline */}
                <a 
                  href={`tel:${contact.callNumber}`} 
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold font-['Sora'] text-base transition-all duration-300 border border-slate-300 hover:border-indigo-400 flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <FaPhoneAlt size={14} className="text-indigo-600" />
                  <span>{t('hero_call_now')}</span>
                </a>

                {/* WhatsApp Trigger */}
                <a 
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20please%20share%20all%20course%20details%20and%20fee%20structure.`}
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-200"
                >
                  <FaWhatsapp size={18} className="text-emerald-600" />
                  <span>{t('hero_whatsapp')}</span>
                </a>
              </motion.div>

              {/* Social Proof Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                  <FaCheckCircle className="text-emerald-600" />
                  <span className="font-semibold">100% Practical Labs</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                  <FaAward className="text-amber-500" />
                  <span className="font-semibold">Dedicated Placement Cell</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                  <FaBuilding className="text-blue-600" />
                  <span className="font-semibold">150+ Hiring MNCs</span>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Spotlight Card for Selected Pathway (5 Cols) */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activePathway}
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 md:p-7 relative overflow-hidden"
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {currentPathway.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <FaClock className="text-amber-500" /> {currentPathway.duration}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                      <currentPathway.icon className={currentPathway.color} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 font-['Sora'] leading-snug">
                        {currentPathway.title}
                      </h3>
                      <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                        <FaAward /> Avg Package: {currentPathway.salary}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {currentPathway.description}
                  </p>

                  {/* Modules Check List */}
                  <div className="space-y-2.5 mb-6 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      What You Will Master:
                    </div>
                    {currentPathway.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <FaCheck className="text-indigo-600 text-xs shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Batch & Mentor Info */}
                  <div className="grid grid-cols-2 gap-3 text-xs mb-6 pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Upcoming Cohort:</span>
                      <strong className="text-slate-900 text-xs">{currentPathway.nextBatch}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Lead Faculty:</span>
                      <strong className="text-indigo-700 text-xs">{currentPathway.mentor}</strong>
                    </div>
                  </div>

                  {/* Spotlight CTA */}
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20please%20send%20me%20the%20detailed%20syllabus%20and%20demo%20timing%20for%20${encodeURIComponent(currentPathway.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-105 text-white font-bold text-xs font-['Sora'] shadow-md transition-all"
                  >
                    <span>Get Syllabus & Attend Free Demo</span>
                    <FaArrowRight size={10} />
                  </a>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Dynamic Platform Stats with Crisp White Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-indigo-300 transition-all text-center group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 text-xl border border-indigo-100 group-hover:scale-110 transition-transform">
                <FaUsers />
              </div>
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 font-['Sora'] tracking-tight">
                <AnimatedCounter from={0} to={stats.studentsCount || 10000} suffix={stats.studentsSuffix || '+'} duration={2.5} />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Students Trained
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-cyan-300 transition-all text-center group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3 text-xl border border-cyan-100 group-hover:scale-110 transition-transform">
                <FaAward />
              </div>
              <div className="text-3xl md:text-4xl font-black text-cyan-600 mb-1 font-['Sora'] tracking-tight">
                <AnimatedCounter from={0} to={stats.satisfactionRate || 98} suffix={stats.satisfactionSuffix || '%'} duration={2} />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Placement Success
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-amber-300 transition-all text-center group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 text-xl border border-amber-100 group-hover:scale-110 transition-transform">
                <FaBuilding />
              </div>
              <div className="text-3xl md:text-4xl font-black text-amber-600 mb-1 font-['Sora'] tracking-tight">
                <AnimatedCounter from={0} to={150} suffix="+" duration={2} />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Hiring MNC Partners
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-300 transition-all text-center group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl border border-emerald-100 group-hover:scale-110 transition-transform">
                <FaUserTie />
              </div>
              <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1 font-['Sora'] tracking-tight">
                <AnimatedCounter from={0} to={stats.instructorsCount || 15} suffix={stats.instructorsSuffix || '+'} duration={2} />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Corporate Mentors
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* ⚡ HOT TECH STACK INFINITE MARQUEE (Light Theme)                         */}
      {/* ========================================================================= */}
      <section className="py-6 bg-white border-y border-slate-200/80 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            Industry-Demanded Stacks Taught with Real-World Production Architecture
          </p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center py-2">
            {techMarquee.concat(techMarquee).map((tech, index) => (
              <div 
                key={index} 
                className={`mx-3 px-5 py-2.5 rounded-2xl ${tech.bg} border flex items-center gap-2.5 text-slate-800 text-sm font-semibold hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer shrink-0`}
              >
                <tech.icon className={`text-xl ${tech.color}`} />
                <span className="font-['Sora']">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎯 SPECIALIZED SOFTWARE ENGINEERING TRACKS GRID (Light Theme)            */}
      {/* ========================================================================= */}
      <section id="programs" className="py-24 relative bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
                <FaLaptopCode /> Curated Job-Ready Curricula
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
                Specialized Software Engineering Tracks
              </h2>
              <p className="text-slate-600 font-normal text-base mt-2 max-w-xl">
                Structured step-by-step from core syntax fundamentals to production cloud microservices and cracking MNC technical rounds.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/80">
              {[
                { id: 'all', label: 'All Tracks' },
                { id: 'fullstack', label: 'Full Stack' },
                { id: 'ai', label: 'Python & AI' },
                { id: 'cloud', label: 'Cloud & DevOps' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all font-['Sora'] cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.values(pathwayData)
              .filter(track => activeTab === 'all' || track.category === activeTab)
              .map((track, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgba(99,102,241,0.10)] transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                  {/* Card Top: Icon + Title */}
                  <div className="p-6 flex flex-col flex-1">

                    {/* Icon & Badge Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-11 h-11 rounded-xl ${track.iconBg} border flex items-center justify-center text-xl shrink-0`}>
                        <track.icon />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${track.badgeColor}`}>
                        {track.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 font-['Sora'] leading-snug mb-1 group-hover:text-indigo-600 transition-colors">
                      {track.title}
                    </h3>

                    {/* Salary Tag */}
                    <p className="text-xs text-indigo-600 font-semibold mb-4">{track.salary}</p>

                    {/* Divider */}
                    <div className="border-t border-slate-100 mb-4" />

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {track.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 flex-1">
                      {track.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                          <FaCheck className="text-indigo-400 text-[10px] mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-5 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <FaUserTie size={11} />
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium leading-tight">{track.mentor}</span>
                    </div>
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20please%20send%20me%20the%20detailed%20syllabus%20and%20demo%20timing%20for%20${encodeURIComponent(track.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs font-['Sora'] transition-colors"
                    >
                      Get Syllabus & Demo
                      <FaArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 text-slate-800 hover:text-indigo-600 font-['Sora'] font-bold text-sm transition-all shadow-sm"
            >
              <span>Explore All 20+ Tech Courses & Specializations</span>
              <FaArrowRight size={12} className="text-indigo-600" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📅 UPCOMING BATCHES & FREE DEMO SCHEDULE (Light Theme Table Board)       */}
      {/* ========================================================================= */}
      <section id="batches" className="py-24 relative bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              <FaCalendarAlt /> Live Schedule 2026
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
              Upcoming Batches & Free Demo Sessions
            </h2>
            <p className="text-slate-600 font-normal text-base mt-2">
              Attend a free interactive demo class led by senior MNC software leads before you enroll. Ask questions live and inspect the curriculum.
            </p>
          </div>

          {/* Batches Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBatches.map((batch, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 hover:border-indigo-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${batch.badgeClass}`}>
                      {batch.highlight}
                    </span>
                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5 animate-pulse bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      <FaBolt /> Only {batch.seatsLeft} Seats Left
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-slate-900 font-['Sora'] mb-4">
                    {batch.course}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[11px] mb-0.5">Start Date:</span>
                      <strong className="text-slate-900 text-xs">{batch.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] mb-0.5">Daily Timing:</span>
                      <strong className="text-amber-700 text-xs">{batch.time}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] mb-0.5">Training Mode:</span>
                      <strong className="text-indigo-600 text-xs">{batch.mode}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] mb-0.5">Mentor Profile:</span>
                      <strong className="text-emerald-700 text-xs">{batch.trainerExp}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20want%20to%20reserve%20a%20seat%20for%20the%20upcoming%20batch%20of%20${encodeURIComponent(batch.course)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-slate-950 font-black font-['Sora'] text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <FaBolt />
                    <span>Reserve Free Demo Seat</span>
                  </a>

                  <a
                    href={`tel:${contact.callNumber}`}
                    className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-600 hover:text-white text-indigo-700 transition-all shadow-xs"
                    title="Call for batch confirmation"
                  >
                    <FaPhoneAlt size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Counselor Bar */}
          <div className="mt-12 p-6 rounded-3xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <FaPhoneAlt size={18} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-['Sora']">Need a customized batch timing or 1-on-1 career counseling?</h4>
                <p className="text-xs text-slate-600">Our senior career mentors are available every day from 8:00 AM to 8:00 PM IST.</p>
              </div>
            </div>
            <a
              href={`tel:${contact.callNumber}`}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs font-['Sora'] shrink-0 transition-colors shadow-sm"
            >
              Call {contact.callNumber}
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🚀 4-STAGE LEARNING-TO-PLACEMENT ARCHITECTURE (Light Theme)             */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              <FaRocket /> Step-By-Step Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
              {t('home_how_title')}
            </h2>
            <p className="text-slate-600 font-normal text-base mt-2">
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
                className="bg-white p-7 rounded-3xl border border-slate-200/90 hover:border-indigo-400 transition-all relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl"
              >
                <div className="text-5xl font-black text-slate-100 font-['Sora'] absolute top-4 right-4 group-hover:text-slate-200 transition-colors">
                  {s.step}
                </div>
                <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                  <s.icon />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Sora'] mb-2.5">
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
      {/* 💼 TOP HIRING MNC PARTNERS (Light Theme)                                 */}
      {/* ========================================================================= */}
      <section id="placements" className="py-20 bg-white border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1 font-mono">
            Corporate Hiring Network
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-['Sora']">
            {t('home_trusted')}
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative flex overflow-x-hidden mb-6">
          <div className="animate-marquee whitespace-nowrap flex items-center py-2">
            {hiringPartners.concat(hiringPartners).map((partner, index) => (
              <div 
                key={index} 
                className="mx-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-['Sora'] font-bold text-xs md:text-sm tracking-wider uppercase hover:border-indigo-400 hover:text-indigo-600 hover:bg-white transition-all cursor-pointer shrink-0 shadow-xs flex items-center gap-2"
              >
                <FaBuilding className="text-indigo-600 text-xs" />
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="max-w-4xl mx-auto px-4 mt-4 text-center">
          <p className="text-xs md:text-sm text-slate-600">
            ⭐ Over <strong className="text-slate-900 font-bold">10,000+ engineers</strong> placed across Tier-1 product and IT MNCs with salary packages ranging from <strong className="text-indigo-600">4.5 LPA to 14+ LPA</strong>.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 STUDENT SUCCESS STORIES & TESTIMONIALS (Light Theme)                  */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              <FaStar className="text-amber-500" /> Student Hall of Fame
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
              Real Placements, Real Careers
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Hear directly from our alumni who landed their dream software engineering roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-3xl border border-slate-200/90 hover:border-indigo-400 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t.package}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${t.gradient} text-white font-['Sora'] font-black flex items-center justify-center text-sm shadow-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-['Sora']">{t.name}</h4>
                    <p className="text-xs text-indigo-600 font-medium">{t.role}</p>
                    <p className="text-[11px] text-slate-500">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 WHY CHOOSE JVK TECHNOLOGIES (Light Theme)                              */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              <FaAward /> The JVK Advantage
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
              {t('home_why_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all hover:-translate-y-1.5 text-center group shadow-xs hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform border border-indigo-200">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Sora'] mb-3">
                {t('home_why1_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home_why1_desc')}
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-amber-400 hover:bg-white transition-all hover:-translate-y-1.5 text-center group shadow-xs hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform border border-amber-200">
                <FaLaptopCode />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Sora'] mb-3">
                {t('home_why2_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home_why2_desc')}
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-emerald-400 hover:bg-white transition-all hover:-translate-y-1.5 text-center group shadow-xs hover:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform border border-emerald-200">
                <FaAward />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Sora'] mb-3">
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
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider mb-5 border border-white/30">
            <FaBolt className="text-amber-300" /> Next Cohort Starts This Week
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 text-white font-['Sora'] drop-shadow-sm">
            {t('home_cta_title')}
          </h2>

          <p className="text-base md:text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('home_cta_sub')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`tel:${contact.callNumber}`} 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-indigo-900 font-black font-['Sora'] text-base shadow-xl transition-all flex items-center justify-center gap-2.5"
            >
              <FaPhoneAlt />
              <span>Call Admissions: {contact.callNumber}</span>
            </a>

            <a 
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20would%20like%20to%20join%20the%20next%20batch.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black font-['Sora'] text-base shadow-xl transition-all flex items-center justify-center gap-2.5"
            >
              <FaWhatsapp size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-indigo-200 mt-7 flex items-center justify-center gap-2">
            <span>📍 Campus Location:</span> <strong>{contact.address}</strong>
          </p>

        </div>
      </section>

    </div>
  );
};

export default Home;
