import type { TeamGridMember } from "../team-grid-member";
import type { StrapiBlocksNode } from "./case-studies";
import { applyDraftStatus } from "./case-studies";
import { toStrapiLocale } from "./language";

// ─── Unified display type (used by the modal) ────────────────────────────────

export type TeamMemberContactLink = {
  platform: string;
  logoUrl: string;
  logoAlt: string;
  url: string;
};

export type TeamMemberExperience = {
  title: string;
  time: string;
  descriptionBlocks: StrapiBlocksNode[];
};

export type TeamMemberDisplay = {
  slug: string;
  name: string;
  role: string;
  imageUrl: string;
  imageAlt: string;
  frameworks: string[];
  skills: string[];
  getToKnow: string;
  /** From Strapi `why_work_with_them` when present. */
  whyWorkWithThem: string;
  experience: TeamMemberExperience[];
  contactLinks: TeamMemberContactLink[];
};

// ─── Strapi helpers ───────────────────────────────────────────────────────────

const STRAPI_BASE_URL = (() => {
  const v = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";
  return v.endsWith("/") ? v.slice(0, -1) : v;
})();

function normalizeUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return STRAPI_BASE_URL ? `${STRAPI_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}` : url;
}

function str(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
}

function unwrap<T = any>(value: any): T {
  if (value === null || value === undefined) return value as T;
  if (Array.isArray(value)) return value.map((i) => unwrap(i)) as unknown as T;
  if (typeof value !== "object") return value as T;
  if ("data" in value && Object.keys(value).every((k) => k === "data" || k === "meta")) {
    return unwrap(value.data) as T;
  }
  if ("attributes" in value && typeof value.attributes === "object") {
    return unwrap({ id: value.id, documentId: value.documentId, ...value.attributes }) as T;
  }
  const out: Record<string, unknown> = {};
  for (const [k, v2] of Object.entries(value)) out[k] = unwrap(v2);
  return out as T;
}

function toArr<T>(v: unknown): T[] {
  if (!v) return [];
  if (Array.isArray(v)) return v as T[];
  return [v as T];
}

function toBlocks(v: unknown): StrapiBlocksNode[] {
  if (!v) return [];
  if (Array.isArray(v)) return v as StrapiBlocksNode[];
  const text = str(v).trim();
  if (!text) return [];
  return [{ type: "paragraph", children: [{ type: "text", text }] }];
}

/** Strapi upload JSON may expose `url` only under `formats.*` depending on version/settings. */
function pickMediaPath(mediaLike: unknown): string {
  const media = unwrap<any>(mediaLike);
  if (!media || typeof media !== "object") return "";

  const direct = str(media.url);
  if (direct) return direct;

  const formats = media.formats as Record<string, { url?: string }> | undefined;
  if (formats && typeof formats === "object") {
    for (const k of ["thumbnail", "small", "medium", "large"] as const) {
      const u = str(formats[k]?.url);
      if (u) return u;
    }
  }
  return "";
}

/** Fallback icons for `shared.contact-link` platform enum (bundled SVGs). */
const PLATFORM_ICON_BY_ENUM: Record<string, string> = {
  linkedin: "/icons/linked-in-icon.svg",
  x: "/icons/x-icon.svg",
  telegram: "/icons/telegram-icon.svg",
  email: "/icons/mail-icon.svg",
  instagram: "/icons/world-class-icon.svg",
  facebook: "/icons/world-class-icon.svg",
  google: "/icons/world-class-icon.svg",
  zalo: "/icons/world-class-icon.svg",
  wechat: "/icons/world-class-icon.svg",
  weibo: "/icons/world-class-icon.svg",
  line: "/icons/world-class-icon.svg",
  viber: "/icons/phone-icon.svg",
  whatsapp: "/icons/phone-icon.svg",
};

function platformFallbackIcon(platform: string): string {
  const k = platform.toLowerCase().trim();
  if (PLATFORM_ICON_BY_ENUM[k]) return PLATFORM_ICON_BY_ENUM[k]!;
  if (k.includes("linked")) return "/icons/linked-in-icon.svg";
  return "/icons/tool-icon.svg";
}

function appendLocaleAndDraft(params: URLSearchParams, uiLocale: string): void {
  params.set("locale", toStrapiLocale(uiLocale));
  applyDraftStatus(params);
}

/** Format ISO date string "2025-08-01" → "Aug 2025". */
function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "Present";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function fmtEmployment(v: string | null | undefined): string {
  if (!v) return "";
  return v.charAt(0).toUpperCase() + v.slice(1).replace(/-/g, " ");
}

// ─── Populate queries ─────────────────────────────────────────────────────────

function buildTeamMemberDetailParams(slug: string, uiLocale: string): URLSearchParams {
  const p = new URLSearchParams();
  p.set("filters[slug][$eq]", slug);
  p.set("pagination[pageSize]", "1");
  appendLocaleAndDraft(p, uiLocale);

  p.set("populate[avatar][fields][0]", "url");
  p.set("populate[avatar][fields][1]", "alternativeText");
  p.set("populate[avatar][fields][2]", "name");
  p.set("populate[avatar][fields][3]", "updatedAt");

  p.set("populate[framework_and_tool][fields][0]", "name");

  p.set("populate[skills][fields][0]", "name");
  p.set("populate[skills][fields][1]", "slug");

  p.set("populate[member_role]", "*");

  p.set("populate[experience][populate][role]", "*");
  p.set("populate[experience][fields][0]", "organization");
  p.set("populate[experience][fields][1]", "start_date");
  p.set("populate[experience][fields][2]", "end_date");
  p.set("populate[experience][fields][3]", "employment_type");
  p.set("populate[experience][fields][4]", "what_they_did");

  // Do not use populate=* on platform_logo — Strapi 5 rejects nested `related` on media (400).
  p.set("populate[contact_links][populate][platform_logo][fields][0]", "url");
  p.set("populate[contact_links][populate][platform_logo][fields][1]", "alternativeText");
  p.set("populate[contact_links][populate][platform_logo][fields][2]", "name");

  return p;
}

function buildTeamMemberListParams(uiLocale: string): URLSearchParams {
  const p = new URLSearchParams();
  p.set("pagination[pageSize]", "100");
  p.set("sort[0]", "name:asc");
  appendLocaleAndDraft(p, uiLocale);

  p.set("populate[avatar][fields][0]", "url");
  p.set("populate[avatar][fields][1]", "alternativeText");
  p.set("populate[avatar][fields][2]", "name");
  p.set("populate[member_role]", "*");

  return p;
}

// ─── Map Strapi → view models ───────────────────────────────────────────────

function mapMemberRoleLines(memberRoleLike: unknown): string {
  return toArr<any>(memberRoleLike)
    .map((r) => str(unwrap<any>(r)?.role_name))
    .filter(Boolean)
    .join(" · ");
}

/** Strapi `team-member` row → grid card (About page featured list, etc.). */
export function mapStrapiRowToGridMember(raw: unknown): TeamGridMember | null {
  const m = unwrap<any>(raw);
  if (!m) return null;

  const name = str(m.name);
  if (!name) return null;

  const slug =
    str(m.slug) || name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const role = mapMemberRoleLines(m.member_role);

  const av = unwrap<any>(m.avatar);
  const imageUrl = normalizeUrl(pickMediaPath(av));
  const imageAlt = str(av?.alternativeText) || name;

  return { slug, name, role, imageUrl, imageAlt };
}

function mapStrapiMember(raw: any): TeamMemberDisplay | null {
  const m = unwrap<any>(raw);
  if (!m) return null;

  const name = str(m.name);
  if (!name) return null;

  const slug = str(m.slug) || name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const role = mapMemberRoleLines(m.member_role);

  const av = unwrap<any>(m.avatar);
  const imageUrl = normalizeUrl(pickMediaPath(av));
  const imageAlt = str(av?.alternativeText) || name;

  const frameworks = toArr<any>(m.framework_and_tool)
    .map((f) => str(unwrap<any>(f)?.name))
    .filter(Boolean);

  const skills = toArr<any>(m.skills)
    .map((s) => str(unwrap<any>(s)?.name))
    .filter(Boolean);

  const getToKnow = str(m.get_to_know);
  const whyWorkWithThem = str(m.why_work_with_them);

  const experience: TeamMemberExperience[] = toArr<any>(m.experience).map((rawExp) => {
    const exp = unwrap<any>(rawExp);
    const roleName = str(unwrap<any>(exp?.role)?.role_name);
    const org = str(exp?.organization);
    const title = roleName && org ? `${roleName} – ${org}` : roleName || org || "";

    const start = fmtDate(str(exp?.start_date) || null);
    const end = fmtDate(str(exp?.end_date) || null);
    const empType = fmtEmployment(str(exp?.employment_type) || null);
    const timeParts = [empType, `${start} – ${end}`].filter(Boolean);
    const time = timeParts.join(" · ");

    return {
      title,
      time,
      descriptionBlocks: toBlocks(exp?.what_they_did),
    };
  });

  const contactLinks: TeamMemberContactLink[] = toArr<any>(m.contact_links).map((rawLink) => {
    const link = unwrap<any>(rawLink);
    const logo = unwrap<any>(link?.platform_logo);
    const platform = str(link?.platform);
    const rawPath = pickMediaPath(logo);
    let logoUrl = normalizeUrl(rawPath);
    const logoAlt =
      str(logo?.alternativeText) || str(logo?.name) || platform || "Contact";

    if (
      !logoUrl ||
      (!/^https?:\/\//i.test(logoUrl) && !logoUrl.startsWith("/")) ||
      (logoUrl.startsWith("/") && !STRAPI_BASE_URL)
    ) {
      logoUrl = platformFallbackIcon(platform);
    }

    return {
      platform,
      logoUrl,
      logoAlt,
      url: str(link?.contact_url),
    };
  }).filter((l) => l.url);

  return {
    slug,
    name,
    role,
    imageUrl,
    imageAlt,
    frameworks,
    skills,
    getToKnow,
    whyWorkWithThem,
    experience,
    contactLinks,
  };
}

async function strapiFetch(pathWithQuery: string): Promise<Response | null> {
  if (!STRAPI_BASE_URL) return null;

  const token = process.env.STRAPI_API_TOKEN || process.env.STRAPI_BEARER_TOKEN || "";
  const url = `${STRAPI_BASE_URL}${pathWithQuery.startsWith("/") ? "" : "/"}${pathWithQuery}`;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    return await fetch(url, { headers });
  } catch (err) {
    console.error("[Strapi] team-members fetch error:", err);
    return null;
  }
}

// ─── Public fetch ─────────────────────────────────────────────────────────────

export async function fetchTeamMembersForGrid(uiLocale: string): Promise<TeamGridMember[]> {
  const params = buildTeamMemberListParams(uiLocale);
  const res = await strapiFetch(`/api/team-members?${params.toString()}`);
  if (!res?.ok) {
    if (res) console.error(`[Strapi] team-members list ${res.status}`);
    return [];
  }

  try {
    const payload = await res.json();
    const rows = toArr<any>(unwrap(payload?.data));
    return rows.map(mapStrapiRowToGridMember).filter(Boolean) as TeamGridMember[];
  } catch (err) {
    console.error("[Strapi] fetchTeamMembersForGrid parse error:", err);
    return [];
  }
}

export async function fetchTeamMemberBySlug(
  slug: string,
  uiLocale: string,
): Promise<TeamMemberDisplay | null> {
  const params = buildTeamMemberDetailParams(slug, uiLocale);
  const res = await strapiFetch(`/api/team-members?${params.toString()}`);
  if (!res?.ok) {
    if (res) console.error(`[Strapi] team-members ${res.status} for slug "${slug}"`);
    return null;
  }

  try {
    const payload = await res.json();
    const items = toArr<any>(unwrap(payload?.data));
    return mapStrapiMember(items[0]) ?? null;
  } catch (err) {
    console.error("[Strapi] fetchTeamMemberBySlug error:", err);
    return null;
  }
}
