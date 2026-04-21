import Image from "next/image";
import Link from "next/link";
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
import ContactForm from "./contact-form";

const PAGE_SUBTITLE = (
  <p className="m-0 [text-wrap:balance]">
    Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmodop tempor
  </p>
);

const VALUES: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}[] = [
    {
      Icon: DomainExpertiseIcon,
      title: "Domain Expertise",
      description:
        "Deep fintech knowledge, building systems that process millions daily.",
    },
    {
      Icon: AgileExecutionIcon,
      title: "Agile Execution",
      description:
        "Lean team, fast delivery cutting through red tape for swift results.",
    },
    {
      Icon: TransparencyIcon,
      title: "Transparency",
      description:
        "No black box clear documentation and open communication at every step.",
    },
    {
      Icon: WorldClassIcon,
      title: "World-Class Quality",
      description: "We don't just meet standards; we set them.",
    },
  ];

/** Staggered 2×2 mosaic: two columns share one height; row splits differ (~65/35 vs ~45/55) so gutters do not line up across the middle. */
function AboutTeamPhotoGrid() {
  return (
    <section
      aria-label="Hoasen team"
      className="mx-auto w-full max-w-[1138px] overflow-hidden"
    >
      <div className="flex h-[min(52vw,680px)] min-h-[360px] w-full flex-row gap-3 mq900:min-h-[320px] mq900:h-[min(58vw,520px)] mq700:flex-col mq700:h-auto mq700:min-h-0">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="relative min-h-0 w-full flex-[13] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[4/3]">
            <Image
              src="/team-pic-1.png"
              alt="pic1"
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="relative min-h-0 w-full flex-[7] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[16/9]">
            <Image
              src="/team-pic-3.png"
              alt="Hoasen team outdoors"
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
              alt="Hoasen team by the sea"
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="relative min-h-0 w-full flex-[11] overflow-hidden bg-white-30 mq700:flex-none mq700:aspect-[4/3]">
            <Image
              src="/team-pic-4.png"
              alt="Hoasen logo in the sand"
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
            <span className="font-reg text-xs uppercase leading-4 tracking-[0.2em] text-white">Back</span>
          </Link>

          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="m-0 max-w-[900px] font-sora text-[40px] font-normal leading-[1.1] tracking-[0.02em] text-white mq450:text-3xl mq900:text-[52px] mq900:leading-tight">
              About Us
            </h1>
            <div className="w-full max-w-[900px] font-reg text-3xl font-light leading-[34px] tracking-[0.02em] text-white-60 mq450:text-base mq450:leading-7">
              {PAGE_SUBTITLE}
            </div>
          </div>

          <div id="team-pic" className="w-full mt-24">
            <AboutTeamPhotoGrid />
          </div>

        </div>

        <div className="flex w-full flex-col gap-12 mt-20 gap-y-28">
          <div className="mx-auto flex w-full flex-col gap-6 text-left font-reg text-base font-light leading-[26px] tracking-[0.02em] text-white-60">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">Our Culture</h2>
            <p className="mt-4 max-w-[886px] text-xl text-white mq900:text-base">
              At the heart of our team is a culture of trust, respect, and continuous growth. We support one another, celebrate wins together, and learn quickly from challenges. By staying open, curious, and collaborative, we create space for great ideas to emerge and for everyone to do their best work.
            </p>
          </div>

          <div className="w-full">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">
              Our Values
            </h2>

            <div className="w-full grid grid-cols-4 gap-6 mq450:grid-cols-1 mq700:grid-cols-2 mt-20 space-between">
              {VALUES.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="w-full"
                >
                  <div className="flex flex-col gap-2 max-w-[235px]">
                    <div className="flex flex-col items-start gap-8">
                      <Icon className="mt-0.5 h-[42px] w-[42px] shrink-0 text-white" />
                      <h3 className="m-0 font-sora text-xl font-semibold tracking-[0.2px] text-white">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-2 font-reg text-base font-normal leading-[24px] tracking-[0.32px] text-white-60 mq450:pl-0">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section id="our-team" className="w-full">
            <h2 className="m-0 font-sora text-[80px] mq900:text-[60px] font-normal leading-[58px] text-white/20">Our Team</h2>
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
