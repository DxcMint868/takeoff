import GroupComponent from "./group-component";

const TechnologiesSection = () => (
  <section id="our-service" className="w-full">
      <img
        className="absolute w-full max-w-[800px] top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        loading="lazy"
        src="/vector-3.svg"
      />

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
          <p className="m-0">Our Capabilities in Tech and Design</p>
        </h1>
      </div>
    </div>
    
    <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-light font-reg text-white-60 text-center pb-8">
      Proven, well rounded teams, with fintech acumen
    </div>

    <div className="self-stretch flex flex-col items-start justify-start gap-8 max-w-full text-left text-3xl font-sora">
      <div className="group-container flex-1 flex mq700:flex-col items-center justify-center min-w-[300px] gap-8 w-full">
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-blockchain.svg"
          productDelivery="Blockchain Development"
          description="Specializing in creating secure and decentralized applications for various blockchain platforms."
          skills={['Solana (Rust)', 'EVM (ETH, AVAX, ETC)', 'Canton, Cardano, Midnight (Haskell)', 'Solidity', 'FunC', 'Move']}
        />
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-frontend.svg"
          productDelivery="FrontEnd"
          description="Focused on designing and developing visually appealing, responsive user interfaces."
          skills={['Angular.JS', 'React', 'VUE', 'TypeScript', 'Next.js', 'Tailwind CSS']}
        />
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-design.svg"
          productDelivery="Mobile"
          description="Building performant native and cross-platform mobile applications."
          skills={['Kotlin', 'Swift', 'Java', 'Flutter', 'React Native']}
        />
      </div>
      <div className="group-container flex-1 flex mq700:flex-col items-center justify-center min-w-[300px] gap-8 w-full">
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-backend.svg"
          productDelivery="BackEnd"
          description="Specializing in building scalable and secure backend systems for web and mobile applications."
          skills={['Node.js', 'Express', 'Rest / GraphQL', 'C#', 'Python', 'PHP Laravel', 'Golang']}
        />
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-delivery.svg"
          productDelivery="Artificial Intelligence"
          description="Integrating AI-driven solutions to automate workflows, enhance products, and unlock new capabilities."
          skills={['Langchain', 'Langraph', 'Agents', 'Openrouter', 'RAG', 'Fine-tuning']}
        />
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-design.svg"
          productDelivery="Product Design & Product Management"
          description="Designing intuitive digital experiences and driving product strategy from discovery to delivery."
          skills={['UI Design', 'Framer / Webflow', 'Interaction Design', 'BA', 'PM', 'Research']}
        />
      </div>
      <div className="group-container flex-1 flex mq700:flex-col items-center justify-center min-w-[300px] gap-8 w-full">
        <GroupComponent
          maskGroup="/mask-group@2x.png"
          group289551="/group-delivery.svg"
          productDelivery="Test Automation"
          description="Ensuring product quality through automated testing pipelines, blockchain-specific validation, and end-to-end coverage."
          skills={['Cucumber', 'Playwright', 'Cypress', 'Blockchain Testing', 'Jest', 'CI/CD Integration']}
        />
      </div>
    </div>
  </section>

);

export default TechnologiesSection;
