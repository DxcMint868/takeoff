import type { NextPage } from "next";

export type FooterComponentType = {
  className?: string;
};

const FooterComponent: NextPage<FooterComponentType> = ({ className = "" }) => {
  return (
    <section
      className={`w-full flex flex-col items-start justify-start pt-10 px-[25px] pb-8 box-border gap-8 text-center text-xl text-white font-sora ${className}`}
    >
      <div className="w-full relative hidden max-w-full" />
      <div className="w-full flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <div className="w-[348px] flex flex-col items-start justify-start gap-12 max-w-full">
          <div className="self-stretch flex flex-col items-center justify-center gap-6 z-[1]">
            <h2 className="m-0 relative text-inherit tracking-[0.04em] leading-[26px] font-semibold font-[inherit] mq450:text-base mq450:leading-[21px]">
              Contact Info
            </h2>
            <div className="self-stretch flex flex-col items-center justify-center gap-6 text-left text-base font-reg">
              <div className="self-stretch flex flex-row items-center justify-center gap-6 mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-4">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                    loading="lazy"
                    alt=""
                    src="/24phone.svg"
                  />
                  <a href="tel:+971585401286" className="relative tracking-[0.02em] leading-[24px] font-light inline-block min-w-[118px] text-white hover:text-purple transition-colors duration-300 no-underline">
                    +971585401286
                  </a>
                </div>
                <div className="flex flex-row items-center justify-start gap-3.5">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 object-cover min-h-[24px]"
                    loading="lazy"
                    alt=""
                    src="/24mail@2x.png"
                  />
                  <a href="mailto:contact@hoasen.io" className="relative tracking-[0.02em] leading-[24px] font-light inline-block min-w-[128px] whitespace-nowrap text-white hover:text-purple transition-colors duration-300 no-underline">
                    contact@hoasen.io
                  </a>
                </div>
              </div>
              <div className="w-[260px] hidden flex-row items-center justify-start gap-3">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0"
                  alt=""
                  src="/locationsvgrepocom-5-1.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[24px] font-light">
                  AL Hamra Industrial Zone-FZ
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start py-0 px-2.5 box-border max-w-full text-xs text-white-60 font-reg">
            <div className="flex flex-col items-center justify-start gap-[46px] max-w-full">
              <div className="flex flex-row items-center justify-center gap-[30px]">
                <a href="https://t.me/+4rZ4ipEl2yk2ODlk" target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[1] cursor-pointer"
                    loading="lazy"
                    alt="Telegram"
                    src="/telegram.svg"
                  />
                </a>
                <a href="https://www.linkedin.com/company/hoasendigital" target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[1] cursor-pointer"
                    loading="lazy"
                    alt="LinkedIn"
                    src="/linkind.svg"
                  />
                </a>
                <a href="https://x.com/hoasenhub" target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[1] cursor-pointer"
                    loading="lazy"
                    alt="Twitter"
                    src="/x.svg"
                  />
                </a>
              </div>
              {/* <div className="self-stretch flex flex-row items-start justify-start py-0 pl-2.5 pr-0">
                <div className="flex-1 flex flex-row items-start justify-start gap-[18.7px]">
                  <div className="h-[15px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                    <div className="w-px h-[13px] relative border-white-30 border-r-[1px] border-solid box-border z-[1]" />
                  </div>
                  <a className="[text-decoration:none] flex-1 relative tracking-[0.02em] leading-[18px] text-[inherit] inline-block min-w-[83px] z-[1]">
                    Privacy Policy
                  </a>
                  <div className="h-[15px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                    <div className="w-px h-[13px] relative border-white-30 border-r-[1px] border-solid box-border z-[1]" />
                  </div>
                  <div className="flex-1 relative tracking-[0.02em] leading-[18px] inline-block min-w-[79px] z-[1]">
                    Terms of Use
                  </div>
                </div>
              </div> */}

              <div className="relative tracking-[0.2em] leading-[16px] uppercase z-[2] text-center">
                AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-start justify-start pt-2 px-[499px] pb-12 box-border relative min-h-[72px] max-w-full text-xs text-white-60 font-reg">
        <footer className="w-full !m-[0] top-[0px] right-[-59px] text-397xl leading-[72px] font-sora text-transparent !bg-clip-text [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.04),_rgba(27,_19,_51,_0))] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center inline-block whitespace-nowrap z-[1] mq450:text-85xl mq450:leading-[29px] mq900:text-147xl mq900:leading-[43px]">
          hoasen
        </footer>
      </div> */}
    </section>
  );
};

export default FooterComponent;
