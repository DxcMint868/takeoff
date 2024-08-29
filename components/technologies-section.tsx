import GroupComponent from "./group-component";

const TechnologiesSection = () => (
  <section id="our-service" className="w-full">
    <div className="w-full flex flex-row items-start justify-between pt-20 pb-11 pl-0 pr-0 box-border gap-5 max-w-full text-right">
      {/* <div className="h-[225px] w-4 flex flex-col items-end justify-start gap-3">
        <div className="w-[113px] relative tracking-[0.2em] leading-[16px] uppercase inline-block [transform:_rotate(-90deg)]">
          Our Services
        </div>
        <div className="flex flex-row items-start justify-end py-0 pl-2 pr-[7px]">
          <div className="h-[100px] w-px relative">
            <div className="absolute top-[0px] left-[0px] border-white-30 border-r-[1px] border-dashed box-border w-full h-full" />
            <div className="absolute top-[20px] left-[0px] border-white border-r-[1px] border-dashed box-border w-px h-[61px] z-[1]" />
          </div>
        </div>
      </div> */}
      <div className="w-full flex flex-col items-start justify-start pt-[89px] px-0 pb-0 box-border max-w-[calc(100%_-_1px)] text-center text-29xl font-sora">
        <h1 className="m-0 self-stretch relative text-inherit leading-[68px] font-normal font-[inherit] mq450:text-10xl mq450:leading-[41px] mq900:text-19xl mq900:leading-[54px]">
          <p className="m-0">We work with the following</p>
          <p className="m-0">technologies</p>
        </h1>
      </div>
    </div>
    
    <div className="self-stretch flex flex-col items-start justify-start gap-8 max-w-full text-left text-3xl font-sora">
      <div className="group-container flex-1 flex mq700:flex-col items-center justify-center min-w-[300px] gap-8 w-full">
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-289551.svg"
          productDelivery="Blockchain Stack"
          skills={['Solidity', 'Rust', 'FunC']}
        />
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-289551-1.svg"
          productDelivery="Frontend"
          skills={['React', 'Next.js', 'TypeScript']}
        />
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-289551.svg"
          productDelivery="Backend"
          skills={['Node.js', 'Golang']}
        />
      </div>
      <div className="group-container flex-1 flex mq700:flex-col items-center justify-center min-w-[300px] gap-8 w-full">
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-289551.svg"
          productDelivery="Product Delivery"
          skills={['AWS', 'Kubernetes', 'CI/CD']}
        />
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-289551-1.svg"
          productDelivery="Product Design"
          skills={['Figma']}
        />
      </div>
    </div>
  </section>

);

export default TechnologiesSection;
