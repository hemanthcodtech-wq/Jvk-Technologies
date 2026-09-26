import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, FaLaptopCode, FaChartLine, FaCheckCircle, 
  FaUserTie, FaBuilding, FaBriefcase, FaGraduationCap,
  FaArrowRight, FaAward, FaCode, FaUsers
} from 'react-icons/fa';

export default function About() {
  const journeySteps = [
    { title: "Skill", desc: "Master in-demand technologies like ServiceNow, AI, & Java Full Stack.", icon: FaLaptopCode, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
    { title: "Practice", desc: "Build real-world projects and solve authentic enterprise problems.", icon: FaCode, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
    { title: "Confidence", desc: "Prepare with mock interviews, resume building, & soft skills training.", icon: FaChartLine, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
    { title: "Career", desc: "Get placed in top MNCs with our dedicated placement assistance.", icon: FaBriefcase, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" }
  ];

  const features = [
    { title: "Real-World Scenarios", desc: "Learn by doing. We simulate actual corporate environments and workflows.", icon: FaBuilding, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
    { title: "Project-Based Learning", desc: "Develop end-to-end applications that stand out on your resume.", icon: FaRocket, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
    { title: "Interview Preparation", desc: "Comprehensive mock interviews and technical rounds by industry experts.", icon: FaUserTie, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
    { title: "Placement Assistance", desc: "Direct referral drives and dedicated support until you get hired.", icon: FaCheckCircle, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f8fafc] pt-24 lg:pt-32 pb-16 lg:pb-24">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-b from-indigo-100/60 to-transparent blur-3xl -z-10 rounded-full" />
        
        <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">
            
            {/* Left Content */}
            <div className="w-full lg:w-[50%] flex flex-col items-start text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/60 backdrop-blur-sm px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                About JVK Technologies
              </div>

              <h1 className="text-[40px] sm:text-5xl lg:text-[56px] leading-[1.1] font-black tracking-tight text-slate-950 font-['Sora']">
                We don’t just teach technology — <br />
                <span className="text-[#4F46E5]">we build technology careers.</span>
              </h1>
              
              <p className="mt-5 max-w-xl text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium">
                JVK Technologies focuses on transforming learners into industry-ready professionals through practical training in ServiceNow, AI, and Java Full Stack with AI.
              </p>

              <p className="mt-4 max-w-xl text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium">
                Our approach combines real-world scenarios, project-based learning, interview preparation, career guidance, and placement assistance to create a complete journey from Skill → Practice → Confidence → Career.
              </p>

              <div className="mt-7 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 w-full">
                {[
                  { icon: FaGraduationCap, text: 'Real-world Scenarios' },
                  { icon: FaUsers, text: 'Interview Preparation' },
                  { icon: FaBriefcase, text: 'Placement Assistance' }
                ].map((item, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200/90 bg-white px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-[12px] font-bold text-slate-700 shadow-2xs whitespace-nowrap">
                    <item.icon className="text-[#6366F1] text-[14px]" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Mission and Vision */}
            <div className="w-full lg:w-[45%] relative mt-10 lg:mt-0 flex flex-col justify-center">
              <div className="relative w-full rounded-3xl bg-white p-8 sm:p-10 shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                <div className="absolute top-0 right-4 text-indigo-50 opacity-40 text-[120px] font-serif leading-none select-none">"</div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Sora'] mb-6 relative z-10">
                  Our Mission & Vision
                </h3>
                
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-600 font-medium mb-4 relative z-10">
                  <strong className="text-slate-900 font-bold">JVK Technologies</strong> is a career-focused technology training platform specializing in ServiceNow, AI, and Java Full Stack with AI.
                </p>
                
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-600 font-medium mb-6 relative z-10">
                  Master ServiceNow, AI & Java Full Stack with AI through practical, industry-focused training designed to turn your skills into real career opportunities. We provide practical, project-based training, real-time scenarios, interview preparation, career guidance, and placement assistance to build industry-ready professionals.
                </p>

                <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-100/50 relative z-10">
                  <p className="text-[15px] sm:text-base leading-relaxed text-indigo-900 font-bold font-['Sora'] italic">
                    "Our mission is to transform Learning into Skills, Skills into Confidence, and Confidence into Career Opportunities."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700">
              <FaAward /> A Complete Journey
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl font-['Sora']">
              From Skill → Practice → Confidence → Career
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {journeySteps.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${item.bg} ${item.color} text-xl`}>
                  <item.icon />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-['Sora']">{item.title}</h3>
                <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700">
              <FaRocket /> Our Approach
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl font-['Sora']">
              Designed to make you Industry-Ready
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              We bridge the gap between academic learning and corporate expectations.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
               <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                 <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} text-xl`}>
                   <feature.icon />
                 </div>
                 <h3 className="text-lg font-black text-slate-900 font-['Sora']">{feature.title}</h3>
                 <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-slate-600">{feature.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
