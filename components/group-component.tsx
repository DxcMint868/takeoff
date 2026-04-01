import type { NextPage } from "next";

export type GroupComponentType = {
  className?: string;
  maskGroup?: string;
  group289551?: string;
  productDelivery?: string;
  description?: string;
  skills: string[];
};

const GroupComponent: NextPage<GroupComponentType> = ({
  className = "",
  maskGroup,
  group289551,
  productDelivery,
  description,
  skills,
}) => {
  return (
    <div
      className={`w-[358px] flex flex-col items-start justify-start pt-6 px-6 pb-5 box-border relative gap-[90px] max-w-full z-[1] text-left text-3xl text-white font-sora rounded-2xl overflow-hidden ${className}`}
    >
      <img
        className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src={maskGroup}
      />
      <img
        className="w-16 h-16 relative z-[1]"
        loading="lazy"
        alt=""
        src={group289551}
      />

      <div className="self-stretch flex flex-col items-start justify-start gap-6">
        <div className="self-stretch flex flex-col items-start justify-start gap-4">
          <h2 className="m-0 relative text-inherit tracking-[0.02em] leading-[30px] font-semibold font-[inherit] z-[1] mq450:text-lg mq450:leading-[24px]">
            {productDelivery}
          </h2>
          <div className="self-stretch relative text-sm tracking-[0.02em] leading-[22px] font-reg text-white-60 z-[1]">
            {description}
          </div>
        </div>
        <div className="self-stretch flex flex-wrap gap-2 z-[1]">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-white bg-opacity-10 rounded-md text-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupComponent;
