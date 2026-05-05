"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { MEMBERS } from "../lib/members";
import type { TeamGridMember } from "../lib/team-grid-member";
import { membersToTeamGridMembers } from "../lib/team-grid-member";
import type { TeamMemberDisplay } from "../lib/strapi/team-members";
import MemberProfileModal from "./member-profile-modal";

// ---------------------------------------------------------------------------
// Shared arrow icon
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Presentational grid
// ---------------------------------------------------------------------------

export type TeamMemberGridProps = {
  members: TeamGridMember[];
  className?: string;
};

export function TeamMemberGrid({ members, className }: TeamMemberGridProps) {
  if (!members.length) return null;

  return (
    <div className={`mx-auto w-full max-w-[1132px] ${className ?? ""}`.trim()}>
      <ul className="box-border m-0 grid w-full grid-cols-2 gap-0.5 px-4 py-0 ms1024:flex ms1024:flex-wrap ms1024:justify-center ms1024:gap-4 ms1024:px-0">
        {members.map((member) => (
          <li
            key={member.slug}
            className="aspect-square list-none ms1024:w-[200px] ms1024:max-w-[200px] ms1024:shrink-0"
          >
            <Link
              href={`/about-us?member=${encodeURIComponent(member.slug)}#our-team`}
              scroll={false}
              className="group relative block h-full w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-purple"
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
                  <p className="m-0 max-w-full break-words font-reg text-base font-semibold leading-snug text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]">
                    {member.name}
                  </p>
                  {member.role ? (
                    <p className="m-0 max-w-full break-words font-reg text-xs font-normal leading-snug text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]">
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

// ---------------------------------------------------------------------------
// Smart wrapper (About Us page — handles routing + modal)
// ---------------------------------------------------------------------------

export default function MemberGrid() {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<TeamMemberDisplay | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMember = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/team-member?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) {
        setSelectedMember(null);
        return;
      }
      const data: TeamMemberDisplay = await res.json();
      setSelectedMember(data);
    } catch {
      setSelectedMember(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const raw = router.query.member;
    const slug = Array.isArray(raw) ? raw[0] : raw;
    if (!slug || typeof slug !== "string") {
      setSelectedMember(null);
      return;
    }
    void fetchMember(slug);
  }, [router.isReady, router.query.member, fetchMember]);

  const handleClose = () => {
    setSelectedMember(null);
    if (router.query.member) {
      void router.replace(
        { pathname: "/about-us", query: {} },
        "/about-us#our-team",
        { shallow: true },
      );
    }
  };

  return (
    <>
      <TeamMemberGrid members={membersToTeamGridMembers(MEMBERS)} />

      {loading && (
        <div className="fixed inset-0 z-[119] flex items-center justify-center bg-dark/60 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      )}

      <MemberProfileModal member={selectedMember} onClose={handleClose} />
    </>
  );
}
