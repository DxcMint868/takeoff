import type { NextApiRequest, NextApiResponse } from "next";
import type { AppLocaleCode } from "../../lib/strapi/language";
import { isAppLocale } from "../../lib/strapi/language";
import { fetchTeamMembersForGrid } from "../../lib/strapi/team-members";

function uiLocaleFromQuery(q: string | string[] | undefined): AppLocaleCode {
  const raw = Array.isArray(q) ? q[0] : q;
  return typeof raw === "string" && isAppLocale(raw) ? raw : "en";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const locale = uiLocaleFromQuery(req.query.locale);
  const members = await fetchTeamMembersForGrid(locale);

  return res.status(200).json(members);
}
