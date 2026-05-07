import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { ComponentType, SVGProps } from "react";
import { GradientGlow } from "./gradient-glow";
import MemberGrid from "./member-grid";
import {
  DomainExpertiseIcon,
  AgileExecutionIcon,
  TransparencyIcon,
  WorldClassIcon,
} from "./icons";
import ContactSection from "./contact-section";

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

/** Staggered 2×2 mosaic: two columns share one height; row splits differ (~65/35 vs ~45/55) so gutters do not line up across the middle. */
function AboutTeamPhotoGrid() {
  const { t } = useTranslation("common");
  return (
    <section
      aria-label={t("aboutPage.teamPhotoAria")}
      className="mx-auto w-full max-w-[1138px] overflow-hidden"
    >
      <div className="flex h-[min(52vw,680px)] min-h-[360px] w-full flex-row gap-3 mq900:min-h-[320px] mq900:h-[min(58vw,520px)] mq700:flex-col mq700:h-auto mq700:min-h-0">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="relative min-h-0 w-full flex-[13] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[4/3]">
            <Image
              src="/team-pic-1.png"
              alt={t("aboutPage.altTeam1")}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="relative min-h-0 w-full flex-[7] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[16/9]">
            <Image
              src="/team-pic-3.png"
              alt={t("aboutPage.altTeam2")}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="relative min-h-0 w-full flex-[9] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[16/9]">
            <Image
              src="/team-pic-2.png"
              alt={t("aboutPage.altTeam3")}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="relative min-h-0 w-full flex-[11] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[4/3]">
            <Image
              src="/team-pic-4.png"
              alt={t("aboutPage.altTeam4")}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const AboutPageMain = () => {
  const { t } = useTranslation("common");

  return (
    <main className="relative box-border flex w-full flex-col items-center overflow-x-clip px-5 pb-24 pt-8 text-white mq900:px-6">
      <GradientGlow className="top-0" />
      <div className="relative flex w-full max-w-[1200px] flex-col items-stretch gap-10">
        <div className="flex w-full flex-col gap-6">
          <Link
            href="/"
            className="group flex w-fit flex-row items-center gap-3 self-start text-left [text-decoration:none]"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-white-30 bg-dark/40 transition-colors group-hover:border-white-60">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
                aria-hidden
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-reg text-xs uppercase leading-4 tracking-[0.2em] text-white">
              {t("shared.back")}
            </span>
          </Link>

          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="m-0 max-w-[900px] font-sora text-[40px] font-normal leading-[1.1] tracking-[0.02em] text-white mq450:text-3xl mq900:text-[52px] mq900:leading-tight">
              {t("aboutPage.title")}
            </h1>
          </div>

          <div id="team-pic" className="w-full mt-24">
            <AboutTeamPhotoGrid />
          </div>
        </div>

        <div className="flex w-full flex-col gap-12 mt-20 gap-y-28">
          <div className="mx-auto flex w-full flex-col gap-6 text-left font-reg text-base font-light leading-[26px] tracking-[0.02em] text-white-60">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">
              {t("aboutPage.cultureHeading")}
            </h2>
            <p className="mt-4 max-w-[886px] text-xl text-white mq900:text-base">
              {t("aboutPage.cultureBody")}
            </p>
          </div>

          <div className="w-full">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">
              {t("aboutPage.valuesHeading")}
            </h2>

            <div className="w-full grid grid-cols-4 gap-6 mq450:grid-cols-1 mq700:grid-cols-2 mt-20 space-between">
              {VALUE_KEYS.map((key, index) => {
                const Icon = VALUE_ICONS[index];
                return (
                  <div key={key} className="w-full">
                    <div className="flex flex-col gap-2 max-w-[235px]">
                      <div className="flex flex-col items-start gap-8">
                        <Icon className="mt-0.5 h-[42px] w-[42px] shrink-0 text-white" />
                        <h3 className="m-0 font-sora text-xl font-semibold tracking-[0.2px] text-white">
                          {t(`team.values.${key}.title`)}
                        </h3>
                      </div>
                      <p className="mt-2 font-reg text-base font-normal leading-[24px] tracking-[0.32px] text-white-60 mq450:pl-0">
                        {t(`team.values.${key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <section id="our-team" className="w-full">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">
              {t("aboutPage.teamHeading")}
            </h2>
            <div className="mt-12 w-full max-w-[1200px] text-left font-reg text-base text-white">
              <MemberGrid />
            </div>
          </section>
        </div>
        <section id="contact-us">
          <ContactSection />
        </section>
      </div>
    </main>
  );
};

export default AboutPageMain;
