import Image from "next/image";
import Link from "next/link";
import type { TeamGridMember } from "../lib/team-grid-member";

export type TeamMemberGridProps = {
  members: TeamGridMember[];
  className?: string;
};

function ExternalArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TeamMemberGrid({ members, className }: TeamMemberGridProps) {
  if (!members.length) return null;

  return (
    <div
      className={`mx-auto w-full max-w-[1132px] ${className ?? ""}`.trim()}
    >
      <ul className="m-0 flex w-full flex-wrap justify-center gap-2 p-0 mq900:gap-3 ms1024:gap-4">
        {members.map((member) => (
          <li
            key={member.slug}
            className="aspect-square w-[calc((100%-0.75rem)/2)] max-w-[200px] shrink-0 list-none mq450:w-full mq450:max-w-none ms1024:w-[200px] ms1024:max-w-[200px]"
          >
            <Link
              href={`/about-us?member=${encodeURIComponent(member.slug)}#our-team`}
              scroll={false}
              className="group relative block h-full w-full overflow-hidden rounded-lg outline-none ring-offset-2 ring-offset-dark transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-purple"
              aria-label={`${member.name}${member.role ? `, ${member.role}` : ""}`}
            >
              <div className="relative h-full w-full overflow-hidden bg-purple/90">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 450px) 100vw, (max-width: 700px) 50vw, (max-width: 900px) 33vw, 20vw"
                    className="object-cover object-bottom drop-shadow-[0_0_1px_rgba(255,255,255,0.85)] drop-shadow-[0_0_2px_rgba(255,255,255,0.45)]"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-end justify-center bg-purple pb-3 font-reg text-xs font-medium text-white/50"
                    aria-hidden
                  >
                    {member.name.slice(0, 1)}
                  </div>
                )}

                <div
                  className="pointer-events-none absolute inset-0 z-[1] bg-[#33277C]/[0] transition-colors duration-300 group-hover:bg-[#33277C]/[0.94]"
                  aria-hidden
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-0.5 p-4 pb-3 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="m-0 max-w-full break-words [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] font-reg text-base font-semibold leading-snug text-white">
                    {member.name}
                  </p>
                  {member.role ? (
                    <p className="m-0 max-w-full break-words [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] font-reg text-xs font-normal leading-snug text-white">
                      {member.role}
                    </p>
                  ) : null}
                </div>

                <span
                  className="absolute right-2 top-2 z-[3] flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 shadow-sm ring-1 ring-white/25 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  <ExternalArrowIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
