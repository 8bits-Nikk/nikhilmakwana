import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

// Skill Logos
import LogoJavascript from "/public/images/logos/icon-javascript.svg";
import LogoTypescript from "/public/images/logos/icon-typescript.svg";
import LogoReact from "/public/images/logos/icon-react.svg";
import LogoJava from "/public/images/logos/icon-java.svg";
import LogoSpring from "/public/images/logos/icon-spring.svg";
import LogoAndroid from "/public/images/logos/icon-android.svg";
import LogoFirebase from "/public/images/logos/icon-firebase.svg";
import LogoGitLab from "/public/images/logos/icon-gitlab.svg";
import LogoNodejs from "/public/images/logos/icon-nodejs.svg";
import LogoExpress from "/public/images/logos/icon-express.svg";
import LogoExpressLight from "/public/images/logos/icon-express-light.svg";
import LogoSocket from "/public/images/logos/icon-socket.svg";
import LogoSocketLight from "/public/images/logos/icon-socket-light.svg";
import LogoPostgreSQL from "/public/images/logos/icon-postgresql.svg";
import LogoMongoDB from "/public/images/logos/icon-mongodb.svg";
import LogoFigma from "/public/images/logos/icon-figma.svg";
import LogoGit from "/public/images/logos/icon-git.svg";

// Company Logos
import LogoCephei from "/public/images/logos/cephei-logo.png";
import LogoTatva from "/public/images/logos/tatva-logo.svg";
import LogoTatvaLight from "/public/images/logos/tatva-logo-light.png";

import AvatarDummy from "/public/images/avatar-dummy.svg";

import {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from "@/lib/types";

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/8bits-Nikk",
  TWITTER: "https://x.com/_nikhil_makwana?s=21",
};

export const NAV_LINKS = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export const SOCIAL_LINKS = [
  {
    icon: Github,
    url: "https://github.com/8bits-Nikk",
  },
  {
    icon: Twitter,
    url: "https://x.com/_nikhil_makwana?s=21",
  },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/nikhil-makwana2000?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/nikhil_2.10?igsh=ZmhpaXo5MzhjdThl&utm_source=qr",
  },
];

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: "Javascript",
    logo: LogoJavascript,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    label: "Typescript",
    logo: LogoTypescript,
    url: "https://www.typescriptlang.org/",
  },
  {
    label: "Java",
    logo: LogoJava,
    url: "https://www.java.com/en/",
  },
  {
    label: "React Native",
    logo: LogoReact,
    url: "https://reactnative.dev/",
  },
  {
    label: "React",
    logo: LogoReact,
    url: "https://react.dev/",
  },
  {
    label: "Android",
    logo: LogoAndroid,
    url: "https://www.android.com/intl/en_in/",
  },
  {
    label: "Spring Boot",
    logo: LogoSpring,
    url: "https://spring.io/",
  },
  {
    label: "Node.js",
    logo: LogoNodejs,
    url: "https://nodejs.org/en",
  },
  {
    label: "Express.js",
    logo: LogoExpress,
    darkModeLogo: LogoExpressLight,
    url: "https://expressjs.com/",
  },
  {
    label: "Socket.io",
    logo: LogoSocket,
    darkModeLogo: LogoSocketLight,
    url: "https://socket.io/",
  },
  {
    label: "Firebase",
    logo: LogoFirebase,
    url: "https://firebase.google.com/",
  },
  {
    label: "PostgreSQL",
    logo: LogoPostgreSQL,
    url: "https://www.postgresql.org/",
  },
  {
    label: "MongoDB",
    logo: LogoMongoDB,
    url: "https://www.mongodb.com/",
  },
  {
    label: "Git",
    logo: LogoGit,
    url: "https://git-scm.com/",
  },
  {
    label: "GitLab",
    logo: LogoGitLab,
    url: "https://about.gitlab.com/",
  },
  {
    label: "Figma",
    logo: LogoFigma,
    url: "https://www.figma.com/",
  },
];

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: LogoCephei,
    logoAlt: "Cepheiinfotech logo",
    position: "Senior Software Engineer",
    startDate: new Date(2025, 7),
    currentlyWorkHere: true,
    summary: [
      "Developing Reliable and Scalable B2B mobile application.",
      "Worked with React Native, Typescript, Nest JS, PostgreSQL, Microservices, Kafka and others.",
    ],
  },
  {
    logo: LogoTatvaLight,
    logoAlt: "Tatvasoft logo",
    position: "Software Engineer",
    startDate: new Date(2021, 10),
    endDate: new Date(2025, 7),
    currentlyWorkHere: false,
    summary: [
      "Worked for various clients and projects, including mobile applications, web applications, and APIs.",
      "Worked with a variety of technologies, including React Native, Typescript, Firebase, Java, PostgreSQL, Spring Boot and others.",
    ],
  },
];

export const PROJECTS: ProjectDetails[] = [
  {
    name: "SAN Global Fashion – Internal Product Catalog App",
    description:
      "Built a React Native mobile app for SAN Global Fashion to streamline internal product browsing and selection for company employees.",
    url: "https://sanglobalfashion.com/",
    keyFeatures: [
      "Category-based product filtering",
      "Detailed product pages with images and specifications",
      "Product selection and bookmarking functionality",
      "Dynamic PDF catalog generation based on selected products",
      "Optimized for performance and usability across devices",
    ],
    technologies: [
      "React Native",
      "Typescript",
      "Reactive Programming",
      "Styled Components",
      "Context",
      "PDF generation",
      "Unlisted app distribution",
    ],
  },
  {
    name: "Prana-AI – All-in-One AI Health Manager",
    description:
      "Developed a comprehensive AI-powered health management app using React Native, integrating Google Fit and Apple Health to provide real-time health tracking, personalized workout and diet plans, and live video consultations.",
    url: "https://play.google.com/store/apps/details?id=com.prana.ai.app&hl=en_IN",
    keyFeatures: [
      "Google Fit / Apple HealthKit integration for activity and health data",
      "AI Workout Assistant with personalized fitness guidance",
      "Diet Planner tailored to user goals and preferences",
      "Goal tracking and achievement rewards",
      "Video calls with experts via Zoom Meeting SDK (native module integration)",
    ],
    technologies: [
      "React Native",
      "Typescript",
      "Reactive Programming",
      "FCM",
      "Google Fit",
      "Apple health",
      "Zoom Meed SDK",
      "In App Notifications",
    ],
  },
  {
    name: "Banking Loan App – UAE Loan Management Platform",
    description:
      "Worked on a secure, mobile banking application (project under NDA) for managing personal loans in the UAE, with integration of UAE PASS Digital Vault APIs for verified user identity and data access.",
    keyFeatures: [
      "Fetch user details securely using UAE PASS Digital Vault",
      "Manage loan details, payment schedules, and transaction history",
      "View outstanding balances, due dates, and loan summaries",
      "Seamless and secure login with identity verification",
      "User-friendly interface with real-time updates",
      "Microsoft Dynamics CRM module for help and quick support",
    ],
    technologies: [
      "React Native",
      "Typescript",
      "Context",
      "UAE PASS APIs",
      "RESTful APIs",
      "Axios",
      "MMKV",
      "FCM",
    ],
  },
  {
    name: "Healthcare App (UAE-based)",
    description: "A comprehensive health management platform",
    keyFeatures: [
      "Book medical appointments with doctors and specialists",
      "Link and manage family members under a single account",
      "Fetch health records using UAE national ID",
      "Conduct teleconsultations via Zoom Video SDK",
      "Handle payments for consultations and services",
    ],
    technologies: [
      "React Native",
      "Zoom Video SDK",
      "REST API",
      "Firebase",
      "Local UAE gateway",
      "Secure Auth",
      "Deep Linking",
    ],
  },
  {
    name: "PIMS.AI – Performance Intelligence & Monitoring System",
    description:
      "Developed a monolithic Java Spring Boot REST API application for PIMS.AI, designed to collect, process, and analyze operational data from oil, grease, and petroleum companies.",
    keyFeatures: [
      "REST APIs to collect and store field and production data",
      "Data processing and performance analytics engine",
      "Auto-generated yearly performance reports with insights",
      "Recommendation engine to provide improvement suggestions for the upcoming year",
      "API-based integration with external data sources and internal dashboards",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "JDBC Template",
      "REST APIs",
      "MSSQL",
      "MapStruct",
      "Lombok",
    ],
  },
];

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: "Gunjan Bhavsar",
    personAvatar: AvatarDummy,
    title: "Team Lead At Tatvasoft",
    testimonial:
      "Nikhil is a hard working person, he is always eager to learn new things and is a good team player. He has a good sense of humour and is a great problem solver.",
  },
];
