import type { AppLocaleCode } from "../strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../strapi/language";

export const DEFAULT_LOCALE: AppLocaleCode = "en";

export { APP_LOCALE_CODES, isAppLocale };

/** First path segment when it is an app locale (e.g. `/vi/works` → `vi`). */
export function localeFromPathname(pathOnly: string): AppLocaleCode {
  const path = pathOnly.split("?")[0]?.split("#")[0] ?? "";
  const seg = path.split("/").filter(Boolean)[0];
  return seg && isAppLocale(seg) ? seg : DEFAULT_LOCALE;
}

/** Public site origin (canonical). No trailing slash. */
export function siteOrigin(): string {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL?.trim()
      : undefined;
  if (raw) return raw.replace(/\/$/, "");
  return "https://www.hoasen.io";
}

export function splitPathQueryHash(href: string): {
  path: string;
  query: string;
  hash: string;
} {
  const hashIdx = href.indexOf("#");
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  const beforeHash = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const qIdx = beforeHash.indexOf("?");
  const path = qIdx >= 0 ? beforeHash.slice(0, qIdx) : beforeHash;
  const query = qIdx >= 0 ? beforeHash.slice(qIdx) : "";
  return { path, query, hash };
}

/**
 * Strip a leading locale segment when present. Result always starts with `/`
 * (root becomes `/`).
 */
export function pathnameWithoutLocale(pathOnly: string): string {
  const normalized = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const segs = normalized.split("/").filter(Boolean);
  if (segs.length > 0 && isAppLocale(segs[0])) {
    const rest = segs.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return normalized || "/";
}

/**
 * Prefix an internal href with a locale. Pass paths like `/works`, `/blog/a`,
 * `/#contact-us`, or `/about-us?x=1#y` — external URLs are returned unchanged.
 */
export function withLocale(locale: AppLocaleCode, href: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(href.trim())) return href;

  const { path, query, hash } = splitPathQueryHash(href);
  const stripped = pathnameWithoutLocale(path);
  const tail = stripped === "/" ? "" : stripped;
  return `/${locale}${tail}${query}${hash}`;
}

/** Absolute URL for the current locale path (no query/hash in `pathnameOnly`). */
export function localeAbsoluteUrl(
  locale: AppLocaleCode,
  pathnameOnly: string,
): string {
  const base = pathnameOnly.startsWith("/") ? pathnameOnly : `/${pathnameOnly}`;
  const stripped = pathnameWithoutLocale(base);
  const tail = stripped === "/" ? "" : stripped;
  return `${siteOrigin()}/${locale}${tail}`;
}

/** Swap the locale segment in a full `asPath` (keeps query + hash). */
export function swapLocaleInAsPath(
  asPath: string,
  locale: AppLocaleCode,
): string {
  const hashIdx = asPath.indexOf("#");
  const hash = hashIdx >= 0 ? asPath.slice(hashIdx) : "";
  const beforeHash = hashIdx >= 0 ? asPath.slice(0, hashIdx) : asPath;
  const qIdx = beforeHash.indexOf("?");
  const query = qIdx >= 0 ? beforeHash.slice(qIdx) : "";
  const pathOnly = qIdx >= 0 ? beforeHash.slice(0, qIdx) : beforeHash;
  const stripped = pathnameWithoutLocale(pathOnly);
  const tail = stripped === "/" ? "" : stripped;
  return `/${locale}${tail}${query}${hash}`;
}
