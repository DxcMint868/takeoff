import type { NextPage } from "next";
import ContactForm from "./contact-form";
import { GradientBorderCard } from "./gradient-border-card";
import { TelegramIcon } from "./icons";
import { useTranslation } from "../lib/i18n/use-translation";

export type ContactSectionType = {
  className?: string;
};

const CONTACT_CARD_PADDING =
  "relative z-[1] box-border flex w-full min-w-0 max-w-full items-start justify-between px-20 pt-[72px] pb-10 gap-[80px] mq900:flex-col mq900:items-center mq900:gap-10 mq900:px-10 mq700:px-6 mq450:px-4 mq450:pt-10 mq450:pb-6";

const ContactSection: NextPage<ContactSectionType> = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <section
      id="contact-us"
      className={`box-border flex w-full min-w-0 flex-col items-stretch pt-32 mq700:pt-20 mq450:pt-14 ${className}`}
    >
      <div className="bg-[#282042] card-grain overflow-hidden rounded-[20px]">
        <div className={CONTACT_CARD_PADDING}>
          {/* grain */}
          {/* sizes="1200px" */}
          {/* contentClassName={CONTACT_CARD_PADDING} */}
          <div className="flex flex-col items-start gap-4 max-w-[429px] shrink-0 mq900:max-w-full mq900:items-center mq900:text-center">
            <h2 className="m-0 font-sora font-normal text-[42px] leading-[50px] text-white mq900:text-[32px] mq900:leading-[40px] mq450:text-5xl mq450:leading-[32px]">
              {t("contact.title")}
            </h2>
            <p className="m-0 font-reg font-normal text-base leading-[24px] tracking-[0.02em] text-white/70">
              {t("contact.subtitle")}
            </p>
            <div
              className="flex items-center gap-3 cursor-pointer mt-2"
              onClick={() =>
                window.open(
                  "https://t.me/+4rZ4ipEl2yk2ODlk",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              <TelegramIcon className="w-8 h-8" />
              <span className="font-reg font-medium text-sm leading-[22px] tracking-[0.02em] text-white">
                {t("contact.telegram")}
              </span>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
