import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBlogsFromStrapi } from "../../../lib/strapi/blogs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  const locale =
    typeof req.query.locale === "string" && req.query.locale.trim()
      ? req.query.locale.trim()
      : "en";

  try {
    const data = await fetchBlogsFromStrapi(locale);
    if (!data) {
      return res.status(200).json({
        source: "none" as const,
        featuredPosts: [],
        listPosts: [],
      });
    }
    return res.status(200).json({
      source: "cms" as const,
      featuredPosts: data.featuredPosts,
      listPosts: data.listPosts,
    });
  } catch (e) {
    console.error("[api/blogs]", e);
    return res.status(500).json({ error: "Failed to load blogs" });
  }
}
