import type { AppLocaleCode } from "../strapi/language";
import { APP_LOCALE_CODES } from "../strapi/language";
import {
  DEFAULT_LOCALE,
  localeAbsoluteUrl,
  pathnameWithoutLocale,
} from "./routing";

export type HreflangAlternate = {
  hreflang: string;
  href: string;
};

/**
 * Build a complete hreflang set for a path that exists at the same pathname in every locale.
 * Includes self-reference, all locales (ISO 639-1), and x-default → English.
 */
export function buildHreflangAlternates(
  pathnameOnly: string,
  locales: readonly AppLocaleCode[] = APP_LOCALE_CODES,
): HreflangAlternate[] {
  const stripped = pathnameWithoutLocale(pathnameOnly);
  const normalized =
    stripped.startsWith("/") ? stripped : `/${stripped}`;

  const languageAlternates: HreflangAlternate[] = locales.map((locale) => ({
    hreflang: locale,
    href: localeAbsoluteUrl(locale, normalized),
  }));

  const enHref =
    languageAlternates.find((a) => a.hreflang === DEFAULT_LOCALE)?.href ??
    localeAbsoluteUrl(DEFAULT_LOCALE, normalized);

  return [
    ...languageAlternates,
    { hreflang: "x-default", href: enHref },
  ];
}

/**
 * When localized slugs differ (e.g. blog posts), pass one pathname per locale.
 * Only locales present in the map are emitted; x-default always points at English when available.
 */
export function buildHreflangFromLocalePaths(
  pathsByLocale: Partial<Record<AppLocaleCode, string>>,
): HreflangAlternate[] {
  const locales = APP_LOCALE_CODES.filter((locale) => pathsByLocale[locale]);
  if (locales.length === 0) return [];

  const languageAlternates: HreflangAlternate[] = locales.map((locale) => {
    const path = pathsByLocale[locale]!;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return {
      hreflang: locale,
      href: localeAbsoluteUrl(locale, normalized),
    };
  });

  const enPath = pathsByLocale[DEFAULT_LOCALE];
  const xDefaultHref = enPath
    ? localeAbsoluteUrl(
        DEFAULT_LOCALE,
        enPath.startsWith("/") ? enPath : `/${enPath}`,
      )
    : (languageAlternates.find((a) => a.hreflang === DEFAULT_LOCALE)?.href ??
      languageAlternates[0]?.href);

  if (!xDefaultHref) return languageAlternates;

  return [
    ...languageAlternates,
    { hreflang: "x-default", href: xDefaultHref },
  ];
}

/** Validates reciprocal + self + x-default rules for automated checks. */
export function validateHreflangSet(
  alternates: HreflangAlternate[],
  currentLocale: AppLocaleCode,
  currentCanonical: string,
): string[] {
  const errors: string[] = [];

  if (alternates.length === 0) {
    errors.push("hreflang set is empty");
    return errors;
  }

  const xDefault = alternates.filter((a) => a.hreflang === "x-default");
  if (xDefault.length !== 1) {
    errors.push(`expected exactly one x-default, got ${xDefault.length}`);
  } else if (!xDefault[0].href.includes(`/${DEFAULT_LOCALE}/`)) {
    errors.push("x-default must point at the English URL");
  }

  for (const alt of alternates) {
    if (!alt.href.startsWith("https://")) {
      errors.push(`href must be absolute HTTPS: ${alt.hreflang} → ${alt.href}`);
    }
    if (alt.hreflang !== "x-default" && !/^[a-z]{2}$/.test(alt.hreflang)) {
      errors.push(`invalid hreflang code: ${alt.hreflang}`);
    }
  }

  const self = alternates.find((a) => a.hreflang === currentLocale);
  if (!self) {
    errors.push(`missing self-reference for ${currentLocale}`);
  } else if (self.href !== currentCanonical) {
    errors.push(
      `self hreflang must match canonical: ${self.href} !== ${currentCanonical}`,
    );
  }

  const langs = alternates
    .filter((a) => a.hreflang !== "x-default")
    .map((a) => a.hreflang);
  if (new Set(langs).size !== langs.length) {
    errors.push("duplicate language codes in hreflang set");
  }

  if (langs.length !== APP_LOCALE_CODES.length) {
    errors.push(
      `expected ${APP_LOCALE_CODES.length} language alternates, got ${langs.length}`,
    );
  }

  return errors;
}
