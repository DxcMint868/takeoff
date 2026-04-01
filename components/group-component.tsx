import type { NextPage } from "next";
import Image from "next/image";

export type GroupComponentType = {
  id?: string;
  className?: string;
  backgroundSrc?: string;
  iconSrc?: string;
  productDelivery?: string;
  description?: string;
  skills: string[];
};

const GroupComponent: NextPage<GroupComponentType> = ({
  id,
  className = "",
  backgroundSrc,
  iconSrc,
  productDelivery,
  description,
  skills,
}) => {
  return (
    <div
      id={id}
      className={`group relative z-[1] box-border flex h-full min-h-[420px] w-full origin-center flex-col overflow-hidden rounded-2xl p-[2px] transition-transform duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:z-10 hover:scale-[1.05] motion-reduce:transition-none motion-reduce:hover:scale-100 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <div
          className="h-[160%] w-[160%] origin-center bg-white opacity-0 transition-[width,opacity] duration-[880ms] ease-[cubic-bezier(0.23,1,0.32,1)] animate-[spin_4.8s_linear_infinite] [animation-play-state:paused] group-hover:w-[20%] group-hover:opacity-100 group-hover:[animation-play-state:running] motion-reduce:animate-none"
        />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col items-start justify-start overflow-hidden rounded-[calc(1rem-2px)] pt-6 px-6 pb-5 text-left font-sora text-3xl text-white">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          {backgroundSrc ? (
            <Image
              src={backgroundSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 700px) min(100vw, 358px), 358px"
            />
          ) : null}
        </div>
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={64}
            height={64}
            className="relative z-[1] h-16 w-16 shrink-0 object-contain"
            sizes="64px"
            unoptimized={iconSrc.endsWith(".svg")}
          />
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col items-start justify-end gap-6 self-stretch">
          <div className="flex flex-col items-start justify-start gap-4 self-stretch">
            <h2 className="relative z-[1] m-0 min-h-[2lh] font-[inherit] text-inherit font-semibold leading-[30px] tracking-[0.02em] mq450:text-lg mq450:leading-[24px]">
              {productDelivery}
            </h2>
            <div className="relative z-[1] min-h-[3lh] self-stretch font-reg text-sm leading-[22px] tracking-[0.02em] text-white-60">
              {description}
            </div>
          </div>
          <div className="z-[1] flex min-h-[6rem] flex-wrap content-start gap-2 self-stretch">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="select-none rounded-md bg-white bg-opacity-10 px-2 py-1 text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupComponent;
