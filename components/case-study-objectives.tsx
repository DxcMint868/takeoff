import type { ComponentType, SVGProps } from "react";

type Objective = {
  title: string;
  description: string;
  icon?: {
    url: string;
    alt: string;
  };
};

export type CaseStudyObjectivesProps = {
  title: string;
  objectives: Objective[];
  icons: ComponentType<SVGProps<SVGSVGElement>>[];
};

export function CaseStudyObjectives({
  title,
  objectives,
  icons,
}: CaseStudyObjectivesProps) {
  return (
    <section className="w-full bg-dark px-5 pb-16 pt-6 mq1100:px-8 mq450:px-5">
      <div className="mx-auto max-w-[1132px]">
        <h3 className="m-0 text-center font-sora text-[26px] font-semibold capitalize leading-none mq450:text-xl mq450:leading-[1.25]">
          {title}
        </h3>
        <div className="mq900:mx-4 mt-10 grid grid-cols-2 gap-x-8 gap-y-6 mq900:grid-cols-1">
          {objectives.map((obj, i) => {
            const Icon = icons[i];
            return (
              <div
                key={obj.title}
                className="relative flex items-start gap-4 overflow-hidden rounded-3xs border border-solid border-white/20 bg-[rgba(27,19,51,0.4)] p-6 shadow-[0_0_12px_0_#2b1f62] transition-all duration-300 ease-out hover:-translate-y-px hover:border-white/25 hover:shadow-[0_0_18px_2px_#2b1f62] mq450:flex-col mq450:items-center mq450:text-center"
              >
                <span className="shrink-0 text-white">
                  {obj.icon?.url ? (
                    <img
                      src={obj.icon.url}
                      alt={obj.icon.alt || `${obj.title} icon`}
                      className="h-[42px] w-[42px] object-contain"
                    />
                  ) : (
                    <Icon />
                  )}
                </span>
                <div className="min-w-0">
                  <h4 className="m-0 font-sora text-xl font-semibold leading-[30px] tracking-[0.02em]">
                    {obj.title}
                  </h4>
                  <p className="m-0 mt-2 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white/70">
                    {obj.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
