import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASolid from "./cta-solid";

export type NavType = {
  className?: string;
};

const Nav: NextPage<NavType> = ({ className = "" }) => {
  return (
    <header
      className={`opacity-90 bg-dark self-stretch mq1100:relative sticky flex flex-row items-start justify-between py-5 px-[60px] box-border top-[0] z-[99] gap-5 max-w-full mq900:pl-[30px] mq900:pr-[30px] mq900:box-border ${className}`}
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
          <a
            href="#our-service"
            className="[text-decoration:none] tracking-[0.02em] leading-[24px] text-white-60 z-[1] cursor-pointer whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-white"
          >
            Services
          </a>
          <a
            href="#our-work"
            className="[text-decoration:none] tracking-[0.02em] leading-[24px] text-white-60 z-[1] cursor-pointer whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-white"
          >
            Works
          </a>
          <a
            href="#our-team"
            className="[text-decoration:none] tracking-[0.02em] leading-[24px] text-white-60 z-[1] cursor-pointer whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-white"
          >
            Our Team
          </a>
          <a
            href="#contact-us"
            className="[text-decoration:none] tracking-[0.02em] leading-[24px] text-white-60 z-[1] cursor-pointer whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-white"
          >
            Contact Us
          </a>
        </nav>
      </nav>
      <CTASolid propWidth="150px" label="Start Today" />
    </header>
  );
};

export default Nav;
