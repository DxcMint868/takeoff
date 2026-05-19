"use client";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { DesignProjectViewModel } from "../lib/strapi/design-projects";
import { useLocale } from "../contexts/locale-context";
import DesignProjectTemplate from "./design-project-template";
import { ContentLoadingOverlay } from "./content-loading-overlay";

type DesignProjectLoaderProps = {
  initialDesignProject: DesignProjectViewModel;
};

/** Refetches branding / design project when UI locale changes (Strapi i18n). */
export default function DesignProjectLoader({
  initialDesignProject,
}: DesignProjectLoaderProps) {
  const router = useRouter();
  const { locale, isLocaleReady } = useLocale();
  const [designProject, setDesignProject] = useState(initialDesignProject);
  const [busy, setBusy] = useState(false);

  const prevLocaleRef = useRef<string | null>(null);
  const fetchGenerationRef = useRef(0);

  const slugFromUrl =
    router.isReady && typeof router.query.slug === "string"
      ? router.query.slug
      : initialDesignProject.slug;

  const documentId = initialDesignProject.documentId;

  useEffect(() => {
    if (!router.isReady || !isLocaleReady) return;

    const localeSwitch =
      prevLocaleRef.current !== null && prevLocaleRef.current !== locale;
    prevLocaleRef.current = locale;

    if (locale === "en" && !localeSwitch) {
      setDesignProject(initialDesignProject);
      return;
    }

    const showOverlay = localeSwitch;
    const generation = ++fetchGenerationRef.current;
    const controller = new AbortController();

    void (async () => {
      if (showOverlay) setBusy(true);
      try {
        const qs = new URLSearchParams();
        qs.set("locale", locale);
        if (documentId) qs.set("documentId", documentId);

        const res = await fetch(
          `/api/works/design/${encodeURIComponent(slugFromUrl)}?${qs.toString()}`,
          { signal: controller.signal },
        );
        if (
          !res.ok ||
          controller.signal.aborted ||
          generation !== fetchGenerationRef.current
        ) {
          return;
        }
        const data = (await res.json()) as {
          designProject?: DesignProjectViewModel;
        };
        if (
          !data.designProject ||
          controller.signal.aborted ||
          generation !== fetchGenerationRef.current
        ) {
          return;
        }
        setDesignProject(data.designProject);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      } finally {
        if (generation === fetchGenerationRef.current) setBusy(false);
      }
    })();

    return () => {
      controller.abort();
      setBusy(false);
    };
  }, [
    locale,
    isLocaleReady,
    slugFromUrl,
    documentId,
    router.isReady,
    initialDesignProject,
  ]);

  return (
    <div className="relative min-h-[40vh] w-full">
      <ContentLoadingOverlay visible={busy} fullViewport />
      <DesignProjectTemplate designProject={designProject} />
    </div>
  );
}
