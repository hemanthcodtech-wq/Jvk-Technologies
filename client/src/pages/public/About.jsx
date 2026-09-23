import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { 
  FaLaptopCode, FaAward, FaUsers, FaGlobe, 
  FaBookOpen, FaShieldAlt, FaArrowRight,
  FaCheckCircle, FaServer, FaCloud, FaPhoneAlt, FaWhatsapp,
  FaRocket, FaUserTie, FaBuilding, FaGraduationCap, FaQuoteLeft,
  FaClock, FaCode, FaHeart, FaCompass, FaLightbulb, FaBriefcase
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import SEO from '../../components/common/SEO';

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

const About = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { stats: siteStats, contact } = settings;
  const cleanWhatsapp = (contact.whatsappNumber || '9059519151').replace(/[^0-9]/g, '');

  const stats = [
    { value: siteStats.studentsCount || 10000, suffix: siteStats.studentsSuffix || '+', label: 'Engineers Trained', icon: FaUsers, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { value: siteStats.coursesCount || 20, suffix: siteStats.coursesSuffix || '+', label: 'Tech Specializations', icon: FaLaptopCode, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100' },
    { value: siteStats.satisfactionRate || 98, suffix: '%', label: 'Placement Success Rate', icon: FaAward, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
    { value: 150, suffix: '+', label: 'Hiring MNC Partners', icon: FaBuilding, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' }
  ];

  const pillars = [
    {
      title: t('about_pillar1_title'),
      desc: t('about_pillar1_desc'),
      icon: FaLaptopCode,
      color: 'bg-blue-600 text-white'
    },
    {
      title: t('about_pillar2_title'),
      desc: t('about_pillar2_desc'),
      icon: FaUserTie,
      color: 'bg-indigo-600 text-white'
    },
    {
      title: t('about_pillar3_title'),
      desc: t('about_pillar3_desc'),
      icon: FaServer,
      color: 'bg-cyan-600 text-white'
    },
    {
      title: t('about_pillar4_title'),
      desc: t('about_pillar4_desc'),
      icon: FaAward,
      color: 'bg-amber-600 text-white'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Academy Founded in Hyderabad',
      desc: 'Started with an uncompromising vision: replace theoretical textbook IT tuition with 100% hands-on corporate coding labs.'
    },
    {
      year: '2022',
      title: '2,500+ Engineers Placed',
      desc: 'Expanded into specialized Java Full Stack, Spring Boot Microservices, and Cloud AWS with our first dedicated placement drives.'
    },
    {
      year: '2024',
      title: '100+ Corporate Hiring Partners',
      desc: 'Top MNCs including TCS, Infosys, Accenture, and Cognizant onboarded JVK as an active talent recruitment partner.'
    },
    {
      year: '2026',
      title: '10,000+ Alumni Community',
      desc: 'Producing industry-ready software engineers commanding average packages of ₹4.5 LPA to ₹14+ LPA across India.'
    }
  ];

  const coreValues = [
    {
      title: "Practicality Over Theory",
      desc: "Every concept is taught with an open IDE, real Git repos, live database queries, and architectural debugging.",
      icon: FaCode,
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-100"
    },
    {
      title: "1-on-1 Dedicated Mentorship",
      desc: "Small batch sizes and accessible corporate mentors ensure no student gets left behind in complex topics.",
      icon: FaUserTie,
      color: "text-cyan-600",
      bg: "bg-cyan-50 border-cyan-100"
    },
    {
      title: "Career Ownership",
      desc: "We don't just teach code—we build resumes, conduct technical mock interviews, and refine professional soft skills.",
      icon: FaBriefcase,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100"
    },
    {
      title: "Uncompromising Integrity",
      desc: "Transparent curriculum, honest placement tracking, and genuine industry connections with zero empty marketing promises.",
      icon: FaShieldAlt,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100"
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen selection:bg-indigo-600 selection:text-white font-sans">
      <SEO 
        title="About JVK Technologies Pvt Ltd | Premier Software Training & Placements Hyderabad"
        description="Learn New Technologies, Build Strong Skills, and Move Towards Your Dream Job! JVK Technologies Pvt Ltd provides world-class IT training with 100% placement support in Hyderabad."
        keywords="About JVK Technologies, IT training institute Hyderabad, Java training, Python course, software placements, Ameerpet software coaching"
        url="https://jvktechnologies.com/about"
      />

      {/* ========================================================================= */}
      {/* 🚀 HERO SECTION (Light Theme with Soft Ambient Glow)                     */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/80">
        {/* Soft Ambient Radial Accents */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-indigo-200/35 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-indigo-200/90 text-indigo-700 font-sans text-xs md:text-sm font-bold tracking-wide mb-6 shadow-xs"
          >
            <FaRocket className="text-amber-500" />
            <span>{t('about_tagline_badge')}</span>
            <HiSparkles className="text-cyan-500" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black font-['Sora'] text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-[1.12]"
          >
            Empowering Next-Gen Engineers to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Build Real-World Tech
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-10"
          >
            {t('about_subtitle')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a 
              href={`tel:${contact.callNumber}`} 
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold font-['Sora'] text-sm md:text-base transition-all shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 flex items-center gap-2.5"
            >
              <FaPhoneAlt size={14} className="text-white" />
              <span>Call Admissions: {contact.callNumber}</span>
            </a>

            <a 
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20JVK%20Technologies,%20I%20would%20like%20to%20learn%20more%20about%20your%20training%20methodology.`} 
              target="_blank" 
              rel="noreferrer" 
              className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-400 text-slate-800 font-bold font-['Sora'] text-sm md:text-base transition-all flex items-center gap-2.5 shadow-xs"
            >
              <FaWhatsapp size={18} className="text-emerald-600" />
              <span>WhatsApp Career Counselor</span>
            </a>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📊 STATS COUNTER BAR (Light Theme)                                       */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 text-center hover:shadow-lg hover:border-indigo-300 hover:bg-white transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} border flex items-center justify-center text-xl mx-auto mb-3.5 group-hover:scale-110 transition-transform`}>
                  <s.icon />
                </div>
                <div className="text-3xl md:text-4xl font-black text-slate-900 font-['Sora'] mb-1 tracking-tight">
                  <AnimatedCounter from={0} to={s.value} suffix={s.suffix} duration={2} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎯 CORE PHILOSOPHY & MISSION/VISION (Light Theme)                        */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Philosophy (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider font-mono">
              <FaShieldAlt /> {t('about_philosophy_badge')}
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
              {t('about_philosophy_heading')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {t('about_philosophy_desc')}
            </p>

            {/* Quote block */}
            <div className="p-6 rounded-3xl bg-indigo-50/80 border-l-4 border-indigo-600 border-y border-r border-indigo-100 text-slate-800 font-medium italic text-sm md:text-base leading-relaxed relative">
              <FaQuoteLeft className="text-indigo-400 text-2xl mb-2" />
              <p>{t('about_core_quote')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <FaCheckCircle className="text-emerald-600 shrink-0" />
                <span>Zero theoretical cramming</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <FaCheckCircle className="text-emerald-600 shrink-0" />
                <span>Production cloud labs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <FaCheckCircle className="text-emerald-600 shrink-0" />
                <span>MNC Tech Lead faculty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <FaCheckCircle className="text-emerald-600 shrink-0" />
                <span>100% Placement assistance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mission & Vision Cards (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 hover:border-indigo-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-4 border border-indigo-100 group-hover:scale-110 transition-transform">
                <FaCompass />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-['Sora'] mb-3 flex items-center gap-2">
                <span>{t('mission_title')}</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {t('mission_p1')}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t('mission_p2')}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 hover:border-amber-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-4 border border-amber-100 group-hover:scale-110 transition-transform">
                <FaLightbulb />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-['Sora'] mb-3 flex items-center gap-2">
                <span>{t('vision_title')}</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {t('vision_p1')}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t('vision_p2')}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🚀 THE 4 PILLARS OF JVK TRAINING (Light Theme)                           */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              <FaAward /> Educational Excellence
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] mb-3 tracking-tight">
              The 4 Pillars of JVK Training
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Designed from ground up to turn complete beginners and job seekers into industry-ready software engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 p-7 rounded-3xl border border-slate-200/90 hover:border-indigo-400 hover:bg-white transition-all duration-300 group shadow-xs hover:shadow-xl flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${pillar.color} flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                    <pillar.icon />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Sora'] mb-3 group-hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧭 OUR MILESTONES & JOURNEY TIMELINE (Light Theme)                        */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
            <FaClock /> Growth & Legacy
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
            Our Journey of Impact
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            From our founding days in Hyderabad to establishing a nationwide alumni presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {milestones.map((m, idx) => (
            <div 
              key={idx}
              className="bg-white p-7 rounded-3xl border border-slate-200/90 hover:border-cyan-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl relative group"
            >
              <div className="text-3xl font-black text-indigo-600 font-mono mb-2">
                {m.year}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Sora'] mb-2">
                {m.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 💡 CORE VALUES & PRINCIPLES (Light Theme)                                */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              <FaHeart /> What Drives Us
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-['Sora'] tracking-tight">
              Our Core Institutional Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all shadow-xs hover:shadow-lg group"
              >
                <div className={`w-12 h-12 rounded-2xl ${val.bg} ${val.color} border flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <val.icon />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Sora'] mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎓 LEADERSHIP / FOUNDER VISION (Light Theme)                              */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-8 md:p-14 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
          
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mx-auto mb-8 border border-indigo-100 shadow-xs">
            <FaGraduationCap />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-slate-800 font-medium italic leading-relaxed mb-8 max-w-2xl mx-auto">
            "{t('about_founder_quote')}"
          </p>

          <h4 className="text-xl font-black text-slate-900 font-['Sora']">
            JVK Technologies Mentorship & Leadership Team
          </h4>
          <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mt-1.5 font-mono">
            {t('about_founder_role')}
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🚀 BOTTOM CTA (Light Gradient Theme)                                     */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h3 className="text-3xl md:text-5xl font-black font-['Sora'] mb-4 tracking-tight drop-shadow-sm">
            {t('about_cta_title')}
          </h3>
          <p className="text-sm md:text-base text-indigo-100 mb-8 max-w-xl mx-auto leading-relaxed">
            {t('about_cta_sub')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/courses" 
              className="px-8 py-4 rounded-2xl bg-white text-indigo-900 hover:bg-slate-50 font-black font-['Sora'] text-sm md:text-base shadow-xl transition-all"
            >
              {t('about_cta_btn1')}
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 rounded-2xl bg-indigo-800/80 hover:bg-indigo-800 text-white font-bold font-['Sora'] text-sm md:text-base border border-indigo-400/40 transition-all shadow-lg"
            >
              {t('about_cta_btn2')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
