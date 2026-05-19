"use client";

import { useRouter } from "next/router";
import { useCallback, useLayoutEffect } from "react";
import { useLocale } from "../contexts/locale-context";
import { localeFromPathname } from "../lib/i18n/routing";
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
  const router = useRouter();
  const { locale, isLocaleReady } = useLocale();

  const applyLang = useCallback((code: AppLocaleCode) => {
    if (document.documentElement.lang !== code) {
      document.documentElement.lang = code;
    }
  }, []);

  useLayoutEffect(() => {
    applyLang(isLocaleReady ? locale : ssrLocale);
  }, [locale, isLocaleReady, ssrLocale, applyLang]);

  useLayoutEffect(() => {
    const onRouteStart = (url: string) => applyLang(localeFromPathname(url));
    const onRouteComplete = (url: string) =>
      applyLang(localeFromPathname(url));

    router.events.on("routeChangeStart", onRouteStart);
    router.events.on("routeChangeComplete", onRouteComplete);
    return () => {
      router.events.off("routeChangeStart", onRouteStart);
      router.events.off("routeChangeComplete", onRouteComplete);
    };
  }, [router.events, applyLang]);
}
