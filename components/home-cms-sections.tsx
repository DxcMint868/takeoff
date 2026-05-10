"use client";

import { useEffect, useState } from "react";
import { useLocale } from "../contexts/locale-context";
import type { HomePageCmsData } from "../lib/strapi/home-page";
import type { WorkProjectCard } from "./work-examples-portfolio";
import ContactSection from "./contact-section";
import FrameComponent from "./frame-component";
import TechnologiesSection from "./technologies-section";
import WorkExamplesSection from "./work-examples-section";
import WorksSection from "./works-section";

export type HomeCmsSectionsProps = {
  initialHomePageData: HomePageCmsData | null;
  featuredProject: WorkProjectCard | null;
  projectCards: WorkProjectCard[];
};

export default function HomeCmsSections({
  initialHomePageData,
  featuredProject,
  projectCards,
}: HomeCmsSectionsProps) {
  const { locale } = useLocale();
  const [homePageData, setHomePageData] = useState<HomePageCmsData | null>(
    initialHomePageData,
  );

  useEffect(() => {
    setHomePageData(initialHomePageData);
  }, [initialHomePageData]);

  useEffect(() => {
    let cancelled = false;

    if (locale === "en" && initialHomePageData) {
      setHomePageData(initialHomePageData);
      return () => {
        cancelled = true;
      };
    }

    void (async () => {
      try {
        const res = await fetch(
          `/api/home-page?locale=${encodeURIComponent(locale)}`,
        );
        if (!res.ok) return;
        const data = (await res.json()) as HomePageCmsData | null;
        if (!cancelled) setHomePageData(data ?? initialHomePageData ?? null);
      } catch {
        if (!cancelled) setHomePageData(initialHomePageData ?? null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale, initialHomePageData]);

  return (
    <>
      <section className="w-full flex flex-col items-start justify-start gap-14 max-w-full mq900:gap-7 pt-[70px]">
        <FrameComponent hero={homePageData?.hero ?? null} />
      </section>

      <div className="w-full flex justify-center">
        <div
          className={`flex flex-col pt-96 items-start justify-start gap-3 max-w-[1200px] w-full text-center text-xs text-white font-reg`}
        >
          <TechnologiesSection
            capabilities={homePageData?.capabilities ?? undefined}
          />
          <WorkExamplesSection
            featuredProject={featuredProject}
            projectCards={projectCards}
          />
          <WorksSection
            testimonials={homePageData?.testimonials ?? undefined}
            logoCloud={homePageData?.logoCloud ?? undefined}
          />
          <ContactSection className="px-4" />
        </div>
      </div>
    </>
  );
}
