"use client";

import Image from "next/image";
import Link from "next/link";
import { OCEAN_FINANCE_TAGLINE } from "../constants/ocean-finance";
import { useLocalizedPath } from "../lib/i18n/use-localized-path";
import { Badge } from "./badge";
import { TagsDisplay } from "./tags-display";

export type WorkTagTone =
  | "cyan"
  | "mint"
  | "amber"
  | "pink"
  | "lime"
  | "sky"
  | "coral";

export type WorkTagSpec = { label: string; tone: WorkTagTone };

export type WorkProjectCard = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string | null;
  imageAlt: string;
  logoSrc?: string | null;
  logoAlt?: string;
  tags: WorkTagSpec[];
  extra?: string;
  href?: string;
};

export const FEATURED_TAGS_ROW1: WorkTagSpec[] = [
  { label: "Smart Contract Development", tone: "lime" },
  { label: "Development", tone: "pink" },
  { label: "Product", tone: "mint" },
];

export const FEATURED_TAGS_ROW2: WorkTagSpec[] = [
  { label: "Data Infrastructure", tone: "sky" },
  { label: "Compliance Controls", tone: "coral" },
];

export const OCEAN_FINANCE_PROJECT: WorkProjectCard = {
  id: "ocean-finance",
  title: "Ocean Finance",
  subtitle: OCEAN_FINANCE_TAGLINE,
  imageSrc: "/works/ocean/ocean-finance-dashboard.png",
  imageAlt: "Ocean Finance admin dashboard with token operations and activity",
  description:
    "End-to-end tokenized fund infrastructure for institutional investors. From smart contract development to web application delivery and on-chain data infrastructure.",
  tags: [...FEATURED_TAGS_ROW1, ...FEATURED_TAGS_ROW2],
  href: "/works/ocean-finance",
};

export const CORE_PROJECT_CARDS: WorkProjectCard[] = [
  {
    id: "second-swap",
    title: "SecondSwap",
    imageSrc: "/works/second-swap/second-swap-app.png",
    imageAlt:
      "SecondSwap mobile app showing Solana token bidding and best deals marketplace",
    description:
      "One-year engagement delivering a multi-chain marketplace for tradable vesting contracts across Avalanche, Ethereum, and Solana. Peak TVL of $6M, 5,000+ active users.",
    tags: [
      { label: "Tokenization", tone: "lime" },
      { label: "DeFi", tone: "cyan" },
      { label: "Web3 Integration", tone: "amber" },
      { label: "Blockchain", tone: "sky" },
    ],
    href: "/works/second-swap",
  },
  {
    id: "powertrade",
    title: "PowerTrade",
    imageSrc: "/power-trade-app.png",
    imageAlt:
      "PowerTrade mobile app showing portfolio value chart and crypto asset holdings",
    description:
      "An altcoin options exchange with a sleek portfolio tracker for managing crypto assets and trading options",
    tags: [
      { label: "UX/UI", tone: "cyan" },
      { label: "Product", tone: "mint" },
      { label: "Research", tone: "amber" },
      { label: "Development", tone: "pink" },
    ],
    extra: "+1",
  },
  {
    id: "crypto-paradise",
    title: "Crypto Paradise",
    imageSrc: "/crypto-paradise-app.png",
    imageAlt:
      "Crypto Paradise mini app displaying user token balance and giveaway promotion",
    description:
      "A crypto lifestyle community and mini app powered by the $SURF token, offering alpha, education, and investment opportunities",
    tags: [
      { label: "UX/UI", tone: "cyan" },
      { label: "Product", tone: "mint" },
      { label: "Research", tone: "amber" },
      { label: "Development", tone: "pink" },
    ],
    extra: "+1",
  },
];

/** Additional case studies shown only on the /works page (Figma). */
export const EXTRA_PAGE_PROJECT_CARDS: WorkProjectCard[] = [
  {
    id: "bspin",
    title: "bspin",
    imageSrc: "/bspin-app.png",
    imageAlt:
      "bspin mobile app showing first deposit bonus with treasure chest promotion",
    description:
      "A Bitcoin casino offering slots, poker, sports betting, and live games with provably fair gameplay and crypto deposits",
    tags: [
      { label: "Design", tone: "cyan" },
      { label: "Product", tone: "mint" },
      { label: "Development", tone: "pink" },
    ],
  },
  {
    id: "triptips",
    title: "TripTips",
    imageSrc: "/triptips-app.png",
    imageAlt: "TripTips mobile app showing curated local guides on a city map",
    description:
      "A curated city guide app for discovering the best local spots to eat, drink, shop, and explore worldwide",
    tags: [
      { label: "Design", tone: "cyan" },
      { label: "Product", tone: "mint" },
      { label: "Development", tone: "pink" },
    ],
  },
  {
    id: "spinly",
    title: "Spinly",
    imageSrc: "/spinly-app.png",
    imageAlt:
      "Spinly mobile app displaying game details with multi-currency crypto support",
    description:
      "A crypto-native casino platform blending retro pixel-art aesthetics with responsible gaming tools and 4,000+ games",
    tags: [
      { label: "Design", tone: "cyan" },
      { label: "Product", tone: "mint" },
      { label: "Development", tone: "pink" },
    ],
  },
];

export function WorkTag({ label }: WorkTagSpec) {
  return <Badge>{label}</Badge>;
}

type WorkExamplesPortfolioProps = {
  projectCards: WorkProjectCard[];
  showFeatured?: boolean;
  featuredProject?: WorkProjectCard | null;
};

export function WorkExamplesPortfolio({
  projectCards,
  showFeatured = true,
  featuredProject = OCEAN_FINANCE_PROJECT,
}: WorkExamplesPortfolioProps) {
  const lp = useLocalizedPath();
  const hasResults =
    (showFeatured && !!featuredProject) || projectCards.length > 0;

  return (
    <div className="mx-auto box-border flex w-full min-w-0 max-w-[1138px] flex-col gap-8 overflow-x-clip px-4">
      {showFeatured && featuredProject && (
        <Link
          href={lp(featuredProject.href || `/works/${featuredProject.id}`)}
          className="group block w-full min-w-0 max-w-full [text-decoration:none]"
        >
          <div className="relative flex min-h-0 w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[20px] bg-surface-card shadow-card ring-1 ring-inset ring-surface-border transition-shadow duration-300 hover:shadow-[0_0_30px_0_rgba(255,255,255,0.2)] ms1024:min-h-[400px] ms1024:max-h-[400px] ms1024:flex-row">
            {featuredProject.logoSrc && (
              <div className="absolute -left-3 -top-3 z-10 flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full bg-[#1B1333] shadow-[inset_0_0_0_2px_#1B1333,0_0_0_2px_#1B1333] isolate mq700:-left-2 mq700:-top-2 ms1024:h-[110px] ms1024:w-[110px]">
                <Image
                  src={featuredProject.logoSrc}
                  alt={featuredProject.logoAlt || `${featuredProject.title} logo`}
                  width={62}
                  height={62}
                  unoptimized
                  className="rounded-full object-contain transform-gpu w-[42px] h-[42px] ms1024:w-[62px] ms1024:h-[62px]"
                />
              </div>
            )}
            <div className="relative order-2 flex min-w-0 flex-1 flex-col justify-between px-4 pb-8 pt-[50px] ms1024:order-1 ms1024:px-0 ms1024:pb-10 ms1024:pl-[42px] ms1024:pr-6 ms1024:pt-[120px]">
              <div>
                <h3 className="relative z-[2] m-0 text-center font-reg text-[32px] font-semibold leading-[40px] tracking-[0.04em] text-white ms1024:text-left">
                  {featuredProject.title}
                </h3>
                {featuredProject.subtitle && (
                  <p className="relative z-[2] m-0 mt-3 text-center font-reg text-xs font-normal leading-[18px] tracking-[0.02em] text-white ms1024:text-left">
                    {featuredProject.subtitle}
                  </p>
                )}
                <p className="relative z-[2] m-0 mt-2 line-clamp-3 text-center font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white/70 ms1024:text-left">
                  {featuredProject.description}
                </p>
                {featuredProject.tags.length > 0 ? (
                  <div className="relative z-[2] mt-6 max-w-[520px] self-center ms1024:self-start">
                    <TagsDisplay
                      tags={featuredProject.tags}
                      projectId={featuredProject.id}
                      containerClassName="justify-center ms1024:justify-start"
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="relative order-1 h-[220px] w-full shrink-0 overflow-hidden rounded-t-[20px] bg-surface-media ms1024:order-2 ms1024:h-[400px] ms1024:w-[569px] ms1024:rounded-bl-[20px] ms1024:rounded-br-[20px] ms1024:rounded-tr-[20px] ms1024:rounded-tl-0 ms1024:self-start">
              {featuredProject.imageSrc ? (
                <Image
                  src={featuredProject.imageSrc}
                  alt={featuredProject.imageAlt}
                  fill
                  className="object-cover object-left-top motion-safe:transform-gpu motion-safe:scale-[1.02] motion-safe:origin-top-left"
                  sizes="(max-width: 1023px) 100vw, 569px"
                />
              ) : null}
            </div>
          </div>
        </Link>
      )}

      {!hasResults ? (
        <p className="w-full py-10 text-center font-reg text-sm leading-[22px] tracking-[0.02em] text-white/70">
          No projects match your search or filters.
        </p>
      ) : projectCards.length > 0 ? (
        <div className="flex w-full min-w-0 flex-wrap justify-center gap-8 mq700:flex-col mq700:items-stretch">
          {projectCards.map((project) => (
            <Link
              key={project.id}
              href={lp(project.href || `/works/${project.id}`)}
              className="group flex min-w-0 max-w-full shrink-0 basis-[358px] justify-center [text-decoration:none] mq700:w-full mq700:basis-auto mq700:max-w-none"
            >
              <article
                className="relative flex h-[620px] w-full max-w-[358px] cursor-pointer flex-col overflow-hidden rounded-[20px] bg-surface-card shadow-card ring-1 ring-inset ring-surface-border transition-shadow duration-300 hover:shadow-[0_0_30px_0_rgba(255,255,255,0.2)] mq700:h-auto mq700:max-w-none"
              >
                <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-t-[20px] rounded-b-[20px] bg-surface-card">
                  {project.imageSrc ? (
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      fill
                      className="object-cover object-right-top motion-safe:origin-top-right motion-safe:scale-[1.02] motion-safe:transform-gpu"
                      sizes="(max-width: 700px) 100vw, 358px"
                    />
                  ) : null}
                  {project.logoSrc && (
                    <div className="absolute -right-1.5 -top-4 z-10 box-border flex size-[70px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1B1333] shadow-[inset_0_0_0_2px_#1B1333,0_0_0_2px_#1B1333] isolate">
                      <Image
                        src={project.logoSrc}
                        alt={project.logoAlt || `${project.title} logo`}
                        width={80}
                        height={80}
                        unoptimized
                        className="h-auto max-h-full w-full transform-gpu object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-4 pb-8 pt-4 text-left">
                  <div>
                    <h3 className="m-0 font-reg text-lg font-semibold leading-normal tracking-[0.02em] text-white">
                      {project.title}
                    </h3>
                    <p className="m-0 mt-3 line-clamp-5 font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white/70">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <TagsDisplay
                      tags={project.tags}
                      projectId={project.id}
                      extra={project.extra}
                    />
                  </div>

                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
