/** IDs khớp khóa `tech.card.<id>` trong `common.json`; `skills` giữ tiếng Anh (tên stack). */
export type TechnologyCardBase = {
  id: string;
  backgroundSrc: string;
  iconSrc: string;
  skills: string[];
};

export const TECHNOLOGY_CARD_ROWS: { id: string; items: TechnologyCardBase[] }[] =
  [
    {
      id: "capabilities-row-experience-core",
      items: [
        {
          id: "capability-blockchain-development",
          backgroundSrc: "/mask-group@2x.png",
          iconSrc: "/group-blockchain.svg",
          skills: [
            "Solana (Rust)",
            "EVM (ETH, AVAX, ETC)",
            "Canton, Cardano, Midnight (Haskell)",
            "Solidity",
            "FunC",
            "Move",
          ],
        },
        {
          id: "capability-frontend",
          backgroundSrc: "/mask-group@2x.png",
          iconSrc: "/group-frontend.svg",
          skills: [
            "Angular.JS",
            "React",
            "VUE",
            "TypeScript",
            "Next.js",
            "Tailwind CSS",
          ],
        },
        {
          id: "capability-mobile",
          backgroundSrc: "/mask-group@2x.png",
          iconSrc: "/group-design.svg",
          skills: ["Kotlin", "Swift", "Java", "Flutter", "React Native"],
        },
      ],
    },
    {
      id: "capabilities-row-platform-ai-design",
      items: [
        {
          id: "capability-backend",
          backgroundSrc: "/mask-group@2x.png",
          iconSrc: "/group-backend.svg",
          skills: [
            "Node.js",
            "Express",
            "Rest / GraphQL",
            "C#",
            "Python",
            "Laravel",
            "Golang",
          ],
        },
        {
          id: "capability-artificial-intelligence",
          backgroundSrc: "/mask-group@2x.png",
          iconSrc: "/group-delivery.svg",
          skills: [
            "Langchain",
            "Langraph",
            "Agents",
            "Openrouter",
            "RAG",
            "Fine-tuning",
          ],
        },
        {
          id: "capability-product-design-management",
          backgroundSrc: "/mask-group@2x.png",
          iconSrc: "/group-design.svg",
          skills: [
            "UI Design",
            "Framer / Webflow",
            "Interaction Design",
            "BA",
            "PM",
            "Research",
          ],
        },
      ],
    },
    {
      id: "capabilities-row-quality",
      items: [
        {
          id: "capability-test-automation",
          backgroundSrc: "/mask-group@2x.png",
          iconSrc: "/group-delivery.svg",
          skills: [
            "Cucumber",
            "Playwright",
            "Cypress",
            "Blockchain Testing",
            "Jest",
            "CI/CD Integration",
          ],
        },
      ],
    },
  ];
