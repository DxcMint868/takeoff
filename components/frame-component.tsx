import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import CTASolid from "./cta-solid";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = "" }) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-center px-5 box-border max-w-full text-center text-5xl text-white font-sora ${className}`}
    >
      <div className="w-[638px] flex flex-col items-center justify-start gap-10 max-w-full z-[1] mq700:gap-5">
        <div className="self-stretch flex flex-col items-center justify-start gap-6">
          <h1 className="m-0 self-stretch relative text-inherit tracking-[0.2em] leading-[32px] capitalize font-normal font-[inherit] mq450:text-lgi mq450:leading-[26px]">
            {t("hero.line1")}
          </h1>
          <div className="self-stretch flex flex-col items-center justify-start gap-5 text-55xl">
            <h1 className="m-0 self-stretch relative text-inherit leading-[82px] capitalize font-normal font-[inherit] mq450:text-25xl mq450:leading-[49px] mq900:text-40xl mq900:leading-[66px]">
              {t("hero.line2")}
            </h1>
            <h2 className="m-0 self-stretch relative text-3xl tracking-[0.02em] leading-[34px] font-light font-reg text-white-60 mq450:text-lg mq450:leading-[27px]">
              <p className="m-0">{t("hero.subtitleLine1")}</p>
              <p className="m-0">{t("hero.subtitleLine2")}</p>
            </h2>
          </div>
        </div>
        <CTASolid label={t("cta.buildWithUs")} />
      </div>
    </div>
  );
};

export default FrameComponent;
