import type {
  CaseStudyBriefBackground,
  CaseStudyMedia,
  CaseStudyTeamMember,
  StrapiBlocksNode,
} from "./case-studies";
import {
  fetchStrapiJson,
  hasCmsConfig,
  mapInvolvedTeamMembers,
  populateMediaFields,
  toArray,
  toBlocks,
  toMedia,
  unwrapStrapiData,
} from "./case-studies";
import { toStrapiLocale, uiLocalesToTry } from "./language";

// ---------------------------------------------------------------------------
// Local helpers (trivial, not worth exporting from case-studies)
// ---------------------------------------------------------------------------

/** In non-production environments, fetch draft content so unpublished edits are visible. */
function applyDraftStatus(params: URLSearchParams): void {
  if (process.env.STRAPI_DRAFT_MODE === "true") {
    params.set("status", "draft");
  }
}

function str(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

// ---------------------------------------------------------------------------
// View-model types
// ---------------------------------------------------------------------------

export type DesignGalleryViewModel = {
  title?: string;
  description?: string;
  medias: CaseStudyMedia[];
  mediaLayout: "one column" | "two columns" | "two columns - compact";
};

export type DesignProjectViewModel = {
  slug: string;
  documentId?: string;
  /** Top-level title field */
  title: string;
  /** hero_logo – displayed above the project title in the hero section */
  heroLogo?: CaseStudyMedia;
  /** logo_icon – small badge in the Works page card corner */
  logoIcon?: CaseStudyMedia;
  /** Top-level hero_image */
  heroImage?: CaseStudyMedia;
  /** From skills many-to-many relation */
  heroTags: string[];
  briefAndBackground?: CaseStudyBriefBackground;
  designTone?: { title: string; description: string };
  logoGallery?: DesignGalleryViewModel;
  patternGallery?: DesignGalleryViewModel;
  productGallery?: DesignGalleryViewModel;
  /** Design project outcome has no title field (unlike regular case studies) */
  outcome?: { descriptionBlocks: StrapiBlocksNode[] };
  motionAnimationGallery?: DesignGalleryViewModel;
  teamMembers?: CaseStudyTeamMember[];
};

export type DesignProjectCard = {
  /** Slug doubles as id */
  id: string;
  documentId?: string;
  title: string;
  /** thumbnail_image URL – card background */
  thumbnailUrl?: string;
  /** logo_icon URL – small badge in the top-right corner */
  logoUrl?: string;
  /** hero_logo URL – large centered logo displayed in the card body */
  heroLogoUrl?: string;
  href: string;
};

// ---------------------------------------------------------------------------
// Populate query
// ---------------------------------------------------------------------------

function buildDesignProjectFullPopulateQuery(): URLSearchParams {
  const params = new URLSearchParams();

  // Top-level media
  populateMediaFields(params, "populate[hero_image]");
  populateMediaFields(params, "populate[hero_logo]");
  populateMediaFields(params, "populate[logo_icon]");
  populateMediaFields(params, "populate[thumbnail_image]");

  // Skills relation (for hero tags)
  params.set("populate[skills][fields][0]", "name");
  params.set("populate[skills][fields][1]", "slug");

  // Request component scalars only – no =* so Strapi won't try to expand background_image
  params.set("populate[brief_and_background]", "true");

  // Design Tone (scalar-only component)
  params.set("populate[design_tone]", "*");

  // Design Gallery components – don't use a `fields` whitelist (Strapi rejects
  // scalar keys like `title` when mixed with nested populate on components).
  // All scalars (title, description, media_layout) are returned automatically.
  for (const key of [
    "logo_gallery",
    "pattern_gallery",
    "product_gallery",
    "motion_animation_gallery",
  ]) {
    populateMediaFields(params, `populate[${key}][populate][medias]`);
  }

  // Request component scalars only – no =* so Strapi won't try to expand background_image
  params.set("populate[outcome]", "true");

  populateMediaFields(
    params,
    "populate[involved_members][populate][avatar]",
  );
  params.set(
    "populate[involved_members][populate][member_role]",
    "*",
  );
  populateMediaFields(
    params,
    "populate[involved_members][populate][contact_links][populate][platform_logo]",
  );

  return params;
}

function buildDesignProjectCardPopulateQuery(): URLSearchParams {
  const params = new URLSearchParams();
  populateMediaFields(params, "populate[thumbnail_image]");
  populateMediaFields(params, "populate[logo_icon]");
  populateMediaFields(params, "populate[hero_logo]");
  return params;
}

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

function mapDesignGallery(raw: unknown): DesignGalleryViewModel | undefined {
  const g = unwrapStrapiData<any>(raw);
  if (!g || typeof g !== "object") return undefined;

  const layout = str(g.media_layout) as DesignGalleryViewModel["mediaLayout"];
  const validLayouts: DesignGalleryViewModel["mediaLayout"][] = [
    "one column",
    "two columns",
    "two columns - compact",
  ];

  const mediasRaw = toArray<unknown>(g.medias);
  const medias = mediasRaw
    .map((m) => toMedia(m))
    .filter((m): m is CaseStudyMedia => !!m);

  return {
    ...(str(g.title) ? { title: str(g.title) } : {}),
    ...(str(g.description) ? { description: str(g.description) } : {}),
    medias,
    mediaLayout: validLayouts.includes(layout) ? layout : "one column",
  };
}

function mapDesignProjectToViewModel(
  projectLike: unknown,
): DesignProjectViewModel | null {
  const project = unwrapStrapiData<any>(projectLike);
  if (!project) return null;

  const slug = str(project.slug);
  if (!slug) return null;

  const title = str(project.title) || slug;

  const heroLogo = toMedia(project.hero_logo);
  const logoIcon = toMedia(project.logo_icon);
  const heroImage = toMedia(project.hero_image);

  const heroTags = toArray<any>(project.skills)
    .map((skill) => str(unwrapStrapiData<any>(skill)?.name))
    .filter(Boolean);

  const briefRaw = unwrapStrapiData<any>(project.brief_and_background);
  // backgroundImage is hardcoded in the template (/backgrounds/brief-background-bg.png)
  const briefAndBackground = briefRaw
    ? { descriptionBlocks: toBlocks(briefRaw.description) }
    : undefined;

  const toneRaw = unwrapStrapiData<any>(project.design_tone);
  const designTone =
    toneRaw && str(toneRaw.title)
      ? { title: str(toneRaw.title), description: str(toneRaw.description) }
      : undefined;

  const logoGallery = mapDesignGallery(project.logo_gallery);
  const patternGallery = mapDesignGallery(project.pattern_gallery);
  const productGallery = mapDesignGallery(project.product_gallery);
  const motionAnimationGallery = mapDesignGallery(
    project.motion_animation_gallery,
  );

  const outcomeRaw = unwrapStrapiData<any>(project.outcome);
  // The shared.outcome component on this Strapi instance has no `title` field
  // The background image is hardcoded in the template (/backgrounds/outcome-bg.png)
  const outcome = outcomeRaw
    ? { descriptionBlocks: toBlocks(outcomeRaw.description) }
    : undefined;

  const teamMembersList = mapInvolvedTeamMembers(project.involved_members);
  const teamMembers = teamMembersList.length > 0 ? teamMembersList : undefined;

  const documentId = str(project.documentId) || undefined;

  return {
    slug,
    ...(documentId ? { documentId } : {}),
    title,
    heroTags,
    ...(heroLogo ? { heroLogo } : {}),
    ...(logoIcon ? { logoIcon } : {}),
    ...(heroImage ? { heroImage } : {}),
    ...(briefAndBackground ? { briefAndBackground } : {}),
    ...(designTone ? { designTone } : {}),
    ...(logoGallery ? { logoGallery } : {}),
    ...(patternGallery ? { patternGallery } : {}),
    ...(productGallery ? { productGallery } : {}),
    ...(outcome ? { outcome } : {}),
    ...(motionAnimationGallery ? { motionAnimationGallery } : {}),
    ...(teamMembers ? { teamMembers } : {}),
  };
}

function mapDesignProjectToCard(projectLike: unknown): DesignProjectCard | null {
  const project = unwrapStrapiData<any>(projectLike);
  if (!project) return null;

  const slug = str(project.slug);
  if (!slug) return null;

  const title = str(project.title) || slug;

  const thumbnail = toMedia(project.thumbnail_image);
  const logo = toMedia(project.logo_icon);
  const heroLogo = toMedia(project.hero_logo);

  const documentId = str(project.documentId) || undefined;

  return {
    id: slug,
    ...(documentId ? { documentId } : {}),
    title,
    ...(thumbnail ? { thumbnailUrl: thumbnail.url } : {}),
    ...(logo ? { logoUrl: logo.url } : {}),
    ...(heroLogo ? { heroLogoUrl: heroLogo.url } : {}),
    href: `/works/design/${slug}`,
  };
}

// ---------------------------------------------------------------------------
// Public fetchers
// ---------------------------------------------------------------------------

async function fetchDesignProjectsListForLocale(
  uiLocale: string,
): Promise<any[]> {
  const params = buildDesignProjectCardPopulateQuery();
  params.set("locale", toStrapiLocale(uiLocale));
  params.set("pagination[pageSize]", "100");
  applyDraftStatus(params);

  const payload = await fetchStrapiJson(
    `/api/design-projects?${params.toString()}`,
  );
  return toArray<any>(unwrapStrapiData(payload?.data));
}

async function fetchDesignProjectsListResolved(
  uiLocale: string,
): Promise<any[]> {
  for (const loc of uiLocalesToTry(uiLocale)) {
    const items = await fetchDesignProjectsListForLocale(loc);
    if (items.length > 0) return items;
  }
  return [];
}

export async function fetchDesignProjectBySlug(
  slug: string,
  uiLocale = "en",
  opts?: { documentId?: string },
): Promise<{
  designProject: DesignProjectViewModel | null;
  source: "cms" | "none";
}> {
  if (!hasCmsConfig()) {
    return { designProject: null, source: "none" };
  }
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return { designProject: null, source: "none" };
  }
  try {
    for (const loc of uiLocalesToTry(uiLocale)) {
      const params = buildDesignProjectFullPopulateQuery();
      params.set("locale", toStrapiLocale(loc));
      params.set("filters[slug][$eq]", normalizedSlug);
      params.set("pagination[pageSize]", "1");
      applyDraftStatus(params);

      const payload = await fetchStrapiJson(
        `/api/design-projects?${params.toString()}`,
      );
      const items = toArray<any>(unwrapStrapiData(payload?.data));
      const designProject = mapDesignProjectToViewModel(items[0]);
      if (designProject) {
        return { designProject, source: "cms" };
      }
    }

    const docId = opts?.documentId?.trim();
    if (docId) {
      for (const loc of uiLocalesToTry(uiLocale)) {
        const list = await fetchDesignProjectsListForLocale(loc);
        const hit = list.find(
          (row) => str(unwrapStrapiData<any>(row)?.documentId) === docId,
        );
        const resolvedSlug = hit
          ? str(unwrapStrapiData<any>(hit)?.slug)
          : "";
        if (!resolvedSlug) continue;
        const retry = await fetchDesignProjectBySlug(resolvedSlug, loc);
        if (retry.designProject) return retry;
      }
    }

    return { designProject: null, source: "none" };
  } catch {
    return { designProject: null, source: "none" };
  }
}

export async function fetchDesignProjectSlugs(): Promise<string[]> {
  if (!hasCmsConfig()) return [];
  try {
    const params = new URLSearchParams();
    params.set("fields[0]", "slug");
    params.set("pagination[pageSize]", "100");
    applyDraftStatus(params);

    const payload = await fetchStrapiJson(
      `/api/design-projects?${params.toString()}`,
    );
    const items = toArray<any>(unwrapStrapiData(payload?.data));
    return items.map((item) => str(item.slug)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function fetchDesignProjectCards(
  uiLocale = "en",
): Promise<DesignProjectCard[]> {
  if (!hasCmsConfig()) return [];
  try {
    const items = await fetchDesignProjectsListResolved(uiLocale);
    return items
      .map((item) => mapDesignProjectToCard(item))
      .filter((c): c is DesignProjectCard => !!c);
  } catch {
    return [];
  }
}
