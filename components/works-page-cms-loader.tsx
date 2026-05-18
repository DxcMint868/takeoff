"use client";

import { useEffect, useRef, useState } from "react";
import type { WorksApiResponse } from "../pages/api/works";
import { useLocale } from "../contexts/locale-context";
import type { DesignProjectCard } from "../lib/strapi/design-projects";
import {
  type WorkProjectCard,
  type WorkTagSpec,
} from "./work-examples-portfolio";
import WorksPageMain from "./works-page-main";
import { ContentLoadingOverlay } from "./content-loading-overlay";

type WorksPageCmsLoaderProps = {
  featuredProject: WorkProjectCard | null;
  projectCards: WorkProjectCard[];
  filterChips: WorkTagSpec[];
  designProjectCards: DesignProjectCard[];
};

/** Refetches works listing when UI locale changes (Strapi i18n). */
export default function WorksPageCmsLoader({
  featuredProject: initialFeatured,
  projectCards: initialCards,
  filterChips: initialChips,
  designProjectCards: initialDesignCards,
}: WorksPageCmsLoaderProps) {
  const { locale, isLocaleReady } = useLocale();
  const [featuredProject, setFeaturedProject] = useState(initialFeatured);
  const [projectCards, setProjectCards] = useState(initialCards);
  const [filterChips, setFilterChips] = useState(initialChips);
  const [designProjectCards, setDesignProjectCards] =
    useState(initialDesignCards);
  const [busy, setBusy] = useState(false);

  const prevLocaleRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLocaleReady) return;

    const localeSwitch =
      prevLocaleRef.current !== null && prevLocaleRef.current !== locale;
    prevLocaleRef.current = locale;

    const showOverlay = localeSwitch;

    let cancelled = false;

    void (async () => {
      if (showOverlay) setBusy(true);
      try {
        const res = await fetch(
          `/api/works?locale=${encodeURIComponent(locale)}`,
        );
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as WorksApiResponse;
        if (cancelled) return;
        setFeaturedProject(data.featuredProject);
        setProjectCards(data.projectCards);
        setFilterChips(data.filterChips);
        setDesignProjectCards(data.designProjectCards);
      } catch {
        /* keep SSR props */
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale, isLocaleReady]);

  return (
    <div className="relative w-full">
      <ContentLoadingOverlay visible={busy} fullViewport />
      <WorksPageMain
        featuredProject={featuredProject}
        projectCards={projectCards}
        filterChips={filterChips}
        designProjectCards={designProjectCards}
      />
    </div>
  );
}
