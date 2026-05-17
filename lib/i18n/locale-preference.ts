import type { AppLocaleCode } from "../strapi/language";
import { isAppLocale } from "../strapi/language";

/** Kept stable: existing installs already use this localStorage key. */
export const LOCALE_STORAGE_KEY = "hoasen-ui-locale";

/** Readable by middleware when the URL has no explicit locale segment. */
export const LOCALE_COOKIE_NAME = "hoasen-locale";

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 400;

export function readLocaleFromStorage(): AppLocaleCode | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw && isAppLocale(raw)) return raw;
  } catch {
    /* ignore */
  }
  return null;
}

export function persistLocalePreference(code: AppLocaleCode): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(code)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SEC}; SameSite=Lax${secure}`;
  } catch {
    /* ignore */
  }
}
