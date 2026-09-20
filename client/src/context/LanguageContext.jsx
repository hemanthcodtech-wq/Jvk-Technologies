import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navbar
    nav_home: 'Home', nav_about: 'About Us', nav_courses: 'Programs',
    nav_batches: 'Upcoming Batches', nav_placements: 'Placements',
    nav_contact: 'Contact Us', nav_login: 'Log in', nav_register: 'Enroll Now',
    nav_dashboard: 'Dashboard', nav_bottom_home: 'Home',
    nav_bottom_classes: 'Courses', nav_bottom_about: 'About', nav_bottom_login: 'Login',

    // Hero
    hero_badge: '🚀 ADMISSIONS OPEN FOR UPCOMING INTENSIVE BATCHES',
    hero_title_1: 'Learn New Technologies, Build Strong Skills,',
    hero_title_2: 'and Move Towards Your Dream Job!',
    hero_subtitle: 'Industry-driven software training in Java Full Stack, Python, MERN, Cloud & DevOps with real-world capstone projects and 100% dedicated placement assistance.',
    hero_explore: 'Explore Tech Tracks',
    hero_start: 'Book Free Demo',
    hero_call_now: 'Call: +91-9059519151',
    hero_whatsapp: 'WhatsApp Us',

    // Stats
    stat_students: 'Students Trained',
    stat_courses: 'Tech Programs',
    stat_instructors: 'Corporate Mentors',
    stat_satisfaction: 'Placement Support',

    // Featured Courses
    featured_title: 'High-Demand Career Tracks',
    featured_sub: 'Master in-demand software skills aligned with top product and IT enterprise standards.',
    featured_view_all: 'View All Programs',
    featured_book_now: 'Enroll Now',

    // About
    about_title: 'JVK Technologies Pvt Ltd',
    about_subtitle: 'Learn New Technologies, Build Strong Skills, and Move Towards Your Dream Job! JVK Technologies is a premier software training and skill-development organization delivering real-time IT expertise.',
    about_tagline_badge: 'Empowering Next-Gen Software Engineers',
    about_core_quote_title: 'Practical + Industry Aligned',
    about_core_quote: '“Our mission is simple: transform ambitious learners into job-ready software developers through hands-on coding, live enterprise projects, and dedicated career guidance.”',
    about_philosophy_badge: 'Our Training Philosophy',
    about_philosophy_heading: 'Why JVK Technologies?',
    about_philosophy_desc: 'The tech industry moves at lightning speed. Traditional bookish learning is no longer enough to secure top tech roles. At JVK Technologies, we train you the way software companies build products—with continuous hands-on labs, code reviews, agile sprints, system design fundamentals, and mock interview coaching.',
    
    about_pillar1_title: '100% Practical Hands-On Labs',
    about_pillar1_desc: 'Every lecture is paired with real code implementations, Git repositories, live debugging sessions, and real-time feedback.',
    about_pillar2_title: 'MNC Working Tech Mentors',
    about_pillar2_desc: 'Learn directly from senior software engineers, tech leads, and cloud architects working actively in top technology firms.',
    about_pillar3_title: 'Live Enterprise Capstone Projects',
    about_pillar3_desc: 'Build full-scale microservices, responsive web portals, and scalable cloud architectures from scratch to showcase on your resume.',
    about_pillar4_title: '100% Dedicated Placement Cell',
    about_pillar4_desc: 'Resume preparation, GitHub profile branding, technical mock interviews, behavioral coaching, and direct drives with 150+ hiring partners.',

    mission_title: 'Our Mission',
    mission_p1: 'To bridge the gap between academic education and real-world IT industry expectations by equipping students and professionals with high-demand engineering skills.',
    mission_p2: 'To empower every student, regardless of background, to step with confidence into high-paying, fulfilling technology careers.',
    
    vision_title: 'Our Vision',
    vision_p1: 'To be the most trusted and transformative software training academy, recognized globally for producing exceptional, industry-ready technical talent.',
    vision_p2: 'Creating a powerhouse community of developers, innovators, and cloud engineers leading the future of digital solutions.',

    about_values_badge: 'Core Principles',
    about_values_title: 'The Values That Guide Us',
    val_authenticity: 'Real-World Practicality',
    val_authenticity_desc: 'No theoretical fluff. We teach what is actually written, tested, and deployed in modern software production.',
    val_community: 'Dedicated Student Mentorship',
    val_community_desc: 'Personalized attention, doubt-clearing sessions, and career counseling throughout the training journey.',
    val_excellence: 'Engineering Excellence',
    val_excellence_desc: 'Mastering clean code principles, architectural design patterns, testing strategies, and industry best practices.',
    val_holism: 'Full-Cycle Career Readiness',
    val_holism_desc: 'From first line of syntax to successful job offer negotiation and initial onboarding support.',
    val_accessibility: 'Affordable World-Class Learning',
    val_accessibility_desc: 'Delivering top-tier corporate-grade tech education with flexible morning, evening, and weekend batches.',
    val_service: 'Continuous Career Support',
    val_service_desc: 'Placement assistance until you land your dream job offer in your chosen technical specialization.',

    about_verticals_badge: 'Flagship Curricula',
    about_verticals_title: 'Core Technology Specializations',
    vert_yoga_title: 'Java Full Stack Development',
    vert_yoga_desc: 'Core Java, Advanced Java, Spring Boot, Microservices, Hibernate, REST APIs, React.js, and Cloud Deployment.',
    vert_prana_title: 'Python Full Stack & AI',
    vert_prana_desc: 'Python programming, Django, FastAPI, Data Structures, PostgreSQL, Machine Learning fundamentals, and React.',
    vert_ayur_title: 'MERN & Full Stack Web',
    vert_ayur_desc: 'MongoDB, Express.js, React.js, Node.js, Next.js, TypeScript, Tailwind CSS, and REST/GraphQL architecture.',
    vert_dhyana_title: 'Cloud AWS, Azure & DevOps',
    vert_dhyana_desc: 'Linux, Docker, Kubernetes, Jenkins CI/CD, Terraform, AWS Solutions Architecture, and GitOps workflows.',

    about_founder_badge: 'Leadership Vision',
    about_founder_quote: '“Our commitment is to guide every student step-by-step from beginner to professional software engineer. With JVK Technologies, your dream tech job is within reach.”',
    about_founder_role: 'Director of Training & Careers, JVK Technologies Pvt Ltd',
    about_cta_title: 'Accelerate Your IT Career Today',
    about_cta_sub: 'Join our upcoming batch, learn under senior industry mentors, and get placed at top software companies.',
    about_cta_btn1: 'Explore Programs',
    about_cta_btn2: 'Schedule Free Counseling',

    // Contact
    contact_title: 'Get In Touch With Admissions',
    contact_subtitle: 'Ready to build strong skills and start your tech career? Call us or send an inquiry!',
    contact_info: 'JVK Technologies Contact Information',
    contact_call: 'Call Us Directly', contact_email_us: 'Email Us',
    contact_location_label: 'Main Training Campus',
    contact_location_val: 'Plot No 42, Tech Cyber Zone, Near Cyber Towers, HITEC City, Madhapur, Hyderabad, Telangana - 500081',
    contact_send_title: 'Request Course Details & Free Demo',
    contact_name: 'Your Full Name', contact_email_label: 'Your Email Address',
    contact_phone_label: 'Phone Number (+91)',
    contact_message: 'Interested Course / Your Message', contact_send_btn: 'Submit Inquiry',

    // Login
    login_welcome: 'Welcome to JVK LMS',
    login_subtitle: 'Sign in to access your course materials, assignments & live classes',
    login_email_placeholder: 'Email or Mobile Number',
    login_password_placeholder: 'Enter your password',
    login_password: 'Password', login_forgot: 'Forgot password?',
    login_trouble: 'Need assistance logging in?',
    login_btn: 'Sign In', login_loading: 'Authenticating...',
    login_no_account: 'New to JVK Technologies?',
    login_signup: 'Enroll Here', login_or: 'OR',
    login_google: 'Sign in with Google', login_google_loading: 'Connecting...',
    login_apple: 'Sign in with Apple',

    // Register
    register_join: 'Begin Your Journey!', register_title: 'Create Your Student Account',
    register_email: 'Email Address or Phone',
    register_password: 'Password', register_confirm: 'Confirm Password',
    register_btn: 'Complete Registration', register_loading: 'Setting up...',
    register_have_account: 'Already registered with JVK?', register_login_link: 'Sign In',

    // Courses
    course_details: 'Course Curriculum & Details', course_about: 'About This Program',
    course_learn: 'Skills You Will Master', course_enroll: 'Enroll in Batch',
    course_ready: 'Ready to transform your tech career?', course_join_thousands: 'Join 10,000+ placed graduates',
    course_access: 'Access', course_lifetime: 'Lifetime LMS Access',
    course_format: 'Format', course_ondemand: 'Live Interactive + Lab Recordings',
    course_all: 'All Tech Tracks',
    course_discover: 'Choose your desired specialization and learn from certified corporate software instructors.',
    course_search: 'Search by technology (e.g. Java, Python, React, AWS)...', course_no_found: 'No programs match your search',
    course_no_found_sub: 'Try searching for Java, Python, MERN, Cloud, or DevOps.',

    // Home - Categories
    home_categories_title: 'Industry-Demanded Tech Tracks',
    home_categories_sub: 'Curated curricula designed to take you from foundational syntax to enterprise production code.',
    home_cat_view: 'View Syllabus',
    home_trusted: 'Our Alumni Are Placed In Global Tech Giants',
    
    // Home - How it works
    home_how_title: 'Your 4-Stage Path to Job Placement',
    home_how_sub: 'Our structured methodology guarantees you graduate with confidence and real-world coding capability.',
    home_step1_title: 'Stage 1: Core Fundamentals & Hands-on Coding', home_step1_desc: 'Master syntax, algorithmic problem solving, clean code principles, and data structures through daily live sessions.',
    home_step2_title: 'Stage 2: Enterprise Frameworks & Tools', home_step2_desc: 'Work with modern industry frameworks (Spring Boot, Django, React, Docker, Kubernetes) used in top corporate teams.',
    home_step3_title: 'Stage 3: Capstone Projects & Architecture', home_step3_desc: 'Build, test, and deploy real production projects on GitHub and live cloud platforms to showcase to interviewers.',
    home_step4_title: 'Stage 4: Placement Drives & Mock Interviews', home_step4_desc: 'Attend technical & HR mock interviews, resume workshops, and exclusive campus recruitment drives with hiring partners.',
    home_completed: 'Completed', home_lessons: '100+ Live Hours',
    
    // Home - Why choose us
    home_why_title: 'Why Choose JVK Technologies?',
    home_why1_title: 'Senior Corporate Mentors', home_why1_desc: 'Learn directly from software engineers and team leads with 10+ years of active development experience.',
    home_why2_title: 'Real-Time Enterprise Projects', home_why2_desc: 'Develop end-to-end applications solving authentic business problems, with industry Git branching and agile practices.',
    home_why3_title: '100% Placement Support', home_why3_desc: 'Comprehensive interview preparation, resume reviews, salary negotiation tips, and direct referral drives.',
    
    // Home - CTA
    home_cta_title: 'Ready to Land Your Dream IT Job?',
    home_cta_sub: 'Talk with our senior career counselors today or reserve your seat for the next free live demo session.',
    home_cta_btn: 'Join Next Batch',
    home_view_all_mobile: 'View All Programs',

    // CTA
    cta_title: 'Upgrade Your Skills with JVK Technologies',
    cta_sub: 'Take the first decisive step toward becoming a high-earning software developer. Connect with our advisors now.',
    cta_btn: 'Enroll Now',

    // Footer
    footer_desc: 'JVK Technologies Pvt Ltd is a premier software training and development institute dedicated to bridging the industry skills gap and helping students achieve their dream tech careers.',
    footer_quick: 'Quick Links', footer_legal: 'Policies',
    footer_privacy: 'Privacy Policy', footer_terms: 'Terms and Conditions',
    footer_refund: 'Refund Policy',
    footer_copy: 'JVK Technologies Pvt Ltd. All rights reserved.',

    // Dashboard Nav
    dash_nav_home: 'Dashboard',
    dash_nav_courses: 'All Programs',
    dash_nav_classes: 'My Batches',
    dash_nav_learning: 'My Learnings',
    dash_nav_profile: 'Profile',
  },

  te: {
    // Navbar
    nav_home: 'హోమ్', nav_about: 'మా గురించి', nav_courses: 'సాఫ్ట్‌వేర్ ప్రోగ్రామ్‌లు',
    nav_batches: 'రాబోయే బ్యాచ్‌లు', nav_placements: 'ప్లేస్‌మెంట్స్',
    nav_contact: 'సంప్రదించండి', nav_login: 'లాగిన్', nav_register: 'నమోదు చేసుకోండి',
    nav_dashboard: 'డాష్‌బోర్డ్', nav_bottom_home: 'హోమ్',
    nav_bottom_classes: 'కోర్సులు', nav_bottom_about: 'మా గురించి', nav_bottom_login: 'లాగిన్',

    // Hero
    hero_badge: '🚀 రాబోయే ప్రత్యేక బ్యాచ్‌ల ప్రవేశాలు ప్రారంభమయ్యాయి',
    hero_title_1: 'కొత్త టెక్నాలజీలు నేర్చుకోండి, బలమైన నైపుణ్యాలను నిర్మించుకోండి,',
    hero_title_2: 'మరియు మీ డ్రీమ్ జాబ్ వైపు అడుగు వేయండి!',
    hero_subtitle: 'జావా ఫుల్‌స్టాక్, పైథాన్, మెర్న్, క్లౌడ్ & డెవాప్స్ విభాగాలలో లైవ్ ప్రాజెక్ట్‌లతో కూడిన సమగ్ర శిక్షణ మరియు 100% ప్లేస్‌మెంట్ సహకారం.',
    hero_explore: 'టెక్ కోర్సులు చూడండి',
    hero_start: 'ఉచిత డెమో బుక్ చేయండి',
    hero_call_now: 'కాల్ చేయండి: +91-9059519151',
    hero_whatsapp: 'వాట్సాప్ సందేశం',

    // Stats
    stat_students: 'శిక్షణ పొందిన విద్యార్థులు',
    stat_courses: 'టెక్నాలజీ కోర్సులు',
    stat_instructors: 'కార్పొరేట్ మెంటార్లు',
    stat_satisfaction: 'ప్లేస్‌మెంట్ సహకారం',

    // Featured Courses
    featured_title: 'అత్యధిక డిమాండ్ ఉన్న ప్రోగ్రామ్‌లు',
    featured_sub: 'ప్రముఖ ఐటీ కంపెనీల అవసరాలకు అనుగుణంగా రూపొందించిన అత్యాధునిక సాఫ్ట్‌వేర్ కోర్సులు.',
    featured_view_all: 'అన్ని ప్రోగ్రామ్‌లు',
    featured_book_now: 'ఇప్పుడే చేరండి',

    // About
    about_title: 'జెవికె టెక్నాలజీస్ ప్రైవేట్ లిమిటెడ్',
    about_subtitle: 'కొత్త టెక్నాలజీలు నేర్చుకోండి, బలమైన నైపుణ్యాలను నిర్మించుకోండి మరియు మీ కలల ఉద్యోగాన్ని సాధించండి! జెవికె టెక్నాలజీస్ ఆధునిక సాఫ్ట్‌వేర్ శిక్షణలో అగ్రగామి.',
    about_tagline_badge: 'భవిష్యత్ సాఫ్ట్‌వేర్ ఇంజనీర్ల రూపకల్పన',
    about_core_quote_title: 'ప్రాక్టికల్ & ఇండస్ట్రీ విధానం',
    about_core_quote: '“రియల్ టైమ్ కోడింగ్, లైవ్ ప్రాజెక్ట్‌లు మరియు నమ్మకమైన కెరీర్ గైడెన్స్ ద్వారా విద్యార్థులను సమర్థవంతమైన సాఫ్ట్‌వేర్ ఇంజనీర్లుగా మార్చడమే మా లక్ష్యం.”',
    about_philosophy_badge: 'మా శిక్షణ విధానం',
    about_philosophy_heading: 'జెవికె టెక్నాలజీస్‌ను ఎందుకు ఎంచుకోవాలి?',
    about_philosophy_desc: 'పుస్తకాల్లో చదివే జ్ఞానం మాత్రమే ఐటీ ఉద్యోగానికి సరిపోదు. సాఫ్ట్‌వేర్ కంపెనీలలో అసలు ప్రాజెక్ట్‌లు ఎలా నిర్మిస్తారో అలాగే హ్యాండ్స్-ఆన్ ల్యాబ్స్, కోడ్ రివ్యూలు మరియు మాక్ ఇంటర్వ్యూలతో మేము శిక్షణ ఇస్తాము.',

    about_pillar1_title: '100% ప్రాక్టికల్ కోడింగ్ ల్యాబ్స్',
    about_pillar1_desc: 'ప్రతి రోజూ లైవ్ కోడింగ్, గిట్‌హబ్ ప్రాక్టీస్ మరియు డీబగ్గింగ్ నైపుణ్యాలపై ప్రత్యేక దృష్టి.',
    about_pillar2_title: 'టాప్ ఎంఎన్‌సి నిపుణుల మార్గదర్శకత్వం',
    about_pillar2_desc: 'ప్రస్తుతం సాఫ్ట్‌వేర్ కంపెనీలలో పనిచేస్తున్న సీనియర్ ఇంజనీర్లు మరియు టీమ్ లీడ్ల ద్వారా ప్రత్యక్ష శిక్షణ.',
    about_pillar3_title: 'రియల్ టైమ్ ఎంటర్‌ప్రైజ్ ప్రాజెక్ట్‌లు',
    about_pillar3_desc: 'మీ రెజ్యూమ్‌లో నిలిచేలా సరికొత్త మైక్రోసర్వీసెస్ మరియు క్లౌడ్ ప్రాజెక్ట్‌లను స్వయంగా నిర్మించండి.',
    about_pillar4_title: '100% ప్రత్యేక ప్లేస్‌మెంట్ సెల్',
    about_pillar4_desc: 'రెజ్యూమ్ తయారీ, మాక్ ఇంటర్వ్యూలు మరియు 150+ కంపెనీలతో ప్రత్యక్ష ఇంటర్వ్యూ అవకాశాలు.',

    mission_title: 'మా లక్ష్యం',
    mission_p1: 'కాలేజీ చదువుకు మరియు సాఫ్ట్‌వేర్ పరిశ్రమ అవసరాలకు మధ్య ఉన్న అంతరాన్ని తొలగించి ప్రతిభావంతులైన ఇంజనీర్లను తీర్చిదిద్దడం.',
    mission_p2: 'ప్రతి విద్యార్థి ఆత్మవిశ్వాసంతో అధిక వేతనం కలిగిన సాఫ్ట్‌వేర్ ఉద్యోగంలో చేరేలా ప్రోత్సహించడం.',

    vision_title: 'మా దృష్టి',
    vision_p1: 'నాణ్యమైన ప్రాక్టికల్ ఐటీ శిక్షణ మరియు ప్లేస్‌మెంట్స్‌లో అత్యంత విశ్వసనీయమైన అకాడమీగా నిలవడం.',
    vision_p2: 'డిజిటల్ విప్లవానికి సారథ్యం వహించే నైపుణ్యవంతమైన డెవలపర్లు మరియు క్లౌడ్ ఇంజనీర్ల బృందాన్ని సృష్టించడం.',

    about_values_badge: 'మా ప్రాథమిక సూత్రాలు',
    about_values_title: 'మేము పాటించే విలువలు',
    val_authenticity: 'రియల్-వరల్డ్ ప్రాక్టికల్స్',
    val_authenticity_desc: 'సాఫ్ట్‌వేర్ ప్రాడక్ట్స్ తయారీలో ఉపయోగించే సాంకేతికతలపై మాత్రమే సూటిగా శిక్షణ.',
    val_community: 'వ్యక్తిగత శ్రద్ధ & సలహాలు',
    val_community_desc: 'డౌట్ క్లియరింగ్ సెషన్లు మరియు కోడింగ్‌లో ప్రతి విద్యార్థికి ప్రత్యేక సహకారం.',
    val_excellence: 'ఉన్నత సాంకేతిక ప్రమాణాలు',
    val_excellence_desc: 'క్లీన్ కోడ్, డిజైన్ ప్యాటర్న్స్ మరియు ఆధునిక డెవ్‌ఆప్స్ పద్ధతులను నేర్పించడం.',
    val_holism: 'సంపూర్ణ కెరీర్ సన్నద్ధత',
    val_holism_desc: 'కోడింగ్ మొదటి అక్షరం నుండి ఇంటర్వ్యూ సెలక్షన్ మరియు ఆఫర్ లెటర్ వరకు పూర్తి మద్దతు.',
    val_accessibility: 'అందరికీ అందుబాటులో నాణ్యమైన విద్య',
    val_accessibility_desc: 'అనువైన మార్నింగ్, ఈవినింగ్ మరియు వీకెండ్ బ్యాచ్‌లు.',
    val_service: 'నిరంతరాయ ప్లేస్‌మెంట్ సహకారం',
    val_service_desc: 'మీరు కోరుకున్న సాఫ్ట్‌వేర్ ఉద్యోగం సాధించే వరకు నిరంతర ఇంటర్వ్యూ అవకాశాలు.',

    about_verticals_badge: 'ముఖ్యమైన కోర్సులు',
    about_verticals_title: 'ప్రధాన టెక్నాలజీ విభాగాలు',
    vert_yoga_title: 'జావా ఫుల్‌స్టాక్ డెవలప్‌మెంట్',
    vert_yoga_desc: 'కోర్ జావా, స్ప్రింగ్ బూట్, మైక్రోసర్వీసెస్, హైబర్‌నేట్, రియాక్ట్ మరియు క్లౌడ్ డిప్లాయ్‌మెంట్.',
    vert_prana_title: 'పైథాన్ ఫుల్‌స్టాక్ & ఏఐ',
    vert_prana_desc: 'పైథాన్, జాంగో, ఫాస్ట్ ఏపీఐ, ఎస్క్యూఎల్, మెషిన్ లెర్నింగ్ బేసిక్స్ మరియు రియాక్ట్.',
    vert_ayur_title: 'మెర్న్ స్టాక్ డెవలప్‌మెంట్',
    vert_ayur_desc: 'మోంగోడీబీ, ఎక్స్‌ప్రెస్, రియాక్ట్, నోడ్‌జేఎస్, నెక్స్ట్‌జేఎస్ మరియు టైప్‌స్క్రిప్ట్.',
    vert_dhyana_title: 'క్లౌడ్ ఏడబ్ల్యూఎస్ & డెవ్‌ఆప్స్',
    vert_dhyana_desc: 'లైనక్స్, డాకర్, కుబెర్నెటిస్, జెంకిన్స్, టెర్రాఫార్మ్ మరియు క్లౌడ్ ఆర్కిటెక్చర్.',

    about_founder_badge: 'నాయకత్వ సందేశం',
    about_founder_quote: '“ప్రతి విద్యార్థిని బిగినర్ స్థాయి నుండి ప్రొఫెషనల్ సాఫ్ట్‌వేర్ ఇంజనీర్‌గా తీర్చిదిద్దడమే మా నిబద్ధత. జెవికె టెక్నాలజీస్‌తో మీ ఐటీ కల సాకారం అవుతుంది.”',
    about_founder_role: 'డైరెక్టర్ ఆఫ్ ట్రైనింగ్ & కెరీర్స్, జెవికె టెక్నాలజీస్ ప్రైవేట్ లిమిటెడ్',
    about_cta_title: 'ఈరోజే మీ ఐటీ కెరీర్‌ను ప్రారంభించండి',
    about_cta_sub: 'రాబోయే బ్యాచ్‌లో చేరి కార్పొరేట్ మెంటార్ల మార్గదర్శకత్వంలో నేర్చుకోండి.',
    about_cta_btn1: 'కోర్సులు చూడండి',
    about_cta_btn2: 'ఉచిత కౌన్సిలింగ్ పొందండి',

    // Contact
    contact_title: 'అడ్మిషన్ల విభాగంతో సంప్రదించండి',
    contact_subtitle: 'మీ సాఫ్ట్‌వేర్ కెరీర్‌ను ప్రారంభించడానికి సిద్ధంగా ఉన్నారా? కాల్ చేయండి లేదా మెసేజ్ పంపండి!',
    contact_info: 'జెవికె టెక్నాలజీస్ చిరునామా',
    contact_call: 'ప్రత్యక్షంగా కాల్ చేయండి', contact_email_us: 'ఈమెయిల్ చేయండి',
    contact_location_label: 'ట్రైనింగ్ క్యాంపస్',
    contact_location_val: 'ప్లాట్ నం 42, టెక్ సైబర్ జోన్, సైబర్ టవర్స్ సమీపంలో, హైటెక్ సిటీ, మాదాపూర్, హైదరాబాద్, తెలంగాణ - 500081',
    contact_send_title: 'కోర్సు వివరాలు & ఉచిత డెమో కోసం దరఖాస్తు',
    contact_name: 'మీ పూర్తి పేరు', contact_email_label: 'మీ ఈమెయిల్ అడ్రస్',
    contact_phone_label: 'ఫోన్ నంబర్ (+91)',
    contact_message: 'ఆసక్తి ఉన్న కోర్సు / మీ సందేశం', contact_send_btn: 'సందేశం పంపండి',

    // Login
    login_welcome: 'జెవికె ఎల్ఎమ్ఎస్ కు స్వాగతం',
    login_subtitle: 'మీ కోర్సు మెటీరియల్స్ మరియు లైవ్ క్లాసుల కోసం లాగిన్ అవ్వండి',
    login_email_placeholder: 'ఈమెయిల్ లేదా మొబైల్ నంబర్',
    login_password_placeholder: 'పాస్‌వర్డ్ నమోదు చేయండి',
    login_password: 'పాస్‌వర్డ్', login_forgot: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    login_trouble: 'లాగిన్ కావడంలో సమస్య ఉందా?',
    login_btn: 'లాగిన్', login_loading: 'లాగిన్ అవుతోంది...',
    login_no_account: 'కొత్తగా చేరుతున్నారా?',
    login_signup: 'ఇక్కడ నమోదు చేసుకోండి', login_or: 'లేదా',
    login_google: 'గూగుల్ తో లాగిన్ అవ్వండి', login_google_loading: 'కనెక్ట్ అవుతోంది...',
    login_apple: 'యాపిల్ తో లాగిన్ అవ్వండి',

    // Register
    register_join: 'మీ ప్రయాణం ప్రారంభించండి!', register_title: 'విద్యార్థి ఖాతాను సృష్టించండి',
    register_email: 'ఈమెయిల్ లేదా మొబైల్ నంబర్',
    register_password: 'పాస్‌వర్డ్', register_confirm: 'పాస్‌వర్డ్ నిర్ధారించండి',
    register_btn: 'రిజిస్ట్రేషన్ పూర్తి చేయండి', register_loading: 'ఖాతా సృష్టించబడుతోంది...',
    register_have_account: 'ఇప్పటికే ఖాతా ఉందా?', register_login_link: 'లాగిన్',

    // Courses
    course_details: 'కోర్సు పూర్తి వివరాలు', course_about: 'ఈ ప్రోగ్రామ్ గురించి',
    course_learn: 'మీరు నేర్చుకునే నైపుణ్యాలు', course_enroll: 'ఈ బ్యాచ్‌లో చేరండి',
    course_ready: 'మీ సాఫ్ట్‌వేర్ కెరీర్‌ను మార్చడానికి సిద్ధంగా ఉన్నారా?', course_join_thousands: '10,000+ పూర్వ విద్యార్థులతో చేరండి',
    course_access: 'యాక్సెస్', course_lifetime: 'లైఫ్‌టైమ్ ఎల్ఎమ్ఎస్ యాక్సెస్',
    course_format: 'ఫార్మాట్', course_ondemand: 'లైవ్ ఇంటరాక్టివ్ + ల్యాబ్ రికార్డింగ్స్',
    course_all: 'అన్ని సాఫ్ట్‌వేర్ కోర్సులు',
    course_discover: 'మీకు నచ్చిన టెక్నాలజీని ఎంచుకుని ప్రముఖ కార్పొరేట్ ట్రైనర్ల వద్ద నేర్చుకోండి.',
    course_search: 'టెక్నాలజీ పేరుతో శోధించండి (ఉదా: జావా, పైథాన్, రియాక్ట్)...', course_no_found: 'కోర్సులు కనుగొనబడలేదు',
    course_no_found_sub: 'జావా, పైథాన్, మెర్న్, క్లౌడ్ అని శోధించి చూడండి.',

    // Home - Categories
    home_categories_title: 'టాప్ టెక్నాలజీ కోర్సులు',
    home_categories_sub: 'బిగినర్ నుండి ఎంటర్‌ప్రైజ్ ప్రొడక్షన్ కోడర్ వరకు ఎదగడానికి రూపొందించిన సిలబస్.',
    home_cat_view: 'సిలబస్ చూడండి',
    home_trusted: 'మా విద్యార్థులు ప్రముఖ గ్లోబల్ ఐటీ కంపెనీలలో పనిచేస్తున్నారు',
    
    // Home - How it works
    home_how_title: 'ఉద్యోగ సాధనలో 4 దశల ప్రయాణం',
    home_how_sub: 'మా క్రమశిక్షణతో కూడిన పద్ధతి మీకు ఆత్మవిశ్వాసాన్ని మరియు బలమైన కోడింగ్ నైపుణ్యాన్ని ఇస్తుంది.',
    home_step1_title: 'దశ 1: ఫండమెంటల్స్ & కోడింగ్ ప్రాక్టీస్', home_step1_desc: 'సింటాక్స్, లాజిక్ బిల్డింగ్, మరియు డేటా స్ట్రక్చర్లపై రోజువారీ ప్రత్యక్ష శిక్షణ.',
    home_step2_title: 'దశ 2: అత్యాధునిక ఫ్రేమ్‌వర్క్స్ & టూల్స్', home_step2_desc: 'స్ప్రింగ్ బూట్, రియాక్ట్, డాకర్ వంటి అధునాతన టూల్స్‌తో ప్రొడక్షన్ ప్రాక్టీస్.',
    home_step3_title: 'దశ 3: రియల్ టైమ్ క్యాప్‌స్టోన్ ప్రాజెక్ట్స్', home_step3_desc: 'ఇంటర్వ్యూలలో ప్రదర్శించడానికి సరిపోయే పూర్తి స్థాయి క్లౌడ్ ప్రాజెక్ట్‌ల నిర్మాణం.',
    home_step4_title: 'దశ 4: మాక్ ఇంటర్వ్యూలు & ప్లేస్‌మెంట్ డ్రైవ్స్', home_step4_desc: 'సాంకేతిక మరియు హెచ్ఆర్ మాక్ ఇంటర్వ్యూలు, రెజ్యూమ్ బిల్డింగ్ మరియు కంపెనీ ఇంటర్వ్యూలు.',
    home_completed: 'పూర్తయింది', home_lessons: '100+ లైవ్ గంటలు',
    
    // Home - Why choose us
    home_why_title: 'జెవికె టెక్నాలజీస్ ను ఎందుకు ఎంచుకోవాలి?',
    home_why1_title: 'సీనియర్ కార్పొరేట్ మెంటార్లు', home_why1_desc: 'ఐటీ రంగంలో 10+ సంవత్సరాల అనుభవం ఉన్న నిపుణుల ద్వారా నేరుగా నేర్చుకోండి.',
    home_why2_title: 'రియల్ టైమ్ ప్రాజెక్టులు', home_why2_desc: 'పరిశ్రమ స్థాయి సమస్యలకు పరిష్కారాలు కనుగొనే ఆధునిక ప్రాజెక్ట్ అనుభవం.',
    home_why3_title: '100% ప్లేస్‌మెంట్ మద్దతు', home_why3_desc: 'ఇంటర్వ్యూ తయారీ, రెజ్యూమ్ సవరణ మరియు నేరుగా కంపెనీ రిఫరల్స్.',
    
    // Home - CTA
    home_cta_title: 'మీ డ్రీమ్ ఐటీ ఉద్యోగాన్ని సాధించడానికి సిద్ధమా?',
    home_cta_sub: 'ఈరోజే మా కెరీర్ కౌన్సెలర్లతో మాట్లాడండి లేదా ఉచిత లైవ్ డెమోలో పాల్గొనండి.',
    home_cta_btn: 'తదుపరి బ్యాచ్‌లో చేరండి',
    home_view_all_mobile: 'అన్ని ప్రోగ్రామ్‌లు',

    // CTA
    cta_title: 'జెవికె టెక్నాలజీస్ తో మీ నైపుణ్యాలను పెంచుకోండి',
    cta_sub: 'సాఫ్ట్‌వేర్ రంగంలో విజయం సాధించే దిశగా మొదటి అడుగు వేయండి.',
    cta_btn: 'ఇప్పుడే చేరండి',

    // Footer
    footer_desc: 'జెవికె టెక్నాలజీస్ ప్రైవేట్ లిమిటెడ్ విద్యార్థులకు ఆధునిక ఐటీ నైపుణ్యాలను అందించి వారి కలల ఉద్యోగాలను సాధించడంలో సహాయపడే ప్రముఖ సాఫ్ట్‌వేర్ శిక్షణా సంస్థ.',
    footer_quick: 'ముఖ్యమైన లింకులు', footer_legal: 'నిబంధనలు',
    footer_privacy: 'గోప్యతా విధానం', footer_terms: 'నిబంధనలు & షరతులు',
    footer_refund: 'రీఫండ్ విధానం',
    footer_copy: 'జెవికె టెక్నాలజీస్ ప్రైవేట్ లిమిటెడ్. సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.',

    // Dashboard Nav
    dash_nav_home: 'డాష్‌బోర్డ్',
    dash_nav_courses: 'అన్ని కోర్సులు',
    dash_nav_classes: 'నా బ్యాచ్‌లు',
    dash_nav_learning: 'నా లెర్నింగ్స్',
    dash_nav_profile: 'ప్రొఫైల్',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('app_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const useAutoTranslate = (textEn, textTe) => {
  const { lang } = useLanguage();
  if (lang === 'te' && textTe) return textTe;
  return textEn || '';
};
