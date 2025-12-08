export const portfolioData = {
  personal: {
    name: "Ajdin Šahinbegović",
    title: "Specialized Software Engineer", // REBRANDED
    subtitle: "Frontend Architecture & Design Systems",
    summary:
      "I specialize in bridging the gap between complex backend logic and fluid user interfaces. My focus is on performance, accessibility, and scalability—ensuring that beautiful experiences are also robust products.",
    email: "ajdinsheki@gmail.com",
    linkedin: "https://www.linkedin.com/in/ajdin-sahinbegovic",
    github: "https://github.com/Shekey",
  },
  header: {
    name: "Ajdin Šahinbegović",
    title: "Specialized Software Engineer",
    subtitle: "Frontend Architecture & Design Systems",
    contact: {
      email: "ajdinsheki@gmail.com",
      linkedin: "https://www.linkedin.com/in/ajdin-sahinbegovic",
    },
  },
  // The Manifesto Text
  statement: {
    text: "I believe that robust architecture and fluid creativity are not opposites. They are the twin engines of a truly great digital product. Code is the structure; motion is the soul.",
  },
  // The Projects (Moved from component)
  projects: [
    {
      id: 1,
      title: "Fintech Dashboard",
      cat: "Architecture",
      img: "https://picsum.photos/id/1/600/800",
      link: "#",
    },
    {
      id: 2,
      title: "E-Commerce API",
      cat: "Backend",
      img: "https://picsum.photos/id/2/600/600",
      link: "#",
    },
    {
      id: 3,
      title: "Design System",
      cat: "DesignOps",
      img: "https://picsum.photos/id/3/600/900",
      link: "#",
    },
    {
      id: 4,
      title: "Health App",
      cat: "Mobile",
      img: "https://picsum.photos/id/4/600/700",
      link: "#",
    },
    {
      id: 5,
      title: "Crypto Landing",
      cat: "WebGL",
      img: "https://picsum.photos/id/5/600/800",
      link: "#",
    },
    {
      id: 6,
      title: "SaaS Platform",
      cat: "Fullstack",
      img: "https://picsum.photos/id/6/600/600",
      link: "#",
    },
    {
      id: 7,
      title: "Agency Portfolio",
      cat: "Creative",
      img: "https://picsum.photos/id/7/600/750",
      link: "#",
    },
    {
      id: 8,
      title: "Real Estate Map",
      cat: "Mapbox",
      img: "https://picsum.photos/id/8/600/600",
      link: "#",
    },
  ],
  // Technical Specs (Replaces Control Panel data)
  specs: {
    architecture: [
      "Next.js (App Router)",
      "React Server Components",
      "Micro-frontends",
      "TurboRepo",
    ],
    designEngine: [
      "Tailwind CSS v4",
      "GSAP / Framer Motion",
      "Three.js (R3F)",
      "Figma API",
    ],
    backend: ["Node.js", "NestJS", "PostgreSQL", "Redis", "GraphQL"],
    quality: [
      "TypeScript (Strict)",
      "Zod Validation",
      "Playwright",
      "WCAG 2.1 AA",
    ],
  },
  jobs: [
    {
      company: "Dr. Oetker",
      role: "Software Engineer | DesignOps",
      period: "Aug 2025 — Present",
      highlights: [
        "Developed custom internal tool to automate extraction of CSS tokens from Figma.",
        "Architected Search & Discovery improvements using advanced Algolia models.",
        "Continuously deploying features to Greenfield architecture.",
      ],
    },
    {
      company: "Oetker Digital",
      role: "Software Engineer | System Architecture",
      period: "Nov 2022 — Aug 2025",
      highlights: [
        "Architected a multi-brand system integration reducing operational costs by 40%.",
        "Executed zero-downtime migration for 40 domains & 10+ locales.",
        "Led the Design System initiative, reducing UI defects by 90%.",
      ],
    },
    {
      company: "Indevitus",
      role: "Frontend Developer | Team Lead",
      period: "Feb 2022 — Nov 2022",
      highlights: [
        "Led a team of 3 developers, enforcing code quality standards.",
        "Engineered custom animations and skeleton screens for perceived performance.",
      ],
    },
  ],
};
