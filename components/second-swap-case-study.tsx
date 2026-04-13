import Image from "next/image";
import React from "react";
import { Badge } from "./badge";
import { CaseStudyObjectives } from "./case-study-objectives";
import ContactSection from "./contact-section";
import { GradientBorderCard } from "./gradient-border-card";
import {
  CheckCircleIcon,
  FileAnalyticsIcon,
  RosetteCheckIcon,
  ToolIcon,
  TrendingUpIcon,
} from "./icons";
import ProjectGallery from "./project-gallery";

/* ── Static data ───────────────────────────────────────────── */

const HERO_TAGS_ROW1 = [
  "Smart Contract Development",
  "Product Management",
  "Development",
];
const HERO_TAGS_ROW2 = ["Compliance Controls", "Data Infrastructure"];

const OBJECTIVES = [
  {
    title: "Build Smart Contracts for Tradable Vesting",
    description:
      "Design and deploy step-vesting and marketplace contracts on EVM (Solidity) and SVM (Anchor/Rust) that enable listing, purchasing, transferring, and claiming of vesting positions.",
  },
  {
    title: "Launch a Multi-chain Marketplace",
    description:
      "Deliver a production marketplace where users can discover, list, and purchase vesting allocations across Avalanche, Ethereum, and Solana with a unified experience.",
  },
  {
    title: "Achieve Foundation Grant Milestones",
    description:
      "Delivered key milestones for 2–3 major blockchain foundations, including EVM launches, user and transaction growth targets, and measurable protocol adoption.",
  },
  {
    title: "Establish Analytics & Reporting",
    description:
      "Build public-facing analytics (Dune dashboard) and internal operational dashboards (Metabase) to track TVL, transactions, connected wallets, and chain-level metrics.",
  },
];

const OBJECTIVE_ICONS = [
  ToolIcon,
  TrendingUpIcon,
  RosetteCheckIcon,
  FileAnalyticsIcon,
];

const SOLUTION_OVERVIEW =
  "Hoasen served as SecondSwap's end-to-end technology partner across the full product stack — from smart contract architecture and security through frontend, backend, and analytics. The team operated across three blockchain ecosystems simultaneously, coordinating contract deployments, API integrations, and user-facing features on aggressive grant-driven timelines.";

const EVM_FEATURE = {
  title: "EVM Smart Contracts (AVAX & ETH)",
  description: (
    <>
      The core on-chain layer is built in{" "}
      <span className="text-white">Solidity 0.8.24</span> using{" "}
      <span className="text-white">Hardhat</span> and{" "}
      <span className="text-white">Foundry</span>, with{" "}
      <span className="text-white">OpenZeppelin</span> 5.x upgradeable
      contracts. The suite includes:
    </>
  ),
  bullets: [
    <><span className="text-white">SecondSwap Marketplace</span> — upgradeable marketplace supporting listings, partial/single purchases, discounts, whitelists, and multiple payment currencies</>,
    <><span className="text-white">SecondSwap StepVesting</span> — step-based vesting with claims, transfers, reallocation, and sell-limit enforcement</>,
    <><span className="text-white">SecondSwap VestingManager</span> — allocation management, listing metadata, and interaction between vesting schedules and the marketplace</>,
    <><span className="text-white">TokenTable Adapter</span> — bridges external vesting standards into the marketplace</>,
    <>Deployed on <span className="text-white">Avalanche C-Chain</span> and <span className="text-white">Ethereum mainnet</span> with Defender integration and Etherscan verification</>,
  ],
};

const SOLANA_FEATURE = {
  title: "Solana Programs (SVM)",
  description:
    "A parallel implementation was built using Anchor 0.31 (Rust) for the Solana ecosystem:",
  bullets: [
    <><span className="text-white">Marketplace program</span> — listings, spot purchases, payment token management, vesting program allowlists, admin controls (freeze/unfreeze)</>,
    <><span className="text-white">StepVesting program</span> — vesting plans, schedules, claim/transfer/combine paths, sell-limit logic</>,
    <><span className="text-white">@secondswap/sdk</span> — TypeScript SDK published for frontend and backend integration</>,
    <><span className="text-white">@secondswap/vesting-cli</span> — CLI tooling for vesting and listing operations</>,
    "Feature-gated program IDs across dev, staging, production, and demo environments",
  ],
};

const FRONTEND_APPS = [
  {
    title: "Marketplace (Nuxt 3)",
    description:
      "Public-facing app: token discovery, listings, bids, lots, referral/points system, wallet connect (EVM + Solana via Reown AppKit), activity feeds, and landing pages with Dune integration.",
  },
  {
    title: "Admin Panel (Vue 3 + Vuetify)",
    description:
      "Internal operations: delist/freeze controls, fee management, user management, and ApexCharts-powered analytics.",
  },
  {
    title: "Token Issuer (Vue 3 + Vite)",
    description:
      "Project teams create and manage vesting plans: draft flows for allocations, vesting schedules, sell limits, and contract deployment.",
  },
  {
    title: "Shared UI Library",
    description:
      "@secondswap/ui — reusable component library across all frontends with Tailwind CSS and DaisyUI.",
  },
];

const BACKEND_FEATURE = {
  title: "Backend & Infrastructure",
  description: (
    <>
      The backend is a <span className="text-white">NestJS 11</span> application
      (<span className="text-white">TypeScript 5.9</span>) backed by{" "}
      <span className="text-white">PostgreSQL</span>,{" "}
      <span className="text-white">Redis</span> (Bull queues), and
      chain-specific workers:
    </>
  ),
  bullets: [
    <><span className="text-white">Multi-chain</span> indexing via Moralis Streams (EVM) and dedicated Solana/Avalanche/Ethereum workers</>,
    <><span className="text-white">REST API</span> with Swagger docs, cookie-based auth across user, issuer, and admin portals</>,
    <><span className="text-white">AWS CDK</span> for asset storage (S3), Vercel for frontend deployments with branch-based environments (dev / staging / production / demo)</>,
    "Controllers spanning marketplace, vesting plans, lots, bids, transactions, referrals, Telegram integration, advertisements, and staff management",
  ],
};

const ANALYTICS_FEATURE = {
  title: "Analytics & Dashboards",
  description: "Public and internal dashboards were built to give full visibility into protocol performance:",
  bullets: [
    <><span className="text-white">Dune Analytics</span> — public dashboard at dune.com/secondswapio tracking TVL, connected wallets, transaction volumes, and chain breakdowns</>,
    <><span className="text-white">Metabase</span> — internal dashboards at metabase.secondswap.io for operational metrics, chain-filtered views (EVM vs. Solana), and product health monitoring</>,
  ],
};

const OUTCOMES = [
  {
    title: "$6M peak TVL",
    description:
      "The platform reached six million dollars in total value locked across supported chains",
  },
  {
    title: "5,000+ active users",
    description:
      "Organic adoption across the marketplace, with referral and points systems driving engagement",
  },
  {
    title: "Foundation grant milestones achieved",
    description:
      "Key deliverables for two to three blockchain foundations were met on schedule, including EVM launches, user thresholds, and transaction targets",
  },
  {
    title: "Significant investment secured",
    description:
      "The company attracted meaningful investment on the back of the delivered product and demonstrated traction",
  },
];

const GALLERY_SLIDES = [
  {
    src: "/works/second-swap/gallery-dashboard.png",
    alt: "SecondSwap marketplace dashboard showing best deals and token listings",
  },
  {
    src: "/works/second-swap/second-swap-leaderboard.png",
    alt: "SecondSwap pre-season leaderboard with referral code and prize pool",
  },
  {
    src: "/works/second-swap/second-swap-referral.png",
    alt: "SecondSwap pre-season era referral and rewards program",
  },
];

/* ── Sub-components ──────────────────────────────────────────── */

function SolutionFeatureBlock({
  number,
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  imageContainerClassName,
  children,
}: {
  number: number;
  title: string;
  description: React.ReactNode;
  bullets?: React.ReactNode[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  imageContainerClassName?: string;
  children?: React.ReactNode;
}) {
  const textBlock = (
    <div className="min-w-0 flex-1">
      <h3 className="m-0 font-reg text-5xl font-bold leading-none tracking-[0.02em] mq450:text-xl">
        <span className="mr-2">
          {number}.
        </span>
        {title}
      </h3>
      <p className="m-0 mt-4 max-w-[532px] font-reg text-base font-normal leading-6 tracking-[0.02em] text-white-60 mq1100:max-w-none">
        {description}
      </p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-6 flex max-w-[485px] list-disc flex-col gap-3 pl-[18px] font-reg text-sm font-normal leading-[18px] tracking-[0.02em] text-white-60 mq1100:max-w-none">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!imageSrc) {
    return (
      <div>
        {textBlock}
        {children}
      </div>
    );
  }

  const defaultImageClass = "relative shrink-0 w-[420px] h-[420px] mq1100:!w-full mq1100:!h-[300px] mq450:!h-[250px]";
  const imageBlock = (
    <div className={imageContainerClassName ?? defaultImageClass}>
      <Image
        src={imageSrc}
        alt={imageAlt ?? ""}
        fill
        className="object-contain"
        sizes="(max-width: 1100px) 100vw, 420px"
      />
    </div>
  );

  return (
    <div className="flex items-start justify-between gap-12 mq1100:flex-col mq1100:items-stretch mq1100:gap-10">
      {imagePosition === "left" ? (
        <>
          <div className="mq1100:order-2">{imageBlock}</div>
          <div className="mq1100:order-1">{textBlock}</div>
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */

export default function SecondSwapCaseStudy() {
  return (
    <main className="relative flex w-full flex-col items-center overflow-x-clip text-white">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#0C4CAC]">
        <div className="pointer-events-none absolute inset-0 left-1/2 opacity-[0.06]" aria-hidden>
          <Image
            src="/works/second-swap/hero-pattern.png"
            alt=""
            fill
            className="object-cover object-right"
            sizes="50vw"
          />
        </div>

        {/* Mobile only: phone mockups as background behind text */}
        <div className="pointer-events-none absolute inset-0 hidden mq900:block" aria-hidden>
          <Image
            src="/works/second-swap/hero-phones.png"
            alt=""
            fill
            className="translate-y-[20%] object-contain object-right-bottom"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0C4CAC]/50" />
        </div>

        <div className="relative flex min-h-[640px] w-full items-stretch mq1100:min-h-[520px] mq900:min-h-[560px] mq450:min-h-[500px]">
          {/* Left column */}
          <div className="relative z-10 flex w-2/5 flex-none flex-col justify-end gap-6 pb-[100px] pl-[150px] pr-8 mq1100:pl-[60px] mq1100:pb-10 mq900:w-full mq900:pb-16 mq900:pl-[30px] mq900:pr-[30px] mq900:pt-[60px] mq450:pl-5 mq450:pr-5">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/works/second-swap/logo-icon.svg"
                alt=""
                width={36}
                height={44}
                className="h-auto w-9"
              />
              <span className="font-sora text-[28px] font-semibold leading-none tracking-tight text-white">
                SecondSwap
              </span>
            </div>
            <div className="max-w-[600px]">
              <h1 className="m-0 font-sora text-[64px] font-semibold capitalize leading-[82px] mq1100:text-[50px] mq1100:leading-[64px] mq900:text-[48px] mq900:leading-[60px] mq450:text-[38px] mq450:leading-[48px]">
                SecondSwap
              </h1>
              <p className="m-0 mt-2 font-reg text-sm font-normal leading-[22px] tracking-[0.02em]">
                Tradable Vesting Contracts Platform
              </p>
              <div className="mt-10">
                <p className="m-0 font-reg text-[10px] font-semibold uppercase leading-3 tracking-[2px] text-white-60">
                  What we did:
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-3">
                    {HERO_TAGS_ROW1.map((tag) => (
                      <Badge key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {HERO_TAGS_ROW2.map((tag) => (
                      <Badge key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop only: phone mockups column */}
          <div
            className="pointer-events-none relative w-3/5 flex-none overflow-hidden mq900:hidden"
            aria-hidden
          >
            <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #1a4fc9 0%, transparent 70%)" }} />
            <Image
              src="/works/second-swap/hero-phones.png"
              alt="SecondSwap mobile app screens"
              fill
              className="translate-y-[15%] object-contain object-left"
              sizes="60vw"
              priority
            />
          </div>
        </div>

      </section>

      {/* ── Brief & Background ─────────────────────────────── */}
      <section className="w-full px-5 pb-16 pt-[130px]">
        <div className="relative mx-auto max-w-[1132px]">
          <GradientBorderCard contentClassName="relative z-[1] px-[70px] pb-[72px] mq900:px-10 mq450:px-5">
            <div className="relative flex items-start gap-8 mq1100:flex-col">
              {/* Mobile only: background image from right */}
              <div className="pointer-events-none absolute right-[-80px] top-0 hidden h-full w-[65%] opacity-[0.12] mq1100:block" aria-hidden>
                <Image
                  src="/works/second-swap/token-ecosystem.png"
                  alt=""
                  fill
                  className="object-contain object-right"
                  sizes="65vw"
                />
              </div>
              <div className="relative min-w-0 flex-1 flex flex-col gap-6 pt-[72px] mq900:pt-14 mq450:pt-10">
                <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
                  Brief &amp; Background
                </h2>
                <p className="m-0 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
                  <span className="text-white">SecondSwap</span> is a DeFi protocol that creates a secondary market for locked and vesting token allocations. In traditional crypto fundraising, early investors and team members receive tokens subject to vesting schedules that lock them for months or years. SecondSwap gives these holders a way to trade their vesting positions before unlock — and gives buyers access to discounted tokens with transparent, on-chain vesting terms.
                </p>
                <p className="m-0 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
                  The protocol needed a technology partner capable of delivering across three{" "}
                  <span className="text-white">blockchain ecosystems</span>{" "}
                  (Avalanche, Ethereum, and Solana), building the full product stack from smart contracts through to user-facing applications and operational analytics.
                </p>
              </div>
              {/* Desktop only: image column on the right */}
              <div className="relative h-[400px] w-[400px] shrink-0 mq1100:hidden">
                <Image
                  src="/works/second-swap/token-ecosystem.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="400px"
                  aria-hidden
                />
              </div>
            </div>
            <p className="m-0 mt-6 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
              <span className="text-white">SecondSwap had a clear product vision</span> and early traction with foundation grants, but needed a team that could execute across multiple chains, build production-grade smart contracts, and ship a polished marketplace experience — all while hitting milestone deadlines tied to grant funding.
            </p>
          </GradientBorderCard>
        </div>
      </section>

      {/* ── Business Objectives ──────────────────────────────── */}
      <CaseStudyObjectives
        title="Business Objectives"
        objectives={OBJECTIVES}
        icons={OBJECTIVE_ICONS}
      />

      {/* ── Our Solution ───────────────────────────────────── */}
      <section className="mx-auto max-w-[1300px] bg-dark py-16">
        <div className="relative mx-auto max-w-[1370px] overflow-hidden rounded-[50px] border border-white/20 bg-white/[0.04] py-24 mq900:rounded-[20px] mq900:py-16 mq450:rounded-2xl mq450:py-12">
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[400px]"
            style={{ background: "linear-gradient(to top, rgba(12,76,172,0.08) 0%, transparent 100%)" }}
            aria-hidden
          />

          <h2 className="relative m-0 text-center font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
            Our Solution
          </h2>

          {/* Solution overview banner */}
          <div className="mx-auto mt-16 max-w-[1132px] px-[70px] mq1100:max-w-none mq1100:px-10 mq450:px-5">
            <div className="gradient-border rounded-[20px] bg-dark/60 p-10 mq450:p-6">
              <p className="m-0 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
                {SOLUTION_OVERVIEW}
              </p>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-24 px-[70px] mq1100:mt-12 mq1100:gap-16 mq1100:px-10 mq450:gap-12 mq450:px-5">
            {/* 1. EVM Smart Contracts — text left, image right */}
            <SolutionFeatureBlock
              number={1}
              title={EVM_FEATURE.title}
              description={EVM_FEATURE.description}
              bullets={EVM_FEATURE.bullets}
              imageSrc="/works/second-swap/3d-multichain.png"
              imageAlt="Multi-chain token network 3D illustration"
              imagePosition="right"
              imageContainerClassName="relative h-[320px] w-[320px] shrink-0 mq1100:!h-[220px] mq1100:!w-full mq450:!h-[180px]"
            />

            {/* 2. Solana Programs — image left, text right */}
            <SolutionFeatureBlock
              number={2}
              title={SOLANA_FEATURE.title}
              description={SOLANA_FEATURE.description}
              bullets={SOLANA_FEATURE.bullets}
              imageSrc="/works/second-swap/3d-platform.png"
              imageAlt="SecondSwap ecosystem platform 3D illustration"
              imagePosition="left"
              imageContainerClassName="relative h-[320px] w-[320px] shrink-0 mq1100:!h-[220px] mq1100:!w-full mq450:!h-[180px]"
            />

            {/* 3. Frontend Applications */}
            <div>
              <h3 className="m-0 font-reg text-5xl font-bold leading-none tracking-[0.02em] mq450:text-xl">
                <span className="mr-2">3.</span>
                Frontend Applications
              </h3>
              <p className="m-0 mt-4 max-w-[532px] font-reg text-base font-normal leading-6 tracking-[0.02em] text-white-60">
                Three Vue-based applications were built to serve different user
                personas:
              </p>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 mq900:grid-cols-1">
                {FRONTEND_APPS.map((app) => (
                  <div
                    key={app.title}
                    className="relative overflow-hidden rounded-3xs border border-solid border-white/20 bg-[rgba(27,19,51,0.4)] p-6 shadow-[0_0_12px_0_#2b1f62] transition-all duration-300 ease-out hover:-translate-y-px hover:border-white/25 hover:shadow-[0_0_18px_2px_#2b1f62]"
                  >
                    <h4 className="m-0 font-sora text-xl font-semibold leading-[30px] tracking-[0.02em]">
                      {app.title}
                    </h4>
                    <p className="m-0 mt-2 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
                      {app.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Backend & Infrastructure — text left, image right */}
            <SolutionFeatureBlock
              number={4}
              title={BACKEND_FEATURE.title}
              description={BACKEND_FEATURE.description}
              bullets={BACKEND_FEATURE.bullets}
              imageSrc="/works/second-swap/3d-analytics.png"
              imageAlt="SecondSwap analytics dashboard 3D illustration"
              imagePosition="right"
              imageContainerClassName="relative h-[320px] w-[320px] shrink-0 mq1100:!h-[250px] mq1100:!w-full mq450:!h-[200px]"
            />

            {/* 5. Analytics & Dashboards — image left, text right */}
            <SolutionFeatureBlock
              number={5}
              title={ANALYTICS_FEATURE.title}
              description={ANALYTICS_FEATURE.description}
              bullets={ANALYTICS_FEATURE.bullets}
              imageSrc="/works/second-swap/3d-shield.png"
              imageAlt="SecondSwap shield 3D illustration"
              imagePosition="left"
              imageContainerClassName="relative h-[320px] w-[320px] shrink-0 mq1100:!h-[250px] mq1100:!w-full mq450:!h-[200px]"
            />
          </div>
        </div>
      </section>

      {/* ── Project Gallery ────────────────────────────────── */}
      <ProjectGallery slides={GALLERY_SLIDES} />

      {/* ── Outcome ────────────────────────────────────────── */}
      <section className="w-full bg-dark px-5 py-16">
        <div className="relative mx-auto max-w-[1132px]">
          <GradientBorderCard backgroundSrc="/works/second-swap/rocket-noise-bg.png">
            <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
              Outcome
            </h2>
            <p className="m-0 mt-8 max-w-[663px] font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
              Over the course of the one-year engagement, Hoasen delivered a
              production-grade multi-chain DeFi platform from the ground up —
              smart contracts through to analytics.
            </p>

            <div className="mt-10 flex max-w-[700px] flex-col gap-8">
              {OUTCOMES.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <CheckCircleIcon className="mt-1 shrink-0 text-[#4ade80]" />
                  <div>
                    <h4 className="m-0 font-sora text-xl font-semibold leading-[30px] tracking-[0.02em]">
                      {item.title}
                    </h4>
                    <p className="m-0 mt-1 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="m-0 mt-10 max-w-[990px] font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
              SecondSwap validated that locked vesting positions can become a
              liquid, tradable asset class. The protocol now operates across
              three major blockchain ecosystems with a growing user base and
              active marketplace — positioned for further expansion.
            </p>
          </GradientBorderCard>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────── */}
      <div className="w-full bg-dark px-5 mq900:px-6">
        <div className="mx-auto max-w-[1200px]">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
