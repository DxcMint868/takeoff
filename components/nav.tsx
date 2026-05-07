import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CTASolid from "./cta-solid";
import { NavLanguageSelect } from "./nav-language-select";
import { NavMobileModal } from "./nav-mobile-modal";
import { isNavItemActiveDesktop, NAV_ITEMS } from "../lib/nav-links";

export type NavType = {
  className?: string;
  initialTransparent?: boolean;
  scrollThreshold?: number;
};

const navInactive =
  "[text-decoration:none] tracking-[0.02em] leading-[24px] text-white-60 z-[1] cursor-pointer whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-white";
const navActive =
  "[text-decoration:none] tracking-[0.02em] leading-[24px] text-white font-semibold font-reg z-[1] cursor-pointer whitespace-nowrap";

const DEFAULT_SCROLL_THRESHOLD = 300;

const Nav = ({
  className = "",
  initialTransparent = false,
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD,
}: NavType) => {
  const { pathname, asPath } = useRouter();
  const [scrolled, setScrolled] = useState(!initialTransparent);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!initialTransparent) return;
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialTransparent, scrollThreshold]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, asPath]);

  return (
    <header
      className={`sticky  justify-between top-0 z-[99] flex w-full max-w-full shrink-0 flex-row items-center self-stretch gap-5 px-[30px] py-5 box-border transition-[background-color,opacity] duration-300 ease-in-out mq900:box-border mq900:pl-[30px] mq900:pr-[30px] ${scrolled ? "bg-dark opacity-90" : "bg-transparent"} ${className}`}
    >
      <div className="pointer-events-none h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]" />
      <div className="flex min-w-0 max-w-[160px] flex-1 basis-0 items-center justify-start">
        <Link
          id="nav-logo"
          href="/"
          className="w-[149px] flex cursor-pointer select-none flex-col items-start justify-start border-0 bg-transparent pt-[7px] pb-0 pl-0 pr-[9px] [text-decoration:none] box-border outline-none transition-opacity duration-200 ease-in-out hover:opacity-90 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-dark z-[1]"
        >
          <span className="relative block h-[27px] w-full max-w-full shrink-0 self-stretch overflow-hidden">
            <Image
              src="/logo@2x.png"
              alt="Home"
              fill
              className="pointer-events-none object-contain object-left"
              sizes="140px"
              priority
            />
          </span>
        </Link>
      </div>
      <nav className="m-0 box-border flex w-fit shrink-0 flex-col items-center justify-center pt-2.5 px-0 pb-0 mq1100:hidden">
        <nav className="m-0 pl-[100px] flex h-6 flex-row items-center gap-x-12 text-left text-base font-reg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isNavItemActiveDesktop(pathname, item.href)
                  ? navActive
                  : navInactive
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </nav>
      {/* Language Select and CTAs */}
      <div className="z-[1] flex min-w-0 max-w-[360px] flex-1 basis-0 flex-row items-center justify-end gap-3 pt-2.5 mq1100:gap-2 mq1100:pt-2.5">
        <NavLanguageSelect />
        <CTASolid
          className="mq1000:hidden text-[16px] w-max"
          propMinWidth="60px"
          label="Start Today"
          href="/#contact-us"
        />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="hidden size-8 shrink-0 items-center justify-center border-0 bg-transparent p-0 mq1100:flex focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <Image
            src="/menu-icon.svg"
            alt=""
            width={32}
            height={24}
            className="pointer-events-none h-6 w-8"
            aria-hidden
          />
        </button>
      </div>
      <NavMobileModal
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Nav;
