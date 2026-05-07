import Image from "next/image";
import { Trans, useTranslation } from "next-i18next";
import React, { ComponentType, SVGProps } from "react";
import {
  DomainExpertiseIcon,
  AgileExecutionIcon,
  TransparencyIcon,
  WorldClassIcon,
} from "./icons";

const VALUE_ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  DomainExpertiseIcon,
  AgileExecutionIcon,
  TransparencyIcon,
  WorldClassIcon,
];

const VALUE_KEYS = [
  "domainExpertise",
  "agileExecution",
  "transparency",
  "worldClass",
] as const;

const TeamSection: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <section
      id="our-team"
      className="w-full flex flex-row items-start justify-start pt-64 px-2 box-border max-w-full text-29xl font-sora relative"
    >
      <Image
        className="pointer-events-none absolute w-full max-w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        alt=""
        src="/vector-4.svg"
        width={800}
        height={800}
        unoptimized
      />

      <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-5">
        <div className="w-full text-center flex flex-col items-center gap-4">
          <h1 className="m-0 relative text-inherit leading-[58px] pb-12 font-normal font-[inherit] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
            {t("team.title")}
          </h1>
          <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-light font-reg text-white-60">
            <h2 className="m-0 self-stretch relative text-3xl tracking-[0.02em] leading-[38px] z-[1] text-white-60 font-reg mq450:text-lg mq450:leading-[30px]">
              <p className="m-0">
                <Trans
                  i18nKey="team.introLine1"
                  components={{
                    bold: <span className="font-reg text-white" />,
                  }}
                />
              </p>
              <p className="m-0">
                <Trans
                  i18nKey="team.introLine2"
                  components={{
                    bold: <span className="font-reg text-white" />,
                  }}
                />
              </p>
              <p className="m-0">
                <Trans
                  i18nKey="team.introLine3"
                  components={{
                    bold: <span className="font-reg text-white" />,
                  }}
                />
              </p>
              <p className="m-0 font-light">{t("team.introLine4")}</p>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full pt-16 text-left mq700:grid-cols-1">
            {VALUE_KEYS.map((key, index) => {
              const Icon = VALUE_ICONS[index];
              return (
                <div
                  key={key}
                  className="rounded-[10px] border-[1px] border-solid border-surface-border px-8 py-8"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <Icon className="h-[42px] w-[42px] shrink-0 text-white" />
                      <h3 className="m-0 font-sora text-xl font-semibold leading-[30px] tracking-[0.4px] text-white">
                        {t(`team.values.${key}.title`)}
                      </h3>
                    </div>
                    <p className="m-0 pl-[58px] font-reg text-base font-normal leading-[24px] tracking-[0.32px] text-white-60 mq450:pl-0">
                      {t(`team.values.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
