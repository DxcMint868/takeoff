import Link from "next/link";
import CTASolid from "./cta-solid";
import {
  CORE_PROJECT_CARDS,
  EXTRA_PAGE_PROJECT_CARDS,
  OCEAN_FINANCE_PROJECT,
  WorkExamplesPortfolio,
  type WorkProjectCard,
} from "./work-examples-portfolio";

type WorkExamplesSectionProps = {
  featuredProject?: WorkProjectCard | null;
  projectCards?: WorkProjectCard[];
};

const WorkExamplesSection = ({
  featuredProject,
  projectCards,
}: WorkExamplesSectionProps) => {
  const featured = featuredProject ?? OCEAN_FINANCE_PROJECT;
  const cards = projectCards ?? [...CORE_PROJECT_CARDS, ...EXTRA_PAGE_PROJECT_CARDS];

  return (
    <section id="our-work" className="relative mt-[167px] w-full scroll-mt-[100px]">
      <div className="flex w-full flex-col items-stretch gap-10">
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="m-0 max-w-[572px] font-sora text-29xl font-normal leading-[58px] tracking-[0.02em] text-white mq450:text-10xl mq450:leading-[41px] mq900:text-19xl mq900:leading-[46px]">
            Our Work Examples
          </h2>
        </div>

        <WorkExamplesPortfolio
          featuredProject={featured}
          projectCards={cards}
        />

        <div className="flex justify-center pt-2">
          <CTASolid propWidth="200px" label="More Projects" href="/works" />
        </div>
      </div>
    </section>
  );
};

export default WorkExamplesSection;
