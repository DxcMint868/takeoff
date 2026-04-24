import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCaseStudyBySlug } from "../../../lib/strapi/case-studies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const slug = String(req.query.slug ?? "").trim();

  if (!slug) {
    res.status(400).setHeader("Content-Type", "text/plain; charset=utf-8").end("Bad request");
    return;
  }

  const result = await fetchCaseStudyBySlug(slug);

  if (!result.caseStudy?.llmTxt) {
    res.status(404).setHeader("Content-Type", "text/plain; charset=utf-8").end("Not found");
    return;
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.end(result.caseStudy.llmTxt);
}
