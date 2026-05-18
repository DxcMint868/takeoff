"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocale } from "../contexts/locale-context";
import { localeFromPathname } from "../lib/i18n/routing";
import { isAppLocale } from "../lib/strapi/language";

/**
 * Keeps `<html lang>` in sync when the user changes locale via the language
 * switcher (client navigation does not re-run `_document.tsx`).
 */
export function HtmlLangSync() {
  const router = useRouter();
  const { locale } = useLocale();

  useEffect(() => {
    if (!router.isReady) {
      document.documentElement.lang = localeFromPathname(router.asPath);
      return;
    }

    const raw = router.query.locale;
    const fromQuery =
      typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

    const lang =
      fromQuery && isAppLocale(fromQuery)
        ? fromQuery
        : localeFromPathname(router.asPath);

    document.documentElement.lang = lang;
  }, [router.isReady, router.asPath, router.query.locale, locale]);

  return null;
}
