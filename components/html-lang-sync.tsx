"use client";

import { useEffect } from "react";
import { useLocale } from "../contexts/locale-context";
import type { AppLocaleCode } from "../lib/strapi/language";

type HtmlLangSyncProps = {
  /** Locale parsed from the URL on the server (first paint). */
  ssrLocale: AppLocaleCode;
};

/**
 * Keeps `<html lang>` in sync when the user changes locale via the language
 * switcher (client navigation does not re-run `_document.tsx`).
 */
export function HtmlLangSync({ ssrLocale }: HtmlLangSyncProps) {
  const { locale, isLocaleReady } = useLocale();
  const active = isLocaleReady ? locale : ssrLocale;

  useEffect(() => {
    document.documentElement.lang = active;
  }, [active]);

  return null;
}
