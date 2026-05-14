"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";
import { useLocale } from "../contexts/locale-context";
import type {
  TeamPageQuote,
  TeamPageViewModel,
} from "../lib/strapi/team-page";
import { GradientGlow } from "./gradient-glow";
import MemberGrid from "./member-grid";
import {
  DomainExpertiseIcon,
  AgileExecutionIcon,
  TransparencyIcon,
  WorldClassIcon,
} from "./icons";
import ContactSection from "./contact-section";
import { useTranslation } from "../lib/i18n/use-translation";

const VALUE_ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  DomainExpertiseIcon,
  AgileExecutionIcon,
  TransparencyIcon,
  WorldClassIcon,
];

function QuoteMediaIcon({
  quote,
  FallbackIcon,
  className,
}: {
  quote: TeamPageQuote;
  FallbackIcon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}) {
  const cn = `mt-0.5 h-[42px] w-[42px] shrink-0 text-white ${className ?? ""}`.trim();

  if (quote.iconUrl) {
    if (quote.iconIsVideo) {
      return (
        <video
          src={quote.iconUrl}
          className={`${cn} object-contain`}
          muted
          playsInline
          loop
          aria-hidden
        />
      );
    }
    return (
      <span className="relative mt-0.5 block h-[42px] w-[42px] shrink-0">
        <Image
          src={quote.iconUrl}
          alt={quote.iconAlt || quote.title || "Value"}
          fill
          className="object-contain"
          sizes="42px"
        />
      </span>
    );
  }

  return <FallbackIcon className={cn} />;
}

/** Staggered 2×2 mosaic: two columns share one height; row splits differ (~65/35 vs ~45/55) so gutters do not line up across the middle. */
function AboutTeamPhotoGrid({
  gallery,
}: {
  gallery: Array<{ url: string; alt: string }>;
}) {
  const pad: Array<{ url: string; alt: string }> = [
    { url: "/team-pic-1.png", alt: "Team photo" },
    { url: "/team-pic-3.png", alt: "Hoasen team outdoors" },
    { url: "/team-pic-2.png", alt: "Hoasen team by the sea" },
    { url: "/team-pic-4.png", alt: "Hoasen logo in the sand" },
  ];
  const slots = [...gallery, ...pad].slice(0, 4);
  const [g0, g1, g2, g3] = slots;

  return (
    <section
      aria-label="Hoasen team"
      className="mx-auto w-full max-w-[1138px] overflow-hidden"
    >
      <div className="flex h-[min(52vw,680px)] min-h-[360px] w-full flex-row gap-3 mq900:min-h-[320px] mq900:h-[min(58vw,520px)] mq700:flex-col mq700:h-auto mq700:min-h-0">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="relative min-h-0 w-full flex-[13] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[4/3]">
            <Image
              src={g0.url}
              alt={g0.alt}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="relative min-h-0 w-full flex-[7] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[16/9]">
            <Image
              src={g1.url}
              alt={g1.alt}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="relative min-h-0 w-full flex-[9] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[16/9]">
            <Image
              src={g2.url}
              alt={g2.alt}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="relative min-h-0 w-full flex-[11] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[4/3]">
            <Image
              src={g3.url}
              alt={g3.alt}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export type AboutPageMainProps = {
  initialTeamPage: TeamPageViewModel | null;
};

export default function AboutPageMain({ initialTeamPage }: AboutPageMainProps) {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const [teamPage, setTeamPage] = useState<TeamPageViewModel | null>(
    initialTeamPage,
  );

  useEffect(() => {
    setTeamPage(initialTeamPage);
  }, [initialTeamPage]);

  useEffect(() => {
    let cancelled = false;

    if (locale === "en" && initialTeamPage) {
      setTeamPage(initialTeamPage);
      return () => {
        cancelled = true;
      };
    }

    void (async () => {
      try {
        const res = await fetch(
          `/api/team-page?locale=${encodeURIComponent(locale)}`,
        );
        if (!res.ok) return;
        const data = (await res.json()) as TeamPageViewModel | null;
        if (!cancelled) setTeamPage(data ?? initialTeamPage ?? null);
      } catch {
        if (!cancelled) setTeamPage(initialTeamPage ?? null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale, initialTeamPage]);

  const resolvedGallery =
    teamPage?.gallery ??
    initialTeamPage?.gallery ??
    [
      { url: "/team-pic-1.png", alt: "Team photo" },
      { url: "/team-pic-3.png", alt: "Hoasen team outdoors" },
      { url: "/team-pic-2.png", alt: "Hoasen team by the sea" },
      { url: "/team-pic-4.png", alt: "Hoasen logo in the sand" },
    ];

  const cultureFromCms =
    teamPage?.culture ?? initialTeamPage?.culture ?? null;

  const cultureTitle =
    cultureFromCms?.title?.trim() || t("about.culture.fallbackTitle");
  const cultureBody =
    cultureFromCms?.body?.trim() || t("about.culture.fallbackBody");

  const rawValues =
    teamPage?.values?.length
      ? teamPage.values
      : initialTeamPage?.values?.length
        ? initialTeamPage.values
        : [];

  const displayValues = rawValues.filter(
    (b) => (b.title?.trim() ?? "") !== "" || (b.body?.trim() ?? "") !== "",
  );

  const featuredForGrid =
    teamPage?.featuredMembers && teamPage.featuredMembers.length > 0
      ? teamPage.featuredMembers
      : initialTeamPage?.featuredMembers &&
          initialTeamPage.featuredMembers.length > 0
        ? initialTeamPage.featuredMembers
        : undefined;

  return (
    <main className="relative box-border flex w-full flex-col items-center overflow-x-clip px-5 pb-24 pt-8 text-white mq900:px-6">
      <GradientGlow className="top-0" />
      <div className="relative flex w-full max-w-[1200px] flex-col items-stretch gap-10">
        <div className="flex w-full flex-col gap-6">
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
            <h1 className="m-0 max-w-[900px] font-sora text-[40px] font-normal leading-[1.1] tracking-[0.02em] text-white mq450:text-3xl mq900:text-[52px] mq900:leading-tight">
              {t("about.pageTitle")}
            </h1>
          </div>

          <div id="team-pic" className="w-full mt-24">
            <AboutTeamPhotoGrid gallery={resolvedGallery} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-12 mt-20 gap-y-28">
          <div className="mx-auto flex w-full flex-col gap-6 text-left font-reg text-base font-light leading-[26px] tracking-[0.02em] text-white/70">
            <div className="flex flex-col gap-3">
              <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">
                {cultureTitle}
              </h2>
              {cultureFromCms?.iconUrl ? (
                <div className="relative h-12 w-12 shrink-0">
                  {cultureFromCms.iconIsVideo ? (
                    <video
                      src={cultureFromCms.iconUrl}
                      className="h-full w-full object-contain"
                      muted
                      playsInline
                      loop
                      aria-hidden
                    />
                  ) : (
                    <Image
                      src={cultureFromCms.iconUrl}
                      alt={cultureFromCms.iconAlt || cultureTitle}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  )}
                </div>
              ) : null}
            </div>
            <p className="mt-4 max-w-[886px] text-xl text-white mq900:text-base">
              {cultureBody}
            </p>
          </div>

          <div className="w-full">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">
              {t("about.values.sectionTitle")}
            </h2>

            <div className="w-full grid grid-cols-4 gap-6 mq450:grid-cols-1 mq700:grid-cols-2 mt-20 space-between">
              {displayValues.map((block, index) => {
                const FallbackIcon = VALUE_ICONS[index % VALUE_ICONS.length]!;
                const title = block.title.trim();
                const body = block.body.trim();
                return (
                  <div key={`${title}-${index}`} className="w-full">
                    <div className="flex flex-col gap-2 max-w-[235px]">
                      <div className="flex flex-col items-start gap-8">
                        <QuoteMediaIcon
                          quote={block}
                          FallbackIcon={FallbackIcon}
                        />
                        <h3 className="m-0 font-sora text-xl font-semibold tracking-[0.2px] text-white">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-2 font-reg text-base font-normal leading-[24px] tracking-[0.32px] text-white/70 mq450:pl-0">
                        {body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <section id="our-team" className="w-full">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">
              {t("about.team.sectionTitle")}
            </h2>
            <div className="mt-12 w-full max-w-[1200px] text-left font-reg text-base text-white">
              <MemberGrid featuredMembers={featuredForGrid} />
            </div>
          </section>
        </div>
        <section className="px-4 flex w-full">
          <ContactSection />
        </section>
      </div>
    </main>
  );
}
