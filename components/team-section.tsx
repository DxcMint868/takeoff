import Image from "next/image";
import React, { ComponentType, SVGProps } from "react";
import {
  DomainExpertiseIcon,
  AgileExecutionIcon,
  TransparencyIcon,
  WorldClassIcon,
} from "./icons";

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

const TeamSection: React.FC = () => {
  return (
    <section
      id="our-team"
      className="relative box-border flex w-full min-w-0 max-w-full flex-row items-start justify-start overflow-x-hidden px-4 pt-64 font-sora text-29xl"
    >
      <Image
        className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 object-contain mq900:w-[1500px] mq900:max-w-none"
        alt=""
        src="/vector-4.svg"
        width={800}
        height={800}
        sizes="(max-width: 900px) 2000px, 800px"
        unoptimized
      />

      <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-5">
        <div className="w-full text-center flex flex-col items-center gap-4">
          <h1 className="m-0 relative text-inherit leading-[58px] pb-12 font-normal font-[inherit] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
            Our team & Values
          </h1>
          <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-light font-reg text-white-60">
            <h2 className="m-0 self-stretch relative text-3xl tracking-[0.02em] leading-[38px] z-[1] text-white-60 font-reg mq450:text-lg mq450:leading-[30px]">
              <p className="m-0">
                <span className="font-light font-reg text-white-60">{`Hoasen is built up of a team of `}</span>
                <span className="font-reg text-white">high-performing</span>
                <span className="font-light">{` individuals in the fintech space. `}</span>
              </p>
              <p className="m-0">
                <span className="font-light">{`We know what `}</span>
                <span className="font-reg text-white">world-class</span>
                <span className="font-light font-reg text-white-60">{` looks like, and our team has `}</span>
                <span className="font-reg text-white">domain knowledge</span>
                <span className="font-light font-reg text-white-60">{`. `}</span>
              </p>
              <p className="m-0">
                <span className="font-light font-reg text-white-60">{`This enables us to `}</span>
                <span className="font-reg text-white">move quickly</span>
                <span className="font-light">{`, reduce handoffs, and avoid `}</span>
              </p>
              <p className="m-0 font-light">
                bureaucratic processes that slow teams down.
              </p>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full pt-16 text-left mq700:grid-cols-1">
            {VALUES.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[10px] border-[1px] border-solid border-surface-border px-8 py-8"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-4">
                    <Icon className="h-[42px] w-[42px] shrink-0 text-white" />
                    <h3 className="m-0 font-sora text-xl font-semibold leading-[30px] tracking-[0.4px] text-white">
                      {title}
                      <p className="m-0 pl-[58px] font-reg text-base font-normal leading-[24px] tracking-[0.32px] text-white-60 mq450:pl-0">
                        {description}
                      </p>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
