import type { NextPage } from "next";
import CTASolid from "./cta-solid";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-center px-5 box-border max-w-full text-center text-5xl text-white font-sora ${className}`}
    >
      <div className="w-[638px] flex flex-col items-center justify-start gap-10 max-w-full z-[1] mq700:gap-5">
        <div className="self-stretch flex flex-col items-center justify-start gap-6">
          <h1 className="m-0 self-stretch relative text-inherit tracking-[0.2em] leading-[32px] capitalize font-normal font-[inherit] mq450:text-lgi mq450:leading-[26px]">{`We Create Great `}</h1>
          <div className="self-stretch flex flex-col items-center justify-start gap-5 text-55xl">
            <h1 className="m-0 self-stretch relative text-inherit leading-[82px] capitalize font-normal font-[inherit] mq450:text-25xl mq450:leading-[49px] mq900:text-40xl mq900:leading-[66px]">
              Fintech Products
            </h1>
            <h2 className="m-0 self-stretch relative text-3xl tracking-[0.02em] leading-[34px] font-light font-reg text-white-60 mq450:text-lg mq450:leading-[27px]">
              <p className="m-0">We help startups and small enterprises build</p>
              <p className="m-0">and launch their product onchain</p>
            </h2>
          </div>
        </div>
        <CTASolid label="Connect With Us" />
      </div>
    </div>
  );
};

export default FrameComponent;
