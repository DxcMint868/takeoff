import Image from "next/image";
import GroupComponent from "./group-component";

const TECHNOLOGY_ROWS = [
  {
    id: "capabilities-row-experience-core",
    items: [
      {
        id: "capability-blockchain-development",
        backgroundSrc: "/mask-group@2x.png",
        iconSrc: "/group-blockchain.svg",
        productDelivery: "Blockchain Development",
        description:
          "Specializing in creating secure and decentralized applications for various blockchain platforms.",
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
        productDelivery: "FrontEnd",
        description:
          "Focused on designing and developing visually appealing, responsive user interfaces.",
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
        productDelivery: "Mobile",
        description:
          "Building performant native and cross-platform mobile applications.",
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
        productDelivery: "BackEnd",
        description:
          "Specializing in building scalable and secure backend systems for web and mobile applications.",
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
        productDelivery: "Artificial Intelligence",
        description:
          "Integrating AI-driven solutions to automate workflows, enhance products, and unlock new capabilities.",
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
        productDelivery: "Product Design & Product Management",
        description:
          "Designing intuitive digital experiences and driving product strategy from discovery to delivery.",
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
        productDelivery: "Test Automation",
        description:
          "Ensuring product quality through automated testing pipelines, blockchain-specific validation, and end-to-end coverage.",
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

const TechnologiesSection = () => (
  <section id="our-service" className="w-full">
    <Image
      className="pointer-events-none absolute left-1/2 top-1/3 w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden"
      src="/vector-3.svg"
      alt=""
      width={800}
      height={800}
      unoptimized
    />

    <div className="box-border flex w-full max-w-full flex-row items-start justify-between gap-5 pb-11 pl-0 pr-0 pt-20 text-right">
      <div className="box-border flex w-full max-w-[calc(100%_-_1px)] flex-col items-start justify-start px-0 pb-0 pt-[89px] text-center font-sora text-29xl">
        <h1 className="font-[inherit] relative m-0 self-stretch font-normal leading-[68px] text-inherit mq450:text-10xl mq450:leading-[41px] mq900:text-19xl mq900:leading-[54px]">
          <p className="m-0">Our Capabilities in Tech and Design</p>
        </h1>
      </div>
    </div>

    <div
      id="capabilities-intro"
      className="self-stretch pb-8 text-center font-reg text-base font-light leading-[24px] tracking-[0.02em] text-white-60"
    >
      Proven, well rounded teams, with fintech acumen
    </div>

    <div className="box-border flex w-full flex-wrap justify-center gap-8 px-4 mq900:px-6 mq700:px-4 text-left font-sora text-3xl">
      {TECHNOLOGY_ROWS.flatMap((row) => row.items).map((item) => (
        <div
          key={item.id}
          className="box-border w-[calc(33.333%-1.334rem)] max-w-full min-w-0 mq900:w-[calc(50%-1rem)] mq700:w-full"
        >
          <GroupComponent {...item} />
        </div>
      ))}
    </div>
  </section>
);

export default TechnologiesSection;
