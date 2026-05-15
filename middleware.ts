import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LOCALE_COOKIE_NAME } from "./lib/i18n/locale-preference";
import { APP_LOCALE_CODES, isAppLocale } from "./lib/strapi/language";

const LOCALE_SET = new Set<string>(APP_LOCALE_CODES);

/**
 * When the URL has no locale prefix, use a prior user choice from cookie — not
 * Accept-Language or geo-IP (per product / Google guidance).
 */
function defaultLocaleFromCookie(request: NextRequest): string | null {
  const raw = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    return isAppLocale(decoded) ? decoded : null;
  } catch {
    return isAppLocale(raw) ? raw : null;
  }
}

/** Two-letter segments that are not app locales are treated as invalid locale URLs (404). */
const TWO_LETTER = /^[a-z]{2}$/i;

/** Single-segment public file at site root, e.g. /og-image.png */
function isRootPublicFile(pathname: string): boolean {
  return /^\/[^/]+\.[^/]+$/.test(pathname);
}

/** File under public/ with a nested path — must not get /en/… prefixed (breaks next/image & static assets). */
const STATIC_ASSET_EXT =
  /\.(?:svg|png|jpe?g|gif|webp|ico|woff2?|ttf|eot|map)$/i;

function isNestedPublicAsset(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) return false;
  const last = segments[segments.length - 1];
  if (!STATIC_ASSET_EXT.test(last)) return false;
  // /works/:slug/llms.txt is rewritten to an API route, not a file in public/
  if (
    segments.length === 3 &&
    segments[0] === "works" &&
    last === "llms.txt"
  ) {
    return false;
  }
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    isRootPublicFile(pathname) ||
    isNestedPublicAsset(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const cookieLocale = defaultLocaleFromCookie(request);
  const defaultLocale = cookieLocale ?? "en";

  if (segments.length === 0) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${search}`, request.url),
      301,
    );
  }

  const first = segments[0];

  if (LOCALE_SET.has(first)) {
    return NextResponse.next();
  }

  if (TWO_LETTER.test(first) && !LOCALE_SET.has(first)) {
    return new NextResponse(null, { status: 404 });
  }

  const dest = new URL(
    `/${defaultLocale}/${segments.join("/")}${search}`,
    request.url,
  );
  return NextResponse.redirect(dest, 301);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
