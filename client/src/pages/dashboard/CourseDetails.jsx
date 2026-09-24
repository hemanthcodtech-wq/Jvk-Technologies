import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaClock, FaGlobe, FaCheck, FaUserTie, FaHeart, FaRegHeart, 
  FaArrowLeft, FaPhoneAlt, FaWhatsapp, FaCertificate, FaLaptopCode, 
  FaProjectDiagram, FaDownload, FaRocket, FaBuilding, FaGraduationCap
} from 'react-icons/fa';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
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
  const location = useLocation();
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { contact } = settings;
  const cleanWhatsapp = contact.whatsappNumber.replace(/[^0-9]/g, '');

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

  useEffect(() => {
    // Check enrollment status
    const token = localStorage.getItem('token');
    if (token && course?._id) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/payments/history`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success && res.data.data) {
          const courseId = course._id || course.slug;
          const enrolled = res.data.data.some(e => 
            e.course?._id === courseId || e.course === courseId
          );
          setIsEnrolled(enrolled);
        }
      }).catch(() => {});
    }
  }, [course]);

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
        <Link to={location.pathname.startsWith('/dashboard') ? "/dashboard/courses" : "/courses"} className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold">
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
            onClick={() => navigate(location.pathname.startsWith('/dashboard') ? '/dashboard/courses' : '/courses')} 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft size={12} />
            <span>All Programs</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="hidden sm:inline">Admissions Support:</span>
            <a href={`tel:${contact.callNumber}`} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
              <FaPhoneAlt size={10} /> {contact.callNumber}
            </a>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            {/* Category badge only */}
            <div className="flex flex-wrap items-center gap-2">
              {course.category && (
                <span className="bg-blue-600/90 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                  {course.category}
                </span>
              )}
              {course.level && (
                <span className="bg-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                  {course.level}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {course.title}
            </h1>

            {course.description && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.description}
              </p>
            )}

            {/* Quick Metrics — only real DB fields */}
            <div className="flex flex-wrap gap-3 pt-2">
              {course.durationMonths && (
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Duration</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <FaClock className="text-amber-400" size={13} /> {course.durationMonths} Month{course.durationMonths > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              {course.level && (
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Skill Level</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <FaGraduationCap className="text-blue-400" size={14} /> {course.level}
                  </span>
                </div>
              )}
              {course.language && (
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Language</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <FaGlobe className="text-emerald-400" size={13} /> {course.language}
                  </span>
                </div>
              )}
              {course.sessionDates?.length > 0 && (
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Sessions</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <FaLaptopCode className="text-purple-400" size={13} /> {course.sessionDates.length} Classes
                  </span>
                </div>
              )}
              {course.accessValidity && (
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Access</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <FaCertificate className="text-amber-400" size={13} /> {course.accessValidity}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Card on Desktop */}
          <div className="lg:col-span-4 bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200">
            {course.price > 0 && (
              <div className="mb-4">
                <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Course Fee</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">₹{course.price}</span>
                </div>
              </div>
            )}

            <div className="mt-5">
              <button 
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (isEnrolled) {
                    navigate(`/dashboard/learning/${course._id || course.slug}`);
                  } else if (token) {
                    navigate(`/checkout/${course._id || course.slug}`);
                  } else {
                    navigate('/login');
                  }
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isEnrolled 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isEnrolled ? (
                  <><FaGraduationCap size={14} /> Go to My Learning</>
                ) : (
                  <><FaRocket size={14} /> Enroll Now</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 max-w-4xl mx-auto space-y-8 w-full">

            {/* About This Course */}
            {course.description && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  About This Program
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{course.description}</p>

                {/* Course meta chips */}
                <div className="flex flex-wrap gap-3 mt-5">
                  {course.language && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                      <FaGlobe size={11} className="text-indigo-500" /> {course.language}
                    </div>
                  )}
                  {course.level && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                      <FaGraduationCap size={11} className="text-indigo-500" /> {course.level}
                    </div>
                  )}
                  {course.accessValidity && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                      <FaCertificate size={11} className="text-indigo-500" /> {course.accessValidity} Access
                    </div>
                  )}
                  {course.sessionDates?.length > 0 && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                      <FaProjectDiagram size={11} className="text-indigo-500" /> {course.sessionDates.length} Live Sessions
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What You Will Learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  What You Will Master
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum / Topics */}
            {course.topics && course.topics.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Course Curriculum</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{course.topics.length} topics covered in this program</p>
                  </div>
                  <a 
                    href={`https://wa.me/${cleanWhatsapp}?text=Please%20send%20the%20detailed%20syllabus%20PDF.`}
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors w-max"
                  >
                    <FaDownload size={11} /> Download Syllabus PDF
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold">{idx + 1}</div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback - Modules (from fallback data) */}
            {!course.topics?.length && course.modules && course.modules.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Curriculum & Syllabus Roadmap</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Engineered to match real job role requirements</p>
                  </div>
                  <a 
                    href={`https://wa.me/${cleanWhatsapp}?text=Please%20send%20the%20detailed%20syllabus%20PDF.`}
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors w-max"
                  >
                    <FaDownload size={11} /> Download Syllabus PDF
                  </a>
                </div>
                <div className="space-y-4">
                  {course.modules.map((mod, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-indigo-300 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{mod.title}</h3>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md w-max">{mod.duration}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {mod.topics?.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor Info */}
            {(course.instructorId || course.instructor) && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  About Your Instructor
                </h2>
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0">
                    <FaUserTie size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {course.instructorId?.name || course.instructor || 'Lead Instructor'}
                    </h3>
                    {course.instructorId?.speciality && (
                      <p className="text-xs font-semibold text-indigo-600 bg-indigo-50 inline-block px-2.5 py-0.5 rounded-full mt-1">
                        {course.instructorId.speciality}
                      </p>
                    )}
                    {course.instructorId?.bio && (
                      <p className="text-sm text-slate-600 leading-relaxed mt-3">{course.instructorId.bio}</p>
                    )}
                    {!course.instructorId?.bio && (
                      <p className="text-sm text-slate-500 leading-relaxed mt-3">
                        Industry expert and certified technical trainer with extensive hands-on experience in {course.category || 'software development'}. Committed to delivering job-ready skills through practical, project-based learning at JVK Technologies.
                      </p>
                    )}
                    {course.instructorId?.phone && (
                      <a href={`tel:${course.instructorId.phone}`} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-semibold mt-3 hover:underline">
                        <FaPhoneAlt size={10} /> {course.instructorId.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Bottom */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white text-center">
              <h3 className="text-xl font-black mb-2">Ready to Start Your Career Journey?</h3>
              <p className="text-indigo-200 text-sm mb-5">Join {course.title} at JVK Technologies — hands-on training with guaranteed placement support.</p>
              <button
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (isEnrolled) {
                    navigate(`/dashboard/learning/${course._id || course.slug}`);
                  } else if (token) {
                    navigate(`/checkout/${course._id || course.slug}`);
                  } else {
                    navigate('/login');
                  }
                }}
                className="px-8 py-3.5 bg-white text-indigo-700 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-lg text-sm inline-flex items-center gap-2"
              >
                {isEnrolled ? (<><FaGraduationCap /> Go to My Learning</>) : (<><FaRocket /> Enroll Now — ₹{course.price || 'N/A'}</>)}
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default CourseDetails;
