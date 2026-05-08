export type NavItem = { href: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { href: "/#our-service", label: "Services" },
  { href: "/works", label: "Works" },
  { href: "/#our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" },
  { href: "/#contact-us", label: "Contact Us" },
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
