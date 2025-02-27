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
import LogoUpwork from "/public/images/logos/logo-upwork.svg";
import LogoGreenApex from "/public/images/logos/logo-greenapex.svg";
import LogoGreenApexLight from "/public/images/logos/logo-greenapex-light.svg";
import LogoDotnpixel from "/public/images/logos/logo-dotnpixel.svg";
import LogoDotnpixelLight from "/public/images/logos/logo-dotnpixel-light.svg";

import ProjectFiskil from "/public/images/project-fiskil.png";
import ProjectWingie from "/public/images/project-wingie.png";
import ProjectPepehousing from "/public/images/project-pepehousing.png";

import AvatarKrisztian from "/public/images/avatar-krisztian.png";
import AvatarEugen from "/public/images/avatar-eugen.png";
import AvatarDummy from "/public/images/avatar-dummy.svg";

import {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from "@/lib/types";

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/8bits-Nikk",
  GITHUB_REPO: "https://github.com/shahsagarm/sagarshah.dev",
  TWITTER: "https://x.com/_nikhil_makwana?s=21",
  FIGMA: "https://www.figma.com/@shahsagarm",
  FIGMA_FILE:
    "https://www.figma.com/community/file/1262992249991763120/Personal-Portfolio-Website-Template-%7C-Mobile-%26-Desktop",
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
    logo: LogoUpwork,
    logoAlt: "Tatvasoft logo",
    position: "Software Engineer",
    startDate: new Date(2021, 10),
    currentlyWorkHere: true,
    summary: [
      "Worked for various clients like Fiskil, Shosho, Crowe MacKay LLP.",
      "Worked with a variety of technologies, including React, Next.js, Typescript, Express.js, PostgreSQL, Tailwindcss, Mui, Firebase, Storybook, Cypress, and others.",
    ],
  },
  {
    logo: LogoGreenApex,
    darkModeLogo: LogoGreenApexLight,
    logoAlt: "Tatvasoft logo",
    position: "Trainee Software Engineer",
    startDate: new Date(2017, 6),
    endDate: new Date(2021, 9),
    summary: [
      "Acted as team lead in different projects.",
      "Brainstormed new ideas & gathered requirements for internal projects.",
      "Designed architecture of different projects (frontend + backend).",
      "Worked on enterprise-level projects for a variety of clients.",
      "Handled sprint planning & task distribution.",
    ],
  },
];

export const PROJECTS: ProjectDetails[] = [
  {
    name: "SAN",
    description:
      "A platform for comparing and finding affordable flights, as well as booking and purchasing tickets safely and easily in a few simple clicks.",
    url: "https://sanglobalfashion.com/",
    previewImage: ProjectWingie,
    technologies: [
      "React Native",
      "Typescript",
      "Reactive Programming",
      "Styled Components",
      "Context",
      "PDF generation",
      "Unlisted app distribution"
    ],
  },
  {
    name: "Prana AI",
    description:
      "A platform for accessing real-time open banking and energy data to help you grow your business, backed with scalable back-end infrastructure.",
    url: "https://prana-ai.com/",
    previewImage: ProjectFiskil,
    technologies: [
      "React Native",
      "Typescript",
      "Reactive Programming",
      "Styled Components",
      "Google Fit",
      "Apple health",
      "Zoom Meed SDK",
      "In App Notifications"
    ],
  },
  {
    name: "Diawi",
    description:
      "A platform for renting a flat or room in Poland. You may browse hundreds of verified deals, contact the vendor, and pay online in a simple and secure manner.",
    url: "",
    previewImage: ProjectPepehousing,
    technologies: [
      "React Native",
      "Typescript",
      "Redux",
      "Redux Saga",
      "Zoom Video SDK",
      "Jest"
    ],
  },
];

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: "Gunjan Bhavsar",
    personAvatar: AvatarKrisztian,
    title: "Team Lead At Tatvasoft",
    testimonial:
      "Nikhil is a highly skilled and innovative developer, mastering modern web and mobile technologies while constantly pushing boundaries. His indie hacker mindset and ability to turn ideas into reality make you a true asset to any team!",
  },
  {
    personName: "Sagar Gupta",
    personAvatar: AvatarDummy,
    title: "Project Manager - Builder.ai",
    testimonial:
      "Great guy, highly recommended for any COMPLEX front-end mobile development job! His skills are top-notch asl manage to help backend team and he will be an amazing addition to any team.",
  },
  {
    personName: "Amit Gupta",
    personAvatar: AvatarDummy,
    title: "Project Manager - Builder.ai",
    testimonial:
      "Nikhil was extremely easy and pleasant to work with and he truly cares about the project being a success. Nikhil has a high level of knowledge and was able to work on my fashion application with pdfs without any issues.",
  },
];
