import type { NextPage } from "next";
import CTASolid from "./c-t-a-solid";

export type NavType = {
  className?: string;
};

const Nav: NextPage<NavType> = ({ className = "" }) => {
  return (
    <header
      className={`opacity-90 bg-dark self-stretch mq1100:relative sticky flex flex-row items-start justify-between py-5 px-[60px] box-border top-[0] z-[99] gap-5 max-w-full mq900:pl-[30px] mq900:pr-[30px] mq900:box-border ${className}`}
    >
      <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]" />
      <div className="w-[149px] flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-[9px] box-border">
        <img
          className="self-stretch h-[27px] relative max-w-full overflow-hidden shrink-0 object-cover z-[1]"
          loading="lazy"
          alt=""
          src="/logo@2x.png"
        />
      </div>
      <nav className="m-0 w-[642px] flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border max-w-full mq1100:hidden">
        <nav className="m-0 self-stretch h-6 relative text-left text-base text-white-60 font-reg">
          <a href="#about-us" className="[text-decoration:none] absolute top-[0px] left-[0px] tracking-[0.02em] leading-[24px] text-[inherit] inline-block min-w-[73px] whitespace-nowrap z-[1]">
            About Us
          </a>
          <a href="#our-service" className="[text-decoration:none] absolute top-[0px] left-[133px] tracking-[0.02em] leading-[24px] text-[inherit] inline-block min-w-[93px] whitespace-nowrap z-[1]">
            Our Service
          </a>
          <a href="#our-work" className="[text-decoration:none] absolute top-[0px] left-[285px] tracking-[0.02em] leading-[24px] text-[inherit] inline-block min-w-[75px] whitespace-nowrap z-[1]">
            Our Work
          </a>
          <a href="#our-team" className="[text-decoration:none] absolute top-[0px] left-[418px] tracking-[0.02em] leading-[24px] text-[inherit] inline-block min-w-[77px] whitespace-nowrap z-[1]">
            Our Team
          </a>
          <a href="#contact-us" className="[text-decoration:none] absolute top-[0px] left-[554px] tracking-[0.02em] leading-[24px] text-[inherit] inline-block min-w-[88px] whitespace-nowrap z-[1]">
            Contact Us
          </a>
        </nav>
      </nav>
      <CTASolid
        propWidth="150px"
        label="Connect"
        propWidth1="unset"
        propTextDecoration="none"
        propHeight="14px"
        propFlex="1"
        propMinWidth="70px"
      />
    </header>
  );
};

export default Nav;
