import Image from "next/image";
import ContactSection from "./contact-section";
import DesignGallery from "./design-gallery";
import { GradientBorderCard } from "./gradient-border-card";
import { TeamMemberGrid } from "./team-member-grid";
import { caseStudyTeamMembersToTeamGridMembers } from "../lib/team-grid-member";
import StrapiBlocks from "./strapi-blocks";
import type { DesignProjectViewModel } from "../lib/strapi/design-projects";

type DesignProjectTemplateProps = {
  designProject: DesignProjectViewModel;
};

export default function DesignProjectTemplate({
  designProject,
}: DesignProjectTemplateProps) {
  return (
    <main className="relative flex w-full flex-col items-center overflow-x-clip bg-dark text-white">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative w-full overflow-hidden bg-[#040b1e] pt-[77px] mq900:pt-0">
        {designProject.heroImage?.url ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={designProject.heroImage.url}
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
            {designProject.heroLogo?.url ? (
              <Image
                src={designProject.heroLogo.url}
                alt={
                  designProject.heroLogo.alt || `${designProject.title} logo`
                }
                width={100}
                height={98}
                priority
                unoptimized
                className="object-contain"
              />
            ) : null}

            <div className="max-w-[600px]">
              <h1 className="m-0 font-sora text-[64px] font-semibold capitalize leading-[82px] mq1100:text-[50px] mq1100:leading-[64px] mq900:text-[48px] mq900:leading-[60px] mq450:text-[38px] mq450:leading-[48px]">
                {designProject.title}
              </h1>

              {designProject.heroTags.length > 0 ? (
                <div className="mt-10">
                  <p className="m-0 font-reg text-[10px] font-semibold uppercase leading-3 tracking-[2px] text-white-60">
                    What we did
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {designProject.heroTags.map((tag) => (
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

      {/* ------------------------------------------------------------------ */}
      {/* Brief & Background                                                   */}
      {/* ------------------------------------------------------------------ */}
      {designProject.briefAndBackground ? (
        <section className="w-full bg-dark px-5 py-16">
          <div className="relative mx-auto max-w-[1132px]">
            <GradientBorderCard
              backgroundSrc="/backgrounds/brief-background-bg.png"
              backgroundAlt=""
              backgroundClassName="pointer-events-none object-cover object-right"
            >
              <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
                Brief &amp; Background
              </h2>
              <StrapiBlocks
                blocks={designProject.briefAndBackground.descriptionBlocks}
                className="mt-10 flex max-w-[663px] flex-col gap-4 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60 [&_blockquote]:border-white/25"
              />
            </GradientBorderCard>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Design Tone                                                          */}
      {/* ------------------------------------------------------------------ */}
      {designProject.designTone ? (
        <section className="w-full bg-dark px-5 py-16 mq900:py-12">
          <div className="mx-auto flex max-w-[1132px] flex-col items-center gap-6 text-center">
            <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq450:text-3xl">
              {designProject.designTone.title}
            </h2>
            <p className="m-0 max-w-[600px] font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
              {designProject.designTone.description}
            </p>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Logo Gallery (two columns - compact)                                 */}
      {/* ------------------------------------------------------------------ */}
      {designProject.logoGallery ? (
        <DesignGallery gallery={designProject.logoGallery} />
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Pattern Gallery (one column)                                         */}
      {/* ------------------------------------------------------------------ */}
      {designProject.patternGallery ? (
        <DesignGallery gallery={designProject.patternGallery} />
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Product Gallery (one column – vertical strips)                       */}
      {/* ------------------------------------------------------------------ */}
      {designProject.productGallery ? (
        <DesignGallery gallery={designProject.productGallery} />
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Outcome                                                              */}
      {/* ------------------------------------------------------------------ */}
      {designProject.outcome ? (
        <section className="w-full bg-dark px-5 py-16">
          <div className="relative mx-auto max-w-[1132px]">
            <GradientBorderCard
              backgroundSrc="/backgrounds/outcome-bg.png"
              backgroundAlt=""
              backgroundClassName="pointer-events-none object-cover object-right"
            >
              <h2 className="m-0 font-sora text-[40px] font-semibold capitalize leading-none mq900:text-[32px] mq900:leading-[1.2] mq450:text-5xl">
                {designProject.outcome.title}
              </h2>
              <StrapiBlocks
                blocks={designProject.outcome.descriptionBlocks}
                className="mt-10 flex max-w-[663px] flex-col gap-6 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60 [&_p]:m-0"
              />
            </GradientBorderCard>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Motion & Animation Gallery (two columns)                             */}
      {/* ------------------------------------------------------------------ */}
      {designProject.motionAnimationGallery ? (
        <DesignGallery gallery={designProject.motionAnimationGallery} />
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Download Deck (non-functional placeholder)                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="w-full bg-dark px-5 py-10">
        <div className="mx-auto flex max-w-[1132px] flex-col items-center gap-4">
          <p className="m-0 font-reg text-[10px] font-semibold uppercase leading-3 tracking-[2px] text-white-60">
            Download Deck
          </p>
          <button
            type="button"
            disabled
            aria-label="Download deck (coming soon)"
            className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/40 transition-colors"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 3v13M5 16l7 5 7-5M3 21h18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Project Team                                                         */}
      {/* ------------------------------------------------------------------ */}
      {designProject.teamMembers && designProject.teamMembers.length > 0 ? (
        <section className="w-full bg-dark px-5 py-16 mq900:py-14">
          <div className="mb-10 text-center">
            <h2 className="m-0 font-sora text-[32px] font-semibold leading-none mq450:text-2xl">
              Project Team
            </h2>
          </div>
          <TeamMemberGrid
            members={caseStudyTeamMembersToTeamGridMembers(
              designProject.teamMembers,
            )}
          />
        </section>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Get in touch                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="w-full bg-dark px-5 mq900:px-6">
        <div className="mx-auto max-w-[1200px]">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
