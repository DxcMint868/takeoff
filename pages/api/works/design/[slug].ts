import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchDesignProjectBySlug,
  type DesignProjectViewModel,
} from "../../../../lib/strapi/design-projects";
import { isAppLocale } from "../../../../lib/strapi/language";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { designProject: DesignProjectViewModel } | { error: string }
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
    typeof rawLocale === "string" && rawLocale.trim()
      ? rawLocale.trim()
      : "en";
  const uiLocale = isAppLocale(locale.toLowerCase())
    ? locale.toLowerCase()
    : "en";

  const documentId =
    typeof req.query.documentId === "string" && req.query.documentId.trim()
      ? req.query.documentId.trim()
      : undefined;

  try {
    const result = await fetchDesignProjectBySlug(slug, uiLocale, {
      documentId,
    });
    if (!result.designProject) {
      return res.status(404).json({ error: "Not found" });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120",
    );

    return res.status(200).json({ designProject: result.designProject });
  } catch (e) {
    console.error("[api/works/design/[slug]]", e);
    return res.status(500).json({ error: "Failed to load design project" });
  }
}
