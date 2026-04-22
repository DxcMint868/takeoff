import Image from "next/image";
import { useEffect } from "react";
import type { Member } from "../lib/members";
import { GradientGlow } from "./gradient-glow";
import LinkedInIcon from "../public/linkedin-icon.png";
import CloseIcon from "../public/close-icon.svg";

type MemberProfileModalProps = {
  member: Member | null;
  onClose: () => void;
};

export default function MemberProfileModal({ member, onClose }: MemberProfileModalProps) {
  useEffect(() => {
    if (!member) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-dark/80 px-8 py-8 backdrop-blur-sm mq900:px-3"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} profile`}
    >
      <div
        className="relative w-full max-w-[70%] overflow-hidden rounded-3xl bg-surface-card p-8 text-white mq1100:max-w-[70%] mq700:max-w-[90%] mq700:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-5 top-5 inline-flex items-center justify-center border-0 bg-transparent p-0 cursor-pointer"
          onClick={onClose}
          aria-label="Close member profile"
        >
          <Image src={CloseIcon} alt="" width={24} height={24} aria-hidden />
        </button>

        <div className="flex gap-8 mq900:flex-col">
          <div className="relative h-[280px] w-[280px] shrink-0 overflow-hidden rounded-3xl bg-purple/20 mq900:h-[180px] mq900:w-[180px]">
            <Image src={member.image} alt={member.name} fill className="object-cover" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4 pt-1">
            <div>
              <h3 className="m-0 font-sora text-5xl font-semibold leading-tight text-white mq700:text-3xl">
                {member.name}
              </h3>
              <p className="m-0 py-2 font-reg text-[16px] text-white-60">{member.role}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="m-0 font-reg text-xs uppercase tracking-[0.2em] text-white-60">
                  Frameworks
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {member.frameworks.map((item) => (
                    <span key={item} className="rounded-lg bg-white/10  px-3 py-1 font-reg text-sm text-white-60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <p className="m-0 font-reg text-xs uppercase tracking-[0.2em] text-white-60">
                  Skill
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {member.skill.map((item) => (
                    <span key={item} className="rounded-lg bg-white/10 px-3 py-1 font-reg text-sm text-white-60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-3xl bg-white/5 px-10 py-10 text-center mq700:px-4 tracking-[0.02em]">
          <h4 className="m-0 font-sora text-3xl font-semibold text-white mq700:text-2xl">Get To Know</h4>
          <p className="max-w-[90%] mx-auto m-0 pt-4 font-reg text-[14px] font-light leading-8 text-white-60 mq700:text-base mq700:leading-6">
            {member.getToKnow}
          </p>
        </section>

        <section className="mt-20 flex flex-col gap-8 mb-16">
          {member.experience.map((item, index) => (
            <article key={`${item.company}-${item.time}-${index}`} className="flex flex-col gap-3">
              <h5 className="m-0 font-sora text-[20px] font-semibold text-white mq700:text-2xl">
                {item.company}
              </h5>
              <p className="m-0 font-reg text-xs text-white-60">{item.time}</p>
              <p className="m-0 font-reg text-sm font-medium leading-8 text-white-60 mq700:text-base mq700:leading-6">
                {item.description}
              </p>
            </article>
          ))}
        </section>
        <div className="flex gap-2 mb-10 w-full justify-center">
          {member.links.map((item) => (
            <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="text-white cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-[#F1EDFF]">
              <Image src={LinkedInIcon} alt={item.label} width={20} height={20} />
            </a>
          ))}
        </div>
        <GradientGlow className="absolute -bottom-1/3 left-1/2 -translate-x-1/2" />
      </div>

    </div>
  );
}
