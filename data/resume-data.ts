export const portfolioData = {
  personal: {
    name: "Ajdin Šahinbegović",
    title: "Specialized Software Engineer", // REBRANDED
    subtitle: "Frontend Architecture & Design Systems",
    summary:
      "I specialize in bridging the gap between complex backend logic and fluid user interfaces. My focus is on performance, accessibility, and scalability—ensuring that beautiful experiences are also robust products.",
    email: "ajdinsheki@gmail.com",
    linkedin: "www.linkedin.com/in/ajdin-sahinbegovic",
    github: "github.com/Shekey",
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
  statement: {
    text: "I believe that robust architecture and fluid creativity are not opposites. They are the twin engines of a truly great digital product. Code is the structure; motion is the soul.",
  },
  projects: [
    {
      id: 1,
      title: "Greenfield Multi-Brand",
      cat: "Architecture",
      img: "/project-1.webp",
      link: "https://taylorandcolledge.co.uk/",
      description:
        "Spearheaded a scalable digital platform for Oetker Group. Migrated 2 brands to a single Next.js codebase, enabling rapid digital transformation.",
    },
    {
      id: 2,
      title: "Oetker Global",
      cat: "System Design",
      img: "/project-2.webp",
      link: "https://www.oetker.de",
      description:
        "Managed global digital presence across 40 markets. Engineered a Headless CMS integration with Next.js and Hygraph for localized content.",
    },
    {
      id: 3,
      title: "Porsche Poslo",
      cat: "Fullstack",
      img: "/project-3.webp",
      link: "https://www.poslo.si/",
      description:
        "Responsive multi-language platform with advanced search. Implemented serverless form handling via Netlify Functions and Node.js.",
    },
    {
      id: 4,
      title: "Julius Baer",
      cat: "Frontend Arch",
      img: "/project-4.webp",
      link: "https://www.juliusbaer.com/international/en/",
      description:
        "Applied Atomic Design and BEM methodologies for a high-security banking interface. Ensured compatibility across legacy enterprise browsers (IE10+).",
    },
    {
      id: 5,
      title: "Porsche Now",
      cat: "Creative Dev",
      img: "/project-5.webp",
      link: "https://now.porsche.si/",
      description:
        "Digital experience featuring complex SVG animations and interactive UI. Built with Hugo and Netlify CMS for high performance.",
    },
    {
      id: 6,
      title: "Testiraj Seat & VW",
      cat: "Vue.js Ecosystem",
      img: "/project-6.webp",
      link: "https://konfigurator.seat.si/cc-si/sl_SI_SEAT24/S/models",
      description:
        "Developed scalable test-drive booking platforms for VW and Seat using Vue 3 and Vuex. Created a reusable architecture reducing dev time.",
    },
    {
      id: 7,
      title: "Croatian Pension Funds",
      cat: "Performance",
      img: "/project-7.webp",
      link: "https://www.mirovinskifondovi.hr/",
      description:
        "Optimized critical financial infrastructure to achieve 90%+ Lighthouse scores. Streamlined content delivery using Static Site Generation.",
    },
    {
      id: 9,
      title: "E-Mobilnost",
      cat: "Static Site",
      img: "/project-9.webp",
      link: "https://e-mobilnost.poslo.si/",
      description:
        "Educational platform for e-mobility. Built with Hugo and Netlify CMS, achieving near-perfect 100/100 performance scores.",
    },
    {
      id: 10,
      title: "IKK Classic Bank",
      cat: "Fintech Security",
      img: "/project-10.webp",
      link: "https://www.ikk-classic.de",
      description:
        "Developed a secure and responsive user interface for banking services, focusing on SCSS architecture and strict data compliance.",
    },
    {
      id: 11,
      title: "VW Gläserne",
      cat: "Legacy Modernization",
      img: "/project-11.webp",
      link: "https://www.glaesernemanufaktur.de",
      description:
        "Early career milestone. Built a dynamic website for VW, mastering responsive design and SEO implementation using Mustache templates.",
    },
  ],
  stats: [
    { label: "Methodology", value: "Systems First" },
    { label: "Uptime", value: "99.99%" },
    { label: "A11y Level", value: "WCAG 2.1 AA" },
    { label: "Status", value: "Available" },
  ],
  specs: {
    // The "Face" of the app
    frontend: [
      "Next.js",
      "React Server Components",
      "TypeScript",
      "Micro-frontends",
      "i18n / Localization",
    ],
    // The "Brain" & "Home"
    backend: [
      "Node.js / NestJS",
      "PHP / Laravel",
      "PostgreSQL",
      "Docker / AWS",
      "Redis",
    ],
    // The "Connections" (APIs, Content, Search)
    integrations: [
      "GraphQL / REST",
      "Algolia Search",
      "Headless CMS (Hygraph)",
      "Salesforce API",
      "Payment Gateways",
    ],
    // Your Specialization
    designOps: [
      "Figma API",
      "Token Transformers",
      "Design Systems",
      "Tailwind v4",
      "Storybook",
    ],
    // The Safety Net
    quality: [
      "Playwright / Cypress",
      "Zod Validation",
      "CI/CD Pipelines",
      "W3C / WCAG 2.1",
      "Jest / Vitest",
    ],
  },
  jobs: [
    {
      company: "Dr. Oetker",
      role: "Software Engineer | DesignOps",
      period: "Aug 2025 — Present",
      stack: ["Figma API", "Algolia", "React", "Design Tokens"],
      highlights: [
        "Engineered a custom internal tool to automate CSS token extraction from Figma, saving 3 days per handover cycle.",
        "Re-architected Search & Discovery models using Algolia, significantly improving result relevance.",
        "Continuously deploying features to Greenfield architecture while maintaining 95+ Lighthouse scores.",
      ],
    },
    {
      company: "Oetker Digital",
      role: "Software Engineer | System Architecture",
      period: "Nov 2022 — Aug 2025",
      stack: ["Next.js", "TypeScript", "Contentful", "Jest"],
      highlights: [
        "Architected a multi-brand 'Greenfield' system reducing maintenance effort by 30% and costs by 40%.",
        "Spearheaded zero-downtime migration for 40+ domains across 10 locales with 100% uptime.",
        "Led the Design System initiative, reducing UI-related defects by 90% via a unified component library.",
        "Optimized API performance using Zod and GraphQL, improving Core Web Vitals by 20%.",
      ],
    },
    {
      company: "Indevitus",
      role: "Frontend Developer | Team Lead",
      period: "Feb 2022 — Nov 2022",
      stack: ["Vue.js", "GSAP", "SCSS", "Firebase"],
      highlights: [
        "Led a team of 3 developers, establishing rigorous code review cycles and enforcing strict standards.",
        "Engineered custom animation libraries and skeleton loading states to boost perceived performance.",
      ],
    },
    {
      company: "Poslovni mediji",
      role: "Frontend Developer",
      period: "Jul 2018 — Apr 2022",
      stack: ["JavaScript", "PurgeCSS", "Lighthouse", "Performance"],
      highlights: [
        "Executed a comprehensive performance strategy, consistently achieving Lighthouse scores of 95+.",
        "Re-engineered build pipelines with PurgeCSS to filter unused code, eliminating render-blocking resources.",
      ],
    },
  ],
  spotlight: {
    title: "Multi-Tenant Greenfield Architecture",
    description:
      "A single codebase powering 40+ distinct brand experiences. By decoupling the design tokens from the logic layer, we achieved a scalable 'Theme Engine' that allows instant re-branding without code changes.",
    tags: ["Greenfield", "White-label", "Design Tokens"],
  },
  ui: {
    loaderMessages: [
      "Loading artifacts...",
      "Compiling awesomeness...",
      "Hydrating the DOM...",
      "Aligning flexboxes...",
      "Reticulating splines...",
      "Resolving promises...",
      "Coffee.brew()...",
      "Generating pixels...",
    ],
    labels: {
      hero: "// IDENTITY_INIT",
      statement: "// CORE_PHILOSOPHY",
      spotlight: "// GREENFIELD_ARCH", // New Label
      projects: "// BUILT_ARTIFACTS",
      specs: "// TECHNICAL_DNA",
      experience: "// VERSION_HISTORY",
    },
  },
};
