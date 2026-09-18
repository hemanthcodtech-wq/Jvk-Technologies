import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaClock, FaGlobe, FaCheck, FaUserTie, FaHeart, FaRegHeart, 
  FaArrowLeft, FaPhoneAlt, FaWhatsapp, FaCertificate, FaLaptopCode, 
  FaProjectDiagram, FaDownload, FaRocket, FaBuilding, FaGraduationCap
} from 'react-icons/fa';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

const fallbackCourseData = {
  'java-full-stack': {
    _id: 'java-full-stack',
    slug: 'java-full-stack',
    title: 'Java Full Stack Development with Spring Boot & React',
    category: 'Full Stack Java',
    level: 'Beginner to Advanced (Job Ready)',
    duration: '3.5 Months',
    price: '18,999',
    language: 'English & Telugu',
    description: 'Master Core Java, Object Oriented Design, Spring Boot microservices, Hibernate/JPA, REST APIs, React 19 frontend integration, and AWS cloud deployment. Build enterprise-level, production-ready full stack applications with hands-on live project training.',
    whatYouWillLearn: [
      'Core Java & Object-Oriented Programming (OOP) fundamentals with collections and multithreading',
      'Advanced Spring Boot 3 microservices architecture with Spring Cloud & Eureka',
      'Hibernate ORM, Spring Data JPA, and PostgreSQL / MySQL database modeling',
      'Modern Frontend Development with React 19, Tailwind CSS, and Redux Toolkit',
      'Building secure RESTful APIs with JWT authentication and OAuth2',
      'DevOps CI/CD pipelines, Docker containerization, and AWS EC2 deployment',
      'Unit testing with JUnit, Mockito, and Postman API automation',
      'Complete Git/GitHub workflow and code reviews following MNC standards'
    ],
    modules: [
      { title: 'Module 1: Core Java & Modern Syntax', duration: '3 Weeks', topics: ['OOP Principles, Interfaces, Abstract Classes', 'Collections Framework & Generics', 'Exception Handling & Lambdas / Streams', 'Multithreading & Concurrency'] },
      { title: 'Module 2: Backend with Spring Boot 3', duration: '4 Weeks', topics: ['Spring Core, Dependency Injection, Spring MVC', 'Spring Boot Auto-configuration & Starters', 'Spring Data JPA & Hibernate Relations', 'RESTful Web Services & Swagger/OpenAPI'] },
      { title: 'Module 3: Microservices & Cloud Architecture', duration: '3 Weeks', topics: ['Service Discovery (Eureka) & API Gateway', 'Config Server, Feign Client, Resilience4j', 'Distributed Logging & Actuator Monitoring', 'Dockerizing Spring Boot Applications'] },
      { title: 'Module 4: Frontend UI with React 19', duration: '3 Weeks', topics: ['Components, Hooks, State Management (Redux)', 'Connecting React with Spring Boot REST APIs', 'Authentication flow with JWT & Protected Routes', 'Responsive Enterprise UI with Tailwind CSS'] },
      { title: 'Module 5: Capstone Projects & Placement Prep', duration: '2 Weeks', topics: ['E-Commerce Microservices Enterprise App', 'Banking Transaction & Wallet Service', 'Mock Interviews, Resume Preparation & Job Drives'] }
    ]
  },
  'python-full-stack': {
    _id: 'python-full-stack',
    slug: 'python-full-stack',
    title: 'Python Full Stack & AI Machine Learning Track',
    category: 'Python & AI',
    level: 'Beginner to Professional',
    duration: '3 Months',
    price: '16,999',
    language: 'English & Telugu',
    description: 'Comprehensive software program covering Python core, Django, FastAPI, PostgreSQL, asynchronous programming, React integration, and real-world GenAI/Machine Learning APIs. Designed for fast-track career switches and fresh graduates seeking high-growth tech roles.',
    whatYouWillLearn: [
      'Python syntax, OOPs, decorators, generators, and data structures',
      'Web application development using Django and Django REST Framework',
      'High-performance async API development with FastAPI and Pydantic',
      'Database management with PostgreSQL, SQLite, and SQLAlchemy ORM',
      'Modern React frontend for interactive dashboards and AI chat interfaces',
      'Integration with OpenAI, LangChain, and machine learning models',
      'Automated testing with PyTest and containerization with Docker'
    ],
    modules: [
      { title: 'Module 1: Python Mastery & Data Structures', duration: '3 Weeks', topics: ['Python 3 Basics & OOP Architecture', 'File Handling, JSON, and Regex', 'Decorators, Generators, and Context Managers', 'Unit Testing with PyTest'] },
      { title: 'Module 2: Django & Django REST Framework', duration: '4 Weeks', topics: ['MVC Architecture & Django ORM', 'Serializers, ViewSets, and API Routers', 'User Auth, Permissions & JWT Tokens', 'Admin Panel Customization'] },
      { title: 'Module 3: Modern FastAPI & AI Integrations', duration: '3 Weeks', topics: ['Async Programming & FastAPI Speed', 'Pydantic Data Validation & Documentation', 'LangChain & OpenAI API integration', 'Building AI Chatbot & Semantic Search'] },
      { title: 'Module 4: React UI & Full Stack Capstone', duration: '2 Weeks', topics: ['Connecting Python API with React', 'Dockerizing Full Stack App', 'Resume Building, System Design & Placement Support'] }
    ]
  },
  'mern-stack': {
    _id: 'mern-stack',
    slug: 'mern-stack',
    title: 'MERN Stack Web Development Masterclass',
    category: 'MERN Stack',
    level: 'Job-Oriented Bootcamp',
    duration: '3 Months',
    price: '17,499',
    language: 'English & Telugu',
    description: 'Learn to build highly scalable, full-stack web applications using MongoDB, Express.js, React 19, and Node.js. Includes advanced TypeScript, server-side state management, cloud deployments, and interview preparation.',
    whatYouWillLearn: [
      'Modern JavaScript (ES6+) and TypeScript fundamentals',
      'Building performant REST APIs using Node.js and Express.js',
      'NoSQL database architecture with MongoDB Atlas & Mongoose',
      'Dynamic single-page applications with React 19 and Next.js',
      'Global state management with Redux Toolkit and React Query',
      'Role-based Access Control (RBAC) and payment gateway integrations',
      'Deploying apps to Vercel, Render, and AWS with continuous deployment'
    ],
    modules: [
      { title: 'Module 1: Modern JavaScript & TypeScript', duration: '2 Weeks', topics: ['Async/Await, Promises & Event Loop', 'DOM, ES Modules & Modern Syntax', 'TypeScript Types, Interfaces & Generics'] },
      { title: 'Module 2: Backend with Node.js & Express', duration: '3 Weeks', topics: ['Node.js Architecture & HTTP Modules', 'Express Routing, Middleware & Error Handling', 'MongoDB Atlas, Aggregation Pipelines & Mongoose'] },
      { title: 'Module 3: Frontend with React 19 & Next.js', duration: '4 Weeks', topics: ['React Components, Hooks, & Virtual DOM', 'State Management with Redux Toolkit', 'Routing with React Router v6 & SSR Basics', 'Tailwind CSS for High-Tech Responsive UI'] },
      { title: 'Module 4: Full Stack Projects & DevOps', duration: '3 Weeks', topics: ['End-to-end LMS Platform Project', 'Payment Gateway Integration (Razorpay/Stripe)', 'CI/CD Pipelines, GitHub Actions & Job Drives'] }
    ]
  },
  'aws-devops': {
    _id: 'aws-devops',
    slug: 'aws-devops',
    title: 'Cloud AWS, Azure & DevOps Engineering',
    category: 'Cloud & DevOps',
    level: 'Industry Standard Lab',
    duration: '3 Months',
    price: '19,999',
    language: 'English & Telugu',
    description: 'Hands-on practical training covering Linux administration, AWS core services, Docker containerization, Kubernetes orchestration, Jenkins CI/CD pipelines, Ansible configuration, and Terraform Infrastructure as Code.',
    whatYouWillLearn: [
      'Linux commands, Bash shell scripting, and user security permissions',
      'AWS Cloud Services: EC2, VPC, S3, RDS, IAM, Route53, and Lambda',
      'Containerization using Docker, Dockerfile, and multi-container Docker Compose',
      'Kubernetes Cluster Management, Pods, Deployments, Services, and Ingress',
      'Automated CI/CD with Jenkins, GitHub Actions, and Webhooks',
      'Infrastructure as Code (IaC) using Terraform scripts',
      'Prometheus and Grafana monitoring & logging'
    ],
    modules: [
      { title: 'Module 1: Linux & Shell Scripting', duration: '2 Weeks', topics: ['Linux File Hierarchy & Permissions', 'Process Management & Networking', 'Bash Shell Scripting Automation'] },
      { title: 'Module 2: AWS Cloud Solutions Architect', duration: '4 Weeks', topics: ['VPC Architecture, Subnets & Gateways', 'EC2 Auto-scaling & Elastic Load Balancing', 'S3 Storage & CloudFront CDN', 'RDS Databases & IAM Roles'] },
      { title: 'Module 3: Docker & Kubernetes Orchestration', duration: '3 Weeks', topics: ['Container Fundamentals & Dockerfile', 'Docker Volumes & Networking', 'Kubernetes Architecture & Minikube/EKS', 'ConfigMaps, Secrets, & Helm Charts'] },
      { title: 'Module 4: CI/CD & Terraform IaC', duration: '3 Weeks', topics: ['Jenkins Declarative Pipelines', 'Terraform Modules & State Management', 'Real-world Microservices Deployment on AWS'] }
    ]
  },
  'software-testing': {
    _id: 'software-testing',
    slug: 'software-testing',
    title: 'Software Automation Testing (Selenium, Java & API)',
    category: 'Software Testing',
    level: 'Manual + Automation',
    duration: '2.5 Months',
    price: '14,999',
    language: 'English & Telugu',
    description: 'End-to-end QA training covering manual testing methodologies, SDLC/STLC, Core Java for automation, Selenium WebDriver, TestNG framework, Cucumber BDD, and API testing with Postman and RestAssured.',
    whatYouWillLearn: [
      'Manual testing processes, test case design, bug life cycle, and Jira',
      'Core Java programming tailored specifically for test automation',
      'Selenium WebDriver architecture, locators, and dynamic web element handling',
      'TestNG test framework, assertions, data providers, and reporting',
      'Behavior Driven Development (BDD) with Cucumber and Gherkin',
      'Postman and RestAssured for REST API test automation',
      'Jenkins integration for nightly automated smoke and regression runs'
    ],
    modules: [
      { title: 'Module 1: Manual Testing & Agile SDLC', duration: '2 Weeks', topics: ['SDLC, STLC & Bug Tracking in Jira', 'Test Scenarios & Test Case Preparation', 'Functional, Non-functional & Regression Testing'] },
      { title: 'Module 2: Java for Testers & Selenium', duration: '4 Weeks', topics: ['Java OOPs, Collections & Exception Handling', 'Selenium WebDriver & Locators Strategy', 'Handling Alerts, Frames, Windows, & Actions'] },
      { title: 'Module 3: Automation Frameworks (TestNG & BDD)', duration: '3 Weeks', topics: ['Page Object Model (POM) Design Pattern', 'TestNG Annotations, Data Providers & Reports', 'Cucumber Feature Files, Step Definitions & BDD'] },
      { title: 'Module 4: API Testing & CI/CD Execution', duration: '2 Weeks', topics: ['Postman API Testing & Collections', 'RestAssured Automation in Java', 'Running Tests in Jenkins Pipelines & Placement Prep'] }
    ]
  }
};

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('curriculum');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public/${slug}`);
        if (data && data.data) {
          setCourse(data.data);
        } else {
          // Fall back to matching software track
          setCourse(fallbackCourseData[slug] || fallbackCourseData['java-full-stack']);
        }
      } catch (err) {
        // Use fallback software course data
        setCourse(fallbackCourseData[slug] || fallbackCourseData['java-full-stack']);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  const handleEnroll = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(`/login?redirect=/courses/${slug}`);
      return;
    }
    // Navigate to checkout or contact for batch slot
    navigate(`/contact?program=${encodeURIComponent(course?.title || '')}`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[60vh] bg-slate-50 flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold text-slate-800">Program Not Found</h2>
        <Link to="/courses" className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold">
          View All Software Tracks
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-inter pb-20">
      <SEO 
        title={`${course.title} | JVK Technologies Pvt Ltd`}
        description={course.description?.slice(0, 160)}
        keywords={`${course.title}, ${course.category}, software training, JVK Technologies, Hyderabad IT placement`}
      />

      {/* Top Breadcrumbs & Back Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/courses')} 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft size={12} />
            <span>All Programs</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="hidden sm:inline">Admissions Support:</span>
            <a href="tel:+919059519151" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
              <FaPhoneAlt size={10} /> +91-9059519151
            </a>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600/90 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                {course.category || 'Career Track'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-3 py-1 rounded-full">
                100% Placement Support
              </span>
              <span className="bg-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                Live Online & Classroom
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {course.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block font-semibold">Duration</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <FaClock className="text-amber-400" size={13} /> {course.duration}
                </span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block font-semibold">Skill Level</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <FaGraduationCap className="text-blue-400" size={14} /> {course.level || 'Beginner to Pro'}
                </span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block font-semibold">Language</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <FaGlobe className="text-emerald-400" size={13} /> {course.language || 'English & Telugu'}
                </span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block font-semibold">Certification</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <FaCertificate className="text-amber-400" size={13} /> ISO Recognized
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Card on Desktop */}
          <div className="lg:col-span-4 bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200">
            <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Tuition & Admission
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                ₹{course.price || '18,999'}
              </span>
              <span className="text-xs text-slate-500 font-semibold line-through">
                ₹30,000
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Save 35%
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2 font-medium">
              Includes live mentor sessions, lab access, project code repositories, resume building, and placement drives.
            </p>

            <div className="mt-5 space-y-2.5">
              <a 
                href={`https://wa.me/919059519151?text=${encodeURIComponent(`Hello JVK Technologies, I want to enroll in ${course.title}. Please share batch dates and syllabus.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <FaWhatsapp size={16} /> WhatsApp Enrollment
              </a>

              <a 
                href="tel:+919059519151"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <FaPhoneAlt size={13} /> Call Counseling: +91-9059519151
              </a>

              <button 
                onClick={handleEnroll}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <FaRocket size={12} className="text-blue-600" /> Book Free Demo Class
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500 font-medium">
              <FaBuilding className="text-blue-600" />
              <span>Training Center: HITEC City, Madhapur, Hyderabad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Details & Syllabus */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* What you will learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                <h2 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  What You Will Master in this Program
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Modules */}
            {course.modules && course.modules.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Curriculum & Syllabus Roadmap</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Engineered to match real job role requirements in top IT companies</p>
                  </div>
                  <a 
                    href="https://wa.me/919059519151?text=Please%20send%20the%20detailed%20syllabus%20PDF."
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors w-max"
                  >
                    <FaDownload size={11} /> Download Detailed Syllabus (PDF)
                  </a>
                </div>

                <div className="space-y-4">
                  {course.modules.map((mod, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-blue-300 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {mod.title}
                        </h3>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md w-max">
                          {mod.duration}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {mod.topics?.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Placement & Career Assistance */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
              <h2 className="text-xl font-black text-white mb-2">
                100% Placement Assurance & Job Assistance
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
                Every enrolled candidate at JVK Technologies undergoes mock technical rounds, HR coaching, live project portfolio construction, and direct referral drives with our network of 100+ hiring MNCs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-amber-400 font-bold text-lg block">Unlimited</span>
                  <span className="text-xs text-blue-200 font-medium">Interview Calls & Placement Drives</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-emerald-400 font-bold text-lg block">1-on-1</span>
                  <span className="text-xs text-blue-200 font-medium">Resume & LinkedIn Profile Optimization</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-cyan-400 font-bold text-lg block">Real Projects</span>
                  <span className="text-xs text-blue-200 font-medium">Live Code Portfolio on GitHub</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Key Details & Other Tracks */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Trainer Details */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-4">
                Instructor & Mentorship
              </h3>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  JVK
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Industry Tech Lead</h4>
                  <p className="text-xs text-slate-500 font-medium">12+ Years Enterprise Architecture Experience</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-4 leading-relaxed font-medium">
                Our trainers are active senior developers and technical leads working in Fortune 500 companies who bring direct industry challenges and best coding practices to each class.
              </p>
            </div>

            {/* Other Software Tracks */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-4">
                Explore Other Software Tracks
              </h3>
              <div className="space-y-3">
                {Object.values(fallbackCourseData)
                  .filter(c => c.slug !== slug)
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      to={`/courses/${item.slug}`}
                      className="block p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all group"
                    >
                      <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block">
                        {item.title}
                      </span>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                        <span>{item.duration}</span>
                        <span className="font-bold text-slate-700">₹{item.price}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default CourseDetails;
