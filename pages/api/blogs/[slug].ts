import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBlogPostFromStrapi } from "../../../lib/strapi/blogs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  const slug =
    typeof req.query.slug === "string" ? req.query.slug.trim() : "";
  if (!slug) {
    return res.status(400).json({ error: "Missing slug" });
  }

  const locale =
    typeof req.query.locale === "string" && req.query.locale.trim()
      ? req.query.locale.trim()
      : "en";

  try {
    const post = await fetchBlogPostFromStrapi(slug, locale);
    if (!post) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.status(200).json({ source: "cms" as const, post });
  } catch (e) {
    console.error("[api/blogs/[slug]]", e);
    return res.status(500).json({ error: "Failed to load blog post" });
  }
}
