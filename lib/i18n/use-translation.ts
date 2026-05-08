"use client";

import { useMemo } from "react";
import { useLocale } from "../../contexts/locale-context";
import type { AppLocaleCode } from "../strapi/language";
import { resolveIntlLocale, translate } from "./dictionaries";

export function useTranslation() {
  const { locale } = useLocale();

  return useMemo(() => {
    const t = (key: string, vars?: Record<string, string | number>) =>
      translate(locale, key, vars);

    const readSeconds = (seconds: number) => {
      const mins = Math.max(1, Math.round(seconds / 60));
      return t("blog.readTime", { mins });
    };

    const formatBlogDate = (iso: string) => {
      try {
        return new Intl.DateTimeFormat(resolveIntlLocale(locale), {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(iso));
      } catch {
        return iso;
      }
    };

    return {
      t,
      locale: locale as AppLocaleCode,
      readSeconds,
      formatBlogDate,
    };
  }, [locale]);
}
