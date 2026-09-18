import React from 'react';
import { Link } from 'react-router-dom';
import { FaUndoAlt, FaArrowLeft, FaClock, FaCheckCircle, FaMoneyCheckAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-gray-200 font-inter py-10 px-4 sm:px-6 lg:px-8 bg-cyber-grid">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-[#00d2ff] transition-colors"
        >
          <FaArrowLeft size={12} />
          <span>Back to Home</span>
        </Link>

        {/* Header Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#081226]/90 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-blue-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-[#00d2ff] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-500/30">
            <FaUndoAlt size={12} /> Fee Protection Terms
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-outfit">Refund & Cancellation Policy</h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Last Updated: September 2026 • JVK Technologies Pvt Ltd
          </p>

          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-blue-900/40 text-xs font-bold text-gray-300">
            <Link to="/terms" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Terms & Conditions ↗</Link>
            <Link to="/privacy" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Privacy Policy ↗</Link>
            <Link to="/contact" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Help & Contact ↗</Link>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#081226]/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-blue-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] space-y-8 text-gray-300 leading-relaxed text-sm"
        >
          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#03091c] rounded-2xl border border-blue-500/25 flex flex-col justify-between">
              <div>
                <FaClock className="text-[#00d2ff] text-xl mb-2" />
                <h4 className="font-bold text-white text-sm">Free Demo Guarantee</h4>
                <p className="text-xs text-gray-400 mt-1">Attend live demo classes for free before committing any fee.</p>
              </div>
              <span className="text-[#00d2ff] font-bold text-xs mt-3">Zero Risk Enrollment</span>
            </div>

            <div className="p-5 bg-[#03091c] rounded-2xl border border-blue-500/25 flex flex-col justify-between">
              <div>
                <FaCheckCircle className="text-emerald-400 text-xl mb-2" />
                <h4 className="font-bold text-white text-sm">Batch Switching</h4>
                <p className="text-xs text-gray-400 mt-1">Switch from morning to evening or next month's batch without charge.</p>
              </div>
              <span className="text-emerald-400 font-bold text-xs mt-3">100% Free Batch Transfer</span>
            </div>

            <div className="p-5 bg-[#03091c] rounded-2xl border border-blue-500/25 flex flex-col justify-between">
              <div>
                <FaMoneyCheckAlt className="text-amber-400 text-xl mb-2" />
                <h4 className="font-bold text-white text-sm">Refund Processing</h4>
                <p className="text-xs text-gray-400 mt-1">Approved refunds are credited back within 5-7 business days.</p>
              </div>
              <span className="text-amber-400 font-bold text-xs mt-3">Direct Bank Credit</span>
            </div>
          </div>

          {/* 1. Policy Overview */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">1.</span> Enrollment & Fee Policy
            </h2>
            <p>
              At <strong>JVK Technologies Pvt Ltd</strong>, we prioritize student satisfaction and career transformation. We offer free demo sessions so learners can evaluate the trainer's technical depth, syllabus structure, and lab setup prior to fee payment.
            </p>
          </section>

          {/* 2. Cancellation and Refund Guidelines */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">2.</span> Cancellation & Refund Windows
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li><strong>Prior to Batch Start:</strong> 100% refund of course fee if cancellation request is submitted before Session 1.</li>
              <li><strong>Within First 3 Days of Live Classes:</strong> If a student feels the program is not meeting their expectations, they may request a refund or transfer to an alternate technical course (e.g. from Java to Python or AWS).</li>
              <li><strong>Batch Transfer Option:</strong> In case of professional work commitments or personal emergencies, students can pause their batch and resume with any subsequent cohort at zero extra fee.</li>
            </ul>
          </section>

          {/* 3. Contact Helpdesk */}
          <section className="pt-6 border-t border-blue-900/40 space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">3.</span> Submitting a Refund or Batch Change Request
            </h2>
            <div className="p-4 rounded-2xl bg-[#020817] border border-blue-500/25 space-y-2 text-xs text-gray-300">
              <p>Contact JVK Accounts & Admissions Desk:</p>
              <p>Call: <a href="tel:+919059519151" className="text-[#00d2ff] font-bold">+91-9059519151</a></p>
              <p>Email: <a href="mailto:contact@jvktechnologies.com" className="text-[#00d2ff] font-bold">contact@jvktechnologies.com</a></p>
              <p>Plot No 42, Tech Cyber Zone, Near Cyber Towers, HITEC City, Madhapur, Hyderabad - 500081</p>
            </div>
          </section>

        </motion.div>

      </div>
    </div>
  );
};

export default RefundPolicy;
