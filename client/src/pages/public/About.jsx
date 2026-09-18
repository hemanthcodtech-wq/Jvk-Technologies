import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FaLaptopCode, FaAward, FaUsers, FaGlobe, 
  FaBookOpen, FaShieldAlt, FaArrowRight,
  FaCheckCircle, FaServer, FaCloud, FaPhoneAlt, FaWhatsapp,
  FaRocket, FaUserTie, FaBuilding, FaGraduationCap
} from 'react-icons/fa';
import SEO from '../../components/common/SEO';

const About = () => {
  const { t } = useLanguage();

  const [siteStats, setSiteStats] = useState({
    studentsCount: 10000,
    studentsSuffix: '+',
    coursesCount: 20,
    coursesSuffix: '+',
    lineageRate: 98,
    lineageSuffix: '%',
    communitiesCount: 150,
    communitiesSuffix: '+'
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/settings/stats`)
      .then(res => {
        if (res.data.success && res.data.data) {
          setSiteStats(prev => ({
            ...prev,
            ...res.data.data
          }));
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    { value: `${(siteStats.studentsCount || 10000).toLocaleString('en-IN')}${siteStats.studentsSuffix || '+'}`, label: 'Students Trained', icon: FaUsers },
    { value: `${siteStats.coursesCount || 20}${siteStats.coursesSuffix || '+'}`, label: 'Tech Specializations', icon: FaLaptopCode },
    { value: `${siteStats.lineageRate || 98}%`, label: 'Placement Success Rate', icon: FaAward },
    { value: `${siteStats.communitiesCount || 150}+`, label: 'Hiring MNC Partners', icon: FaBuilding }
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
      color: 'bg-amber-600 text-white'
    },
    {
      title: t('about_pillar4_title'),
      desc: t('about_pillar4_desc'),
      icon: FaAward,
      color: 'bg-emerald-600 text-white'
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
      <SEO 
        title="About JVK Technologies Pvt Ltd | Premier Software Training & Placements"
        description="Learn New Technologies, Build Strong Skills, and Move Towards Your Dream Job! JVK Technologies Pvt Ltd provides world-class IT training with 100% placement support in Hyderabad."
        keywords="About JVK Technologies, IT training institute Hyderabad, Java training, Python course, software placements"
        url="https://jvktechnologies.com/about"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-outfit text-xs md:text-sm font-bold tracking-wider uppercase mb-6 shadow-xs">
            <FaRocket className="text-amber-500" />
            <span>{t('about_tagline_badge')}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 tracking-tight mb-6">
            {t('about_title')}
          </h1>

          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-8">
            {t('about_subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="tel:+919059519151" 
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold font-outfit text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <FaPhoneAlt size={13} className="text-white" />
              <span>Call Admissions: +91-9059519151</span>
            </a>
            <a 
              href="https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20I%20would%20like%20to%20learn%20more%20about%20your%20training%20methodology." 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold font-outfit text-sm transition-all flex items-center gap-2"
            >
              <FaWhatsapp size={16} className="text-emerald-600" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:shadow-md hover:border-blue-300 transition-all">
                <s.icon className="text-3xl text-blue-600 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-black text-slate-900 font-outfit mb-1">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Mission & Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <FaShieldAlt /> {t('about_philosophy_badge')}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-outfit">
              {t('about_philosophy_heading')}
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              {t('about_philosophy_desc')}
            </p>

            <blockquote className="p-5 rounded-2xl bg-blue-50 border-l-4 border-blue-600 text-slate-800 font-medium italic text-sm">
              {t('about_core_quote')}
            </blockquote>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-2xl font-black text-slate-900 font-outfit flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              {t('mission_title')}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('mission_p1')}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('mission_p2')}
            </p>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 font-outfit flex items-center gap-2.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                {t('vision_title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('vision_p1')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-outfit mb-3">
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
                className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-blue-400 hover:bg-white transition-all group shadow-xs hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center text-xl mb-4 font-bold shadow-xs`}>
                    <pillar.icon />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-outfit mb-2 group-hover:text-blue-600 transition-colors">
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

      {/* Founder / Leadership Vision */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mx-auto mb-6 border border-blue-100">
            <FaGraduationCap />
          </div>
          <p className="text-base md:text-lg text-slate-800 font-medium italic leading-relaxed mb-6">
            {t('about_founder_quote')}
          </p>
          <h4 className="text-lg font-bold text-slate-900 font-outfit">
            JVK Technologies Leadership Team
          </h4>
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mt-1">
            {t('about_founder_role')}
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-black font-outfit mb-3">
            {t('about_cta_title')}
          </h3>
          <p className="text-xs md:text-sm text-blue-100 mb-6 max-w-xl mx-auto">
            {t('about_cta_sub')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/courses" 
              className="px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-slate-50 font-bold text-sm font-outfit shadow-md transition-colors"
            >
              {t('about_cta_btn1')}
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm font-outfit border border-blue-400/40 transition-colors"
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
