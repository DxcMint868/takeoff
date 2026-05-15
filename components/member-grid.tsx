"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "../contexts/locale-context";
import type { TeamGridMember } from "../lib/team-grid-member";
import type { TeamMemberDisplay } from "../lib/strapi/team-members";
import { withLocale } from "../lib/i18n/routing";
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
  const { locale } = useLocale();
  if (!members.length) return null;

  return (
    <div className={`mx-auto w-full max-w-[1132px] ${className ?? ""}`.trim()}>
      <ul className="box-border m-0 grid w-full grid-cols-2 gap-3 px-4 py-0 ms1024:flex ms1024:flex-wrap ms1024:justify-center ms1024:gap-2 ms1024:px-0">
        {members.map((member) => (
          <li
            key={member.slug}
            className="aspect-square list-none ms1024:w-[200px] ms1024:max-w-[200px] ms1024:shrink-0"
          >
            <Link
              href={withLocale(
                locale,
                `/about-us?member=${encodeURIComponent(member.slug)}#our-team`,
              )}
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

export type MemberGridOuterProps = {
  /** When set (non-empty), skips loading the full team list — use Strapi Team Page `featured_members`. */
  featuredMembers?: TeamGridMember[];
};

export default function MemberGrid({ featuredMembers }: MemberGridOuterProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const [gridMembers, setGridMembers] = useState<TeamGridMember[]>(
    featuredMembers ?? [],
  );
  const [gridLoading, setGridLoading] = useState(!featuredMembers?.length);
  const [selectedMember, setSelectedMember] = useState<TeamMemberDisplay | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (featuredMembers && featuredMembers.length > 0) {
      setGridMembers(featuredMembers);
      setGridLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setGridLoading(true);
    void (async () => {
      try {
        const res = await fetch(`/api/team-members?locale=${encodeURIComponent(locale)}`);
        if (!res.ok) throw new Error("team list failed");
        const data: unknown = await res.json();
        const list = Array.isArray(data) ? data : [];
        if (!cancelled) setGridMembers(list as TeamGridMember[]);
      } catch {
        if (!cancelled) setGridMembers([]);
      } finally {
        if (!cancelled) setGridLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale, featuredMembers]);

  const fetchMember = useCallback(
    async (slug: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/team-member?slug=${encodeURIComponent(slug)}&locale=${encodeURIComponent(locale)}`,
        );
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
    },
    [locale],
  );

  useEffect(() => {
    if (!router.isReady) return;
    const raw = router.query.member;
    const slug = Array.isArray(raw) ? raw[0] : raw;
    if (!slug || typeof slug !== "string") {
      setSelectedMember(null);
      return;
    }
    void fetchMember(slug);
  }, [router.isReady, router.query.member, fetchMember, locale]);

  const handleClose = () => {
    setSelectedMember(null);
    if (router.query.member) {
      void router.replace(
        withLocale(locale, "/about-us#our-team"),
        undefined,
        { shallow: true },
      );
    }
  };

  return (
    <>
      {gridLoading ? (
        <div className="flex min-h-[200px] w-full items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      ) : gridMembers.length === 0 ? (
        <p className="py-8 text-center font-reg text-sm text-white/70">
          No team profiles are available in this language yet.
        </p>
      ) : (
        <TeamMemberGrid members={gridMembers} />
      )}

      {loading && (
        <div className="fixed inset-0 z-[119] flex items-center justify-center bg-dark/60 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      )}

      <MemberProfileModal member={selectedMember} onClose={handleClose} />
    </>
  );
}
