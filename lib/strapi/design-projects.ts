import type {
  CaseStudyBriefBackground,
  CaseStudyMedia,
  CaseStudyOutcome,
  CaseStudyTeamMember,
  StrapiBlocksNode,
} from "./case-studies";
import {
  fetchStrapiJson,
  hasCmsConfig,
  mapFeaturedTeamMembers,
  populateMediaFields,
  toArray,
  toBlocks,
  toMedia,
  unwrapStrapiData,
} from "./case-studies";

// ---------------------------------------------------------------------------
// Local helpers (trivial, not worth exporting from case-studies)
// ---------------------------------------------------------------------------

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
  outcome?: CaseStudyOutcome;
  motionAnimationGallery?: DesignGalleryViewModel;
  teamMembers?: CaseStudyTeamMember[];
};

export type DesignProjectCard = {
  /** Slug doubles as id */
  id: string;
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

  // Brief & Background
  params.set("populate[brief_and_background][fields][0]", "description");
  populateMediaFields(
    params,
    "populate[brief_and_background][populate][background_image]",
  );

  // Design Tone (scalar-only component)
  params.set("populate[design_tone]", "*");

  // Design Gallery components – populate medias for each
  for (const key of [
    "logo_gallery",
    "pattern_gallery",
    "product_gallery",
    "motion_animation_gallery",
  ]) {
    params.set(`populate[${key}][fields][0]`, "title");
    params.set(`populate[${key}][fields][1]`, "description");
    params.set(`populate[${key}][fields][2]`, "media_layout");
    populateMediaFields(params, `populate[${key}][populate][medias]`);
  }

  // Outcome
  params.set("populate[outcome][fields][0]", "title");
  params.set("populate[outcome][fields][1]", "description");
  populateMediaFields(
    params,
    "populate[outcome][populate][background_image]",
  );

  // Team members (identical to regular case study populate)
  populateMediaFields(
    params,
    "populate[team_members][populate][featured_members][populate][avatar]",
  );
  params.set(
    "populate[team_members][populate][featured_members][populate][member_role]",
    "*",
  );
  populateMediaFields(
    params,
    "populate[team_members][populate][featured_members][populate][contact_links][populate][platform_logo]",
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
  const briefAndBackground = briefRaw
    ? {
        descriptionBlocks: toBlocks(briefRaw.description),
        backgroundImage: toMedia(briefRaw.background_image),
      }
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
  const outcome = outcomeRaw
    ? {
        title: str(outcomeRaw.title) || "Outcome",
        descriptionBlocks: toBlocks(outcomeRaw.description),
        backgroundImage: toMedia(outcomeRaw.background_image),
      }
    : undefined;

  const teamMembersList = mapFeaturedTeamMembers(
    unwrapStrapiData<any>(project.team_members),
  );
  const teamMembers = teamMembersList.length > 0 ? teamMembersList : undefined;

  return {
    slug,
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

  return {
    id: slug,
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

export async function fetchDesignProjectBySlug(slug: string): Promise<{
  designProject: DesignProjectViewModel | null;
  source: "cms" | "none";
}> {
  if (!hasCmsConfig()) {
    return { designProject: null, source: "none" };
  }
  try {
    const params = buildDesignProjectFullPopulateQuery();
    params.set("filters[slug][$eq]", slug);
    params.set("pagination[pageSize]", "1");

    const payload = await fetchStrapiJson(
      `/api/design-projects?${params.toString()}`,
    );
    const items = toArray<any>(unwrapStrapiData(payload?.data));
    const designProject = mapDesignProjectToViewModel(items[0]);
    return { designProject, source: designProject ? "cms" : "none" };
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

    const payload = await fetchStrapiJson(
      `/api/design-projects?${params.toString()}`,
    );
    const items = toArray<any>(unwrapStrapiData(payload?.data));
    return items.map((item) => str(item.slug)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function fetchDesignProjectCards(): Promise<DesignProjectCard[]> {
  if (!hasCmsConfig()) return [];
  try {
    const params = buildDesignProjectCardPopulateQuery();
    params.set("pagination[pageSize]", "100");

    const payload = await fetchStrapiJson(
      `/api/design-projects?${params.toString()}`,
    );
    const items = toArray<any>(unwrapStrapiData(payload?.data));
    return items
      .map((item) => mapDesignProjectToCard(item))
      .filter((c): c is DesignProjectCard => !!c);
  } catch {
    return [];
  }
}
