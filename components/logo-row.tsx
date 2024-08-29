import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type LogoRowType = {
  className?: string;
  maskGroup?: string;
  label?: string;
  size?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  propMinWidth?: CSSProperties["minWidth"];
};

const LogoRow: NextPage<LogoRowType> = ({
  className = "",
  propPadding,
  maskGroup,
  label,
  propMinWidth,
  size = "100px",
}) => {
  const logoRowStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const labelStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const imageStyle: CSSProperties = useMemo(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  return (
    <div
      className={`flex flex-col items-center justify-start py-0 px-1 gap-4 text-center text-xs text-white font-reg ${className}`}
      style={logoRowStyle}
    >
      <img
        className="w-[100px] h-[100px] rounded-full bg-white p-[5px] object-contain"
        alt=""
        src={maskGroup}
        style={imageStyle}
      />
      <div className="w-full flex justify-center">
        <div
          className="relative tracking-[0.2em] leading-[16px] uppercase inline-block"
          style={labelStyle}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default LogoRow;
