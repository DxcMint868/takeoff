import type {
  WorkProjectCard,
  WorkTagSpec,
  WorkTagTone,
} from "../../components/work-examples-portfolio";

export type StrapiTextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type StrapiBlocksNode = {
  type: string;
  level?: number;
  format?: "ordered" | "unordered";
  children?: Array<StrapiBlocksNode | StrapiTextNode>;
};

export type CaseStudyMedia = {
  url: string;
  alt: string;
};

export type CaseStudyStat = {
  label: string;
  value: string;
  order: number;
};

export type CaseStudyObjective = {
  title: string;
  description: string;
  order: number;
  icon?: CaseStudyMedia;
};

export type CaseStudySolution = {
  title: string;
  descriptionBlocks: StrapiBlocksNode[];
  image?: CaseStudyMedia;
  imagePosition: "left" | "right";
  order: number;
};

export type CaseStudyOutcome = {
  title: string;
  descriptionBlocks: StrapiBlocksNode[];
  backgroundImage?: CaseStudyMedia;
};

export type CaseStudyBriefBackground = {
  descriptionBlocks: StrapiBlocksNode[];
  backgroundImage?: CaseStudyMedia;
};

export type CaseStudyTestimonial = {
  quoteBlocks: StrapiBlocksNode[];
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
};

export type CaseStudyTeamMember = {
  name: string;
  slug: string;
  /** Primary label for hover (from repeatable member_role in Strapi). */
  role: string;
  avatar?: CaseStudyMedia;
  /** First safe https URL from contact_links, if any. */
  linkUrl?: string;
};

export type CaseStudyViewModel = {
  slug: string;
  title: string;
  shortDescription: string;
  subtitle?: string;
  logo?: CaseStudyMedia;
  heroImage?: CaseStudyMedia;
  heroTags: string[];
  stats: CaseStudyStat[];
  objectives: CaseStudyObjective[];
  solutions: CaseStudySolution[];
  technicalInfrastructure: string[];
  gallery: Array<{ src: string; alt: string; order: number; productPlatform?: "mobile" | "web" | "tablet" }>;
  briefAndBackground?: CaseStudyBriefBackground;
  outcome?: CaseStudyOutcome;
  testimonial?: CaseStudyTestimonial;
  llmTxt?: string;
  teamMembers?: CaseStudyTeamMember[];
};

type StrapiFetchResult = {
  caseStudy: CaseStudyViewModel | null;
  source: "cms" | "none";
};

type WorksDataResult = {
  featuredProject: WorkProjectCard | null;
  projectCards: WorkProjectCard[];
  filterChips: WorkTagSpec[];
  source: "cms" | "none";
};

const STRAPI_BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_STRAPI_URL);
const STRAPI_TOKEN =
  process.env.STRAPI_API_TOKEN || process.env.STRAPI_BEARER_TOKEN || "";

const TAG_TONES: WorkTagTone[] = [
  "lime",
  "cyan",
  "amber",
  "mint",
  "sky",
  "coral",
  "pink",
];

function normalizeBaseUrl(value: string | undefined) {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function hasCmsConfig() {
  return STRAPI_BASE_URL.length > 0;
}

function stringifyValue(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function toOrder(value: unknown, fallback = 9999) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function normalizeMediaUrl(url: string | undefined) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (!STRAPI_BASE_URL) return url;
  return `${STRAPI_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Strapi (and S3/Cloudinary behind it) often serves uploads with a long
 * `Cache-Control`. The public URL can stay the same when a file is replaced,
 * so browsers keep showing stale bytes. Appending a version token derived from
 * the media document forces a new cache key after publish.
 */
function appendCacheBuster(url: string, versionToken: string | undefined) {
  const token = (versionToken ?? "").trim();
  if (!token) return url;
  const joiner = url.includes("?") ? "&" : "?";
  return `${url}${joiner}v=${encodeURIComponent(token)}`;
}

function hashText(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function toneFor(label: string): WorkTagTone {
  return TAG_TONES[hashText(label) % TAG_TONES.length];
}

export function toArray<T>(value: unknown): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as T[];
  return [value as T];
}

export function unwrapStrapiData<T = any>(value: any): T {
  if (value === null || value === undefined) return value as T;

  if (Array.isArray(value)) {
    return value.map((item) => unwrapStrapiData(item)) as unknown as T;
  }

  if (typeof value !== "object") {
    return value as T;
  }

  if (
    "data" in value &&
    Object.keys(value).every((key) => key === "data" || key === "meta")
  ) {
    return unwrapStrapiData(value.data) as T;
  }

  if ("attributes" in value && typeof value.attributes === "object") {
    return unwrapStrapiData({
      id: value.id,
      documentId: value.documentId,
      ...value.attributes,
    }) as T;
  }

  const out: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value)) {
    out[key] = unwrapStrapiData(nested);
  }
  return out as T;
}

export function toMedia(mediaLike: unknown): CaseStudyMedia | undefined {
  const media = unwrapStrapiData<any>(mediaLike);
  if (!media || typeof media !== "object") return undefined;

  const resolved = Array.isArray(media) ? media[0] : media;
  if (!resolved || typeof resolved !== "object") return undefined;

  const baseUrl = normalizeMediaUrl(stringifyValue(resolved.url));
  if (!baseUrl) return undefined;

  const versionToken = stringifyValue(resolved.updatedAt);
  const url = appendCacheBuster(baseUrl, versionToken);

  const alt =
    stringifyValue(resolved.alternativeText) ||
    stringifyValue(resolved.caption) ||
    stringifyValue(resolved.name) ||
    "";

  return { url, alt };
}

export function toBlocks(value: unknown): StrapiBlocksNode[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as StrapiBlocksNode[];

  const text = stringifyValue(value).trim();
  if (!text) return [];

  return [
    {
      type: "paragraph",
      children: [{ type: "text", text }],
    },
  ];
}

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

const EXTERNAL_HTTP_RE = /^https?:\/\//i;

function stringifyMemberRoleEntry(entry: unknown): string {
  if (typeof entry === "string") {
    return entry.trim();
  }
  const o = unwrapStrapiData<any>(entry);
  if (!o || typeof o !== "object") return "";
  for (const key of [
    "role_name",
    "title",
    "label",
    "role",
    "name",
    "text",
    "value",
    "description",
    "role_description",
    "position",
    "job_title",
    "jobTitle",
    "role_title",
    "heading",
    "content",
  ]) {
    const s = stringifyValue(o[key]);
    if (s) return s;
  }
  return "";
}

function pickTeamMemberExternalUrl(memberLike: unknown): string | undefined {
  const member = unwrapStrapiData<any>(memberLike);
  const links = toArray<any>(member?.contact_links);
  const URL_KEYS = [
    "url",
    "contact_url",
    "href",
    "link",
    "URL",
    "target",
    "external_url",
    "link_url",
    "uri",
    "website",
  ];
  for (const raw of links) {
    const link = unwrapStrapiData<any>(raw);
    if (!link || typeof link !== "object") continue;
    for (const key of URL_KEYS) {
      const candidate = stringifyValue(link[key]);
      if (candidate && EXTERNAL_HTTP_RE.test(candidate)) return candidate;
    }
  }
  return undefined;
}

export function mapFeaturedTeamMembers(
  teamMemberListLike: unknown,
): CaseStudyTeamMember[] {
  const list = unwrapStrapiData<any>(teamMemberListLike);
  if (!list) return [];

  const members = toArray<any>(list.featured_members);

  return members
    .map((raw) => {
      const member = unwrapStrapiData<any>(raw);
      if (!member) return null;

      const name = stringifyValue(member.name);
      if (!name) return null;

      const slug =
        stringifyValue(member.slug) ||
        name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

      const roleParts = toArray<any>(
        member.member_role ?? member.memberRole,
      )
        .map((entry) => stringifyMemberRoleEntry(entry))
        .filter(Boolean);

      const roleFallback = (() => {
        for (const key of [
          "role",
          "position",
          "job_title",
          "jobTitle",
          "role_title",
          "title",
        ] as const) {
          const s = stringifyValue(member[key]);
          if (s) return s;
        }
        return "";
      })();

      const role =
        roleParts.length > 0
          ? roleParts.join(" · ")
          : roleFallback;

      const avatar = toMedia(member.avatar);
      const linkUrl = pickTeamMemberExternalUrl(member);

      const entry: CaseStudyTeamMember = {
        name,
        slug,
        role,
        ...(avatar ? { avatar } : {}),
        ...(linkUrl ? { linkUrl } : {}),
      };
      return entry;
    })
    .filter(Boolean) as CaseStudyTeamMember[];
}

function mapProjectToCaseStudy(
  projectLike: unknown,
): CaseStudyViewModel | null {
  const project = unwrapStrapiData<any>(projectLike);
  if (!project) return null;

  const heroMedia = toMedia(project.hero_image);

  const gallery = sortByOrder(
    toArray<any>(project.gallery_images)
      .map((entry, index) => {
        const normalized = unwrapStrapiData<any>(entry);
        const file = toMedia(normalized.file);
        const platform = stringifyValue(normalized.productPlatform);
        return {
          src: file?.url ?? "",
          alt: stringifyValue(normalized.alt_text) || file?.alt || "",
          order: toOrder(normalized.order, index + 1),
          ...(platform === "mobile" || platform === "web" || platform === "tablet"
            ? { productPlatform: platform as "mobile" | "web" | "tablet" }
            : {}),
        };
      })
      .filter((entry) => !!entry.src),
  );

  const logo = toMedia(project.logo_icon);
  const skills = toArray<any>(project.skills)
    .map((skill) => stringifyValue(unwrapStrapiData<any>(skill)?.name))
    .filter(Boolean);

  const stats = sortByOrder(
    toArray<any>(project.stats)
      .map((stat) => {
        const normalized = unwrapStrapiData<any>(stat);
        return {
          label: stringifyValue(normalized.label),
          value: stringifyValue(normalized.value),
          order: toOrder(normalized.order),
        };
      })
      .filter((stat) => stat.label && stat.value),
  );

  const objectives = sortByOrder(
    toArray<any>(project.business_objectives)
      .map((item) => {
        const normalized = unwrapStrapiData<any>(item);
        return {
          title: stringifyValue(normalized.title),
          description: stringifyValue(normalized.description),
          order: toOrder(normalized.order),
          icon: toMedia(normalized.icon),
        };
      })
      .filter((item) => item.title && item.description),
  );

  const solutions = sortByOrder(
    toArray<any>(project.solutions)
      .map((item, index) => {
        const normalized = unwrapStrapiData<any>(item);
        return {
          title: stringifyValue(normalized.title),
          descriptionBlocks: toBlocks(normalized.description),
          image: toMedia(normalized.image),
          imagePosition: index % 2 === 0 ? "right" : "left",
          order: toOrder(normalized.order, index + 1),
        } as CaseStudySolution;
      })
      .filter((item) => item.title),
  );

  const techInfra = toArray<any>(project.tech_infra_items)
    .map((item) => unwrapStrapiData<any>(item))
    .sort((a, b) => toOrder(a.order) - toOrder(b.order))
    .map((item) => stringifyValue(item.name))
    .filter(Boolean);

  const briefAndBackgroundRaw = unwrapStrapiData<any>(
    project.brief_and_background,
  );
  const briefAndBackground = briefAndBackgroundRaw
    ? {
      descriptionBlocks: toBlocks(briefAndBackgroundRaw.description),
      backgroundImage: toMedia(briefAndBackgroundRaw.background_image),
    }
    : project.overview
      ? {
        descriptionBlocks: toBlocks(project.overview),
      }
      : undefined;

  const outcomeRaw = unwrapStrapiData<any>(project.outcome);
  const outcome = outcomeRaw
    ? {
      title: stringifyValue(outcomeRaw.title) || "Outcome",
      descriptionBlocks: toBlocks(outcomeRaw.description),
      backgroundImage: toMedia(outcomeRaw.background_image),
    }
    : undefined;

  const testimonialRaw = unwrapStrapiData<any>(project.testimonial);
  const testimonial =
    testimonialRaw && stringifyValue(testimonialRaw.author_name)
      ? {
        quoteBlocks: toBlocks(testimonialRaw.quote),
        authorName: stringifyValue(testimonialRaw.author_name),
        authorRole: stringifyValue(testimonialRaw.author_role) || undefined,
        authorCompany:
          stringifyValue(testimonialRaw.author_company) || undefined,
      }
      : undefined;

  const teamMembersList = mapFeaturedTeamMembers(
    unwrapStrapiData<any>(project.team_members),
  );
  const teamMembers =
    teamMembersList.length > 0 ? teamMembersList : undefined;

  const slug = stringifyValue(project.slug);
  const title = stringifyValue(project.title);
  const shortDescription = stringifyValue(project.short_description);

  if (!slug || !title) return null;

  return {
    slug,
    title,
    shortDescription,
    heroTags: skills,
    stats,
    objectives,
    solutions,
    technicalInfrastructure: techInfra,
    gallery,
    ...(stringifyValue(project.domain_subtitle)
      ? { subtitle: stringifyValue(project.domain_subtitle) }
      : {}),
    ...(logo ? { logo } : {}),
    ...(heroMedia ? { heroImage: heroMedia } : {}),
    ...(briefAndBackground ? { briefAndBackground } : {}),
    ...(outcome ? { outcome } : {}),
    ...(testimonial ? { testimonial } : {}),
    ...(stringifyValue(project.llm_txt)
      ? { llmTxt: stringifyValue(project.llm_txt) }
      : {}),
    ...(teamMembers && teamMembers.length > 0 ? { teamMembers } : {}),
  };
}

function findFeaturedMedia(
  projectLike: unknown,
  isFeaturedProject: boolean,
): CaseStudyMedia | undefined {
  const project = unwrapStrapiData<any>(projectLike);
  const thumbnail = toMedia(project?.thumbnail_image);
  if (thumbnail) return thumbnail;

  const hero = toMedia(project?.hero_image);
  if (hero) return hero;

  const galleryFirst = sortByOrder(
    toArray<any>(project?.gallery_images)
      .map((entry, index) => {
        const normalized = unwrapStrapiData<any>(entry);
        const file = toMedia(normalized.file);
        return {
          file,
          alt: stringifyValue(normalized.alt_text),
          order: toOrder(normalized.order, index + 1),
        };
      })
      .filter((entry) => !!entry.file),
  )[0];

  if (galleryFirst?.file) {
    return {
      url: galleryFirst.file.url,
      alt: galleryFirst.alt || galleryFirst.file.alt,
    };
  }

  return isFeaturedProject ? hero : undefined;
}

function mapProjectToWorkCard(
  projectLike: unknown,
  isFeaturedProject: boolean,
): WorkProjectCard | null {
  const project = unwrapStrapiData<any>(projectLike);
  if (!project) return null;

  const slug = stringifyValue(project.slug);
  const title = stringifyValue(project.title);
  if (!slug || !title) return null;

  const skills = toArray<any>(project.skills)
    .map((skill) => stringifyValue(unwrapStrapiData<any>(skill)?.name))
    .filter(Boolean);

  const industries = toArray<any>(project.industries)
    .map((industry) => stringifyValue(unwrapStrapiData<any>(industry)?.name))
    .filter(Boolean);

  const tags = [...skills, ...industries].slice(0, 6).map((label) => ({
    label,
    tone: toneFor(label),
  })) as WorkTagSpec[];

  const media = findFeaturedMedia(project, isFeaturedProject);
  const logo = toMedia(project.logo_icon);
  const subtitle = stringifyValue(project.domain_subtitle);

  return {
    id: slug,
    title,
    ...(subtitle ? { subtitle } : {}),
    description: stringifyValue(project.short_description),
    imageSrc: media?.url || null,
    imageAlt: media?.alt || `${title} preview image`,
    ...(logo ? { logoSrc: logo.url, logoAlt: logo.alt } : {}),
    tags,
    href: `/works/${slug}`,
  };
}

export async function fetchStrapiJson(path: string): Promise<any> {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(`${STRAPI_BASE_URL}${path}`, {
    headers,
  });

  if (!response.ok) {
    let errorPayload: any = null;

    try {
      errorPayload = await response.json();
    } catch {
      errorPayload = null;
    }

    const strapiMessage =
      stringifyValue(errorPayload?.error?.message) ||
      stringifyValue(errorPayload?.message) ||
      response.statusText;

    let hint = "Check Strapi logs for more details.";
    if (response.status === 400) {
      hint =
        "Bad query input. Verify filters/populate keys and schema field names.";
    } else if (response.status === 401) {
      hint =
        "Unauthorized. STRAPI_API_TOKEN/STRAPI_BEARER_TOKEN is missing, invalid, or expired.";
    } else if (response.status === 403) {
      hint =
        "Forbidden. Ensure Strapi role permissions allow find/findOne for these content types.";
    } else if (response.status >= 500) {
      hint = "Strapi internal error. Check Strapi server logs.";
    }

    console.error(
      `[Strapi] ${response.status} ${response.statusText} on ${path}: ${strapiMessage}. ${hint}`,
    );

    throw new Error(`[Strapi ${response.status}] ${strapiMessage}. ${hint}`);
  }

  return response.json();
}

export function populateMediaFields(params: URLSearchParams, baseKey: string) {
  params.set(`${baseKey}[fields][0]`, "url");
  params.set(`${baseKey}[fields][1]`, "alternativeText");
  params.set(`${baseKey}[fields][2]`, "caption");
  params.set(`${baseKey}[fields][3]`, "name");
  params.set(`${baseKey}[fields][4]`, "updatedAt");
}

function buildProjectPopulateQuery() {
  const params = new URLSearchParams();
  populateMediaFields(params, "populate[logo_icon]");
  populateMediaFields(params, "populate[hero_image]");
  populateMediaFields(params, "populate[thumbnail_image]");
  params.set("populate[skills][fields][0]", "name");
  params.set("populate[skills][fields][1]", "slug");
  params.set("populate[industries][fields][0]", "name");
  params.set("populate[industries][fields][1]", "slug");
  params.set("populate[stats]", "*");
  params.set("populate[business_objectives][fields][0]", "title");
  params.set("populate[business_objectives][fields][1]", "description");
  params.set("populate[business_objectives][fields][2]", "order");
  populateMediaFields(params, "populate[business_objectives][populate][icon]");
  populateMediaFields(
    params,
    "populate[brief_and_background][populate][background_image]",
  );
  populateMediaFields(params, "populate[solutions][populate][image]");
  populateMediaFields(params, "populate[outcome][populate][background_image]");
  params.set("populate[testimonial]", "*");
  params.set("populate[tech_infra_items][fields][0]", "name");
  params.set("populate[tech_infra_items][fields][1]", "order");
  params.set("populate[gallery_images][fields][0]", "alt_text");
  params.set("populate[gallery_images][fields][1]", "order");
  params.set("populate[gallery_images][fields][2]", "productPlatform");
  populateMediaFields(params, "populate[gallery_images][populate][file]");
  /**
   * Do not use `fields` whitelist on `featured_members`: Strapi omits any attribute
   * not listed, so `member_role` never appeared in the response and roles were empty on case studies.
   */
  populateMediaFields(
    params,
    "populate[team_members][populate][featured_members][populate][avatar]",
  );
  params.set(
    "populate[team_members][populate][featured_members][populate][member_role]",
    "*",
  );
  /**
   * `shared.contact-link`: no `url` field in this schema — use explicit nested media only
   * (global `=*` on contact_links hit invalid nested keys; listing `url` hit "Invalid key url").
   */
  populateMediaFields(
    params,
    "populate[team_members][populate][featured_members][populate][contact_links][populate][platform_logo]",
  );
  return params;
}

export async function fetchCaseStudyBySlug(
  slug: string,
): Promise<StrapiFetchResult> {
  if (!hasCmsConfig()) {
    console.log("No CMS configuration found");
    return { caseStudy: null, source: "none" };
  }

  try {
    const params = buildProjectPopulateQuery();
    params.set("filters[slug][$eq]", slug);
    params.set("pagination[pageSize]", "1");

    const payload = await fetchStrapiJson(`/api/projects?${params.toString()}`);
    const projects = toArray<any>(unwrapStrapiData(payload?.data));
    const caseStudy = mapProjectToCaseStudy(projects[0]);

    return {
      caseStudy,
      source: caseStudy ? "cms" : "none",
    };
  } catch {
    return { caseStudy: null, source: "none" };
  }
}

export async function fetchCaseStudySlugs(): Promise<string[]> {
  if (!hasCmsConfig()) {
    return [];
  }

  try {
    const params = new URLSearchParams();
    params.set("fields[0]", "slug");
    params.set("pagination[pageSize]", "100");

    const payload = await fetchStrapiJson(`/api/projects?${params.toString()}`);
    const projects = toArray<any>(unwrapStrapiData(payload?.data));

    return projects
      .map((project) => stringifyValue(project.slug))
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function fetchWorksData(): Promise<WorksDataResult> {
  if (!hasCmsConfig()) {
    console.warn("No CMS configuration found");
    return {
      featuredProject: null,
      projectCards: [],
      filterChips: [],
      source: "none",
    };
  }

  try {
    const params = buildProjectPopulateQuery();
    params.set("pagination[pageSize]", "100");
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
      params.set("status", "draft");
    }

    const payload = await fetchStrapiJson(`/api/projects?${params.toString()}`);
    const projects = toArray<any>(unwrapStrapiData(payload?.data));

    const cards = projects
      .map((project) => {
        const normalizedProject = unwrapStrapiData<any>(project);
        const isFeatured = Boolean(normalizedProject?.is_featured);
        return {
          project: normalizedProject,
          isFeatured,
          card: mapProjectToWorkCard(normalizedProject, isFeatured),
        };
      })
      .filter(
        (
          entry,
        ): entry is {
          project: any;
          isFeatured: boolean;
          card: WorkProjectCard;
        } => !!entry.card,
      );

    let featuredProject: WorkProjectCard | null = null;
    const projectCards: WorkProjectCard[] = [];

    for (const entry of cards) {
      if (entry.isFeatured && !featuredProject) {
        featuredProject = entry.card;
        continue;
      }
      projectCards.push(entry.card);
    }

    const chipLabels = new Set<string>();
    for (const card of [featuredProject, ...projectCards]) {
      if (!card) continue;
      for (const tag of card.tags) {
        chipLabels.add(tag.label);
      }
    }

    const filterChips = Array.from(chipLabels).map((label) => ({
      label,
      tone: toneFor(label),
    })) as WorkTagSpec[];

    return {
      featuredProject,
      projectCards,
      filterChips,
      source: cards.length > 0 ? "cms" : "none",
    };
  } catch {
    return {
      featuredProject: null,
      projectCards: [],
      filterChips: [],
      source: "none",
    };
  }
}
