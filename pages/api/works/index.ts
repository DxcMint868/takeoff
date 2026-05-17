import type { NextApiRequest, NextApiResponse } from "next";
import { fetchWorksData } from "../../../lib/strapi/case-studies";
import { fetchDesignProjectCards } from "../../../lib/strapi/design-projects";
import { isAppLocale } from "../../../lib/strapi/language";

export type WorksApiResponse = {
  featuredProject: Awaited<ReturnType<typeof fetchWorksData>>["featuredProject"];
  projectCards: Awaited<ReturnType<typeof fetchWorksData>>["projectCards"];
  filterChips: Awaited<ReturnType<typeof fetchWorksData>>["filterChips"];
  designProjectCards: Awaited<ReturnType<typeof fetchDesignProjectCards>>;
  source: "cms" | "none";
};

function uiLocaleFromQuery(raw: unknown): string {
  const locale =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "en";
  return locale && isAppLocale(locale.toLowerCase())
    ? locale.toLowerCase()
    : "en";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WorksApiResponse | { error: string }>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uiLocale = uiLocaleFromQuery(req.query.locale);

  try {
    const [cmsWorks, designProjectCards] = await Promise.all([
      fetchWorksData(uiLocale),
      fetchDesignProjectCards(uiLocale),
    ]);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120",
    );

    return res.status(200).json({
      featuredProject: cmsWorks.featuredProject,
      projectCards: cmsWorks.projectCards,
      filterChips: cmsWorks.filterChips,
      designProjectCards,
      source: cmsWorks.source,
    });
  } catch (e) {
    console.error("[api/works]", e);
    return res.status(500).json({ error: "Failed to load works" });
  }
}
