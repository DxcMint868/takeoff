import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type LogoRowType = {
  className?: string;
  maskGroup?: string;
  liquid?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  propMinWidth?: CSSProperties["minWidth"];
};

const LogoRow: NextPage<LogoRowType> = ({
  className = "",
  propPadding,
  maskGroup,
  liquid,
  propMinWidth,
}) => {
  const logoRowStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const liquidStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div
      className={`flex flex-col items-end justify-start py-0 pl-0 pr-1 gap-4 text-center text-xs text-white font-reg ${className}`}
      style={logoRowStyle}
    >
      <img
        className="w-[100px] h-[100px] relative object-contain"
        alt=""
        src={maskGroup}
      />
      <div className="flex flex-row items-start justify-end py-0 pl-6 pr-[21px]">
        <div
          className="relative tracking-[0.2em] leading-[16px] uppercase inline-block min-w-[55px]"
          style={liquidStyle}
        >
          {liquid}
        </div>
      </div>
    </div>
  );
};

export default LogoRow;
