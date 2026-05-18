/**
 * Strapi collection `blogs` (see Content-Type Builder).
 * If the schema has no `slug` field, URLs use a slug derived from `title`
 * (same rules as below). Prefer adding a UID `slug` in Strapi for full control.
 */
import type { BlogPostPreview } from "../blog-posts";
import { LEGACY_BLOG_COVER_IMAGE } from "../blog-posts";
import type { StrapiBlocksNode } from "./case-studies";
import {
  fetchStrapiJson,
  hasCmsConfig,
  populateMediaFields,
  toArray,
  toBlocks,
  toMedia,
  unwrapStrapiData,
} from "./case-studies";
import {
  buildHreflangAlternates,
  buildHreflangFromLocalePaths,
  type HreflangAlternate,
} from "../i18n/hreflang";
import type { AppLocaleCode } from "./language";
import { APP_LOCALE_CODES, toStrapiLocale } from "./language";

/**
 * When a locale has no entries in Strapi (no translations yet), fall back to this
 * UI locale for listing + detail so URLs still resolve.
 * Override with `BLOG_FALLBACK_LOCALE` or `NEXT_PUBLIC_BLOG_FALLBACK_LOCALE` (e.g. `en`).
 */
function fallbackUiLocale(): string {
  const raw =
    process.env.BLOG_FALLBACK_LOCALE ||
    process.env.NEXT_PUBLIC_BLOG_FALLBACK_LOCALE ||
    "en";
  return raw.trim().toLowerCase();
}

/** Locales to query, in order — primary first, then fallback if different. */
function uiLocalesToTry(uiLocale: string): string[] {
  const primary = uiLocale.trim().toLowerCase();
  const fb = fallbackUiLocale();
  if (primary === fb) return [primary];
  return [primary, fb];
}

function str(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

const FEATURED_SLOT_COUNT = 3;

function applyDraftStatus(params: URLSearchParams): void {
  if (process.env.STRAPI_DRAFT_MODE === "true") {
    params.set("status", "draft");
  }
}

/** Stable URL segment when Strapi has no `slug` attribute yet. */
function slugifyTitle(raw: string): string {
  const s = raw
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.slice(0, 96);
}

function resolveEntrySlug(u: Record<string, unknown>, title: string): string {
  const explicit = str(u.slug).trim();
  if (explicit) return explicit;
  const fromTitle = slugifyTitle(title);
  if (fromTitle) return fromTitle;
  const did = str(u.documentId).trim();
  if (did) return did;
  return str(u.id).trim() || "post";
}

/** Rough word count from Strapi blocks JSON for reading-time estimate. */
function collectText(nodes: unknown[]): string {
  let out = "";
  for (const n of nodes) {
    const node = n as Record<string, unknown>;
    if (!node || typeof node !== "object") continue;
    if (node.type === "text" && typeof node.text === "string") {
      out += `${node.text} `;
    }
    if (Array.isArray(node.children)) {
      out += collectText(node.children as unknown[]);
    }
  }
  return out;
}

function estimateSecondsFromBlocks(blocks: StrapiBlocksNode[]): number {
  const text = collectText(blocks as unknown[]);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes * 60;
}

function publishedIso(entry: Record<string, unknown>): string {
  const v =
    str(entry.publishedAt) ||
    str(entry.createdAt) ||
    "";
  return v || new Date().toISOString();
}

function mapStrapiBlog(entry: unknown): BlogPostPreview | null {
  const u = unwrapStrapiData(entry) as Record<string, unknown>;
  const title = str(u.title).trim();
  if (!title) return null;

  const slug = resolveEntrySlug(u, title);
  const excerpt = str(u.excerpt).trim();
  const blocks = toBlocks(u.content);
  const cover = toMedia(u.cover_image);
  const authorRel = unwrapStrapiData(u.author) as Record<string, unknown>;
  const author =
    str(authorRel?.name).trim() ||
    str(authorRel?.full_name).trim() ||
    "Hoasen";

  const publishedAt = publishedIso(u);
  const image = cover?.url || LEGACY_BLOG_COVER_IMAGE;
  const timeToRead =
    blocks.length > 0 ? estimateSecondsFromBlocks(blocks) : 180;

  const isFeatured = Boolean(u.is_featured ?? (u as { isFeatured?: boolean }).isFeatured);

  const documentId = str(u.documentId).trim();

  return {
    slug,
    title,
    excerpt:
      excerpt ||
      (blocks.length > 0
        ? collectText(blocks as unknown[]).trim().slice(0, 220) + "…"
        : ""),
    publishedAt,
    author,
    timeToRead,
    image,
    content: "",
    contentBlocks: blocks.length > 0 ? blocks : undefined,
    isFeatured,
    ...(documentId ? { documentId } : {}),
  };
}

function buildBlogListParams(uiLocale: string): string {
  const params = new URLSearchParams();
  applyDraftStatus(params);
  params.set("locale", toStrapiLocale(uiLocale));
  params.set("sort[0]", "publishedAt:desc");
  params.set("pagination[pageSize]", "100");
  populateMediaFields(params, "populate[cover_image]");
  params.set("populate[author][fields][0]", "name");
  params.set("populate[categories][fields][0]", "name");
  params.set("populate[categories][fields][1]", "slug");
  return params.toString();
}

async function fetchAllBlogPostsMapped(
  uiLocale: string,
): Promise<BlogPostPreview[]> {
  const qs = buildBlogListParams(uiLocale);
  const json = await fetchStrapiJson(`/api/blogs?${qs}`);
  const rows = toArray<unknown>(unwrapStrapiData(json));
  return rows
    .map((row) => mapStrapiBlog(row))
    .filter((p): p is BlogPostPreview => p !== null);
}

async function fetchBlogPostByDocumentId(
  documentId: string,
  uiLocale: string,
): Promise<BlogPostPreview | null> {
  const mapped = await fetchAllBlogPostsMapped(uiLocale);
  return mapped.find((p) => p.documentId === documentId) ?? null;
}

/** Same Strapi entry in another locale — tries requested locale then fallback. */
async function resolveBlogPostByDocumentId(
  documentId: string,
  uiLocale: string,
): Promise<BlogPostPreview | null> {
  let post = await fetchBlogPostByDocumentId(documentId, uiLocale);
  if (post) return post;
  const fb = fallbackUiLocale();
  if (uiLocale.trim().toLowerCase() !== fb) {
    post = await fetchBlogPostByDocumentId(documentId, fb);
  }
  return post ?? null;
}

export type BlogsListResult = {
  featuredPosts: BlogPostPreview[];
  listPosts: BlogPostPreview[];
};

/** Partition full list into featured carousel + remainder (featured slots capped). */
export function partitionFeaturedBlogPosts(
  posts: BlogPostPreview[],
): BlogsListResult {
  const featuredMarked = posts.filter((p) => p.isFeatured);
  const featuredPosts =
    featuredMarked.length > 0
      ? featuredMarked.slice(0, FEATURED_SLOT_COUNT)
      : posts.slice(0, FEATURED_SLOT_COUNT);
  const featuredSlugs = new Set(featuredPosts.map((p) => p.slug));
  const listPosts = posts.filter((p) => !featuredSlugs.has(p.slug));
  return { featuredPosts, listPosts };
}

export async function fetchBlogsFromStrapi(
  uiLocale: string,
): Promise<BlogsListResult | null> {
  if (!hasCmsConfig()) return null;

  try {
    let mapped = await fetchAllBlogPostsMapped(uiLocale);
    const fb = fallbackUiLocale();
    if (
      mapped.length === 0 &&
      uiLocale.trim().toLowerCase() !== fb
    ) {
      mapped = await fetchAllBlogPostsMapped(fb);
    }
    return partitionFeaturedBlogPosts(mapped);
  } catch (e) {
    console.error("[Strapi blogs] list fetch failed:", e);
    return null;
  }
}

export async function fetchBlogPostFromStrapi(
  slug: string,
  uiLocale: string,
  opts?: { documentId?: string },
): Promise<BlogPostPreview | null> {
  if (!hasCmsConfig()) return null;

  try {
    for (const loc of uiLocalesToTry(uiLocale)) {
      const mapped = await fetchAllBlogPostsMapped(loc);
      const hit = mapped.find((p) => p.slug === slug);
      if (hit) return hit;
    }
    const docId = opts?.documentId?.trim();
    if (docId) {
      return await resolveBlogPostByDocumentId(docId, uiLocale);
    }
    return null;
  } catch (e) {
    console.error("[Strapi blogs] detail fetch failed:", e);
    return null;
  }
}

/**
 * Find a post by URL slug when slugs differ per locale (title-based slug).
 * Used by SSG so `/blog/vi-sao-...` resolves even though `en` uses another slug.
 */
export async function fetchBlogPostBySlugAcrossLocales(
  slug: string,
): Promise<BlogPostPreview | null> {
  if (!hasCmsConfig()) return null;

  try {
    for (const loc of APP_LOCALE_CODES) {
      const mapped = await fetchAllBlogPostsMapped(loc);
      const hit = mapped.find((p) => p.slug === slug);
      if (hit) return hit;
    }
    return null;
  } catch (e) {
    console.error("[Strapi blogs] resolve slug across locales failed:", e);
    return null;
  }
}

/** Slugs for SSG paths — union across locales so each localized slug gets a path. */
export async function fetchAllBlogSlugsDefaultLocale(): Promise<string[]> {
  if (!hasCmsConfig()) return [];

  try {
    const seen = new Set<string>();
    for (const loc of APP_LOCALE_CODES) {
      const params = new URLSearchParams();
      applyDraftStatus(params);
      params.set("locale", toStrapiLocale(loc));
      params.set("pagination[pageSize]", "200");
      params.set("fields[0]", "title");
      params.set("fields[1]", "documentId");
      const json = await fetchStrapiJson(`/api/blogs?${params.toString()}`);
      const rows = toArray<unknown>(unwrapStrapiData(json));
      for (const row of rows) {
        const u = unwrapStrapiData(row) as Record<string, unknown>;
        const title = str(u.title).trim();
        const s = resolveEntrySlug(u, title);
        if (s) seen.add(s);
      }
    }
    return Array.from(seen);
  } catch {
    return [];
  }
}

/** Hreflang URLs for a blog post — uses per-locale slugs when `documentId` is set. */
export async function resolveBlogHreflangAlternates(
  documentId: string | undefined,
  fallbackSlug: string,
): Promise<HreflangAlternate[]> {
  const slugPath = `/blog/${fallbackSlug.trim()}`;

  if (!hasCmsConfig() || !documentId?.trim()) {
    return buildHreflangAlternates(slugPath);
  }

  const pathsByLocale: Partial<Record<AppLocaleCode, string>> = {};

  for (const locale of APP_LOCALE_CODES) {
    const post = await fetchBlogPostByDocumentId(documentId.trim(), locale);
    if (post) pathsByLocale[locale] = `/blog/${post.slug}`;
  }

  const hasAny = APP_LOCALE_CODES.some((locale) => pathsByLocale[locale]);
  if (!hasAny) return buildHreflangAlternates(slugPath);

  return buildHreflangFromLocalePaths(pathsByLocale);
}
