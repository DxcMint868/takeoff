import type { StrapiBlocksNode } from "./case-studies";
import type { Member } from "../members";

// ─── Unified display type (used by the modal) ────────────────────────────────

export type TeamMemberContactLink = {
  platform: string;
  logoUrl: string;
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

// ─── Populate query for /api/team-members ─────────────────────────────────────

function buildTeamMemberPopulateQuery(slug: string): URLSearchParams {
  const p = new URLSearchParams();
  p.set("filters[slug][$eq]", slug);
  p.set("pagination[pageSize]", "1");

  // avatar
  p.set("populate[avatar][fields][0]", "url");
  p.set("populate[avatar][fields][1]", "alternativeText");
  p.set("populate[avatar][fields][2]", "name");
  p.set("populate[avatar][fields][3]", "updatedAt");

  // framework_and_tool
  p.set("populate[framework_and_tool][fields][0]", "name");

  // skills relation
  p.set("populate[skills][fields][0]", "name");
  p.set("populate[skills][fields][1]", "slug");

  // member_role component
  p.set("populate[member_role]", "*");

  // experience + nested role component
  p.set("populate[experience][populate][role]", "*");
  // experience scalar fields (what_they_did is richtext = blocks JSON = scalar in Strapi REST)
  p.set("populate[experience][fields][0]", "organization");
  p.set("populate[experience][fields][1]", "start_date");
  p.set("populate[experience][fields][2]", "end_date");
  p.set("populate[experience][fields][3]", "employment_type");
  p.set("populate[experience][fields][4]", "what_they_did");

  // contact_links: no fields whitelist so platform + contact_url scalars + platform_logo all come through
  p.set("populate[contact_links][populate][platform_logo][fields][0]", "url");
  p.set("populate[contact_links][populate][platform_logo][fields][1]", "alternativeText");
  p.set("populate[contact_links][populate][platform_logo][fields][2]", "name");

  return p;
}

// ─── Map Strapi response → TeamMemberDisplay ──────────────────────────────────

function mapStrapiMember(raw: any): TeamMemberDisplay | null {
  const m = unwrap<any>(raw);
  if (!m) return null;

  const name = str(m.name);
  if (!name) return null;

  const slug = str(m.slug) || name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  // primary role from member_role[0].role_name
  const role = (() => {
    const parts = toArr<any>(m.member_role)
      .map((r) => str(unwrap<any>(r)?.role_name))
      .filter(Boolean);
    return parts.join(" · ");
  })();

  // avatar
  const av = unwrap<any>(m.avatar);
  const rawAvatarUrl = str(av?.url);
  const imageUrl = normalizeUrl(rawAvatarUrl);
  const imageAlt = str(av?.alternativeText) || name;

  // frameworks
  const frameworks = toArr<any>(m.framework_and_tool)
    .map((f) => str(unwrap<any>(f)?.name))
    .filter(Boolean);

  // skills
  const skills = toArr<any>(m.skills)
    .map((s) => str(unwrap<any>(s)?.name))
    .filter(Boolean);

  // get_to_know
  const getToKnow = str(m.get_to_know);

  // experience
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

  // contact_links
  const contactLinks: TeamMemberContactLink[] = toArr<any>(m.contact_links).map((rawLink) => {
    const link = unwrap<any>(rawLink);
    const logo = unwrap<any>(link?.platform_logo);
    return {
      platform: str(link?.platform),
      logoUrl: normalizeUrl(str(logo?.url)),
      url: str(link?.contact_url),
    };
  }).filter((l) => l.url);

  return { slug, name, role, imageUrl, imageAlt, frameworks, skills, getToKnow, experience, contactLinks };
}

// ─── Public fetch ─────────────────────────────────────────────────────────────

export async function fetchTeamMemberBySlug(slug: string): Promise<TeamMemberDisplay | null> {
  if (!STRAPI_BASE_URL) return null;

  const token = process.env.STRAPI_API_TOKEN || process.env.STRAPI_BEARER_TOKEN || "";
  const params = buildTeamMemberPopulateQuery(slug);
  const url = `${STRAPI_BASE_URL}/api/team-members?${params.toString()}`;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.error(`[Strapi] team-members ${res.status} for slug "${slug}"`);
      return null;
    }
    const payload = await res.json();
    const items = toArr<any>(unwrap(payload?.data));
    return mapStrapiMember(items[0]) ?? null;
  } catch (err) {
    console.error("[Strapi] fetchTeamMemberBySlug error:", err);
    return null;
  }
}

// ─── Map local Member → TeamMemberDisplay (fallback) ─────────────────────────

function localMemberSlug(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const PLATFORM_ICON_MAP: Record<string, string> = {
  linkedin: "/icons/linked-in-icon.svg",
  x: "/icons/x-icon.svg",
  telegram: "/icons/telegram-icon.svg",
  mail: "/icons/mail-icon.svg",
  email: "/icons/mail-icon.svg",
  phone: "/icons/phone-icon.svg",
};

function platformIcon(label: string): string {
  const key = label.toLowerCase();
  for (const [platform, icon] of Object.entries(PLATFORM_ICON_MAP)) {
    if (key.includes(platform)) return icon;
  }
  return "/icons/linked-in-icon.svg";
}

export function localMemberToDisplay(m: Member): TeamMemberDisplay {
  return {
    slug: localMemberSlug(m.name),
    name: m.name,
    role: m.role,
    imageUrl: m.image,
    imageAlt: m.name,
    frameworks: m.frameworks,
    skills: m.skill,
    getToKnow: m.getToKnow,
    experience: m.experience.map((exp) => ({
      title: exp.company,
      time: exp.time,
      descriptionBlocks: [
        { type: "paragraph", children: [{ type: "text", text: exp.description }] },
      ] as StrapiBlocksNode[],
    })),
    contactLinks: m.links.map((link) => ({
      platform: link.label.toLowerCase(),
      logoUrl: platformIcon(link.label),
      url: link.url,
    })),
  };
}
