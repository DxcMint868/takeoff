import type { NextApiRequest, NextApiResponse } from "next";
import { fetchHomePageData } from "../../lib/strapi/home-page";
import { isAppLocale } from "../../lib/strapi/language";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = req.query.locale;
  const locale =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "en";
  const uiLocale =
    locale && isAppLocale(locale.toLowerCase()) ? locale.toLowerCase() : "en";

  try {
    const data = await fetchHomePageData(uiLocale);
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120",
    );
    return res.status(200).json(data);
  } catch (e) {
    console.error("[api/home-page]", e);
    return res.status(500).json(null);
  }
}
