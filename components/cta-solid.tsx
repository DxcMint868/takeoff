import type { NextPage } from "next";
import Link from "next/link";
import { useMemo, type CSSProperties } from "react";

export type CTASolidType = {
  className?: string;
  label?: string;
  /** When set, renders a link instead of scrolling to #contact-us */
  href?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propWidth1?: CSSProperties["width"];
  propTextDecoration?: CSSProperties["textDecoration"];
  propHeight?: CSSProperties["height"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
};

const CTASolid: NextPage<CTASolidType> = ({
  className = "",
  propWidth,
  label,
  href,
  propWidth1,
  propTextDecoration,
  propHeight,
  propFlex,
  propMinWidth,
}) => {
  const cTASolidStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const labelStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
      textDecoration: propTextDecoration,
      height: propHeight,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propWidth1, propTextDecoration, propHeight, propFlex, propMinWidth]);

  const sharedClass = `relative z-[1] cursor-pointer select-none [border:none] py-[12.5px] px-8 bg-purple rounded-81xl inline-flex shrink-0 flex-row items-center justify-center whitespace-nowrap transition-colors duration-200 ease-in-out hover:bg-mediumpurple ${className}`;

  const labelEl = (
    <span
      className="pointer-events-none relative min-h-[1em] w-full min-w-0 flex-1 text-center text-base font-semibold font-reg tracking-[0.02em] text-white"
      style={labelStyle}
    >
      {label}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={`[text-decoration:none] ${sharedClass}`} style={cTASolidStyle}>
        {labelEl}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={sharedClass}
      style={cTASolidStyle}
      onClick={() => {
        const contactSection = document.getElementById("contact-us");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      {labelEl}
    </button>
  );
};

export default CTASolid;
