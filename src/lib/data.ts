// Skill logos
import LogoJavascript from '@/assets/images/logos/icon-javascript.svg'
import LogoTypescript from '@/assets/images/logos/icon-typescript.svg'
import LogoReact from '@/assets/images/logos/icon-react.svg'
import LogoJava from '@/assets/images/logos/icon-java.svg'
import LogoSpring from '@/assets/images/logos/icon-spring.svg'
import LogoAndroid from '@/assets/images/logos/icon-android.svg'
import LogoFirebase from '@/assets/images/logos/icon-firebase.svg'
import LogoGitLab from '@/assets/images/logos/icon-gitlab.svg'
import LogoNodejs from '@/assets/images/logos/icon-nodejs.svg'
import LogoExpress from '@/assets/images/logos/icon-express.svg'
import LogoExpressLight from '@/assets/images/logos/icon-express-light.svg'
import LogoSocket from '@/assets/images/logos/icon-socket.svg'
import LogoSocketLight from '@/assets/images/logos/icon-socket-light.svg'
import LogoPostgreSQL from '@/assets/images/logos/icon-postgresql.svg'
import LogoMongoDB from '@/assets/images/logos/icon-mongodb.svg'
import LogoFigma from '@/assets/images/logos/icon-figma.svg'
import LogoGit from '@/assets/images/logos/icon-git.svg'
import LogoNestjs from '@/assets/images/logos/icon-nestjs.svg'
import LogoDocker from '@/assets/images/logos/icon-docker.svg'
import LogoPython from '@/assets/images/logos/icon-python.svg'
import LogoExpo from '@/assets/images/logos/icon-expo.svg'
import LogoExpoLight from '@/assets/images/logos/icon-expo-light.svg'

// Company logos
import LogoCephei from '@/assets/images/logos/cephei-logo.png'
import LogoTatva from '@/assets/images/logos/tatva-logo-light.png'

import AvatarDummy from '@/assets/images/avatar-dummy.svg'

import { Cloud, Cpu, Database, Sparkles } from 'lucide-react'

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from '@/components/icons/brand-icons'
import type {
  ExperienceDetails,
  NavLink,
  ProjectDetails,
  SocialLink,
  TechCategory,
  TechDetails,
  TestimonialDetails,
} from '@/lib/types'

export const PROFILE = {
  name: 'Nikhil Makwana',
  shortName: 'Nikhil',
  role: 'Senior Software Engineer',
  focus: 'React Native, Java Spring Boot & Node.js',
  location: 'Ahmedabad, India',
  email: 'makwananikhil1448@gmail.com',
  availableForWork: true,
  resumeUrl: '/files/NikhilMakwana.pdf',
} as const

export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/8bits-Nikk',
  TWITTER: 'https://x.com/_nikhil_makwana?s=21',
  LINKEDIN: 'https://www.linkedin.com/in/nikhil-makwana2000',
  INSTAGRAM: 'https://www.instagram.com/nikhil_2.10',
} as const

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', icon: GithubIcon, url: EXTERNAL_LINKS.GITHUB },
  { label: 'X', icon: XIcon, url: EXTERNAL_LINKS.TWITTER },
  { label: 'LinkedIn', icon: LinkedinIcon, url: EXTERNAL_LINKS.LINKEDIN },
  { label: 'Instagram', icon: InstagramIcon, url: EXTERNAL_LINKS.INSTAGRAM },
]

export const TECH_CATEGORIES: TechCategory[] = [
  'Languages',
  'Mobile',
  'Backend',
  'Data & Cloud',
  'AI',
  'Tools',
]

export const TECHNOLOGIES: TechDetails[] = [
  // Languages
  {
    label: 'JavaScript',
    description:
      'The foundation of my day-to-day work across mobile, web and Node.js services.',
    logo: LogoJavascript,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    category: 'Languages',
  },
  {
    label: 'TypeScript',
    description:
      'My default on every new project — strict typing shared across the client and the API.',
    logo: LogoTypescript,
    url: 'https://www.typescriptlang.org/',
    category: 'Languages',
  },
  {
    label: 'Java',
    description:
      'Enterprise backend services and REST APIs, primarily with the Spring ecosystem.',
    logo: LogoJava,
    url: 'https://www.java.com/en/',
    category: 'Languages',
  },
  {
    label: 'Python',
    description:
      'Scripting, automation and working with AI and machine learning tooling.',
    logo: LogoPython,
    url: 'https://www.python.org/',
    category: 'Languages',
  },

  // Mobile
  {
    label: 'React Native',
    description:
      'My primary platform — cross-platform iOS and Android apps, including the new architecture.',
    logo: LogoReact,
    url: 'https://reactnative.dev/',
    category: 'Mobile',
  },
  {
    label: 'Expo',
    description:
      'Managed workflow, EAS builds and over-the-air updates for faster release cycles.',
    logo: LogoExpo,
    darkModeLogo: LogoExpoLight,
    url: 'https://expo.dev/',
    category: 'Mobile',
  },
  {
    label: 'React',
    description:
      'Component-driven web interfaces that share patterns and logic with my mobile work.',
    logo: LogoReact,
    url: 'https://react.dev/',
    category: 'Mobile',
  },
  {
    label: 'Android',
    description:
      'Native Android foundations and custom native modules bridged into React Native.',
    logo: LogoAndroid,
    url: 'https://www.android.com/intl/en_in/',
    category: 'Mobile',
  },

  // Backend
  {
    label: 'Node.js',
    description:
      'REST APIs and real-time services powering the mobile applications I build.',
    logo: LogoNodejs,
    url: 'https://nodejs.org/en',
    category: 'Backend',
  },
  {
    label: 'NestJS',
    description:
      'Structured, modular TypeScript services — my current backend framework of choice.',
    logo: LogoNestjs,
    url: 'https://nestjs.com/',
    category: 'Backend',
  },
  {
    label: 'Express.js',
    description:
      'Lightweight APIs and middleware where a full framework is not warranted.',
    logo: LogoExpress,
    darkModeLogo: LogoExpressLight,
    url: 'https://expressjs.com/',
    category: 'Backend',
  },
  {
    label: 'Spring Boot',
    description:
      'Enterprise-grade Java REST APIs, with Spring MVC and Spring Data JPA.',
    logo: LogoSpring,
    url: 'https://spring.io/',
    category: 'Backend',
  },
  {
    label: 'Socket.io',
    description:
      'Real-time messaging, presence and live updates over WebSockets.',
    logo: LogoSocket,
    darkModeLogo: LogoSocketLight,
    url: 'https://socket.io/',
    category: 'Backend',
  },

  // Data & Cloud
  {
    label: 'PostgreSQL',
    description:
      'Relational schema design, migrations and query tuning for production workloads.',
    logo: LogoPostgreSQL,
    url: 'https://www.postgresql.org/',
    category: 'Data & Cloud',
  },
  {
    label: 'Oracle',
    description:
      'Enterprise relational databases and stored procedures in client environments.',
    icon: Database,
    iconColor: '#C74634',
    url: 'https://www.oracle.com/database/',
    category: 'Data & Cloud',
  },
  {
    label: 'MongoDB',
    description:
      'Document storage for flexible, rapidly evolving data models.',
    logo: LogoMongoDB,
    url: 'https://www.mongodb.com/',
    category: 'Data & Cloud',
  },
  {
    label: 'Firebase',
    description:
      'Authentication, Firestore, Cloud Messaging and analytics for mobile apps.',
    logo: LogoFirebase,
    url: 'https://firebase.google.com/',
    category: 'Data & Cloud',
  },
  {
    label: 'AWS',
    description:
      'Deploying and running application services on managed cloud infrastructure.',
    icon: Cloud,
    iconColor: '#FF9900',
    url: 'https://aws.amazon.com/',
    category: 'Data & Cloud',
  },

  // AI
  {
    label: 'AI integration',
    description:
      'Building LLM-backed features into products — assistants, summarization and structured extraction.',
    icon: Sparkles,
    iconColor: '#6366F1',
    category: 'AI',
  },
  {
    label: 'On-device AI models',
    description:
      'Running compact models directly on the device for private, low-latency inference offline.',
    icon: Cpu,
    iconColor: '#10B981',
    category: 'AI',
  },

  // Tools
  {
    label: 'Docker',
    description:
      'Containerized builds and reproducible local and deployment environments.',
    logo: LogoDocker,
    url: 'https://www.docker.com/',
    category: 'Tools',
  },
  {
    label: 'Git',
    description:
      'Version control, branching strategy and code review as part of daily delivery.',
    logo: LogoGit,
    url: 'https://git-scm.com/',
    category: 'Tools',
  },
  {
    label: 'GitLab',
    description:
      'CI/CD pipelines, merge requests and issue tracking across team projects.',
    logo: LogoGitLab,
    url: 'https://about.gitlab.com/',
    category: 'Tools',
  },
  {
    label: 'Figma',
    description:
      'Working from designer handoffs and translating them faithfully into UI.',
    logo: LogoFigma,
    url: 'https://www.figma.com/',
    category: 'Tools',
  },
]

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: LogoCephei,
    logoAlt: 'Cephei Infotech logo',
    company: 'Cephei Infotech',
    position: 'Senior Software Engineer',
    location: 'Ahmedabad, India',
    startDate: new Date(2025, 7),
    currentlyWorkHere: true,
    summary: [
      'Building reliable, scalable B2B mobile applications from requirement analysis through to release.',
      'Building Impression, an all-in-one media management platform for Eris Lifesciences spanning web, iPad and mobile.',
      'Working across the stack — from the React Native client to the services behind it.',
    ],
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Amazon S3',
      'Microservices',
      'Kafka',
    ],
  },
  {
    logo: LogoTatva,
    logoAlt: 'TatvaSoft logo',
    company: 'TatvaSoft',
    position: 'Software Engineer',
    location: 'Ahmedabad, India',
    startDate: new Date(2021, 10),
    endDate: new Date(2025, 7),
    summary: [
      'Delivered mobile applications, web applications and APIs for clients across fintech, healthcare and retail.',
      'Owned features end to end, from requirement breakdown through release and post-launch support.',
    ],
    technologies: [
      'React Native',
      'TypeScript',
      'Firebase',
      'Java',
      'Spring Boot',
      'PostgreSQL',
    ],
  },
]

export const PROJECTS: ProjectDetails[] = [
  {
    name: 'Impression',
    category: 'All-in-one media management platform · Eris Lifesciences',
    description:
      'A cross-platform media management platform built at Cephei Infotech for Eris Lifesciences, bringing campaign creation, data collection and automated image and video processing together across web, iPad and mobile.',
    keyFeatures: [
      'Campaign creation with structured data collection across teams',
      'Web-based template builder powered by Konva, alongside a dynamic form generator',
      'Video processing on iPad through a custom native build of FFmpeg',
      'On-device image processing rendered with Skia for a responsive editing experience',
      'AI-assisted image conversion and enhancement',
      'Android and iOS applications built with React Native and the latest Expo SDK',
      'NestJS backend with Amazon S3 for media storage and delivery',
    ],
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Konva',
      'Skia',
      'FFmpeg',
      'Native Modules',
      'NestJS',
      'Amazon S3',
      'AI Image Processing',
    ],
  },
  {
    name: 'SAN Global Fashion',
    category: 'Internal product catalog app',
    description:
      'A React Native application that streamlines internal product browsing, selection and catalog generation for employees at SAN Global Fashion.',
    url: 'https://sanglobalfashion.com/',
    keyFeatures: [
      'Category-based product filtering',
      'Detailed product pages with images and specifications',
      'Product selection and bookmarking functionality',
      'Dynamic PDF catalog generation based on selected products',
      'Optimized for performance and usability across devices',
    ],
    technologies: [
      'React Native',
      'TypeScript',
      'Reactive Programming',
      'Styled Components',
      'Context',
      'PDF generation',
      'Unlisted app distribution',
    ],
  },
  {
    name: 'Prana-AI',
    category: 'AI-powered health management platform',
    description:
      'An AI-powered health management application built with React Native, integrating Google Fit and Apple Health to deliver real-time health tracking, personalized workout and diet plans, and live video consultations.',
    url: 'https://play.google.com/store/apps/details?id=com.prana.ai.app&hl=en_IN',
    keyFeatures: [
      'Google Fit / Apple HealthKit integration for activity and health data',
      'AI workout assistant with personalized fitness guidance',
      'Diet planner tailored to user goals and preferences',
      'Goal tracking and achievement rewards',
      'Video calls with experts via the Zoom Meeting SDK (native module integration)',
    ],
    technologies: [
      'React Native',
      'TypeScript',
      'Reactive Programming',
      'FCM',
      'Google Fit',
      'Apple Health',
      'Zoom Meeting SDK',
      'In-app notifications',
    ],
  },
  {
    name: 'Banking Loan App',
    category: 'UAE loan management platform · under NDA',
    description:
      'A secure mobile banking application for managing personal loans in the UAE, integrating UAE PASS Digital Vault APIs for verified user identity and data access.',
    keyFeatures: [
      'Fetch user details securely using UAE PASS Digital Vault',
      'Manage loan details, payment schedules and transaction history',
      'View outstanding balances, due dates and loan summaries',
      'Seamless and secure login with identity verification',
      'User-friendly interface with real-time updates',
      'Microsoft Dynamics CRM module for help and quick support',
    ],
    technologies: [
      'React Native',
      'TypeScript',
      'Context',
      'UAE PASS APIs',
      'RESTful APIs',
      'Axios',
      'MMKV',
      'FCM',
    ],
  },
  {
    name: 'Healthcare App',
    category: 'UAE-based health management platform',
    description:
      'A health management platform that brings appointments, medical records, family accounts and teleconsultations together in a single application.',
    keyFeatures: [
      'Book medical appointments with doctors and specialists',
      'Link and manage family members under a single account',
      'Fetch health records using UAE national ID',
      'Conduct teleconsultations via the Zoom Video SDK',
      'Handle payments for consultations and services',
    ],
    technologies: [
      'React Native',
      'Zoom Video SDK',
      'REST API',
      'Firebase',
      'Local UAE gateway',
      'Secure Auth',
      'Deep Linking',
    ],
  },
  {
    name: 'PIMS.AI',
    category: 'Performance intelligence & monitoring system',
    description:
      'A monolithic Java Spring Boot REST API application designed to collect, process and analyze operational data from oil, grease and petroleum companies.',
    keyFeatures: [
      'REST APIs to collect and store field and production data',
      'Data processing and performance analytics engine',
      'Auto-generated yearly performance reports with insights',
      'Recommendation engine suggesting improvements for the upcoming year',
      'API-based integration with external data sources and internal dashboards',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring MVC',
      'Spring Data JPA',
      'JDBC Template',
      'REST APIs',
      'MSSQL',
      'MapStruct',
      'Lombok',
    ],
  },
]

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: 'Gunjan Bhavsar',
    personAvatar: AvatarDummy,
    title: 'Team Lead at TatvaSoft',
    testimonial:
      'Nikhil is a hard working person, he is always eager to learn new things and is a good team player. He has a good sense of humour and is a great problem solver.',
  },
]

/** Career start — the earliest role on the timeline. Drives the hero stats. */
export const CAREER_START = EXPERIENCES.reduce(
  (earliest, experience) =>
    experience.startDate < earliest ? experience.startDate : earliest,
  EXPERIENCES[0].startDate,
)
