import Image from "next/image";
import { OCEAN_FINANCE_TAGLINE } from "../constants/ocean-finance";
import ContactSection from "./contact-section";
import { GradientBorderCard } from "./gradient-border-card";
import { GradientGlow } from "./gradient-glow";
import {
  CoinIcon,
  FileAnalyticsIcon,
  ProgressBoltIcon,
  TrendingUpIcon,
} from "./icons";
import ProjectGallery from "./project-gallery";

/* ── Static data ───────────────────────────────────────────── */

const HERO_TAGS = [
  "RWA Platform",
  "Web3 Integration",
  "Real-world Assets",
  "Tokenization",
  "Institutional",
  "Trade Finance",
];

const STATS = [
  { value: "12", label: "Week Engagement" },
  { value: "3 Million", label: "Total Value Locked" },
  { value: "100%", label: "On Time Delivery" },
];

const OBJECTIVES: { title: string; description: string }[] = [
  {
    title: "Tokenized Capital Flows",
    description:
      "Create a token representing trade flows pegged 1:1 to the underlying dollarized capital account.",
  },
  {
    title: "Publish NAV to Chainlink Oracle",
    description:
      "Publish the value of the underlying fund on a quarterly basis in a way accessible to the blockchain.",
  },
  {
    title: "Process Redemptions & Subscriptions",
    description:
      "A reasonable way to process redemptions of tokens for cash or issuance of new tokens via deposits.",
  },
  {
    title: "Monitor & Report on Token Activity",
    description:
      "Ability to report and monitor on-chain activity of the tokenized asset for informed business decisions.",
  },
];

const SOLUTION_FEATURES = [
  {
    title: "ERC-20 Token on Avalanche",
    description:
      "End-to-end tokenized fund infrastructure for institutional investors. From smart contract development to web application delivery and on-chain data infrastructure.",
    bullets: [
      "Mint tokens when new capital enters the fund via subscription",
      "Burn tokens when investors redeem their holdings",
      "Upgradeable proxy architecture for contract evolution",
      "Super-admin recovery for compliance scenarios",
    ],
  },
  {
    title: "Token Administration Dashboard",
    description:
      "A web-based administration dashboard gives fund administrators direct control over token operations without requiring blockchain expertise:",
    bullets: [
      "Mint tokens to investor wallet addresses when processing subscriptions",
      "Burn tokens when processing redemptions",
      "Total and circulating supply views for real-time monitoring",
      "Token holder register showing wallet addresses and balances",
    ],
  },
  {
    title: "NAV Data Pipeline & Oracle",
    description:
      "A complete data pipeline connects off-chain financial data to on-chain smart contracts, enabling transparent and verifiable Net Asset Value publication:",
    bullets: [
      "Administrators upload certified bank statements via the backend",
      "System derives NAV from uploaded financials using predefined rules",
      "Multi-signature approval workflows ensure accuracy and compliance",
      "Confirmed NAV is pushed on-chain via Chainlink oracle in USDC",
    ],
  },
];

const TECH_TAGS = [
  "Avalanche C-Chain",
  "ERC-20",
  "Solidity",
  "Chainlink Oracle",
  "USDC",
  "React",
  "Node.js",
  "PostgreSQL",
  "RPC Connection",
  "Blockchain Indexer",
];

const GALLERY_SLIDES = [
  { src: "/works/ocean/ocean-nav-management.png", alt: "Ocean Finance NAV Management" },
  { src: "/works/ocean/dashboard-2.png", alt: "NAV data pipeline dashboard" },
  { src: "/works/ocean/dashboard-1.png", alt: "Token administration panel" },
  { src: "/works/ocean/ocean-emergency.png", alt: "Emergency panel - Freeze and unfreeze" },
];

const OBJECTIVE_ICONS = [CoinIcon, TrendingUpIcon, ProgressBoltIcon, FileAnalyticsIcon];

/* ── Code preview block ────────────────────────────────────── */

function CodePreview() {
  const code = (
    <>
      <span className="text-white/40">{`/// @notice Only callable by BURNER_ROLE.`}</span>
      {"\n"}
      <span className="text-white/40">{`/// @dev Bypasses freeze checks.`}</span>
      {"\n"}
      <span className="text-[#eb81fe]">function </span>
      <span className="text-[#8df17c]">adminBurn</span>
      <span className="text-white/80">(</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#eb81fe]">address </span>
      <span className="text-white/80">from,</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#eb81fe]">uint256 </span>
      <span className="text-white/80">amount</span>
      {"\n"}
      <span className="text-white/80">{`) `}</span>
      <span className="text-[#eb81fe]">external </span>
      <span className="text-[#79b8ff]">onlyRole</span>
      <span className="text-white/80">(BURNER_ROLE) </span>
      <span className="text-[#79b8ff]">nonReentrant</span>
      <span className="text-white/80">{` {`}</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#eb81fe]">if </span>
      <span className="text-white/80">(</span>
      <span className="text-[#8df17c]">paused</span>
      <span className="text-white/80">()) </span>
      <span className="text-[#eb81fe]">revert </span>
      <span className="text-[#8df17c]">TokenPaused</span>
      <span className="text-white/80">();</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#eb81fe]">if </span>
      <span className="text-white/80">(from == </span>
      <span className="text-[#eb81fe]">address</span>
      <span className="text-white/80">(0)) </span>
      <span className="text-[#eb81fe]">revert </span>
      <span className="text-[#8df17c]">ZeroAddress</span>
      <span className="text-white/80">();</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#eb81fe]">if </span>
      <span className="text-white/80">(amount == 0) </span>
      <span className="text-[#eb81fe]">revert </span>
      <span className="text-[#8df17c]">ZeroAmount</span>
      <span className="text-white/80">();</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#79b8ff]">ERC20Upgradeable</span>
      <span className="text-white/80">.</span>
      <span className="text-[#8df17c]">_update</span>
      <span className="text-white/80">(from, </span>
      <span className="text-[#eb81fe]">address</span>
      <span className="text-white/80">(0), amount);</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#eb81fe]">emit </span>
      <span className="text-[#8df17c]">AdminBurned</span>
      <span className="text-white/80">(from, amount);</span>
      {"\n"}
      <span className="text-white/80">{"}"}</span>
      {"\n\n"}
      <span className="text-[#eb81fe]">function </span>
      <span className="text-[#8df17c]">pause</span>
      <span className="text-white/80">() </span>
      <span className="text-[#eb81fe]">external </span>
      <span className="text-[#79b8ff]">onlyRole</span>
      <span className="text-white/80">(PAUSER_ROLE) {"{"}</span>
      {"\n"}
      <span className="text-white/80">{"    "}</span>
      <span className="text-[#8df17c]">_pause</span>
      <span className="text-white/80">();</span>
      {"\n"}
      <span className="text-white/80">{"}"}</span>
    </>
  );

  return (
    <div className="relative h-[430px] w-[560px] shrink-0 overflow-hidden rounded-[20px] bg-gradient-to-b from-transparent to-white/5 mq1100:w-full mq1100:h-[300px]">
      <div className="absolute inset-0 overflow-hidden rounded-[20px] bg-[#1a1332] p-[46px] font-mono text-sm leading-[26px] text-white/80 mq450:p-6 mq450:text-xs mq450:leading-5">
        <code className="block whitespace-pre">
          {code}
        </code>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[223px] rounded-b-[20px] bg-gradient-to-b from-transparent to-[#2a2240]" />
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */

export default function OceanCaseStudy() {
  return (
    <main className="relative flex w-full flex-col items-center overflow-x-clip text-white">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#040b1e] pt-[77px] mq900:pt-0">
        {/* Background image layer — visible only on small screens */}
        <div className="pointer-events-none absolute inset-0 hidden mq900:block" aria-hidden>
          <Image
            src="/works/ocean/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#040b1e]/70" />
        </div>

        <div className="relative flex min-h-[640px] w-full items-stretch mq1100:min-h-[520px] mq900:min-h-[560px] mq450:min-h-[500px]">
          {/* Left column — exactly 50vw */}
          <div className="relative z-10 flex w-2/5 flex-none flex-col justify-between pb-[160px] pl-[60px] pr-8 mq1100:pb-10 mq900:w-full mq900:pb-16 mq900:pl-[30px] mq900:pr-[30px] mq900:pt-[60px] mq450:pl-5 mq450:pr-5">
            <Image
              src="/works/ocean/logo.png"
              alt="Ocean Finance logo"
              width={100}
              height={98}
              priority
            />
            <div className="max-w-[600px]">
              <h1 className="m-0 font-sora text-[64px] font-semibold capitalize leading-[82px] mq1100:text-[50px] mq1100:leading-[64px] mq900:text-[48px] mq900:leading-[60px] mq450:text-[38px] mq450:leading-[48px]">
                Ocean Finance
              </h1>
              <p className="m-0 mt-2 font-reg text-sm font-normal leading-[22px] tracking-[0.02em]">
                {OCEAN_FINANCE_TAGLINE}
              </p>
              <div className="mt-10">
                <p className="m-0 font-reg text-[10px] font-semibold uppercase leading-3 tracking-[2px] text-white-60">
                  What we did:
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {HERO_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex cursor-default items-center rounded-md bg-white/10 px-2.5 py-1 font-reg text-xs font-medium leading-[18px] tracking-[0.02em] text-white transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column — exactly 50vw, desktop only */}
          <div className="pointer-events-none relative w-3/5 flex-none overflow-hidden mq900:hidden" aria-hidden>
            <div className="top-0 h-full w-[108%]">
              <Image
                src="/works/ocean/hero-bg.png"
                alt="Ocean Finance Dashboard"
                fill
                className="object-cover object-left-top"
                sizes="85vw"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[60px]"
          style={{ background: "linear-gradient(to bottom, transparent, #1b1333)" }}
        />
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="w-full bg-dark px-5 pt-16 pb-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10">
          <h2 className="m-0 text-center font-sora text-[26px] font-semibold capitalize leading-none mq450:text-xl">
            Tokenizing Trade Finance Capital Flows
          </h2>
          <p className="m-0 max-w-[747px] text-center font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white-60">
            End-to-end tokenized fund infrastructure for institutional investors.
            From smart contract development to web application delivery and
            on-chain data infrastructure.
          </p>
          <div className="flex w-full max-w-[950px] items-center justify-center mq700:flex-col mq700:gap-10">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center mq700:flex-col">
                {i > 0 && (
                  <div className="mx-10 h-[110px] w-px bg-white/20 mq900:mx-6 mq700:mx-0 mq700:h-px mq700:w-[110px]" />
                )}
                <div className="flex flex-col items-center gap-2 whitespace-nowrap text-center">
                  <span className="font-sora text-[66px] font-extralight capitalize leading-none mq900:text-[48px] mq450:text-[36px]">
                    {stat.value}
                  </span>
                  <span className="font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white-60">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brief & Background ─────────────────────────────── */}
      <section className="w-full bg-dark px-5 py-16">
        <div className="relative mx-auto max-w-[1132px]">
          <GradientBorderCard backgroundSrc="/token-noise-bg.png">
            <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq450:text-5xl">
              Brief &amp; Background
            </h2>
            <div className="mt-10 flex max-w-[663px] flex-col gap-4 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
              <p className="m-0">
                <span className="text-white">Ocean Finance</span> is a project
                linked to the Singapore-based investment firm Oceanus Group. The
                group partnered with Clearwater Capital Partners to launch a
                pilot initiative aimed at advancing the digitization and
                tokenization of cash-flow-backed trade flows on their AI-powered
                financial technology platform, ODIN.
              </p>
              <p className="m-0">
                While their team has extensive financial knowledge, Clearwater
                Partners had no tech team and limited experience in the
                blockchain space. They needed the digital infrastructure to bring
                their product to market.
              </p>
            </div>
          </GradientBorderCard>
        </div>
      </section>

      {/* ── Business Objectives ──────────────────────────────── */}
      <section className="w-full bg-dark px-5 pb-16 pt-6 mq1100:px-8 mq450:px-5">
        <div className="mx-auto max-w-[1132px]">
          <h3 className="m-0 text-center font-sora text-[26px] font-semibold capitalize leading-none mq450:text-xl">
            Business Objectives
          </h3>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 mq900:grid-cols-1">
            {OBJECTIVES.map((obj, i) => {
              const Icon = OBJECTIVE_ICONS[i];
              return (
                <div
                  key={obj.title}
                  className="relative flex items-start gap-4 overflow-hidden rounded-3xs border border-solid border-white/20 bg-[rgba(27,19,51,0.4)] p-6 shadow-[0_0_12px_0_#2b1f62] transition-all duration-300 ease-out hover:-translate-y-px hover:border-white/25 hover:shadow-[0_0_18px_2px_#2b1f62] mq450:flex-col mq450:items-center mq450:text-center"
                >
                  <span className="shrink-0 text-white">
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <h4 className="m-0 font-sora text-xl font-semibold leading-[30px] tracking-[0.02em]">
                      {obj.title}
                    </h4>
                    <p className="m-0 mt-2 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
                      {obj.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Solution ───────────────────────────────────── */}
      <section className="w-full bg-dark px-5 py-16 mq450:px-3">
        <div className="relative mx-auto max-w-[1370px] overflow-hidden rounded-[50px] border border-white/20 bg-white/[0.04] py-24 mq900:rounded-[20px] mq900:py-16 mq450:rounded-2xl mq450:py-12">
          <Image
            src="/works/ocean/solution-top-bg.png"
            alt=""
            width={1370}
            height={300}
            className="pointer-events-none absolute left-0 top-0 w-full object-cover"
            aria-hidden
          />
          <h2 className="relative m-0 text-center font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq450:text-5xl">
            Our Solution
          </h2>

          <div className="mt-20 flex flex-col gap-24 px-[70px] mq1100:mt-12 mq1100:gap-16 mq1100:px-10 mq450:gap-12 mq450:px-5">
            {/* Feature 1: ERC-20 Token */}
            <div className="flex items-start gap-16 mq1100:flex-col mq1100:gap-10">
              <div className="min-w-0 flex-1">
                <h3 className="m-0 font-reg text-5xl font-bold leading-none tracking-[0.02em] mq450:text-xl">
                  {SOLUTION_FEATURES[0].title}
                </h3>
                <p className="m-0 mt-4 max-w-[532px] font-reg text-base font-normal leading-6 tracking-[0.02em] text-white-60">
                  {SOLUTION_FEATURES[0].description}
                </p>
                <ul className="mt-6 flex max-w-[485px] list-disc flex-col gap-1 pl-[18px] font-reg text-xs font-normal leading-[18px] tracking-[0.02em] text-white-60">
                  {SOLUTION_FEATURES[0].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <CodePreview />
            </div>

            {/* Feature 2: Token Dashboard (image left, text right) */}
            <div className="flex items-start gap-16 mq1100:flex-col mq1100:gap-10">
              <div className="relative h-[430px] w-[560px] shrink-0 overflow-hidden rounded-[20px] mq1100:order-2 mq1100:h-[300px] mq1100:w-full mq450:h-[220px]">
                <Image
                  src="/works/ocean/dashboard-1.png"
                  alt="Token Administration Dashboard showing fund operations"
                  fill
                  className="object-cover object-left-top"
                  sizes="(max-width: 1100px) 100vw, 560px"
                />
              </div>
              <div className="min-w-0 flex-1 mq1100:order-1">
                <h3 className="m-0 font-reg text-5xl font-bold leading-none tracking-[0.02em] mq450:text-xl">
                  {SOLUTION_FEATURES[1].title}
                </h3>
                <p className="m-0 mt-4 max-w-[532px] font-reg text-base font-normal leading-6 tracking-[0.02em] text-white-60">
                  {SOLUTION_FEATURES[1].description}
                </p>
                <ul className="mt-6 flex max-w-[485px] list-disc flex-col gap-1 pl-[18px] font-reg text-xs font-normal leading-[18px] tracking-[0.02em] text-white-60">
                  {SOLUTION_FEATURES[1].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3: NAV Pipeline (text left, image right) */}
            <div className="flex items-start gap-16 mq1100:flex-col mq1100:gap-10">
              <div className="min-w-0 flex-1">
                <h3 className="m-0 font-reg text-5xl font-bold leading-none tracking-[0.02em] mq450:text-xl">
                  {SOLUTION_FEATURES[2].title}
                </h3>
                <p className="m-0 mt-4 max-w-[532px] font-reg text-base font-normal leading-6 tracking-[0.02em] text-white-60">
                  {SOLUTION_FEATURES[2].description}
                </p>
                <ul className="mt-6 flex max-w-[485px] list-disc flex-col gap-1 pl-[18px] font-reg text-xs font-normal leading-[18px] tracking-[0.02em] text-white-60">
                  {SOLUTION_FEATURES[2].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[430px] w-[560px] shrink-0 overflow-hidden rounded-[20px] mq1100:h-[300px] mq1100:w-full mq450:h-[220px]">
                <Image
                  src="/works/ocean/dashboard-2.png"
                  alt="NAV Data Pipeline dashboard with fund analytics"
                  fill
                  className="object-cover object-left-top"
                  sizes="(max-width: 1100px) 100vw, 560px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Infrastructure ───────────────────────── */}
      <section className="relative w-full bg-dark px-5 py-12">
        <GradientGlow className="top-1/2 -translate-y-1/2" size="sm" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-8">
          <h2 className="m-0 text-center font-sora text-[26px] font-semibold capitalize leading-none mq450:text-xl">
            Technical Infrastructure
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-9 cursor-default items-center justify-center rounded-md bg-tag-sky/[0.16] px-3 py-1 font-reg text-base font-medium leading-none tracking-[0.02em] text-tag-sky transition-colors duration-200 hover:bg-tag-sky/[0.28] hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Gallery ────────────────────────────────── */}
      <ProjectGallery slides={GALLERY_SLIDES} />

      {/* ── Outcome ────────────────────────────────────────── */}
      <section className="w-full bg-dark px-5 py-16">
        <div className="relative mx-auto max-w-[1132px]">
          <GradientBorderCard
            backgroundSrc="/works/ocean/outcome-bg.png"
            backgroundClassName="pointer-events-none object-cover object-right"
          >
            <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq450:text-5xl">
              Outcome
            </h2>
            <div className="mt-10 flex max-w-[663px] flex-col gap-6 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
              <p className="m-0">
                The full solution was designed, built, and delivered within the
                original 12-week engagement. Ocean Finance came away with a
                working, end-to-end tokenized fund infrastructure — on time and
                to brief.
              </p>
              <p className="m-0">
                Following delivery, the team ran a successful pilot with a
                select group of early investors, demonstrating the full
                end-to-end flow in a live environment. The pilot validated the
                core proof of concept — that trade finance capital flows can be
                represented on-chain in a compliant, operationally manageable
                way.
              </p>
            </div>
          </GradientBorderCard>
        </div>
      </section>

      {/* ── Testimonial Quote ──────────────────────────────── */}
      <section className="w-full bg-dark px-5 py-20">
        <div className="mx-auto flex max-w-[876px] flex-col items-center text-center">
          <span
            className="select-none text-[180px] leading-[0.6] text-white mq900:text-[120px] mq450:text-[80px]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="m-0 -mt-5 font-reg text-[30px] font-light leading-[1.5] mq900:text-xl mq450:text-lg">
            <span className="font-semibold">ODIN</span>{" "}
            <span className="text-white/50">
              already digitizes our cross-border trade workflows. This initiative
              represents the next step — creating an institutional-grade
              &lsquo;on-chain transaction truth layer&rsquo;
            </span>{" "}
            where key transaction states can be independently verified.
          </p>
          <div className="mt-8 flex flex-col items-center font-reg text-xs font-normal uppercase leading-[22px] tracking-[0.2em] text-white-60">
            <span>Peter Koh</span>
            <span>CEO of Oceanus Group</span>
          </div>
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
