import Image from "next/image";
import { useTranslation } from "next-i18next";
import { TECHNOLOGY_CARD_ROWS } from "../lib/technologies-data";
import GroupComponent from "./group-component";

const TechnologiesSection = () => {
  const { t } = useTranslation("common");

  return (
    <section id="our-service" className="w-full">
      <Image
        className="pointer-events-none absolute left-1/2 top-1/3 w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden"
        src="/vector-3.svg"
        alt=""
        width={800}
        height={800}
        unoptimized
      />

      <div className="box-border flex w-full max-w-full flex-row items-start justify-between gap-5 pb-11 pl-0 pr-0 pt-20 text-right">
        <div className="box-border flex w-full max-w-[calc(100%_-_1px)] flex-col items-start justify-start px-0 pb-0 pt-[89px] text-center font-sora text-29xl">
          <h1 className="font-[inherit] relative m-0 self-stretch font-normal leading-[68px] text-inherit mq450:text-10xl mq450:leading-[41px] mq900:text-19xl mq900:leading-[54px]">
            <p className="m-0">{t("tech.introTitle")}</p>
          </h1>
        </div>
      </div>

      <div
        id="capabilities-intro"
        className="self-stretch pb-8 text-center font-reg text-base font-light leading-[24px] tracking-[0.02em] text-white-60"
      >
        {t("tech.introSubtitle")}
      </div>

      <div className="flex w-full flex-wrap justify-center gap-8 text-left font-sora text-3xl">
        {TECHNOLOGY_CARD_ROWS.flatMap((row) => row.items).map((item) => (
          <div
            key={item.id}
            className="w-[calc(33.333%-1.334rem)] mq900:w-[calc(50%-1rem)] mq700:w-full"
          >
            <GroupComponent
              id={item.id}
              backgroundSrc={item.backgroundSrc}
              iconSrc={item.iconSrc}
              productDelivery={t(`tech.card.${item.id}.title`)}
              description={t(`tech.card.${item.id}.description`)}
              skills={item.skills}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesSection;
