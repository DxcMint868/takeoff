import type { AppLocaleCode } from "../strapi/language";
import en from "./locales/en.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import vi from "./locales/vi.json";

/**
 * Flat message map (`nav.*`, `blog.*`, `common.*`, …).
 * Edit strings per locale under `lib/i18n/locales/{en,vi,ja,ko}.json`.
 * Missing keys in a locale fall back to English at runtime.
 */
export type MessageDict = Record<string, string>;

const byLocale: Record<AppLocaleCode, MessageDict> = {
  en: en as MessageDict,
  ja: ja as MessageDict,
  vi: vi as MessageDict,
  ko: ko as MessageDict,
};

const intlLocale: Record<AppLocaleCode, string> = {
  en: "en-US",
  ja: "ja-JP",
  vi: "vi-VN",
  ko: "ko-KR",
};

export function getMessages(locale: AppLocaleCode): MessageDict {
  return byLocale[locale] ?? byLocale.en;
}

export function resolveIntlLocale(locale: AppLocaleCode): string {
  return intlLocale[locale] ?? "en-US";
}

export function translate(
  locale: AppLocaleCode,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const dict = getMessages(locale);
  const fallback = getMessages("en");
  let text = dict[key] ?? fallback[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.split(`{{${k}}}`).join(String(v));
    }
  }
  return text;
}
