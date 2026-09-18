const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Course = require('../models/Course');
const Class = require('../models/Class');
const Material = require('../models/Material');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jvk';

const softwareCoursesData = [
  {
    title: 'Java Full Stack Development with Spring Boot & React',
    title_te: 'స్ప్రింగ్ బూట్ మరియు రియాక్ట్‌తో జావా ఫుల్ స్టాక్ డెవలప్‌మెంట్',
    slug: 'java-full-stack',
    description: 'Master Core Java, Object-Oriented Design, Spring Boot microservices, Hibernate/JPA, REST APIs, React 19 frontend, and AWS deployment with live MNC-grade projects and 100% placement assistance.',
    description_te: 'కోర్ జావా, స్ప్రింగ్ బూట్ మైక్రోసర్వీసెస్, హైబర్‌నేట్/JPA, REST APIలు, రియాక్ట్ 19 ఫ్రంటెండ్ మరియు AWS క్లౌడ్ డెవలప్‌మెంట్‌లను లైవ్ ప్రాజెక్ట్‌లతో నేర్చుకోండి.',
    category: 'Full Stack Java',
    instructor: 'JVK Tech Lead (Ex-TCS Lead)',
    durationMonths: 3.5,
    duration: '3.5 Months',
    startDate: new Date('2026-09-22'),
    endDate: new Date('2026-12-30'),
    timings: '07:30 AM to 09:00 AM IST',
    level: 'Comprehensive',
    language: 'English & Telugu',
    price: 18999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Core Java & OOPs Architecture',
      'Spring Boot 3 & Microservices',
      'Hibernate & PostgreSQL/MySQL',
      'React 19 & Tailwind UI',
      'Docker & AWS Deployment'
    ],
    whatYouWillLearn: [
      'Core Java & Object-Oriented Programming (OOP) fundamentals with collections and multithreading',
      'Advanced Spring Boot 3 microservices architecture with Spring Cloud & Eureka',
      'Hibernate ORM, Spring Data JPA, and PostgreSQL / MySQL database modeling',
      'Modern Frontend Development with React 19, Tailwind CSS, and Redux Toolkit',
      'Building secure RESTful APIs with JWT authentication and OAuth2',
      'DevOps CI/CD pipelines, Docker containerization, and AWS EC2 deployment'
    ],
    isPublished: true,
    sessionsCount: 60,
    startTime: '07:30',
    meetingIdPrefix: '849201'
  },
  {
    title: 'Python Full Stack & AI Machine Learning Track',
    title_te: 'పైథాన్ ఫుల్ స్టాక్ మరియు AI మెషిన్ లెర్నింగ్ ట్రాక్',
    slug: 'python-full-stack',
    description: 'Comprehensive software program covering Python core, Django, FastAPI, PostgreSQL, asynchronous APIs, React integration, and real-world GenAI/Machine Learning APIs. Designed for fast-track career switches.',
    description_te: 'పైథాన్ కోర్, జంగో, ఫాస్ట్API, పోస్ట్‌గ్రెస్QL, రియాక్ట్ మరియు AI మోడల్స్ ఇంటిగ్రేషన్‌తో ఆధునిక సాఫ్ట్‌వేర్ ఇంజనీరింగ్ ట్రాక్.',
    category: 'Python & AI',
    instructor: 'Senior AI Engineer',
    durationMonths: 3,
    duration: '3 Months',
    startDate: new Date('2026-09-23'),
    endDate: new Date('2026-12-25'),
    timings: '07:00 PM to 08:30 PM IST',
    level: 'Beginner',
    language: 'English & Telugu',
    price: 16999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Python Syntax & Data Structures',
      'Django & Django REST Framework',
      'FastAPI & Async Architectures',
      'PostgreSQL & SQLAlchemy ORM',
      'GenAI APIs & LangChain'
    ],
    whatYouWillLearn: [
      'Python syntax, OOPs, decorators, generators, and data structures',
      'Web application development using Django and Django REST Framework',
      'High-performance async API development with FastAPI and Pydantic',
      'Database management with PostgreSQL, SQLite, and SQLAlchemy ORM',
      'Modern React frontend for interactive dashboards and AI chat interfaces',
      'Integration with OpenAI, LangChain, and machine learning models'
    ],
    isPublished: true,
    sessionsCount: 50,
    startTime: '19:00',
    meetingIdPrefix: '849202'
  },
  {
    title: 'MERN Stack Web Development Masterclass',
    title_te: 'MERN స్టాక్ వెబ్ డెవలప్‌మెంట్ మాస్టర్‌క్లాస్',
    slug: 'mern-stack',
    description: 'Learn to build highly scalable, full-stack web applications using MongoDB, Express.js, React 19, and Node.js. Includes advanced TypeScript, server-side state management, cloud deployments, and interview preparation.',
    description_te: 'మోంగోDB, ఎక్స్‌ప్రెస్, రియాక్ట్ 19 మరియు నోడ్.js లతో ప్రొఫెషనల్ వెబ్ అప్లికేషన్లను రూపొందించండి.',
    category: 'MERN Stack',
    instructor: 'Full Stack Tech Lead',
    durationMonths: 3,
    duration: '3 Months',
    startDate: new Date('2026-09-24'),
    endDate: new Date('2026-12-25'),
    timings: '06:00 PM to 07:30 PM IST',
    level: 'Intermediate',
    language: 'English & Telugu',
    price: 17499,
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Modern JavaScript (ES6+) & TypeScript',
      'Node.js Architecture & Express REST APIs',
      'MongoDB Atlas & Aggregation Pipelines',
      'React 19 & Redux Toolkit',
      'Full Stack CI/CD Deployment'
    ],
    whatYouWillLearn: [
      'Modern JavaScript (ES6+) and TypeScript fundamentals',
      'Building performant REST APIs using Node.js and Express.js',
      'NoSQL database architecture with MongoDB Atlas & Mongoose',
      'Dynamic single-page applications with React 19 and Next.js',
      'Global state management with Redux Toolkit and React Query',
      'Deploying apps to Vercel, Render, and AWS with continuous deployment'
    ],
    isPublished: true,
    sessionsCount: 50,
    startTime: '18:00',
    meetingIdPrefix: '849203'
  },
  {
    title: 'Cloud AWS, Azure & DevOps Engineering',
    title_te: 'క్లౌడ్ AWS, Azure మరియు డెవాప్స్ ఇంజనీరింగ్',
    slug: 'aws-devops',
    description: 'Hands-on practical training covering Linux administration, AWS core services, Docker containerization, Kubernetes orchestration, Jenkins CI/CD pipelines, Ansible configuration, and Terraform Infrastructure as Code.',
    description_te: 'లైనక్స్, AWS క్లౌడ్ ఆర్కిటెక్చర్, డాకర్, కుబర్నెటిస్ మరియు జెంకిన్స్ CI/CD పైప్‌లైన్‌లతో హ్యాండ్స్-ఆన్ ప్రాక్టికల్ ట్రైనింగ్.',
    category: 'Cloud & DevOps',
    instructor: 'Principal Cloud Architect',
    durationMonths: 3,
    duration: '3 Months',
    startDate: new Date('2026-09-26'),
    endDate: new Date('2026-12-28'),
    timings: '10:00 AM to 01:00 PM IST',
    level: 'Advanced',
    language: 'English & Telugu',
    price: 19999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Linux Administration & Shell Automation',
      'AWS Core Services (EC2, S3, RDS, IAM)',
      'Docker Containerization & Compose',
      'Kubernetes Cluster Orchestration',
      'Jenkins CI/CD & Terraform IaC'
    ],
    whatYouWillLearn: [
      'Linux commands, Bash shell scripting, and user security permissions',
      'AWS Cloud Services: EC2, VPC, S3, RDS, IAM, Route53, and Lambda',
      'Containerization using Docker, Dockerfile, and multi-container Docker Compose',
      'Kubernetes Cluster Management, Pods, Deployments, Services, and Ingress',
      'Automated CI/CD with Jenkins, GitHub Actions, and Webhooks',
      'Infrastructure as Code (IaC) using Terraform scripts'
    ],
    isPublished: true,
    sessionsCount: 45,
    startTime: '10:00',
    meetingIdPrefix: '849204'
  },
  {
    title: 'Software Automation Testing (Selenium, Java & API)',
    title_te: 'సాఫ్ట్‌వేర్ ఆటోమేషన్ టెస్టింగ్ (సెలీనియం, జావా మరియు API)',
    slug: 'software-testing',
    description: 'End-to-end QA training covering manual testing methodologies, SDLC/STLC, Core Java for automation, Selenium WebDriver, TestNG framework, Cucumber BDD, and API testing with Postman and RestAssured.',
    description_te: 'మాన్యువల్ టెస్టింగ్, సెలీనియం వెబ్‌డ్రైవర్, TestNG ఫ్రేమ్‌వర్క్ మరియు Postman API టెస్టింగ్‌లతో కంప్లీట్ సాఫ్ట్‌వేర్ టెస్టింగ్ కోర్స్.',
    category: 'Software Testing',
    instructor: 'Lead QA Architect',
    durationMonths: 2.5,
    duration: '2.5 Months',
    startDate: new Date('2026-09-25'),
    endDate: new Date('2026-12-10'),
    timings: '08:00 AM to 09:30 AM IST',
    level: 'All Levels',
    language: 'English & Telugu',
    price: 14999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Manual Testing & Agile STLC in Jira',
      'Java for Automation & OOP Concepts',
      'Selenium WebDriver & Locators Strategy',
      'TestNG & Cucumber BDD Frameworks',
      'Postman & RestAssured API Testing'
    ],
    whatYouWillLearn: [
      'Manual testing processes, test case design, bug life cycle, and Jira',
      'Core Java programming tailored specifically for test automation',
      'Selenium WebDriver architecture, locators, and dynamic web element handling',
      'TestNG test framework, assertions, data providers, and reporting',
      'Behavior Driven Development (BDD) with Cucumber and Gherkin',
      'Postman and RestAssured for REST API test automation'
    ],
    isPublished: true,
    sessionsCount: 40,
    startTime: '08:00',
    meetingIdPrefix: '849205'
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully.');

    // Clear old courses
    await Course.deleteMany({});
    console.log('Cleared existing courses in JVK database.');

    // Insert software courses
    const inserted = await Course.insertMany(softwareCoursesData);
    console.log(`Successfully seeded ${inserted.length} software engineering tracks:`);
    inserted.forEach(c => console.log(`- ${c.title} (Slug: ${c.slug}, Price: ₹${c.price})`));

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
