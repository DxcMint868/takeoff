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
  /** False until URL/storage locale is resolved on the client. */
  isLocaleReady: boolean;
  setLocale: (code: AppLocaleCode) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<AppLocaleCode>("en");
  const [isLocaleReady, setIsLocaleReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const raw = router.query.locale;
    const fromUrl =
      typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;

    if (fromUrl && isAppLocale(fromUrl)) {
      setLocaleState(fromUrl);
      persistLocalePreference(fromUrl);
    } else {
      setLocaleState(readLocaleFromStorage() ?? "en");
    }

    setIsLocaleReady(true);
  }, [router.isReady, router.query.locale]);

  const setLocale = useCallback((code: AppLocaleCode) => {
    setLocaleState(code);
    persistLocalePreference(code);
  }, []);

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
