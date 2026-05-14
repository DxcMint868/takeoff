"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BADGE_SURFACE_CLASSES } from "./badge";
import CTASolid from "./cta-solid";
import { GradientGlow } from "./gradient-glow";
import { useTranslation } from "../lib/i18n/use-translation";
import {
  CORE_PROJECT_CARDS,
  EXTRA_PAGE_PROJECT_CARDS,
  OCEAN_FINANCE_PROJECT,
  WorkExamplesPortfolio,
  type WorkProjectCard,
  type WorkTagSpec,
} from "./work-examples-portfolio";
import type { DesignProjectCard } from "../lib/strapi/design-projects";

const FILTER_CHIPS: WorkTagSpec[] = [
  { label: "Smart Contract Development", tone: "lime" },
  { label: "Research", tone: "amber" },
  { label: "Development", tone: "pink" },
  { label: "Branding", tone: "pink" },
  { label: "Product", tone: "mint" },
  { label: "UX/UI", tone: "cyan" },
  { label: "Data Infrastructure", tone: "sky" },
  { label: "Compliance Controls", tone: "coral" },
  { label: "Graphics/Animation", tone: "lime" },
];

const ALL_PROJECT_CARDS: WorkProjectCard[] = [
  ...CORE_PROJECT_CARDS,
  ...EXTRA_PAGE_PROJECT_CARDS,
];

type WorksPageMainProps = {
  projectCards?: WorkProjectCard[];
  featuredProject?: WorkProjectCard | null;
  filterChips?: WorkTagSpec[];
  designProjectCards?: DesignProjectCard[];
};

function projectMatchesFilters(project: WorkProjectCard, active: Set<string>) {
  if (active.size === 0) return true;
  return project.tags.some((t) => active.has(t.label));
}

function projectMatchesSearch(project: WorkProjectCard, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return (
    project.title.toLowerCase().includes(s) ||
    project.description.toLowerCase().includes(s)
  );
}

const WorksPageMain = ({
  projectCards,
  featuredProject,
  filterChips,
  designProjectCards,
}: WorksPageMainProps) => {
  const { t } = useTranslation();
  const cardsSource = projectCards ?? ALL_PROJECT_CARDS;
  const featuredSource = featuredProject ?? OCEAN_FINANCE_PROJECT;
  const chipsSource = filterChips ?? FILTER_CHIPS;

  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    () => new Set(),
  );

  const filteredProjects = useMemo(() => {
    return cardsSource.filter(
      (p) =>
        projectMatchesSearch(p, query) &&
        projectMatchesFilters(p, activeFilters),
    );
  }, [query, activeFilters, cardsSource]);

  const showFeatured = useMemo(() => {
    if (!featuredSource) return false;
    return (
      projectMatchesSearch(featuredSource, query) &&
      projectMatchesFilters(featuredSource, activeFilters)
    );
  }, [query, activeFilters, featuredSource]);

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <main className="relative box-border flex w-full flex-col items-center overflow-x-clip pb-24 pt-8 text-white">
      <GradientGlow className="top-0" />
      <div className="relative flex w-full max-w-[1200px] flex-col items-stretch gap-10">
        <div className="box-border flex w-full flex-col gap-6 px-4">
          <Link
            href="/"
            className="group flex w-fit flex-row items-center gap-3 self-start text-left [text-decoration:none]"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-white-30 bg-dark/40 transition-colors group-hover:border-white-60">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
                aria-hidden
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-reg text-xs uppercase leading-4 tracking-[0.2em] text-white">
              {t("blog.back")}
            </span>
          </Link>

          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="m-0 max-w-[900px] font-sora text-29xl font-normal leading-[1.1] tracking-[0.02em] text-white mq450:text-10xl mq900:text-19xl mq900:leading-tight">
              {t("works.hero.title")}
            </h1>
            <div className="w-full max-w-[900px] font-reg text-3xl font-light leading-[34px] tracking-[0.02em] text-white-60 mq450:text-base mq450:leading-7">
              <p className="m-0 [text-wrap:balance]">
                {t("works.hero.subtitle")}
              </p>
            </div>
          </div>

          <div className="mx-auto box-border flex w-full max-w-[388px] flex-col rounded-[40px] border border-solid border-white-30 bg-dark/30 px-5 py-2.5 backdrop-blur-sm mq450:mx-4 mq450:w-auto">
            <label className="flex flex-row items-center gap-3">
              <span className="sr-only">Search projects</span>
              <svg
                className="size-5 shrink-0 text-white-60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M15.5 15.5L21 21M10 17a7 7 0 110-14 7 7 0 010 14z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="min-w-0 flex-1 border-0 bg-transparent py-2 font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white placeholder:text-white-60 outline-none focus:ring-0"
              />
            </label>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {chipsSource.map((chip) => {
              const active = activeFilters.has(chip.label);
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => toggleFilter(chip.label)}
                  className={`${BADGE_SURFACE_CLASSES} cursor-pointer select-none transition-opacity ${
                    active
                      ? "opacity-100 ring-2 ring-white/50"
                      : "opacity-90 hover:opacity-100"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        <WorkExamplesPortfolio
          projectCards={filteredProjects}
          showFeatured={showFeatured}
          featuredProject={featuredSource}
        />

        {designProjectCards && designProjectCards.length > 0 && (
          <section className="mx-auto box-border flex w-full min-w-0 max-w-[1138px] flex-col gap-8 px-4 pt-20 mq900:pt-14">
            <div className="flex flex-col gap-4">
              <h2 className="m-0 font-sora text-[80px] font-normal capitalize leading-[1.2] tracking-normal text-white mq900:text-[52px] mq450:text-[32px] text-white/20">
                {t("works.branding.title")}
              </h2>
              <p className="m-0 max-w-[680px] font-reg text-sm font-light leading-[22px] tracking-[0.02em] text-white-60">
                {t("works.branding.subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mq700:flex-col mq700:items-stretch">
              {designProjectCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group relative flex min-w-0 max-w-full shrink-0 basis-[358px] justify-center [text-decoration:none] mq700:w-full mq700:basis-auto mq700:max-w-none"
                >
                  <article className="relative flex h-[380px] w-full max-w-[358px] cursor-pointer flex-col overflow-hidden rounded-[20px] border border-surface-border bg-surface-card shadow-card transition-shadow duration-300 hover:shadow-[0_0_30px_0_rgba(255,255,255,0.2)] mq700:h-[320px] mq700:max-w-none">
                    {card.thumbnailUrl ? (
                      <Image
                        src={card.thumbnailUrl}
                        alt={`${card.title} branding`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 700px) 100vw, 358px"
                      />
                    ) : null}

                    {/* Hero logo – absolutely centered in the card */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
                      {card.heroLogoUrl ? (
                        <div className="relative h-16 w-full">
                          <Image
                            src={card.heroLogoUrl}
                            alt={`${card.title} logo`}
                            fill
                            unoptimized
                            className="object-contain"
                            sizes="(max-width: 700px) 100vw, 294px"
                          />
                        </div>
                      ) : (
                        <h3 className="m-0 text-center font-sora text-[28px] font-semibold leading-tight text-white mq700:text-2xl">
                          {card.title}
                        </h3>
                      )}
                    </div>

                    {/* Arrow – bottom-right */}
                    <div className="relative z-20 mt-auto self-end p-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors group-hover:bg-white/20">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>

                    {/* Logo badge – inside article so overflow-hidden clips to the card */}
                    {card.logoUrl ? (
                      <Image
                        src={card.logoUrl}
                        alt={`${card.title} logo`}
                        width={72}
                        height={72}
                        unoptimized
                        className="absolute -right-2 -top-2 z-10 object-contain"
                      />
                    ) : null}
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="box-border w-full px-4">
          <section
            id="works-cta"
            className="relative mx-auto mt-[167px] box-border flex w-full max-w-[1138px] flex-col items-center gap-8 overflow-hidden rounded-2xl bg-surface-card px-8 py-14 text-center mq900:mt-24 mq700:mt-16 mq450:px-5 mq450:py-10"
          >
            <Image
              src="/backgrounds/noise.png"
              alt=""
              aria-hidden
              fill
              className="pointer-events-none object-cover opacity-[0.95]"
              sizes="100vw"
            />
            <h2 className="relative z-[1] m-0 font-sora text-29xl font-normal leading-[58px] tracking-[0.02em] text-white mq450:text-10xl mq450:leading-[41px] mq900:text-19xl mq900:leading-[46px]">
              {t("works.cta.title")}
            </h2>
            <p className="relative z-[1] m-0 max-w-[520px] font-reg text-base font-light leading-6 tracking-[0.02em] text-white-60">
              {t("works.cta.subtitle")}
            </p>
            <CTASolid label="Start a Conversation" href="/#contact-us" />
          </section>
        </div>
      </div>
    </main>
  );
};

export default WorksPageMain;
