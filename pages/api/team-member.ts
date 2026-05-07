import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTeamMemberBySlug, localMemberToDisplay } from "../../lib/strapi/team-members";
import { MEMBERS } from "../../lib/members";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = req.query.slug;
  const slug = Array.isArray(raw) ? raw[0] : raw;
  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "slug query param is required" });
  }

  // Try Strapi first
  const strapiMember = await fetchTeamMemberBySlug(slug);
  if (strapiMember) {
    return res.json(strapiMember);
  }

  // Fall back to local MEMBERS data
  const local = MEMBERS.find(
    (m) => m.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug,
  );
  if (local) {
    return res.json(localMemberToDisplay(local));
  }

  return res.status(404).json({ error: "Member not found" });
}
