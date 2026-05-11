import Image from "next/image";
import { useEffect } from "react";
import { GradientGlow } from "./gradient-glow";
import StrapiBlocks from "./strapi-blocks";
import type { TeamMemberDisplay } from "../lib/strapi/team-members";
import CloseIcon from "../public/close-icon.svg";

type MemberProfileModalProps = {
  member: TeamMemberDisplay | null;
  onClose: () => void;
};

export default function MemberProfileModal({ member, onClose }: MemberProfileModalProps) {

  useEffect(() => {
    if (!member) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-5 top-5 inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
          onClick={onClose}
          aria-label="Close member profile"
        >
          <Image src={CloseIcon} alt="" width={24} height={24} aria-hidden />
        </button>

        {/* ── Header: avatar + name / role / chips ── */}
        <div className="flex gap-8 mq900:flex-col">
          <div className="relative h-[280px] w-[280px] shrink-0 overflow-hidden rounded-3xl bg-purple/20 mq900:h-[180px] mq900:w-[180px]">
            {member.imageUrl ? (
              <Image
                src={member.imageUrl}
                alt={member.imageAlt || member.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-sora text-4xl font-semibold text-white/30">
                {member.name.slice(0, 1)}
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 pt-1">
            <div>
              <h3 className="m-0 font-sora text-5xl font-semibold leading-tight text-white mq700:text-3xl">
                {member.name}
              </h3>
              {member.role ? (
                <p className="m-0 py-2 font-reg text-[16px] text-white-60">{member.role}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-4">
              {member.frameworks.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="m-0 font-reg text-xs uppercase tracking-[0.2em] text-white-60">
                    Frameworks
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.frameworks.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-white/10 px-3 py-1 font-reg text-sm text-white-60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.skills.length > 0 && (
                <div className="mt-2 flex flex-col gap-2">
                  <p className="m-0 font-reg text-xs uppercase tracking-[0.2em] text-white-60">
                    Skills
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.skills.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-white/10 px-3 py-1 font-reg text-sm text-white-60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Get To Know ── */}
        {member.getToKnow ? (
          <section className="mt-10 rounded-3xl bg-white/5 px-10 py-10 text-center tracking-[0.02em] mq700:px-4">
            <h4 className="m-0 font-sora text-3xl font-semibold text-white mq700:text-2xl">
              Get To Know
            </h4>
            <p className="mx-auto m-0 max-w-[90%] pt-4 font-reg text-[14px] font-light leading-8 text-white-60 mq700:text-base mq700:leading-6">
              {member.getToKnow}
            </p>
          </section>
        ) : null}

        {member.whyWorkWithThem ? (
          <section className="mt-10 rounded-3xl bg-white/5 px-10 py-10 text-center tracking-[0.02em] mq700:px-4">
            <h4 className="m-0 font-sora text-3xl font-semibold text-white mq700:text-2xl">
              Why work with them
            </h4>
            <p className="mx-auto m-0 max-w-[90%] pt-4 font-reg text-[14px] font-light leading-8 text-white-60 mq700:text-base mq700:leading-6">
              {member.whyWorkWithThem}
            </p>
          </section>
        ) : null}

        {/* ── Experience ── */}
        {member.experience.length > 0 && (
          <section className="mb-16 mt-20 flex flex-col gap-8">
            {member.experience.map((item, index) => (
              <article key={`${item.title}-${index}`} className="flex flex-col gap-3">
                <h5 className="m-0 font-sora text-[20px] font-semibold text-white mq700:text-2xl">
                  {item.title}
                </h5>
                {item.time ? (
                  <p className="m-0 font-reg text-[12px] font-normal leading-[18px] tracking-[0.02em] text-white-60">
                    {item.time}
                  </p>
                ) : null}
                <StrapiBlocks
                  blocks={item.descriptionBlocks}
                  className="font-reg text-[14px] font-medium leading-[22px] tracking-[0.02em] text-white-60 [&_p]:m-0 [&_a]:underline"
                />
              </article>
            ))}
          </section>
        )}

        {/* ── Contact links ── */}
        {member.contactLinks.length > 0 && (
          <div className="mb-10 flex w-full justify-center gap-2">
            {member.contactLinks.map((link, index) => (
              <a
                key={`${link.platform}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 cursor-pointer items-center justify-center"
                aria-label={link.platform}
              >
                {link.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS logos may use any CDN host.
                  <img
                    src={link.logoUrl}
                    alt={link.logoAlt || link.platform}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EDFF] font-reg text-xs font-semibold uppercase text-purple">
                    {link.platform.slice(0, 2)}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}

        <GradientGlow className="absolute -bottom-1/3 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}
