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
import type { AppLocaleCode } from "../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../lib/strapi/language";

type LocaleContextValue = {
  locale: AppLocaleCode;
  setLocale: (code: AppLocaleCode) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): AppLocaleCode {
  return readLocaleFromStorage() ?? "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<AppLocaleCode>("en");

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const raw = router.query.locale;
    const code =
      typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;
    if (code && isAppLocale(code)) {
      setLocaleState(code);
      persistLocalePreference(code);
    }
  }, [router.isReady, router.query.locale]);

  const setLocale = useCallback((code: AppLocaleCode) => {
    setLocaleState(code);
    persistLocalePreference(code);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
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
