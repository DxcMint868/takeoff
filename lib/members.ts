export type MemberExperience = {
  company: string;
  time: string;
  description: string;
};

export type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
  frameworks: string[];
  skill: string[];
  getToKnow: string;
  experience: MemberExperience[];
  links: {
    label: string;
    url: string;
  }[];
};

export const MEMBERS: Member[] = [
  {
    id: 1,
    name: "Marek Michalski",
    role: "CEO / Product Strategist",
    image: "/Marek-pic.png",
    frameworks: ["Figma", "Jira", "Linear", "SQL"],
    skill: ["Product Management", "Fintech", "Strategy"],
    getToKnow:
      "I turn complex product and business challenges into clear delivery plans, align teams fast, and scale fintech products from discovery to launch.",
    experience: [
      {
        company: "CEO - Hoasen FZ LLC",
        time: "Mar 2023 - Present",
        description:
          "Led crypto and digital transformation initiatives, including CRM setup, onboarding automation, and support operations to improve growth and execution.",
      },
      {
        company: "Head of Product - Rain",
        time: "Feb 2022 - Feb 2023",
        description:
          "Integrated additional payment providers and improved product execution, contributing to significant growth in card-buy and trading volumes.",
      },
      {
        company: "Senior Product Manager - Payment Technology Company",
        time: "Jun 2023 - Feb 2024",
        description:
          "Developed discovery and analytics frameworks, mentored PMs, and supported enterprise readiness initiatives for new value-added services.",
      },
      {
        company: "Senior Consultant - IBM",
        time: "Oct 2017 - Oct 2018",
        description:
          "Delivered process improvement and operational efficiency projects for large enterprises in utilities, insurance, and customer operations.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/marekjmichalski/",
      },
    ],
  },
  {
    id: 2,
    name: "Edward Wong",
    role: "CTO / Engineering Leader",
    image: "/Edward-pic.png",
    frameworks: ["AWS", "Python", "TypeScript", "Microservices", "REST APIs"],
    skill: ["Blockchain", "Fintech", "Digital Asset Custody"],
    getToKnow:
      "I am a veteran engineering leader focused on blockchain, fintech, and mission-critical systems. I enjoy helping teams build secure, scalable platforms with clear technical direction.",
    experience: [
      {
        company: "Founder & CTO - GreenAnt",
        time: "Jan 2023 - Present",
        description:
          "Leading technical strategy for a sustainability marketplace integrating GPT, machine learning, smart contracts, and geospatial data systems.",
      },
      {
        company: "Sr Engineering Manager - Xendit",
        time: "Feb 2022 - Nov 2022",
        description:
          "Built a high-impact tiger team and launched recurring payments initiatives while supporting strategic technical due diligence.",
      },
      {
        company: "Digital Asset Custody Consultant - Octowill",
        time: "Nov 2022 - Mar 2023",
        description:
          "Designed a custody solution around Fireblocks with MPC, security controls, and compliance workflows for digital asset operations.",
      },
      {
        company: "VP of Crypto Quantitative Trading - QuantDART",
        time: "Feb 2018 - Sep 2022",
        description:
          "Led crypto asset management and trading platform initiatives focused on custody, payments, and secure large-scale trading systems.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/eywong8/details/experience/",
      },
    ],
  },
  {
    id: 3,
    name: "Meg Chanta",
    role: "Head of Design / Product Designer",
    image: "/Meg-pic.png",
    frameworks: ["Figma", "Design Systems", "Prototyping"],
    skill: ["UX/UI", "Product Design", "Design Leadership"],
    getToKnow:
      "I design user-first experiences that scale. I enjoy turning complex business problems into elegant interfaces and practical design systems teams can ship with.",
    experience: [
      {
        company: "Head of Design - Hoasen",
        time: "Jul 2024 - Present",
        description:
          "Leading end-to-end design vision across products, design systems, and collaboration with product and engineering teams.",
      },
      {
        company: "Product Designer - Rain",
        time: "Jun 2021 - Mar 2023",
        description:
          "Designed key platform journeys and product surfaces, including wallet and market flows, support, and external product pages.",
      },
      {
        company: "Senior Product Designer - tkana",
        time: "May 2023 - Dec 2024",
        description:
          "Led design for portal and premium subscriber experiences, rebuilt key pages, and maintained a scalable design system across products.",
      },
      {
        company: "Product Designer - Seera Group",
        time: "Apr 2018 - Jun 2021",
        description:
          "Owned flight booking flows across iOS, Android, desktop, and PWA products while building UI libraries and cross-platform design consistency.",
      },
      {
        company: "Product Designer - Tigerspike / Agoda",
        time: "2016 - 2018",
        description:
          "Contributed to major digital products and B2B tools, including UX redesign and feature launches for global consumer platforms.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/meg-chanta/",
      },
    ],
  },
  {
    id: 4,
    name: "Anh Cao",
    role: "Tech Lead / Fullstack Engineer",
    image: "/AC-pic.png",
    frameworks: ["NestJS", "Next.js", "Node.js", "TypeScript", "SQL"],
    skill: ["Full-stack Development", "Architecture", "Mentoring"],
    getToKnow:
      "I focus on scalable architecture and practical execution. I help teams deliver across backend, frontend, and blockchain workstreams with quality and speed.",
    experience: [
      {
        company: "Tech Lead - Hoasen",
        time: "Mar 2025 - Present",
        description:
          "Guiding engineers across full-stack and smart contract projects, translating requirements into execution plans, and unblocking delivery risks.",
      },
      {
        company: "Full Stack Engineer - Propine",
        time: "Sep 2022 - Jul 2025",
        description:
          "Built and maintained secure, scalable systems for financial products with a focus on performance, reliability, and developer experience.",
      },
      {
        company: "Senior Software Engineer - Quoine (Liquid)",
        time: "Jun 2018 - Jul 2022",
        description:
          "Built and maintained backend services for a global crypto platform using Golang/Node.js, PostgreSQL, Docker, and production-ready APIs.",
      },
      {
        company: "Software Engineer - ShareCarForAds",
        time: "Jan 2017 - May 2018",
        description:
          "Contributed to core application features, collaborated through Git-based workflows, and supported internal system improvements.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/anhcao142/",
      },
    ],
  },
  {
    id: 5,
    name: "Francesco Trevisan",
    role: "Backend / Smart Contract Engineer",
    image: "/Francesco-pic.png",
    frameworks: ["EVM", "Foundry", "Hardhat", "Node.js", "SQL"],
    skill: ["Blockchain", "DeFi", "Smart Contract Development"],
    getToKnow:
      "I build what ships. From smart contracts to full-stack platforms, I care about clean architecture, honest engineering, and systems that stay reliable in production.",
    experience: [
      {
        company: "Co-Founder & Lead Software Engineer - FREDD Studios",
        time: "Oct 2022 - Present",
        description:
          "Architected and shipped Web3 platforms and games with React/Next.js, Node.js, Solidity, and Ethereum/L2 integrations, including staking and Chainlink oracle features.",
      },
      {
        company: "Software Developer - Web Nubes",
        time: "Jul 2021 - Apr 2022",
        description:
          "Built and optimized ASP.NET backend services for clinical applications, focusing on API performance, SQL tuning, and data integrity in daily workflows.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/francesco-trevisan/",
      },
    ],
  },
  {
    id: 6,
    name: "Nhu Nguyen",
    role: "Frontend Engineer",
    image: "/Nhu-pic.png",
    frameworks: ["Next.js", "TypeScript", "JavaScript", "Jira"],
    skill: ["Frontend Web Development", "UI Implementation", "Web3 UX"],
    getToKnow:
      "I build clean, responsive user interfaces with a UX and performance mindset. I like turning complex product flows into simple and reliable experiences.",
    experience: [
      {
        company: "Frontend Engineer - Hoasen",
        time: "Oct 2025 - Present",
        description:
          "Built and refined frontend flows for wallet connection, listing, and secondary swaps on SecondSwap.io in close collaboration with backend and blockchain teams.",
      },
      {
        company: "Frontend Intern - VMS",
        time: "Apr 2025 - Sep 2025",
        description:
          "Supported frontend feature implementation and UI improvements while learning production engineering workflows and team collaboration.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/nh%C6%B0-qu%E1%BB%B3nh-b24194353/",
      },
    ],
  },
  {
    id: 7,
    name: "Minh Nguyen",
    role: "Backend / Smart Contract Engineer",
    image: "/Minh-pic.png",
    frameworks: ["EVM", "Foundry", "Hardhat", "NestJS", "Subsquid"],
    skill: ["DeFi", "Fintech", "Smart Contract Development"],
    getToKnow:
      "I maintain what works and build what is next. I enjoy solving backend and on-chain problems with clean APIs and production-safe blockchain integrations.",
    experience: [
      {
        company: "Web3 Engineer - Hoasen",
        time: "Aug 2025 - Present",
        description:
          "Contributed to backend architecture for SecondSwap.io, including wallet auth, order/swap logic, and blockchain integrations for secure secondary trading.",
      },
      {
        company: "Back-end Developer - Thasa Project",
        time: "Jul 2023 - Sep 2023",
        description:
          "Developed server-side services and controllers for a custodial crypto wallet product.",
      },
      {
        company: "Back-end Developer - DeCarbon Project",
        time: "Jul 2023 - Sep 2023",
        description:
          "Built data pipelines and APIs for blockchain carbon-emission analysis, including aggregation, validation, and reporting logic.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/minh-nguyen-959000207/",
      },
    ],
  },
  {
    id: 8,
    name: "Bao Ngo",
    role: "Senior Product Designer",
    image: "/Bao-pic.png",
    frameworks: ["Figma", "Design Systems", "Prototyping"],
    skill: ["Product Design", "DApp UX", "Visual Design"],
    getToKnow:
      "People first, problem led. I use user insight and product thinking to design scalable experiences that help teams move faster and users succeed.",
    experience: [
      {
        company: "Senior Product Designer - Hoasen",
        time: "Feb 2025 - Present",
        description:
          "Designing user-centered product experiences with a focus on design systems and decentralized application workflows.",
      },
      {
        company: "Senior Product Designer - Airdrop Technologies",
        time: "Feb 2023 - Dec 2024",
        description:
          "Led product and visual design initiatives in crypto-focused products, improving usability and design consistency across releases.",
      },
      {
        company: "Product Designer - Liquid",
        time: "2023 - 2024",
        description:
          "Contributed to product UX and interface design for cryptocurrency workflows with a focus on usability and visual clarity.",
      },
      {
        company: "Web Designer - TNCL Digital Agency",
        time: "Jan 2016 - Aug 2016",
        description:
          "Designed marketing and product-facing web experiences, building a strong foundation in visual design and digital storytelling.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ngobao2212/",
      },
    ],
  },
  {
    id: 9,
    name: "Trang Nguyen",
    role: "Project Manager / Product Owner",
    image: "/Trang-pic.png",
    frameworks: ["Jira", "Notion", "Scrum", "UAT"],
    skill: ["Project Delivery", "Product Ownership", "Stakeholder Management"],
    getToKnow:
      "I align stakeholders and cross-functional teams to ship web and mobile products smoothly, with clear scope, predictable timelines, and practical communication.",
    experience: [
      {
        company: "Project Manager / Product Owner - Hoasen",
        time: "Nov 2025 - Present",
        description:
          "Leading end-to-end delivery across fintech and AI projects from kickoff to launch, owning planning, backlog, and client communication.",
      },
      {
        company: "Project Manager / Product Owner - Freelancer",
        time: "2022 - 2025",
        description:
          "Managed software projects for multiple clients, including healthcare platforms, AI tools, and campaign modules with Agile processes.",
      },
      {
        company: "Knowledge Management Lead - Deutsche Sparkassenstiftung",
        time: "Oct 2019 - Feb 2022",
        description:
          "Built and managed regional knowledge systems supporting financial inclusion programs across distributed international teams.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/trang-nguyen-226b76bb/",
      },
    ],
  },
];
