import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type LogoRow1Type = {
  className?: string;
  maskGroup?: string;
  rain?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
};

const LogoRow1: NextPage<LogoRow1Type> = ({
  className = "",
  maskGroup,
  rain,
  propMinWidth,
}) => {
  const rainStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div
      className={`w-[104px] flex flex-col items-start justify-start pt-16 pb-0 pl-0 pr-1 box-border text-center text-xs text-white font-reg ${className}`}
    >
      <div className="self-stretch flex flex-col items-end justify-start gap-4">
        <div className="self-stretch flex flex-row items-start justify-start">
          <div className="h-[100px] flex-1 relative">
            <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-white w-full h-full" />
            <img
              className="absolute w-[calc(100%_-_10px)] top-[5px] right-[5px] left-[5px] max-w-full overflow-hidden h-[90px] object-contain z-[1]"
              alt=""
              src={maskGroup}
            />
          </div>
        </div>
        <div className="flex flex-row items-start justify-end py-0 pl-8 pr-[30px]">
          <div
            className="relative tracking-[0.2em] leading-[16px] uppercase inline-block min-w-[38px]"
            style={rainStyle}
          >
            {rain}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoRow1;

