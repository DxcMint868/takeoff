"use client";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { CaseStudyViewModel } from "../lib/strapi/case-studies";
import { useLocale } from "../contexts/locale-context";
import CaseStudyTemplate from "./case-study-template";
import { ContentLoadingOverlay } from "./content-loading-overlay";

type CaseStudyLoaderProps = {
  initialCaseStudy: CaseStudyViewModel;
};

/** Refetches case study when UI locale changes (Strapi i18n). */
export default function CaseStudyLoader({
  initialCaseStudy,
}: CaseStudyLoaderProps) {
  const router = useRouter();
  const { locale, isLocaleReady } = useLocale();
  const [caseStudy, setCaseStudy] = useState(initialCaseStudy);
  const [busy, setBusy] = useState(false);

  const prevLocaleRef = useRef<string | null>(null);
  const prevSlugRef = useRef<string | null>(null);
  const fetchGenerationRef = useRef(0);

  const slugFromUrl =
    router.isReady && typeof router.query.slug === "string"
      ? router.query.slug
      : initialCaseStudy.slug;

  const documentId = initialCaseStudy.documentId;

  useEffect(() => {
    if (!router.isReady || !isLocaleReady) return;

    const localeSwitch =
      prevLocaleRef.current !== null && prevLocaleRef.current !== locale;
    const slugSwitch =
      prevSlugRef.current !== null && prevSlugRef.current !== slugFromUrl;

    prevLocaleRef.current = locale;
    prevSlugRef.current = slugFromUrl;

    if (locale === "en" && !localeSwitch && !slugSwitch) {
      setCaseStudy(initialCaseStudy);
      return;
    }

    const showOverlay = localeSwitch || slugSwitch;
    const generation = ++fetchGenerationRef.current;

    const controller = new AbortController();

    void (async () => {
      if (showOverlay) setBusy(true);
      try {
        const qs = new URLSearchParams();
        qs.set("locale", locale);
        if (documentId) qs.set("documentId", documentId);

        const res = await fetch(
          `/api/works/${encodeURIComponent(slugFromUrl)}?${qs.toString()}`,
          { signal: controller.signal },
        );
        if (
          !res.ok ||
          controller.signal.aborted ||
          generation !== fetchGenerationRef.current
        ) {
          return;
        }
        const data = (await res.json()) as { caseStudy?: CaseStudyViewModel };
        if (
          !data.caseStudy ||
          controller.signal.aborted ||
          generation !== fetchGenerationRef.current
        ) {
          return;
        }

        setCaseStudy(data.caseStudy);

        if (data.caseStudy.slug !== slugFromUrl) {
          void router.replace(`/works/${data.caseStudy.slug}`, undefined, {
            scroll: false,
          });
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        /* keep SSR props */
      } finally {
        if (generation === fetchGenerationRef.current) setBusy(false);
      }
    })();

    return () => {
      controller.abort();
      setBusy(false);
    };
  }, [locale, isLocaleReady, slugFromUrl, documentId, router.isReady, initialCaseStudy]);

  return (
    <div className="relative min-h-[40vh] w-full">
      <ContentLoadingOverlay visible={busy} fullViewport />
      <CaseStudyTemplate caseStudy={caseStudy} />
    </div>
  );
}
