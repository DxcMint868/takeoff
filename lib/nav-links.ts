export type NavLinkDef = { href: string; labelKey: string };

/** Khóa `common.json` → `t(labelKey)` trong component. */
export const NAV_LINK_DEFS: readonly NavLinkDef[] = [
  { href: "/#our-service", labelKey: "nav.services" },
  { href: "/works", labelKey: "nav.works" },
  { href: "/#our-team", labelKey: "nav.ourTeam" },
  { href: "/about-us", labelKey: "nav.aboutUs" },
  { href: "/#contact-us", labelKey: "nav.contactUs" },
];

/** Desktop navbar: only Works + About use active styling (unchanged from original). */
export function isNavItemActiveDesktop(
  pathname: string,
  itemHref: string,
): boolean {
  if (itemHref === "/works") return pathname.startsWith("/works");
  if (itemHref === "/about-us") return pathname === "/about-us";
  return false;
}

/** Full-screen menu: same links, plus hash sections on the home page. */
export function isNavItemActiveMobile(
  pathname: string,
  asPath: string,
  itemHref: string,
): boolean {
  if (itemHref === "/works") return pathname.startsWith("/works");
  if (itemHref === "/about-us") return pathname === "/about-us";
  if (itemHref.startsWith("/#")) {
    if (pathname !== "/") return false;
    return asPath === itemHref || asPath.includes(itemHref.slice(1));
  }
  return false;
}
