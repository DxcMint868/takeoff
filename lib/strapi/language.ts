/**
 * UI locale codes (language switcher) ↔ Strapi i18n plugin locale codes.
 * Set env overrides if Strapi uses different codes (e.g. `ja-JP` instead of `ja`).
 */
export const APP_LOCALE_CODES = ["en", "ja", "vi", "ko"] as const;
export type AppLocaleCode = (typeof APP_LOCALE_CODES)[number];

const ENV_KEYS: Record<string, string> = {
  en: "NEXT_PUBLIC_STRAPI_LOCALE_EN",
  ja: "NEXT_PUBLIC_STRAPI_LOCALE_JA",
  vi: "NEXT_PUBLIC_STRAPI_LOCALE_VI",
  ko: "NEXT_PUBLIC_STRAPI_LOCALE_KO",
};

/** Maps UI language code → Strapi `locale` query value (must exist in Strapi i18n settings). */
export function toStrapiLocale(uiLocale: string): string {
  const code = uiLocale.trim().toLowerCase();
  const envKey = ENV_KEYS[code];
  if (envKey && typeof process.env[envKey] === "string" && process.env[envKey]) {
    return process.env[envKey] as string;
  }
  return code;
}

export function isAppLocale(code: string): code is AppLocaleCode {
  return (APP_LOCALE_CODES as readonly string[]).includes(code);
}
