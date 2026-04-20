import CTASolid from "./cta-solid";
import {
  CORE_PROJECT_CARDS,
  WorkExamplesPortfolio,
} from "./work-examples-portfolio";

const WorkExamplesSection = () => (
  <section id="our-work" className="relative mt-[167px] w-full scroll-mt-[100px]">
    <div className="flex w-full flex-col items-stretch gap-10">
      <div className="flex w-full flex-col items-center text-center">
        <h2 className="m-0 max-w-[572px] font-sora text-29xl font-normal leading-[58px] tracking-[0.02em] text-white mq450:text-10xl mq450:leading-[41px] mq900:text-19xl mq900:leading-[46px]">
          Our Work Examples
        </h2>
      </div>

      <WorkExamplesPortfolio projectCards={CORE_PROJECT_CARDS} />

      <div className="flex justify-center pt-2">
        <CTASolid propWidth="200px" label="More Projects" href="/works" />
      </div>
    </div>
  </section>
);

export default WorkExamplesSection;
