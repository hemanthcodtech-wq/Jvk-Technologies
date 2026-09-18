import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaArrowLeft, FaLock, FaDatabase, FaCookieBite, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
            <FaUserShield size={12} /> Student Data Protection
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-outfit">Privacy Policy</h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Last Updated: September 2026 • JVK Technologies Pvt Ltd
          </p>

          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-blue-900/40 text-xs font-bold text-gray-300">
            <Link to="/terms" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Terms & Conditions ↗</Link>
            <Link to="/refund-policy" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Refund & Cancellation Policy ↗</Link>
            <Link to="/contact" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-colors border border-white/10">Contact Support ↗</Link>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#081226]/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-blue-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] space-y-8 text-gray-300 leading-relaxed text-sm"
        >
          {/* 1. Commitment */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">1.</span> Our Commitment to Your Privacy
            </h2>
            <p>
              At <strong>JVK Technologies Pvt Ltd</strong> ("we", "us", or "our"), safeguarding your personal and learning data is our utmost priority. This policy transparently explains how we collect, process, and secure your information when you enroll in our software courses, access our learning management system (LMS), and interact with our career placement services.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">2.</span> Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li><strong>Contact Information:</strong> Full name, email address, phone/WhatsApp number (+91), and city.</li>
              <li><strong>Academic & Career Profile:</strong> Educational background, degree, year of graduation, resume, and target technical roles.</li>
              <li><strong>LMS Activity:</strong> Video lecture completions, quiz results, project code repository submissions, and attendance.</li>
              <li><strong>Transaction Records:</strong> Course enrollment details and payment confirmation IDs. Note: JVK Technologies does NOT store credit/debit card numbers or CVVs.</li>
            </ul>
          </section>

          {/* 3. Placement Partner Sharing */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">3.</span> Placement & Recruitment Sharing
            </h2>
            <p>
              When you opt-in to JVK Technologies placement assistance, your approved resume, technical project portfolio, and evaluation scores are shared exclusively with verified corporate hiring partners for scheduling interview drives.
            </p>
          </section>

          {/* 4. Security */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">4.</span> Data Security & Encryption
            </h2>
            <p>
              We implement industry-standard AES-256 encryption in transit (HTTPS/TLS) and restricted role-based database access to protect your account and personal records.
            </p>
          </section>

          {/* 5. Contact Information */}
          <section className="pt-6 border-t border-blue-900/40 space-y-3">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-outfit">
              <span className="text-[#00d2ff]">5.</span> Privacy Queries & Officer Contact
            </h2>
            <div className="p-4 rounded-2xl bg-[#020817] border border-blue-500/25 space-y-2 text-xs text-gray-300">
              <p><strong>JVK Technologies Pvt Ltd</strong></p>
              <p>Plot No 42, Tech Cyber Zone, Near Cyber Towers, HITEC City, Madhapur, Hyderabad, Telangana - 500081</p>
              <p>Phone: <a href="tel:+919059519151" className="text-[#00d2ff] font-bold">+91-9059519151</a></p>
              <p>Email: <a href="mailto:contact@jvktechnologies.com" className="text-[#00d2ff] font-bold">contact@jvktechnologies.com</a></p>
            </div>
          </section>

        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
