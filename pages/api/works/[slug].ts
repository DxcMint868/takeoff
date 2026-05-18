import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchCaseStudyBySlug,
  type CaseStudyViewModel,
} from "../../../lib/strapi/case-studies";
import { isAppLocale } from "../../../lib/strapi/language";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { source: "cms"; caseStudy: CaseStudyViewModel } | { error: string }
  >,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const slug =
    typeof req.query.slug === "string" ? req.query.slug.trim() : "";
  if (!slug) {
    return res.status(400).json({ error: "Missing slug" });
  }

  const rawLocale = req.query.locale;
  const locale =
    typeof rawLocale === "string" && rawLocale.trim() ? rawLocale.trim() : "en";
  const uiLocale = isAppLocale(locale.toLowerCase()) ? locale.toLowerCase() : "en";

  const documentId =
    typeof req.query.documentId === "string" && req.query.documentId.trim()
      ? req.query.documentId.trim()
      : undefined;

  try {
    const result = await fetchCaseStudyBySlug(slug, uiLocale, { documentId });
    if (!result.caseStudy) {
      return res.status(404).json({ error: "Not found" });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120",
    );

    return res.status(200).json({
      source: result.source === "cms" ? "cms" : "cms",
      caseStudy: result.caseStudy,
    });
  } catch (e) {
    console.error("[api/works/[slug]]", e);
    return res.status(500).json({ error: "Failed to load case study" });
  }
}
