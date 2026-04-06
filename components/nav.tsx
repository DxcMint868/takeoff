import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CTASolid from "./cta-solid";

export type NavType = {
  className?: string;
  initialTransparent?: boolean;
};

const navInactive =
  "[text-decoration:none] tracking-[0.02em] leading-[24px] text-white-60 z-[1] cursor-pointer whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-white";
const navActive =
  "[text-decoration:none] tracking-[0.02em] leading-[24px] text-white font-semibold font-reg z-[1] cursor-pointer whitespace-nowrap";

const SCROLL_THRESHOLD = 300;

const Nav = ({ className = "", initialTransparent = false }: NavType) => {
  const { pathname } = useRouter();
  const onWorksPage = pathname === "/works";
  const [scrolled, setScrolled] = useState(!initialTransparent);

  useEffect(() => {
    if (!initialTransparent) return;
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialTransparent]);

  return (
    <header
      className={`self-stretch mq1100:relative sticky flex flex-row items-start justify-between py-5 px-[60px] box-border top-[0] z-[99] gap-5 max-w-full mq900:pl-[30px] mq900:pr-[30px] mq900:box-border transition-[background-color,opacity] duration-300 ease-in-out ${scrolled ? "bg-dark opacity-90" : "bg-transparent"} ${className}`}
    >
      <div className="pointer-events-none h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]" />
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
      <nav className="m-0 w-auto flex flex-col items-end justify-start pt-2.5 px-0 pb-0 box-border max-w-full shrink-0 mq1100:hidden">
        <nav className="m-0 flex h-6 flex-row items-center gap-x-12 text-left text-base font-reg">
          <Link href="/#our-service" className={navInactive}>
            Services
          </Link>
          <Link href="/works" className={onWorksPage ? navActive : navInactive}>
            Works
          </Link>
          <Link href="/#our-team" className={navInactive}>
            Our Team
          </Link>
          <Link href="/#contact-us" className={navInactive}>
            Contact Us
          </Link>
        </nav>
      </nav>
      <CTASolid propWidth="150px" label="Start Today" href="/#contact-us" />
    </header>
  );
};

export default Nav;
