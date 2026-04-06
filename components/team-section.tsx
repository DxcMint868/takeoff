import Image from "next/image";
import React from 'react';

const TeamSection: React.FC = () => {
  return (
    <section id="our-team" className="w-full flex flex-row items-start justify-start pt-64 px-2 box-border max-w-full text-29xl font-sora relative">
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
            Our team & Values
          </h1>
          <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-light font-reg text-white-60">
            <h2 className="m-0 self-stretch relative text-3xl tracking-[0.02em] leading-[38px] z-[1] text-white-60 font-reg mq450:text-lg mq450:leading-[30px]">
              <p className="m-0">
                <span className="font-light font-reg text-white-60">{`Hoasen is built up of a team of `}</span>
                <span className="font-reg text-white">
                  high-performing
                </span>
                <span className="font-light">{` individuals in the fintech space. `}</span>
              </p>
              <p className="m-0">
                <span className="font-light">{`We know what `}</span>
                <span className="font-reg text-white">world-class</span>
                <span className="font-light font-reg text-white-60">{` looks like, and our team has `}</span>
                <span className="font-reg text-white">
                  domain knowledge
                </span>
                <span className="font-light font-reg text-white-60">{`. `}</span>
              </p>
              <p className="m-0">
                <span className="font-light font-reg text-white-60">{`This enables us to `}</span>
                <span className="font-reg text-white">
                  move quickly
                </span>
                <span className="font-light">{`, reduce handoffs, and avoid `}</span>
              </p>
              <p className="m-0 font-light">
                bureaucratic processes that slow teams down.
              </p>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
