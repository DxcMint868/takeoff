"use client";

import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  persistLocalePreference,
  readLocaleFromStorage,
} from "../lib/i18n/locale-preference";
import { localeFromPathname } from "../lib/i18n/routing";
import type { AppLocaleCode } from "../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../lib/strapi/language";

type LocaleContextValue = {
  locale: AppLocaleCode;
  /** False until URL/storage locale is resolved on the client. */
  isLocaleReady: boolean;
  setLocale: (code: AppLocaleCode) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function localeFromRouter(
  asPath: string,
  queryLocale: string | string[] | undefined,
): AppLocaleCode {
  const fromQuery =
    typeof queryLocale === "string"
      ? queryLocale
      : Array.isArray(queryLocale)
        ? queryLocale[0]
        : null;
  if (fromQuery && isAppLocale(fromQuery)) return fromQuery;
  return localeFromPathname(asPath);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<AppLocaleCode>("en");
  const [isLocaleReady, setIsLocaleReady] = useState(false);

  const applyLocale = useCallback((code: AppLocaleCode) => {
    setLocaleState(code);
    persistLocalePreference(code);
    setIsLocaleReady(true);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const resolved = localeFromRouter(router.asPath, router.query.locale);
    const seg = router.asPath.split("?")[0]?.split("#")[0]?.split("/").filter(Boolean)[0];
    applyLocale(
      seg && isAppLocale(seg) ? resolved : readLocaleFromStorage() ?? resolved,
    );
  }, [router.isReady, router.asPath, router.query.locale, applyLocale]);

  useEffect(() => {
    const onRouteStart = (url: string) => {
      applyLocale(localeFromPathname(url));
    };
    const onRouteComplete = (url: string) => {
      applyLocale(localeFromPathname(url));
    };

    router.events.on("routeChangeStart", onRouteStart);
    router.events.on("routeChangeComplete", onRouteComplete);
    return () => {
      router.events.off("routeChangeStart", onRouteStart);
      router.events.off("routeChangeComplete", onRouteComplete);
    };
  }, [router.events, applyLocale]);

  const setLocale = useCallback(
    (code: AppLocaleCode) => {
      applyLocale(code);
    },
    [applyLocale],
  );

  const value = useMemo(
    () => ({ locale, isLocaleReady, setLocale }),
    [locale, isLocaleReady, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

/** Safe hook when provider may be absent (e.g. tests). */
export function useLocaleOptional(): LocaleContextValue | null {
  return useContext(LocaleContext);
}

export { APP_LOCALE_CODES, type AppLocaleCode };
