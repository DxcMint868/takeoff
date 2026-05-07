import type { Member } from "./members";
import type { CaseStudyTeamMember } from "./strapi/case-studies";

/** Normalized row for [`TeamMemberGrid`](../components/team-member-grid.tsx). */
export type TeamGridMember = {
  slug: string;
  name: string;
  role: string;
  imageUrl: string;
  imageAlt: string;
};

/** Same rule as `mapFeaturedTeamMembers` in `lib/strapi/case-studies.ts` for name-based slugs. */
export function slugifyTeamMemberName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function memberToTeamGridMember(m: Member): TeamGridMember {
  return {
    slug: slugifyTeamMemberName(m.name),
    name: m.name,
    role: m.role,
    imageUrl: m.image,
    imageAlt: m.name,
  };
}

export function membersToTeamGridMembers(members: Member[]): TeamGridMember[] {
  return members.map(memberToTeamGridMember);
}

export function caseStudyTeamMemberToTeamGridMember(
  m: CaseStudyTeamMember,
): TeamGridMember {
  return {
    slug: m.slug,
    name: m.name,
    role: m.role,
    imageUrl: m.avatar?.url ?? "",
    imageAlt: m.avatar?.alt || `${m.name} portrait`,
  };
}

export function caseStudyTeamMembersToTeamGridMembers(
  members: CaseStudyTeamMember[],
): TeamGridMember[] {
  return members.map(caseStudyTeamMemberToTeamGridMember);
}
