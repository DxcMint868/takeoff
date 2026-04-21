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
    name: "Minh",
    role: "Backend / Smart Contract Engineer",
    image: "/Minh-pic.png",
    frameworks: ["EVM", "SQL", "NestJS"],
    skill: ["FinTech", "DeFi", "Smart Contracts Development"],
    getToKnow:
      "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
    experience: [
      {
        company: "Web3 Engineer - Hoasen",
        time: "2026 - Present",
        description: "Building the future of finance on Avalanche.",
      },
      {
        company: "Ocean Finance",
        time: "2024 - 2026",
        description:
          "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
      },
    ],
    links:[
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/minh-nguyen-a4b1b1b1b1b1b1b1b1b1b1b1/",
      },
    ]
  },
  {
    id: 2,
    name: "Minh",
    role: "Backend / Smart Contract Engineer",
    image: "/Minh-pic.png",
    frameworks: ["EVM", "SQL", "NestJS"],
    skill: ["FinTech", "DeFi", "Smart Contracts Development"],
    getToKnow: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
    experience: [
      {
        company: "Web3 Engineer - Hoasen",
        time: "2026 - Present",
        description: "Building the future of finance on Avalanche.",
      },
      {
        company: "Ocean Finance",
        time: "2024 - 2026",
        description: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
      },
    ],
    links:[
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/minh-nguyen-a4b1b1b1b1b1b1b1b1b1b1b1/",
      },
    ]
  },
  {
    id: 3,
    name: "Minh",
    role: "Backend / Smart Contract Engineer",
    image: "/Minh-pic.png",
    frameworks: ["EVM", "SQL", "NestJS"],
    skill: ["FinTech", "DeFi", "Smart Contracts Development"],
    getToKnow: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
    experience: [
      {
        company: "Web3 Engineer - Hoasen",
        time: "2026 - Present",
        description: "Building the future of finance on Avalanche.",
      },
      {
        company: "Ocean Finance",
        time: "2024 - 2026",
        description: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
      },
    ],
    links:[
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/minh-nguyen-a4b1b1b1b1b1b1b1b1b1b1b1/",
      },
    ]
  },  
  {
    id: 4,
    name: "Minh",
    role: "Backend / Smart Contract Engineer",
    image: "/Minh-pic.png",
    frameworks: ["EVM", "SQL", "NestJS"],
    skill: ["FinTech", "DeFi", "Smart Contracts Development"],
    getToKnow: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
    experience: [
      {
        company: "Web3 Engineer - Hoasen",
        time: "2026 - Present",
        description: "Building the future of finance on Avalanche.",
      },
      {
        company: "Ocean Finance",
        time: "2024 - 2026",
        description: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
      },
    ],
    links:[
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/minh-nguyen-a4b1b1b1b1b1b1b1b1b1b1b1/",
      },
    ]
  },
  {
    id: 5,
    name: "Minh",
    role: "Backend / Smart Contract Engineer",
    image: "/Minh-pic.png",
    frameworks: ["EVM", "SQL", "NestJS"],
    skill: ["FinTech", "DeFi", "Smart Contracts Development"],
    getToKnow: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
    experience: [
      {
        company: "Web3 Engineer - Hoasen",
        time: "2026 - Present",
        description: "Building the future of finance on Avalanche.",
      },
      {
        company: "Ocean Finance",
        time: "2024 - 2026",
        description: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
      },
    ],
    links:[
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/minh-nguyen-a4b1b1b1b1b1b1b1b1b1b1b1/",
      },
    ]
  },
  {
    id: 6,
    name: "Minh",
    role: "Backend / Smart Contract Engineer",
    image: "/Minh-pic.png",
    frameworks: ["EVM", "SQL", "NestJS"],
    skill: ["FinTech", "DeFi", "Smart Contracts Development"],
    getToKnow: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
    experience: [
      {
        company: "Web3 Engineer - Hoasen",
        time: "2026 - Present",
        description: "Building the future of finance on Avalanche.",
      },
      {
        company: "Ocean Finance",
        time: "2024 - 2026",
        description: "Meet Minh, He’s maintaining what works, building what’s next. Debugging taught me to ask better questions, not louder ones. Assumptions break both systems and relationships.",
      },
    ],
    links:[
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/minh-nguyen-a4b1b1b1b1b1b1b1b1b1b1b1/",
      },
    ]
  },
];
