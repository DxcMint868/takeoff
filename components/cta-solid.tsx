import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type CTASolidType = {
  className?: string;
  label?: string;

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

  return (
    <button
      className={`cursor-pointer [border:none] py-[12.5px] px-8 bg-purple rounded-81xl flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumpurple ${className}`}
      style={cTASolidStyle}
      onClick={() => {
        const contactSection = document.getElementById('contact-us');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <div
        className="w-[136px] relative text-base tracking-[0.02em] font-semibold font-reg text-white text-center flex items-center justify-center"
        style={labelStyle}
      >
        {label}
      </div>
    </button>
  );
};

export default CTASolid;
