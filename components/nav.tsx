"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CTASolid from "./cta-solid";
import { NavLanguageSelect } from "./nav-language-select";
import { useTranslation } from "../lib/i18n/use-translation";

export type NavType = {
  className?: string;
  initialTransparent?: boolean;
  scrollThreshold?: number;
};

const navInactive =
  "[text-decoration:none] tracking-[0.02em] leading-[24px] text-white/70 z-[1] cursor-pointer whitespace-nowrap transition-[color,text-shadow] duration-200 ease-in-out hover:text-white";
const navActive =
  "[text-decoration:none] tracking-[0.02em] leading-[24px] text-white font-semibold font-reg z-[1] cursor-pointer whitespace-nowrap [text-shadow:0_0_12px_rgba(140,120,237,0.55),0_0_28px_rgba(115,95,212,0.28)] transition-[color,text-shadow] duration-200 ease-in-out";

const DEFAULT_SCROLL_THRESHOLD = 300;

const Nav = ({
  className = "",
  initialTransparent = false,
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD,
}: NavType) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const onWorksPage = pathname.startsWith("/works");
  const onBlogPage = pathname.startsWith("/blog");
  const onAboutPage = pathname === "/about-us";
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
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== "undefined" && window.innerWidth > 1100) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[99] flex w-full max-w-full shrink-0 flex-row items-center justify-between self-stretch px-[30px] py-5 box-border transition-[background-color,opacity] duration-300 ease-in-out ${scrolled ? "bg-dark opacity-90" : "bg-transparent"} ${className}`}
    >
      <div className="pointer-events-none h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]" />
      <Link
        id="nav-logo"
        href="/"
        className="w-[149px] flex shrink-0 cursor-pointer select-none flex-col items-start justify-start border-0 bg-transparent pt-[7px] pb-0 pl-0 pr-[9px] [text-decoration:none] box-border outline-none transition-opacity duration-200 ease-in-out hover:opacity-90 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-dark z-[1]"
      >
        <span className="relative block h-[27px] w-full max-w-full shrink-0 self-stretch overflow-hidden">
          <Image
            src="/logo-colored-lotus.svg"
            alt={t("nav.home")}
            fill
            className="pointer-events-none object-contain object-left"
            sizes="140px"
            priority
          />
        </span>
      </Link>

      {/* Nav links — uniformly distributed across remaining space */}
      <nav className="flex flex-1 flex-row items-center justify-evenly px-6 text-left text-base font-reg mq1100:hidden">
        <Link href="/#our-service" className={navInactive}>
          {t("nav.services")}
        </Link>
        <Link href="/works" className={onWorksPage ? navActive : navInactive}>
          {t("nav.works")}
        </Link>
        <Link href="/about-us" className={onAboutPage ? navActive : navInactive}>
          {t("nav.about")}
        </Link>
        <Link href="/#contact-us" className={navInactive}>
          {t("nav.contact")}
        </Link>
        <Link href="/blog" className={onBlogPage ? navActive : navInactive}>
          {t("nav.blog")}
        </Link>
      </nav>

      {/* Right cluster */}
      <div className="flex shrink-0 items-center gap-5">
        <NavLanguageSelect />

        <div className="mq1100:hidden shrink-0">
          <CTASolid propWidth="150px" label={t("nav.startToday")} href="/#contact-us" />
        </div>

        <button
          type="button"
          className="relative z-[1] mt-1.5 hidden mq1100:flex size-11 shrink-0 items-center justify-center self-center border-0 bg-transparent p-0 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
          aria-label={mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          <Image
            src="/icons/menu-icon.svg"
            alt=""
            width={40}
            height={43}
            unoptimized
            className="pointer-events-none block"
          />
        </button>
      </div>

      {mobileMenuOpen ? (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.siteNavigation")}
          className="fixed inset-0 z-[100] box-border flex min-h-[100dvh] w-full max-w-none min-w-0 flex-col gap-8 overflow-y-auto overflow-x-hidden bg-surface-card/95 px-8 pb-12 pt-20 mq900:px-6 mq450:px-5"
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-[1] flex size-11 items-center justify-center border-0 bg-transparent p-0 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card mq900:right-4 mq900:top-4"
            aria-label={t("nav.closeMenu")}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/close-icon.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
              className="pointer-events-none block"
            />
          </button>
          <nav className="flex flex-1 flex-col justify-center w-full gap-8 text-center text-xl font-reg mq450:gap-6 mq450:text-lg">
            <Link
              href="/#our-service"
              className={navInactive}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/works"
              className={onWorksPage ? navActive : navInactive}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.works")}
            </Link>
            <Link
              href="/about-us"
              className={onAboutPage ? navActive : navInactive}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/#contact-us"
              className={navInactive}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
            <Link
              href="/blog"
              className={onBlogPage ? navActive : navInactive}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.blog")}
            </Link>
          </nav>
          <div className="mt-auto flex w-full shrink-0 flex-col gap-4 pt-6">
            <CTASolid
              className="flex w-full justify-center"
              propWidth="100%"
              label={t("nav.startToday")}
              href="/#contact-us"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Nav;
