import type { NextPage } from "next";
import Image from "next/image";
import { useMemo, type CSSProperties } from "react";

export type LogoRow1Type = {
  className?: string;
  maskGroup?: string;
  label?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
};

const LogoRow1: NextPage<LogoRow1Type> = ({
  className = "",
  maskGroup,
  label,
  propMinWidth,
}) => {
  const labelStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div
      className={`w-[104px] flex flex-col items-center justify-start pt-16 pb-0 px-1 box-border text-center text-xs text-white font-reg ${className}`}
    >
      <Image
        className="rounded-full bg-white p-[5px] object-contain"
        alt=""
        src={maskGroup ?? ""}
        width={100}
        height={100}
        unoptimized={maskGroup?.endsWith(".svg")}
      />
      <div className="w-full mt-4">
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

export default LogoRow1;
