import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, 
  FaPaperPlane, FaCheckCircle, FaClock, FaLaptopCode, 
  FaQuestionCircle, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    course: 'Java Full Stack Development',
    mode: 'Online Live Interactive',
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const res = await axios.post(`${apiBase}/contact/submit`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        queryType: `Course Inquiry: ${formData.course} (${formData.mode})`,
        message: formData.message || `Interested in ${formData.course} (${formData.mode})`
      });

      if (res.data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your inquiry has been received. Our senior counselor will call you at ' + formData.phone + ' shortly.'
        });
        setFormData({ name: '', email: '', phone: '', course: 'Java Full Stack Development', mode: 'Online Live Interactive', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: res.data.message || 'Failed to submit inquiry. Please call or WhatsApp us directly at +91-9059519151.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'success',
        message: 'Thank you for your interest! For fastest response, you can also reach us directly on WhatsApp or Call at +91-9059519151.'
      });
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Do you provide 100% placement assistance?',
      a: 'Yes! JVK Technologies provides comprehensive placement support, including technical mock interviews by MNC tech leads, resume & GitHub portfolio reviews, LinkedIn optimization, and direct campus recruitment drives with our 150+ hiring partner companies.'
    },
    {
      q: 'Can freshers or candidates with career gaps join?',
      a: 'Absolutely. Over 60% of our successful alumni come from non-IT backgrounds, mechanical/civil/commerce streams, or career breaks. Our curriculum begins from absolute fundamentals and systematically progresses to advanced microservices and cloud deployments.'
    },
    {
      q: 'Are the classes live or recorded?',
      a: 'All our sessions are live and interactive with working corporate mentors. In addition, every session is recorded in HD and made available on your LMS dashboard for lifetime revision and practice.'
    },
    {
      q: 'Can I attend a free demo session before paying fees?',
      a: 'Yes! We encourage every student to attend our live interactive demo classes to experience our teaching methodology, interact with the trainer, and inspect the project roadmap.'
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 pb-20 min-h-screen font-inter">
      <SEO 
        title="Contact JVK Technologies | Admissions, Course Inquiries & Campus"
        description="Connect with JVK Technologies admissions team. Call +91-9059519151 or WhatsApp for upcoming batch schedules, fees, and free demo sessions."
        keywords="Contact JVK Technologies, JVK Technologies phone number, Hyderabad IT training contact, Java course admissions"
        url="https://jvktechnologies.com/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <FaPhoneAlt /> Admissions & Student Support
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight">
            {t('contact_title')}
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-2">
            {t('contact_subtitle')}
          </p>
        </motion.div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Phone Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mx-auto mb-4 border border-blue-100">
                <FaPhoneAlt />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Direct Call Admissions</h3>
              <p className="text-xs text-slate-500 mb-4">Monday – Saturday: 8 AM – 8 PM IST</p>
            </div>
            <a 
              href="tel:+919059519151" 
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors block font-outfit shadow-sm"
            >
              +91-9059519151
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-100">
                <FaWhatsapp />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">WhatsApp Counseling</h3>
              <p className="text-xs text-slate-500 mb-4">Instant reply for fees, demo & syllabus</p>
            </div>
            <a 
              href="https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20I%20am%20interested%20in%20course%20details." 
              target="_blank" 
              rel="noreferrer" 
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors block font-outfit shadow-sm"
            >
              Chat: +91-9059519151
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mx-auto mb-4 border border-amber-100">
                <FaEnvelope />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Official Email</h3>
              <p className="text-xs text-slate-500 mb-4">For corporate training & hiring drives</p>
            </div>
            <a 
              href="mailto:contact@jvktechnologies.com" 
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-colors block font-outfit shadow-sm"
            >
              contact@jvktechnologies.com
            </a>
          </div>
        </div>

        {/* Main Grid: Form + Address Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 font-outfit mb-2">
              {t('contact_send_title')}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your details below. Our technical counselor will provide full curriculum and reserve your seat for the free demo class.
            </p>

            {status.message && (
              <div className={`p-4 rounded-2xl mb-6 text-xs font-semibold flex items-center gap-2.5 ${
                status.type === 'success' 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <FaCheckCircle className="shrink-0 text-sm" />
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">{t('contact_name')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 text-slate-900 text-xs outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">{t('contact_phone_label')} *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="e.g. +91 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 text-slate-900 text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">{t('contact_email_label')} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 text-slate-900 text-xs outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Tech Track *</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 text-slate-900 text-xs outline-none cursor-pointer"
                  >
                    <option value="Java Full Stack Development">Java Full Stack Development</option>
                    <option value="Python Full Stack & AI">Python Full Stack & AI</option>
                    <option value="MERN Stack Web Development">MERN Stack Web Development</option>
                    <option value="Cloud AWS, Azure & DevOps">Cloud AWS, Azure & DevOps</option>
                    <option value="Software Automation & QA">Software Automation & QA</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Preferred Mode *</label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({...formData, mode: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 text-slate-900 text-xs outline-none cursor-pointer"
                  >
                    <option value="Online Live Interactive">Online Live Interactive</option>
                    <option value="Classroom Hands-on Lab">Classroom Hands-on Lab</option>
                    <option value="Weekend Professional Batch">Weekend Professional Batch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">{t('contact_message')}</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Any questions about batches, timings, or previous experience..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 text-slate-900 text-xs outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold font-outfit text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>{t('contact_send_btn')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Campus Coordinates & FAQ (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-xl font-black text-slate-900 font-outfit flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>Hyderabad Campus</span>
              </h3>

              <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <p>
                  <strong className="text-slate-900">JVK Technologies Pvt Ltd</strong><br />
                  Plot No 42, Tech Cyber Zone, Near Cyber Towers,<br />
                  HITEC City, Madhapur, Hyderabad, Telangana - 500081
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-amber-600 shrink-0" />
                    <span>Lab Timings: 7:00 AM – 9:00 PM (Mon – Sun)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-blue-600 shrink-0" />
                    <a href="tel:+919059519151" className="hover:text-blue-600 font-bold text-slate-800">+91-9059519151</a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <strong className="text-emerald-800 block">Fast Track Inquiry</strong>
                  <span className="text-emerald-600 text-[11px]">Chat directly on WhatsApp</span>
                </div>
                <a
                  href="https://wa.me/919059519151?text=Hello%20JVK%20Technologies,%20I%20have%20an%20admissions%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0 transition-colors"
                >
                  <FaWhatsapp size={14} />
                  <span>Chat Now</span>
                </a>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 font-outfit mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-amber-500" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left flex items-center justify-between text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors py-1"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? <FaChevronUp className="text-xs shrink-0 ml-2 text-blue-600" /> : <FaChevronDown className="text-xs shrink-0 ml-2 text-slate-400" />}
                    </button>
                    {openFaq === idx && (
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
