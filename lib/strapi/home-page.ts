import {
  applyDraftStatus,
  fetchStrapiJson,
  hasCmsConfig,
  populateMediaFields,
  toArray,
  toBlocks,
  toMedia,
  unwrapStrapiData,
} from "./case-studies";
import type { StrapiBlocksNode } from "./case-studies";

export type HomeHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type HomeTestimonial = {
  quoteBlocks: StrapiBlocksNode[];
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorCompanyWebsite: string;
  authorCompanyLogoUrl: string;
};

export type HomeLogoCloud = {
  logos: Array<{ url: string; alt: string; link: string; title?: string }>;
};

export type HomeCapability = {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
  iconAlt: string;
  tags: string[];
};

export type HomePageCmsData = {
  hero: HomeHero | null;
  testimonials: HomeTestimonial[];
  logoCloud: HomeLogoCloud | null;
  capabilities: HomeCapability[];
};

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

function buildHomePagePopulateQuery(locale?: string) {
  const params = new URLSearchParams();

  params.set("populate[hero][fields][0]", "eyebrow");
  params.set("populate[hero][fields][1]", "title");
  params.set("populate[hero][fields][2]", "subtitle");

  params.set("populate[testimonials][fields][0]", "author_name");
  params.set("populate[testimonials][fields][1]", "author_role");
  params.set("populate[testimonials][fields][2]", "author_company");
  params.set("populate[testimonials][fields][3]", "author_company_website");
  params.set("populate[testimonials][fields][4]", "quote");
  populateMediaFields(
    params,
    "populate[testimonials][populate][author_company_logo]",
  );

  // brand_logos: repeatable shared.media-link — each entry has `media` (image), `link`, and optional `title`
  populateMediaFields(params, "populate[brand_logos][populate][media]");
  params.set("populate[brand_logos][fields][0]", "link");
  params.set("populate[brand_logos][fields][1]", "title");

  // capabilities — icon is media, framework_and_tools is a repeatable component
  populateMediaFields(params, "populate[capabilities][populate][icon]");
  params.set("populate[capabilities][populate][framework_and_tools]", "*");

  if (locale) {
    params.set("locale", locale);
  }

  applyDraftStatus(params);

  return params;
}

function mapHero(heroLike: unknown): HomeHero | null {
  const hero = unwrapStrapiData<any>(heroLike);
  if (!hero || typeof hero !== "object") return null;

  const eyebrow = stringifyValue(hero.eyebrow);
  const title = stringifyValue(hero.title);
  const subtitle = stringifyValue(hero.subtitle);

  if (!eyebrow && !title && !subtitle) return null;

  return { eyebrow, title, subtitle };
}

function mapTestimonials(testimonialsLike: unknown): HomeTestimonial[] {
  const list = unwrapStrapiData<any>(testimonialsLike);
  if (!list) return [];

  return toArray<any>(list)
    .map((raw) => {
      const item = unwrapStrapiData<any>(raw);
      if (!item) return null;

      const authorName = stringifyValue(item.author_name);
      if (!authorName) return null;

      const logo = toMedia(item.author_company_logo);

      const testimonial: HomeTestimonial = {
        quoteBlocks: toBlocks(item.quote),
        authorName,
        authorRole: stringifyValue(item.author_role),
        authorCompany: stringifyValue(item.author_company),
        authorCompanyWebsite: stringifyValue(item.author_company_website),
        authorCompanyLogoUrl: logo?.url ?? "",
      };
      return testimonial;
    })
    .filter(Boolean) as HomeTestimonial[];
}

function mapCapabilities(capabilitiesLike: unknown): HomeCapability[] {
  return toArray<any>(capabilitiesLike)
    .map((raw) => {
      const item = unwrapStrapiData<any>(raw);
      if (!item) return null;

      const title = stringifyValue(item.title);
      if (!title) return null;

      const icon = toMedia(item.icon);

      const tags = toArray<any>(item.framework_and_tools)
        .map((t) => stringifyValue(unwrapStrapiData<any>(t)?.name))
        .filter(Boolean);

      return {
        id: Number(item.id) || 0,
        title,
        description: stringifyValue(item.description),
        iconUrl: icon?.url ?? "",
        iconAlt: icon?.alt ?? "",
        tags,
      } as HomeCapability;
    })
    .filter(Boolean) as HomeCapability[];
}

function mapLogoCloud(brandLogosLike: unknown): HomeLogoCloud | null {
  const entries = toArray<any>(brandLogosLike);
  if (entries.length === 0) return null;

  const logos = entries
    .map((raw) => {
      const item = unwrapStrapiData<any>(raw);
      if (!item) return null;

      const media = toMedia(item.media);
      if (!media?.url) return null;

      const title = stringifyValue(item.title) || undefined;

      return {
        url: media.url,
        alt: media.alt,
        link: stringifyValue(item.link),
        ...(title ? { title } : {}),
      };
    })
    .filter(Boolean) as Array<{ url: string; alt: string; link: string }>;

  if (logos.length === 0) return null;

  return { logos };
}

export async function fetchHomePageData(
  locale?: string,
): Promise<HomePageCmsData | null> {
  if (!hasCmsConfig()) return null;

  try {
    const params = buildHomePagePopulateQuery(locale);
    const payload = await fetchStrapiJson(
      `/api/homepage?${params.toString()}`,
    );

    // Single type — data is a single object, not an array
    const record = unwrapStrapiData<any>(payload?.data);
    if (!record) return null;

    const hero = mapHero(record.hero);
    const testimonials = mapTestimonials(record.testimonials);
    const logoCloud = mapLogoCloud(record.brand_logos);
    const capabilities = mapCapabilities(record.capabilities);

    return { hero, testimonials, logoCloud, capabilities };
  } catch (err) {
    console.error("[fetchHomePageData]", err);
    return null;
  }
}
