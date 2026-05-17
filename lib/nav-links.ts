import { pathnameWithoutLocale } from "./i18n/routing";

export type NavItem = { href: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { href: "/#our-service", label: "Services" },
  { href: "/works", label: "Works" },
  { href: "/#our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" },
  { href: "/#contact-us", label: "Contact Us" },
];

function strip(pathnameOrAsPath: string): string {
  const bare = pathnameOrAsPath.split("?")[0]?.split("#")[0] ?? "";
  return pathnameWithoutLocale(bare);
}

/** Desktop navbar: only Works + About use active styling (unchanged from original). */
export function isNavItemActiveDesktop(
  pathname: string,
  itemHref: string,
): boolean {
  const p = strip(pathname);
  if (itemHref === "/works") return p.startsWith("/works");
  if (itemHref === "/about-us") return p === "/about-us";
  return false;
}

/** Full-screen menu: same links, plus hash sections on the home page. */
export function isNavItemActiveMobile(
  pathname: string,
  asPath: string,
  itemHref: string,
): boolean {
  const p = strip(pathname);
  const ap = strip(asPath);
  if (itemHref === "/works") return p.startsWith("/works");
  if (itemHref === "/about-us") return p === "/about-us";
  if (itemHref.startsWith("/#")) {
    if (ap !== "/") return false;
    return (
      asPath === itemHref ||
      asPath.includes(itemHref.slice(1)) ||
      asPath.includes(itemHref)
    );
  }
  return false;
}
