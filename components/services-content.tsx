import type { NextPage } from "next";
import GroupComponent from "./group-component";
import LogoRow1 from "./logo-row1";
import LogoRow from "./logo-row";
import ContactForm from "./contact-form";

export type ServicesContentType = {
  className?: string;
};

const ServicesContent: NextPage<ServicesContentType> = ({ className = "" }) => {
  return (

    <section
      className={`flex flex-col pt-96 items-start justify-start gap-3 max-w-[1200px] w-full text-center text-xs text-white font-reg ${className}`}
    >
      <div id="our-service" className="w-full flex flex-row items-start justify-between pt-0 pb-11 pl-0 pr-0 box-border gap-5 max-w-full text-right">
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
        <div className="group-container flex-1 flex mq700:flex-col items-center justify-center min-w-[359px] gap-8 w-full">
          <GroupComponent
            maskGroup="/mask-group@2x.png"
            group289551="/group-289551.svg"
            productDelivery="Blockchain Stack"
          />
          <GroupComponent
            maskGroup="/mask-group@2x.png"
            group289551="/group-289551-1.svg"
            productDelivery="Frontend"
          />
          <GroupComponent
            maskGroup="/mask-group@2x.png"
            group289551="/group-289551.svg"
            productDelivery="Backend"
          />
        </div>
        <div className="group-container flex-1 flex mq700:flex-col items-center justify-center min-w-[359px] gap-8 w-full">
          <GroupComponent
            maskGroup="/mask-group@2x.png"
            group289551="/group-289551.svg"
            productDelivery="Product Delivery"
          />
          <GroupComponent
            maskGroup="/mask-group@2x.png"
            group289551="/group-289551-1.svg"
            productDelivery="Product Design"
          />
        </div>
      </div>


      <div id="our-work" className="w-full flex flex-row items-start justify-start pt-64 px-2 pb-[52px] box-border max-w-full text-29xl font-sora">
        <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-5">
          {/* <div className="h-[100px] w-px relative">
            <div className="absolute top-[0px] left-[0px] border-white-30 border-r-[1px] border-dashed box-border w-full h-full" />
            <div className="absolute top-[20px] left-[0px] border-white border-r-[1px] border-dashed box-border w-px h-[61px] z-[1]" />
          </div> */}
          <div className="w-full text-center flex flex-col items-center gap-4 max-w-[calc(100%_-_21px)]">
            <h1 className="m-0 relative text-inherit leading-[58px] font-normal font-[inherit] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
              Who we’ve worked with
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
            <div className="flex-[0.98] shadow-[0px_0px_24px_#1f183f] rounded-3xs bg-dark border-gray border-[1px] border-solid box-border flex flex-col items-end justify-start pt-[30px] px-[23px] pb-[18px] gap-6 min-w-[286px] max-w-full mq900:flex-1">
              <div className="w-[440px] h-[266px] relative shadow-[0px_0px_24px_#1f183f] rounded-3xs bg-dark border-gray border-[1px] border-solid box-border hidden max-w-full" />
              <div className="self-stretch flex flex-row items-start justify-center py-0 pl-0.5 pr-0">
                <div className="relative tracking-[0.2em] leading-[16px] uppercase z-[1]">
                  Name here - CTO
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-end py-0 px-2 box-border max-w-full text-sm text-white-60">
                <blockquote className="m-0 flex-1 relative tracking-[0.02em] leading-[22px] font-light inline-block max-w-full z-[1]">
                  <p className="m-0 whitespace-pre-wrap">
                    “Lorem ipsum dolor sit amet, consectetur adip is cing elit,
                    sed do eiusmod tempor incididunt ut labore et doloresed do
                    eiusmod et dolo resed do eiu smod dolo dolo onsectetur adip
                    is cing labore et dol ca
                  </p>
                  <p className="m-0">dolo dolo dolo oresed do eiusmod et...”</p>
                </blockquote>
              </div>
              <div className="w-[246px] flex flex-row items-start justify-between gap-5 text-right text-purple">
                <img
                  className="h-10 w-[100px] relative object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/group-289500@2x.png"
                />
                <div className="flex flex-col items-start justify-start pt-[9px] px-0 pb-0">
                  <div className="relative [text-decoration:underline] tracking-[0.02em] leading-[22px] font-medium inline-block min-w-[44px] z-[1]">
                    dash.io
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 shadow-[0px_0px_24px_#1f183f] rounded-3xs bg-dark border-gray border-[1px] border-solid box-border flex flex-col items-end justify-start pt-[30px] px-[19px] pb-[18px] gap-[46px] min-w-[286px] max-w-full mq900:flex-1">
              <div className="w-[440px] h-[266px] relative shadow-[0px_0px_24px_#1f183f] rounded-3xs bg-dark border-gray border-[1px] border-solid box-border hidden max-w-full" />
              <div className="self-stretch flex flex-row items-start justify-center py-0 pl-[3px] pr-0">
                <div className="relative tracking-[0.2em] leading-[16px] uppercase inline-block min-w-[127px] z-[1]">
                  Frank A. - CTO
                </div>
              </div>
              <blockquote className="m-0 self-stretch relative text-sm tracking-[0.02em] leading-[22px] font-light text-white-60 z-[1]">
                <p className="m-0">{`“I worked with Meg and Marek at Rain and was `}</p>
                <p className="m-0">
                  impressed by their quality of work and depth of industry
                  knowledge. It was a pleasure working with them”
                </p>
              </blockquote>
              <div className="w-[253px] flex flex-row items-start justify-end py-0 px-[3px] box-border text-right text-purple">
                <div className="flex-1 flex flex-row items-start justify-between gap-5">
                  <img
                    className="h-10 w-[100px] relative object-cover z-[1]"
                    loading="lazy"
                    alt=""
                    src="/group-289496@2x.png"
                  />
                  <div className="flex flex-col items-start justify-start pt-[9px] px-0 pb-0">
                    <div className="relative [text-decoration:underline] tracking-[0.02em] leading-[22px] font-medium inline-block min-w-[53px] z-[1]">
                      rain.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <img
              className="h-1 w-[98px] object-contain"
              alt=""
              src="/container@2x.png"
            />
          </div> */}
        </div>
      </div>
      
      <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[26px] pr-[25px] box-border max-w-full">
        <div className="mq900:hidden flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq900:flex-wrap mq900:justify-center">
          <div className="w-[107px] flex flex-col items-start justify-start gap-4">
            <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-1.5">
              <img
                className="h-[100px] w-[100px] relative object-cover"
                alt=""
                src="/mask-group-6@2x.png"
              />
            </div>
            <div className="relative tracking-[0.2em] leading-[16px] uppercase inline-block min-w-[107px]">
              powertarde
            </div>
          </div>
          <LogoRow1 maskGroup="/mask-group-7@2x.png" rain="Rain" />
          <LogoRow maskGroup="/mask-group-8@2x.png" liquid="Liquid" />
          <LogoRow1
            maskGroup="/mask-group-9@2x.png"
            rain="dash"
            propMinWidth="43px"
          />
          <LogoRow
            propPadding="0px 4px 0px 0px"
            maskGroup="/mask-group-10@2x.png"
            liquid="TIKI"
            propMinWidth="32px"
          />
          <LogoRow1
            maskGroup="/mask-group-11@2x.png"
            rain="agoda"
            propMinWidth="55px"
          />
          <LogoRow
            propPadding="unset"
            maskGroup="/mask-group-12@2x.png"
            liquid="Emirates"
            propMinWidth="79px"
          />
        </div>

        <div className="hidden mq900:block flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq900:flex-wrap mq900:justify-center">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex flex-row items-center justify-center gap-4">
              <LogoRow maskGroup="/mask-group-7@2x.png" size="70px" />
              <LogoRow maskGroup="/mask-group-8@2x.png" size="70px" />
              <LogoRow
                maskGroup="/mask-group-9@2x.png"
                propMinWidth="43px"
                size="70px"
              />
              <LogoRow
                propPadding="0px 4px 0px 0px"
                maskGroup="/mask-group-10@2x.png"
                propMinWidth="32px"
                size="70px"
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <LogoRow
                maskGroup="/mask-group-11@2x.png"
                propMinWidth="55px"
                size="70px"
              />
              <LogoRow
                propPadding="unset"
                maskGroup="/mask-group-12@2x.png"
                propMinWidth="79px"
                size="70px"
              />
              <LogoRow maskGroup="/mask-group-6@2x.png" size="70px" />
            </div>
          </div>
        </div>

      </div>
      <div id="our-team" className="w-full flex flex-row items-start justify-start pt-64 px-2 pb-[52px] box-border max-w-full text-29xl font-sora">
        <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-5">
          <div className="w-full text-center flex flex-col items-center gap-4 max-w-[calc(100%_-_21px)]">
            <h1 className="m-0 relative text-inherit leading-[58px] font-normal font-[inherit] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
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
      </div>

      <div id="contact-us" className="self-stretch flex flex-row items-start justify-start py-0 pl-[9px] pr-0 box-border max-w-full text-center text-29xl font-sora">
          <div className="flex-1 flex flex-row items-start justify-start flex-wrap content-start gap-5 max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start pt-[42px] px-0 pb-0 box-border min-w-[702px] max-w-full mq900:min-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[214px] max-w-full">
                <div className="self-stretch flex flex-col items-end justify-start gap-4 max-w-full text-left text-[64px]">
                  <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-5 mq900:flex-wrap">
                    <div className="w-[445px] flex flex-col items-start justify-start gap-5 min-w-[445px] max-w-full mq700:min-w-full mq900:flex-1">

                      <div className="self-stretch flex flex-col items-start justify-start relative">
                        <h1 className="mb-2 m-0 self-stretch relative text-inherit font-normal font-[inherit] z-[1] mq450:text-19xl mq900:text-[51px]">
                          Get in touch
                        </h1>
                        <div className="flex items-center justify-center">
                          <span className="m-0 self-stretch relative text-inherit font-normal font-[inherit] z-[1] mq450:text-19xl mq900:text-[51px]">with us</span>
                          <div className="flex items-center space-x-2 relative top-1">
                            <div className="">
                              <img
                                className="w-10 h-10 pl-5 pb-1"
                                loading="lazy"
                                alt=""
                                src="/telegramsvgrepocom-1-2.svg"
                              />
                            </div>
                            <span className="text-lg">Telegram</span>
                          </div>
                        </div>                        
                      </div>
                      <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-reg text-white-60 z-[1]">
                        <p className="m-0">{`Let's build something extraordinary together!`}</p>
                      </div>
                    </div>
                    <ContactForm/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>


    </section>
  );
};

export default ServicesContent;
