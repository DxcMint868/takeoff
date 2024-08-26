import type { NextPage } from "next";
import Nav from "../components/nav";
import FrameComponent from "../components/frame-component";
import GroupComponent1 from "../components/group-component1";
import ServicesContent from "../components/services-content";

const Web: NextPage = () => {
  return (
    <div className="w-full h-[4602px] relative bg-dark overflow-hidden leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:h-auto mq450:min-h-[4602]">
      <img
        className="absolute top-[3225px] left-[calc(50%_-_256px)] w-[452px] h-[356px]"
        loading="lazy"
        alt=""
        src="/vector-4.svg"
      />
      <img
        className="absolute top-[456px] left-[0px] w-[1440px] h-[348px] overflow-hidden object-cover"
        alt=""
        src="/graph-wave@2x.png"
      />
      <section className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start gap-14 max-w-full mq900:gap-7">
        <Nav />
        <FrameComponent />
      </section>
      <div className="absolute top-[1131.5px] left-[338.5px] w-[683.5px] h-[757.8px]">
        <img
          className="absolute top-[0px] left-[0px] w-full h-full"
          alt=""
          src="/vector-3.svg"
        />
        <div className="absolute top-[31.5px] left-[201.5px] w-[358px] flex flex-col items-start justify-start pt-6 px-6 pb-5 box-border gap-[90px] z-[1]">
          <img
            className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/mask-group@2x.png"
          />
          <div className="rounded-xl [background:linear-gradient(0deg,_rgba(56,_42,_95,_0),_#382a5f)] flex flex-row items-start justify-start p-4 z-[1]">
            <div className="h-16 w-16 relative rounded-xl [background:linear-gradient(0deg,_rgba(56,_42,_95,_0),_#382a5f)] hidden" />
            <img
              className="h-8 w-8 relative z-[1]"
              loading="lazy"
              alt=""
              src="/d1.svg"
            />
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-4">
            <h2 className="m-0 relative text-inherit tracking-[0.02em] leading-[30px] font-semibold font-[inherit] inline-block min-w-[107px] z-[1] mq450:text-lg mq450:leading-[24px]">
              FrontEnd
            </h2>
            <div className="self-stretch flex flex-col items-start justify-start gap-6 text-sm text-white-60 font-reg">
              <div className="self-stretch relative tracking-[0.02em] leading-[22px] z-[1]">
                Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do
                eiusmodop tempor incididunt ut labore et dol
              </div>
              <div className="self-stretch flex flex-row items-start justify-end">
                <img
                  className="h-8 w-8 relative overflow-hidden shrink-0 z-[1]"
                  loading="lazy"
                  alt=""
                  src="/frame-289552.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GroupComponent1 />
      <section className="absolute top-[3690px] left-[100px] w-[1240px] h-[442px]">
        <img
          className="absolute top-[0px] left-[0px] w-full h-full object-cover"
          alt=""
          src="/mask-group-1@2x.png"
        />
        <img
          className="absolute top-[363px] left-[1130px] w-[30px] h-5 z-[1]"
          loading="lazy"
          alt=""
          src="/arrow.svg"
        />
      </section>
      <ServicesContent />
      <img
        className="absolute top-[3178px] left-[390px] w-[660px] h-[340px] overflow-hidden object-contain hidden"
        alt=""
        src="/cirlce-half@2x.png"
      />
      <section className="absolute top-[3147px] left-[150px] w-[1110px] flex flex-col items-start justify-start gap-3 min-h-[929px] max-w-full text-right text-xs text-white font-reg">
        <div className="w-[79px] relative tracking-[0.2em] leading-[16px] uppercase inline-block [transform:_rotate(-90deg)]">
          About Us
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[9px] pr-0 box-border max-w-full text-center text-29xl font-sora">
          <div className="flex-1 flex flex-row items-start justify-start flex-wrap content-start gap-5 max-w-full">
            <div className="h-[100px] w-px relative">
              <div className="absolute top-[0px] left-[0px] border-white-30 border-r-[1px] border-dashed box-border w-full h-full" />
              <div className="absolute top-[20px] left-[0px] border-white border-r-[1px] border-dashed box-border w-px h-[61px] z-[1]" />
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[42px] px-0 pb-0 box-border min-w-[702px] max-w-full mq900:min-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[214px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-center py-0 pl-5 pr-[21px] box-border max-w-full">
                  <div className="w-[901px] flex flex-col items-end justify-start gap-[50px] max-w-full">
                    <div className="self-stretch flex flex-row items-start justify-center py-0 pl-[22px] pr-5">
                      <h1 className="m-0 relative text-inherit leading-[58px] font-normal font-[inherit] z-[1] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">{`Our team & Values`}</h1>
                    </div>
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
                <div className="self-stretch flex flex-col items-end justify-start gap-4 max-w-full text-left text-[64px]">
                  <div className="w-[440px] flex flex-col items-start justify-start py-0 pl-5 pr-0 box-border gap-3 max-w-full">
                    <input
                      className="w-[89px] [border:none] [outline:none] font-reg text-sm bg-[transparent] h-[22px] relative tracking-[0.02em] leading-[22px] text-white-60 text-left inline-block p-0 z-[1]"
                      placeholder="Full Name"
                      type="text"
                    />
                    <div className="self-stretch h-px relative border-white-30 border-t-[1px] border-solid box-border opacity-[0.5] z-[1]" />
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-5 mq900:flex-wrap">
                    <div className="w-[445px] flex flex-col items-start justify-start gap-5 min-w-[445px] max-w-full mq700:min-w-full mq900:flex-1">
                      <div className="self-stretch flex flex-col items-start justify-start relative">
                        <h1 className="m-0 self-stretch relative text-inherit leading-[72px] font-normal font-[inherit] z-[1] mq450:text-19xl mq450:leading-[43px] mq900:text-[51px] mq900:leading-[58px]">
                          <p className="m-0">Get in touch</p>
                          <p className="m-0">wit us</p>
                        </h1>
                        <img
                          className="w-10 h-10 absolute !m-[0] right-[196px] bottom-[10px] overflow-hidden shrink-0 z-[2]"
                          loading="lazy"
                          alt=""
                          src="/telegramsvgrepocom-1-2.svg"
                        />
                        <div className="absolute !m-[0] right-[119px] bottom-[19px] text-sm tracking-[0.02em] leading-[22px] font-medium font-reg text-center inline-block min-w-[65px] z-[2]">{`Telegram `}</div>
                      </div>
                      <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-reg text-white-60 z-[1]">
                        <p className="m-0">{`Let's build something extraordinary `}</p>
                        <p className="m-0">together!</p>
                      </div>
                    </div>
                    <div className="w-[420px] flex flex-col items-start justify-start pt-[23px] px-0 pb-0 box-border min-w-[420px] max-w-full text-sm text-white-60 font-reg mq700:min-w-full mq900:flex-1">
                      <div className="self-stretch flex flex-col items-end justify-start gap-[39px]">
                        <div className="self-stretch flex flex-col items-start justify-start gap-3">
                          <div className="self-stretch flex flex-row items-start justify-start gap-5 mq450:flex-wrap">
                            <div className="flex-1 flex flex-col items-start justify-start gap-[39px] min-w-[130px]">
                              <div className="self-stretch flex flex-col items-start justify-start gap-3">
                                <input
                                  className="w-[57px] [border:none] [outline:none] font-reg text-sm bg-[transparent] h-[22px] relative tracking-[0.02em] leading-[22px] text-white-60 text-left inline-block p-0 z-[1]"
                                  placeholder="Email"
                                  type="text"
                                />
                                <div className="self-stretch h-px relative border-white-30 border-t-[1px] border-solid box-border opacity-[0.5] z-[1]" />
                              </div>
                              <div className="relative tracking-[0.02em] leading-[22px] inline-block min-w-[110px] z-[1]">
                                Company Name
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start gap-3 min-w-[130px]">
                              <input
                                className="w-[84px] [border:none] [outline:none] font-reg text-sm bg-[transparent] h-[22px] relative tracking-[0.02em] leading-[22px] text-white-60 text-left inline-block p-0 z-[1]"
                                placeholder="Telegram"
                                type="text"
                              />
                              <div className="self-stretch h-px relative border-white-30 border-t-[1px] border-solid box-border opacity-[0.5] z-[1]" />
                            </div>
                          </div>
                          <div className="self-stretch h-px relative border-white-30 border-t-[1px] border-solid box-border opacity-[0.5] z-[1]" />
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-3">
                          <input
                            className="w-52 [border:none] [outline:none] font-reg text-sm bg-[transparent] h-[22px] relative tracking-[0.02em] leading-[22px] text-white-60 text-left inline-block p-0 z-[1]"
                            placeholder="Tell us about your project..."
                            type="text"
                          />
                          <div className="self-stretch h-px relative border-white-30 border-t-[1px] border-solid box-border opacity-[0.5] z-[1]" />
                        </div>
                        <div className="flex flex-row items-start justify-end py-0 px-[54px] text-right text-xl text-white font-sora">
                          <h2 className="m-0 relative text-inherit tracking-[0.02em] leading-[26px] font-normal font-[inherit] inline-block min-w-[77px] z-[1] mq450:text-base mq450:leading-[21px]">
                            Submit
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Web;
