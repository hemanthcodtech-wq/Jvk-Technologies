import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileContract, FaArrowLeft, FaLaptopCode, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
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
            <FaFileContract size={12} /> Student Agreement
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-outfit">Terms and Conditions</h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Last Updated: September 2026 • JVK Technologies Pvt Ltd
          </p>

          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-blue-900/40 text-xs font-bold text-gray-300">
            <Link to="/privacy" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Privacy Policy ↗</Link>
            <Link to="/refund-policy" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Refund & Cancellation Policy ↗</Link>
            <Link to="/contact" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Contact Admissions ↗</Link>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#081226]/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-blue-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] space-y-8 text-gray-300 leading-relaxed text-sm"
        >
          {/* 1. Acceptance */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">1.</span> Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>JVK Technologies Pvt Ltd ("JVK", "we", "us", or "our")</strong>. By accessing our platform (<a href="https://jvktechnologies.com" className="text-[#00d2ff] underline">jvktechnologies.com</a>), enrolling in our live interactive batches, or utilizing our software labs and placement cell, you agree to comply with these terms.
            </p>
          </section>

          {/* 2. Course Delivery & LMS Access */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">2.</span> Course Delivery & Digital Lab Access
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Course access is granted for the registered student's personal educational use only. Credentials may not be shared.</li>
              <li>Live sessions, lecture recordings, source code repositories, and project blueprints provided by JVK Technologies are proprietary intellectual property.</li>
              <li>Students must maintain minimum 80% attendance in live sessions and complete all capstone assignments to be eligible for placement drives.</li>
            </ul>
          </section>

          {/* 3. Placement Support Policy */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">3.</span> Placement Assistance Policy
            </h2>
            <p>
              JVK Technologies provides 100% dedicated placement support, including unlimited interview opportunities with hiring partners, mock interview evaluations, and resume polish. Students are expected to attend scheduled interview rounds professionally and adhere to company guidelines.
            </p>
          </section>

          {/* 4. Contact Coordinate */}
          <section className="pt-6 border-t border-blue-900/40 space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">4.</span> Support & Inquiries
            </h2>
            <div className="p-4 rounded-2xl bg-[#020817] border border-blue-500/25 space-y-2 text-xs text-gray-300">
              <p><strong>JVK Technologies Pvt Ltd</strong></p>
              <p>Plot No 42, Tech Cyber Zone, Near Cyber Towers, HITEC City, Madhapur, Hyderabad - 500081</p>
              <p>Direct Call: <a href="tel:+919059519151" className="text-[#00d2ff] font-bold">+91-9059519151</a></p>
              <p>Email: <a href="mailto:contact@jvktechnologies.com" className="text-[#00d2ff] font-bold">contact@jvktechnologies.com</a></p>
            </div>
          </section>

        </motion.div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
