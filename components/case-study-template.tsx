import { type ComponentType, type SVGProps } from "react";
import Image from "next/image";
import ContactSection from "./contact-section";
import { TeamMemberGrid } from "./member-grid";
import { caseStudyTeamMembersToTeamGridMembers } from "../lib/team-grid-member";
import { GradientBorderCard } from "./gradient-border-card";
import { GradientGlow } from "./gradient-glow";
import {
  CoinIcon,
  FileAnalyticsIcon,
  ProgressBoltIcon,
  TrendingUpIcon,
} from "./icons";
import type { CaseStudyViewModel } from "../lib/strapi/case-studies";
import { CaseStudyObjectives } from "./case-study-objectives";
import ProjectGallery from "./project-gallery";
import StrapiBlocks from "./strapi-blocks";
import { UrlImageOrVideo } from "./url-image-or-video";

type CaseStudyTemplateProps = {
  caseStudy: CaseStudyViewModel;
};

const OBJECTIVE_ICONS: Array<ComponentType<SVGProps<SVGSVGElement>>> = [
  CoinIcon,
  TrendingUpIcon,
  ProgressBoltIcon,
  FileAnalyticsIcon,
];

export default function CaseStudyTemplate({
  caseStudy,
}: CaseStudyTemplateProps) {
  const objectiveIcons = caseStudy.objectives.map(
    (_, index) => OBJECTIVE_ICONS[index % OBJECTIVE_ICONS.length],
  );

  return (
    <main className="relative flex w-full flex-col items-center overflow-x-clip bg-dark text-white">
      <section className="relative w-full overflow-hidden bg-[#040b1e] pt-[77px] mq900:pt-0">
        {caseStudy.heroImage?.url ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={caseStudy.heroImage.url}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ) : null}

        <div className="relative flex min-h-[640px] w-full items-stretch mq1100:min-h-[520px] mq900:min-h-[560px] mq450:min-h-[500px]">
          <div className="relative z-10 flex w-full flex-none flex-col justify-between pb-[160px] pl-[60px] pr-8 mq1100:pb-10 mq900:pb-16 mq900:pl-[30px] mq900:pr-[30px] mq900:pt-[60px] mq450:pl-5 mq450:pr-5">
            {caseStudy.logo?.url ? (
              <Image
                src={caseStudy.logo.url}
                alt={caseStudy.logo.alt || `${caseStudy.title} logo`}
                width={100}
                height={98}
                priority
                unoptimized
                className="object-contain"
              />
            ) : null}

            <div className="max-w-[600px]">
              <h1 className="m-0 font-sora text-[64px] font-semibold capitalize leading-[82px] mq1100:text-[50px] mq1100:leading-[64px] mq900:text-[48px] mq900:leading-[60px] mq450:text-[38px] mq450:leading-[48px]">
                {caseStudy.title}
              </h1>
              {caseStudy.subtitle && (
                <p className="m-0 mt-2 font-reg text-sm font-normal leading-[22px] tracking-[0.02em]">
                  {caseStudy.subtitle}
                </p>
              )}

              {caseStudy.heroTags.length > 0 ? (
                <div className="mt-10">
                  <p className="m-0 font-reg text-[10px] font-semibold uppercase leading-3 tracking-[2px] text-white-60">
                    What we did
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {caseStudy.heroTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex cursor-default items-center rounded-md bg-white/10 px-2.5 py-1 font-reg text-xs font-medium leading-[18px] tracking-[0.02em] text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[60px]"
          style={{
            background: "linear-gradient(to bottom, transparent, #1b1333)",
          }}
        />
      </section>

      {caseStudy.stats.length > 0 ? (
        <section className="w-full bg-dark px-5 pb-20 pt-16 mq900:pb-16 mq450:pb-12">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10">
            <p className="m-0 px-2 max-w-[747px] text-center font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white-60">
              {caseStudy.shortDescription}
            </p>
            <div className="flex w-full max-w-[950px] items-center justify-center mq700:flex-col mq700:gap-10">
              {caseStudy.stats.map((stat, i) => (
                <div
                  key={`${stat.label}-${stat.order}`}
                  className="flex items-center mq700:flex-col mt-4"
                >
                  {i > 0 && (
                    <div className="mx-10 h-[110px] w-px bg-white/20 mq900:mx-6 mq700:mx-0 mq700:h-px mq700:w-[110px] mb-6" />
                  )}
                  <div className="flex flex-col items-center gap-2 whitespace-nowrap text-center">
                    <span className="font-sora text-[66px] font-extralight capitalize leading-none mq900:text-[48px] mq450:text-[36px]">
                      {stat.value}
                    </span>
                    <span className="font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white-60">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.briefAndBackground ? (
        <section className="w-full bg-dark px-5 py-16">
          <div className="relative mx-4 ms1024:mx-auto max-w-[1132px]">
            <GradientBorderCard
              backgroundSrc="/backgrounds/brief-background-bg.png"
              backgroundAlt=""
              backgroundClassName="pointer-events-none object-cover object-right"
            >
              <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
                Brief & Background
              </h2>
              <StrapiBlocks
                blocks={caseStudy.briefAndBackground.descriptionBlocks}
                className="mt-10 flex max-w-[663px] flex-col gap-4 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60 [&_blockquote]:border-white/25"
              />
            </GradientBorderCard>
          </div>
        </section>
      ) : null}

      {caseStudy.objectives.length > 0 ? (
        <CaseStudyObjectives
          title="Business Objectives"
          objectives={caseStudy.objectives.map((objective) => ({
            title: objective.title,
            description: objective.description,
            icon: objective.icon,
          }))}
          icons={objectiveIcons}
        />
      ) : null}

      {caseStudy.solutions.length > 0 ? (
        <section className="w-full bg-dark px-5 py-16 mq450:px-3">
          <div className="relative mx-auto max-w-[1370px] overflow-hidden rounded-[50px] border border-solid border-white/20 bg-white/[0.04] mq900:rounded-3xl py-12 mq900:mx-4">
            <Image
              src="/backgrounds/our-solution-bg.webp"
              alt=""
              aria-hidden
              width={1370}
              height={320}
              className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full"
              priority={false}
            />
            <h2 className="relative mb-20 pt-2 text-center font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
              Our Solution
            </h2>

            <div className="mt-20 flex flex-col gap-24 px-[70px] mq1100:mt-12 mq1100:gap-16 mq1100:px-10 mq450:gap-12 mq450:px-5">
              {caseStudy.solutions.map((solution) => {
                const image = solution.image;
                const isLeft = solution.imagePosition === "left";
                return (
                  <div
                    key={`${solution.title}-${solution.order}`}
                    className="flex items-end gap-16 mq1100:flex-col mq1100:gap-10"
                  >
                    {image && isLeft ? (
                      <div className="relative h-[430px] w-[560px] shrink-0 overflow-hidden rounded-[20px] mq1100:order-2 mq1100:h-[300px] mq1100:w-full mq450:h-[220px]">
                        <UrlImageOrVideo
                          url={image.url}
                          alt={image.alt || solution.title}
                          layout="fill"
                          sizes="(max-width: 1100px) 100vw, 560px"
                          className="object-cover object-left-top"
                        />
                      </div>
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <h3 className="m-0 font-reg text-5xl font-bold leading-none tracking-[0.02em] mq450:text-xl">
                        {solution.title}
                      </h3>
                      <StrapiBlocks
                        blocks={solution.descriptionBlocks}
                        className="m-0 mt-4 flex max-w-[720px] flex-col gap-3 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60"
                      />
                    </div>

                    {image && !isLeft ? (
                      <div className="relative h-[430px] w-[560px] shrink-0 overflow-hidden rounded-[20px] mq1100:h-[300px] mq1100:w-full mq450:h-[220px]">
                        <UrlImageOrVideo
                          url={image.url}
                          alt={image.alt || solution.title}
                          layout="fill"
                          sizes="(max-width: 1100px) 100vw, 560px"
                          className="object-cover object-left-top"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.technicalInfrastructure.length > 0 ? (
        <section className="relative w-full bg-dark px-5 py-12">
          <GradientGlow className="top-1/2 -translate-y-1/2" size="sm" />
          <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-8">
            <h2 className="m-0 text-center font-sora text-[26px] font-semibold capitalize leading-none mq450:text-xl mq450:leading-[1.25]">
              Technical Infrastructure
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mq900:mx-4">
              {caseStudy.technicalInfrastructure.map((item) => (
                <span
                  key={item}
                  className="inline-flex h-9 cursor-default items-center justify-center rounded-md bg-tag-sky/[0.16] px-3 py-1 font-reg text-base font-medium leading-none tracking-[0.02em] text-tag-sky"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.gallery.length > 0 ? (
        <ProjectGallery
          slides={caseStudy.gallery.map((slide) => ({
            src: slide.src,
            alt: slide.alt,
            ...(slide.productPlatform
              ? { productPlatform: slide.productPlatform }
              : {}),
          }))}
        />
      ) : null}

      {caseStudy.outcome ? (
        <section className="w-full bg-dark px-5 py-16">
          <div className="relative ms1024:mx-auto mx-4 max-w-[1132px]">
            <GradientBorderCard
              backgroundSrc="/backgrounds/outcome-bg.png"
              backgroundAlt=""
              backgroundClassName="pointer-events-none object-cover object-right"
            >
              <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
                {caseStudy.outcome.title}
              </h2>
              <StrapiBlocks
                blocks={caseStudy.outcome.descriptionBlocks}
                className="mt-10 flex max-w-[663px] flex-col gap-6 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60 [&_p]:m-0"
              />
            </GradientBorderCard>
          </div>
        </section>
      ) : null}

      {caseStudy.teamMembers && caseStudy.teamMembers.length > 0 ? (
        <section className="w-full bg-dark px-5 py-16 mq900:py-14">
          <TeamMemberGrid
            members={caseStudyTeamMembersToTeamGridMembers(
              caseStudy.teamMembers,
            )}
          />
        </section>
      ) : null}

      {caseStudy.testimonial ? (
        <section className="w-full bg-dark px-5 py-20">
          <div className="mx-auto flex max-w-[876px] flex-col items-center text-center">
            <span
              className="select-none text-[180px] leading-[0.6] text-white mq900:text-[120px] mq450:text-[80px]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              aria-hidden
            >
              &ldquo;
            </span>
            <StrapiBlocks
              blocks={caseStudy.testimonial.quoteBlocks}
              className="m-0 -mt-5 w-full font-reg text-[30px] font-light leading-[1.5] text-white/50 mq900:text-xl mq450:text-lg [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
            />
            <div className="mt-8 flex flex-col items-center font-reg text-xs font-normal uppercase leading-[22px] tracking-[0.2em] text-white-60">
              <span>{caseStudy.testimonial.authorName}</span>
              {caseStudy.testimonial.authorRole ? (
                <span>
                  {caseStudy.testimonial.authorCompany
                    ? `${caseStudy.testimonial.authorRole} of ${caseStudy.testimonial.authorCompany}`
                    : caseStudy.testimonial.authorRole}
                </span>
              ) : (
                <span>{caseStudy.testimonial.authorCompany ?? ""}</span>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <div className="w-full bg-dark px-5 mq900:px-6">
        <div className="mx-4 ms1024:mx-auto max-w-[1200px]">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
