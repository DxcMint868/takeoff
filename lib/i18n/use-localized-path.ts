"use client";

import { useCallback } from "react";
import { useLocale } from "../../contexts/locale-context";
import { withLocale } from "./routing";

/** Prefix internal paths with the active locale from URL/context. */
export function useLocalizedPath() {
  const { locale } = useLocale();
  return useCallback((href: string) => withLocale(locale, href), [locale]);
}
