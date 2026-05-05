"use client";

import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { MEMBERS } from "../lib/members";
import { membersToTeamGridMembers } from "../lib/team-grid-member";
import type { TeamMemberDisplay } from "../lib/strapi/team-members";
import MemberProfileModal from "./member-profile-modal";
import { TeamMemberGrid } from "./team-member-grid";

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

      {/* Loading overlay — shown while fetching member data after a card click */}
      {loading && (
        <div className="fixed inset-0 z-[119] flex items-center justify-center bg-dark/60 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      )}

      <MemberProfileModal member={selectedMember} onClose={handleClose} />
    </>
  );
}
