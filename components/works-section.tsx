import LogoRow from "./logo-row";
import LogoRow1 from "./logo-row1";
import TestimonialCard from "./testimonial-card";

const WorksSection = () => (
  <section id="our-work" className="w-full">
    <div className="w-full flex flex-row items-start justify-start pt-64 px-2 pb-[52px] box-border max-w-full text-29xl font-sora">
      <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-5">
        {/* <div className="h-[100px] w-px relative">
      <div className="absolute top-[0px] left-[0px] border-white-30 border-r-[1px] border-dashed box-border w-full h-full" />
      <div className="absolute top-[20px] left-[0px] border-white border-r-[1px] border-dashed box-border w-px h-[61px] z-[1]" />
    </div> */}
        <div className="w-full text-center flex flex-col items-center gap-4 max-w-[calc(100%_-_21px)]">
          <h1 className="m-0 relative text-inherit leading-[58px] font-normal font-[inherit] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
            Who we've worked with
          </h1>
          <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-light font-reg text-white-60">
            Our team has experience working with companies large and small
          </div>
        </div>
      </div>
    </div>

    <div className="self-stretch flex flex-row items-start justify-center pt-0 pb-[88px] pl-[22px] pr-5 box-border max-w-full">
      <div className="w-[904px] flex flex-col items-start justify-start gap-9 max-w-full">
        
        <div className="self-stretch flex flex-row items-start justify-start gap-6 max-w-full mq900:flex-wrap">
          
          <TestimonialCard
            name="Ben"
            position="CTO"
            quote="Hoasen brought a level of professionalism to our project that made it extremely enjoyable and seamless to work with them. They moved fast, with little direction, and helped us meet a tight deadline for our staking platform."
            companyLogo="/group-289500@2x.png"
            companyWebsite="dash.io"
          />

          <TestimonialCard
            name="Frank A."
            position="CTO"
            quote="I worked with Meg and Marek at label and was impressed by their quality of work and depth of industry knowledge. It was a pleasure working with them"
            companyLogo="/group-289496@2x.png"
            companyWebsite="rain.com"
          />
        </div>

      </div>
    </div>

    <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[26px] pr-[25px] box-border max-w-full">
      <div className="mq900:hidden flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq900:flex-wrap mq900:justify-center">

        <LogoRow maskGroup="/mask-group-6@2x.png" label="powertrade" />

        <LogoRow1 maskGroup="/mask-group-7@2x.png" label="rain" />
        <LogoRow maskGroup="/mask-group-8@2x.png" label="liquid" />
        <LogoRow1
          maskGroup="/mask-group-9@2x.png"
          label="dash"
        />
        <LogoRow
          maskGroup="/mask-group-10@2x.png"
          label="TIKI"
        />
        <LogoRow1
          maskGroup="/mask-group-11@2x.png"
          label="agoda"
        />
        <LogoRow
          maskGroup="/mask-group-12@2x.png"
          label="Emirates"
        />
      </div>

      <div className="hidden mq900:block flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq900:flex-wrap mq900:justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-row items-center justify-center gap-4">
            <LogoRow maskGroup="/mask-group-7@2x.png" size="70px" className="mq450:hidden" />
            <LogoRow maskGroup="/mask-group-8@2x.png" size="70px" />
            <LogoRow
              maskGroup="/mask-group-9@2x.png"
              size="70px"
            />
            <LogoRow
              maskGroup="/mask-group-10@2x.png"
              size="70px"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <LogoRow
              maskGroup="/mask-group-11@2x.png"
              size="70px"
            />
            <LogoRow
              maskGroup="/mask-group-12@2x.png"
              size="70px"
            />
            <LogoRow maskGroup="/mask-group-6@2x.png" size="70px" />
          </div>
        </div>
      </div>

    </div>

  </section>);

export default WorksSection;
