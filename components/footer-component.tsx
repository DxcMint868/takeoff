import type { NextPage } from "next";
import Image from "next/image";
import { PhoneIcon, MailIcon, TelegramIcon, LinkedInIcon, XIcon } from "./icons";
import { useTranslation } from "../lib/i18n/use-translation";

export type FooterComponentType = {
  className?: string;
};

const FooterComponent: NextPage<FooterComponentType> = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <section
      className={`relative w-full flex flex-col items-start justify-start pt-10 px-[25px] pb-8 box-border gap-8 text-center text-xl text-white font-sora overflow-hidden ${className}`}
    >
      <Image
        src="/hoasen-footer.png"
        alt=""
        aria-hidden
        width={1425}
        height={253}
        className="pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2 opacity-100"
        priority={false}
      />
      <div className="w-full flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <div className="w-[348px] flex flex-col items-start justify-start gap-12 max-w-full">
          <div className="self-stretch flex flex-col items-center justify-center gap-6 z-[1]">
            <h2 className="m-0 relative text-inherit tracking-[0.04em] leading-[26px] font-semibold font-[inherit] mq450:text-base mq450:leading-[21px]">
              {t("footer.contactInfo")}
            </h2>
            <div className="self-stretch flex flex-col items-center justify-center gap-6 text-left text-base font-reg">
              <div className="self-stretch flex flex-row items-center justify-center gap-6 mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-4">
                  <PhoneIcon className="shrink-0" />
                  <a href="tel:+971585401286" className="relative tracking-[0.02em] leading-[24px] font-light inline-block min-w-[118px] text-white hover:text-purple transition-colors duration-300 no-underline">
                    +971585401286
                  </a>
                </div>
                <div className="flex flex-row items-center justify-start gap-3.5">
                  <MailIcon className="shrink-0" />
                  <a href="mailto:contact@hoasen.io" className="relative tracking-[0.02em] leading-[24px] font-light inline-block min-w-[128px] whitespace-nowrap text-white hover:text-purple transition-colors duration-300 no-underline">
                    contact@hoasen.io
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start py-0 px-2.5 box-border max-w-full text-xs text-white-60 font-reg">
            <div className="flex flex-col items-center justify-start gap-[46px] max-w-full">
              <div className="flex flex-row items-center justify-center gap-[30px]">
                <a href="https://t.me/+4rZ4ipEl2yk2ODlk" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-white">
                  <TelegramIcon className="z-[1]" />
                </a>
                <a href="https://www.linkedin.com/company/hoasendigital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white">
                  <LinkedInIcon className="z-[1]" />
                </a>
                <a href="https://x.com/hoasenhub" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white">
                  <XIcon className="z-[1]" />
                </a>
              </div>

              <div className="relative tracking-[0.2em] leading-[16px] uppercase z-[2] text-center">
                AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
