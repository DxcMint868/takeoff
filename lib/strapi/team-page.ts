import {
  applyDraftStatus,
  fetchStrapiJson,
  hasCmsConfig,
  toArray,
  toMedia,
  unwrapStrapiData,
} from "./case-studies";
import { mapStrapiRowToGridMember } from "./team-members";
import type { TeamGridMember } from "../team-grid-member";
import { toStrapiLocale } from "./language";

function str(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

export type TeamPageQuote = {
  title: string;
  body: string;
  iconUrl: string;
  iconAlt: string;
  /** True when Strapi media mime suggests video. */
  iconIsVideo: boolean;
};

export type TeamPageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
};

export type TeamPageViewModel = {
  gallery: Array<{ url: string; alt: string }>;
  culture: TeamPageQuote | null;
  values: TeamPageQuote[];
  featuredMembers: TeamGridMember[];
  seo: TeamPageSeo | null;
};

const FALLBACK_GALLERY: Array<{ url: string; alt: string }> = [
  { url: "/team-pic-1.png", alt: "Team photo" },
  { url: "/team-pic-3.png", alt: "Hoasen team outdoors" },
  { url: "/team-pic-2.png", alt: "Hoasen team by the sea" },
  { url: "/team-pic-4.png", alt: "Hoasen logo in the sand" },
];

function isProbablyVideoMedia(mediaLike: unknown, url: string): boolean {
  const m = unwrapStrapiData<any>(mediaLike);
  const mime = str(m?.mime).toLowerCase();
  if (mime.startsWith("video/")) return true;
  return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url);
}

function mapQuoteComponent(raw: unknown): TeamPageQuote | null {
  const q = unwrapStrapiData<any>(raw);
  if (!q || typeof q !== "object") return null;

  const title = str(q.title).trim();
  const body = str(q.body).trim();
  if (!title && !body) return null;

  const iconMedia = q.icon;
  const iconResolved = toMedia(iconMedia);
  const iconUrl = iconResolved?.url ?? "";
  const iconAlt = iconResolved?.alt ?? (title || "Icon");
  const iconIsVideo = iconUrl
    ? isProbablyVideoMedia(unwrapStrapiData(iconMedia), iconUrl)
    : false;

  return {
    title: title || "",
    body,
    iconUrl,
    iconAlt,
    iconIsVideo,
  };
}

/**
 * Maps `shared.gallery-images` and similar shapes: repeatable media rows, or media-shaped keys.
 */
function mapGalleryImages(galleryLike: unknown): Array<{ url: string; alt: string }> {
  const g = unwrapStrapiData<any>(galleryLike);
  if (!g || typeof g !== "object") return [];

  const out: Array<{ url: string; alt: string }> = [];

  const pushMedia = (mediaLike: unknown, altHint: string) => {
    const m = toMedia(mediaLike);
    if (m?.url) {
      out.push({ url: m.url, alt: m.alt || altHint });
    }
  };

  for (const key of Object.keys(g)) {
    if (!/image|photo|pic|slot|media/i.test(key)) continue;
    const v = g[key];
    if (!v) continue;
    pushMedia(v, "");
  }

  for (const arrKey of ["images", "items", "gallery", "photos", "rows", "slots"]) {
    const arr = toArray<any>(unwrapStrapiData(g[arrKey]));
    for (const raw of arr) {
      const item = unwrapStrapiData<any>(raw);
      if (!item) continue;
      const nested =
        item.file ??
        item.image ??
        item.media ??
        item.photo ??
        item;
      const alt =
        str(item.alt_text) ||
        str(item.alt) ||
        str(item.caption) ||
        "";
      pushMedia(nested, alt);
    }
  }

  return out;
}

function mapTeamPageSeo(seoLike: unknown): TeamPageSeo | null {
  const s = unwrapStrapiData<any>(seoLike);
  if (!s || typeof s !== "object") return null;

  const metaTitle = str(s.meta_title ?? s.metaTitle).trim();
  const metaDescription = str(
    s.meta_description ?? s.metaDescription,
  ).trim();

  const img =
    toMedia(s.meta_image) ??
    toMedia(s.share_image) ??
    toMedia(s.open_graph ?? s.openGraph) ??
    toMedia(s.og_image);

  if (!metaTitle && !metaDescription && !img?.url) return null;

  return {
    ...(metaTitle ? { metaTitle } : {}),
    ...(metaDescription ? { metaDescription } : {}),
    ...(img?.url ? { ogImageUrl: img.url, ogImageAlt: img.alt || metaTitle } : {}),
  };
}

function buildTeamPagePopulateQuery(uiLocale: string): URLSearchParams {
  const params = new URLSearchParams();
  params.set("locale", toStrapiLocale(uiLocale));
  applyDraftStatus(params);

  /** Omit deep `populate[gallery_images]` — Strapi rejects wildcard populate when `shared.gallery-images` has no `images` field (invalid key). First-level data may still include media IDs; URLs require matching {@link mapGalleryImages} to your component attribute names. */
  /** Avoid `populate[…]=*` on `shared.quote` — Strapi 5 may reject nested media (`icon`) depending on plugin/schema version. */
  params.set("populate[our_culture_section]", "true");
  params.set("populate[our_values_section]", "true");
  params.set("populate[featured_members][populate][avatar]", "true");
  params.set("populate[featured_members][populate][member_role]", "*");
  params.set("populate[seo]", "true");

  return params;
}

function normalizeGallery(slots: Array<{ url: string; alt: string }>) {
  if (slots.length >= 4) return slots.slice(0, 4);
  const merged = [...slots];
  for (let i = merged.length; i < 4; i++) {
    merged.push(FALLBACK_GALLERY[i]!);
  }
  return merged;
}

export async function fetchTeamPageData(
  uiLocale: string,
): Promise<TeamPageViewModel | null> {
  if (!hasCmsConfig()) return null;

  try {
    const params = buildTeamPagePopulateQuery(uiLocale);
    const payload = await fetchStrapiJson(`/api/team-page?${params.toString()}`);
    const record = unwrapStrapiData<any>(payload?.data);
    if (!record) return null;

    const rawGallery = mapGalleryImages(record.gallery_images);
    const gallery = normalizeGallery(rawGallery);

    const culture = mapQuoteComponent(record.our_culture_section);

    const values = toArray<any>(unwrapStrapiData(record.our_values_section))
      .map((raw) => mapQuoteComponent(raw))
      .filter(Boolean) as TeamPageQuote[];

    const featuredRows = toArray<any>(unwrapStrapiData(record.featured_members));
    const featuredMembers = featuredRows
      .map((raw) => mapStrapiRowToGridMember(raw))
      .filter(Boolean) as TeamGridMember[];

    const seo = mapTeamPageSeo(record.seo);

    return {
      gallery,
      culture,
      values,
      featuredMembers,
      seo,
    };
  } catch (err) {
    console.error("[fetchTeamPageData]", err);
    return null;
  }
}
