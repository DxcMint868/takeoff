import type { NextPage } from "next";
import ContactForm from "./contact-form";

export type ServicesContentType = {
  className?: string;
};

const ContactSection: NextPage<ServicesContentType> = ({ className = "" }) => {
  return (

    <section
      className={`flex flex-col pt-32 items-start justify-start gap-3 max-w-[1200px] w-full text-center text-xs text-white font-reg ${className}`}
    >
      <div id="contact-us" className="self-stretch flex flex-row items-start justify-start py-0 pl-[9px] pr-0 box-border max-w-full text-center text-29xl font-sora">
          <div className="flex-1 flex flex-row items-start justify-start flex-wrap content-start gap-5 max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start pt-[42px] px-0 pb-0 box-border min-w-[702px] max-w-full mq900:min-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[214px] max-w-full">
                <div className="self-stretch flex flex-col items-end justify-start gap-4 max-w-full text-left text-[64px]">
                  <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-5 mq900:flex-wrap">
                    <div className="w-[445px] flex flex-col items-start justify-start gap-5 min-w-[445px] max-w-full mq700:min-w-full mq900:flex-1">

                      <div className="self-stretch flex flex-col items-start justify-start relative pl-3">
                        <h1 className="mb-2 m-0 self-stretch relative font-normal font-[inherit] z-[1] text-19xl">
                          Get in touch with us
                        </h1>
                      </div>
                      
                      <div className="self-stretch relative text-base tracking-[0.02em] leading-[24px] font-reg text-white-60 z-[1] pl-3">
                        <p className="m-0">Let's build something extraordinary together!</p>
                      </div>

                      <div className="flex items-center space-x-1 relative cursor-pointer" onClick={() => window.open('https://t.me/+4rZ4ipEl2yk2ODlk', '_blank', 'noopener,noreferrer')}>
                        <img
                          className="px-3"
                          loading="lazy"
                          alt="Telegram"
                          src="/telegram.svg"
                        />
                        <span className="text-lg">Telegram</span>
                      </div>

                    </div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>


    </section>
  );
};

export default ContactSection;
