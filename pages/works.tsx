import type { GetStaticProps, NextPage } from "next";
import type { SSRConfig } from "next-i18next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import FooterComponent from "../components/footer-component";
import Nav from "../components/nav";
import WorksPageMain from "../components/works-page-main";
import {
  CORE_PROJECT_CARDS,
  EXTRA_PAGE_PROJECT_CARDS,
  OCEAN_FINANCE_PROJECT,
  type WorkProjectCard,
  type WorkTagSpec,
} from "../components/work-examples-portfolio";
import { loadCommonTranslations } from "../lib/i18n/load-common";
import { fetchWorksData } from "../lib/strapi/case-studies";

const SITE_URL = "https://www.hoasen.io";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Works",
      item: `${SITE_URL}/works`,
    },
  ],
};

type WorksPageProps = SSRConfig & {
  featuredProject: WorkProjectCard | null;
  projectCards: WorkProjectCard[];
  filterChips: WorkTagSpec[];
};

function buildFallbackFilterChips(items: WorkProjectCard[]) {
  const map = new Map<string, WorkTagSpec>();
  for (const item of items) {
    for (const tag of item.tags) {
      if (!map.has(tag.label)) {
        map.set(tag.label, tag);
      }
    }
  }
  return Array.from(map.values());
}

export const getStaticProps: GetStaticProps<WorksPageProps> = async (
  context,
) => {
  const tr = await loadCommonTranslations(context.locale);
  const cmsWorks = await fetchWorksData();

  const fallbackFeatured = OCEAN_FINANCE_PROJECT;
  const fallbackCards = [...CORE_PROJECT_CARDS, ...EXTRA_PAGE_PROJECT_CARDS];
  const fallbackFilterChips = buildFallbackFilterChips([
    fallbackFeatured,
    ...fallbackCards,
  ]);

  if (
    cmsWorks.source === "cms" &&
    (cmsWorks.featuredProject || cmsWorks.projectCards.length > 0)
  ) {
    return {
      props: {
        ...tr,
        featuredProject: cmsWorks.featuredProject,
        projectCards: cmsWorks.projectCards,
        filterChips:
          cmsWorks.filterChips.length > 0
            ? cmsWorks.filterChips
            : fallbackFilterChips,
      },
      revalidate: 60,
    };
  }

  return {
    props: {
      ...tr,
      featuredProject: fallbackFeatured,
      projectCards: fallbackCards,
      filterChips: fallbackFilterChips,
    },
    revalidate: 60,
  };
};

const Works: NextPage<WorksPageProps> = ({
  featuredProject,
  projectCards,
  filterChips,
}) => {
  const { t } = useTranslation("common");
  const portfolioItems = [featuredProject, ...projectCards].filter(
    (item): item is WorkProjectCard => !!item,
  );

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hoasen Project Portfolio",
    numberOfItems: portfolioItems.length,
    itemListElement: portfolioItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <>
      <Head>
        <title>{t("meta.works.title")}</title>
        <meta name="description" content={t("meta.works.description")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/works`} />

        <meta property="og:title" content={t("meta.works.title")} />
        <meta property="og:description" content={t("meta.works.description")} />
        <meta property="og:url" content={`${SITE_URL}/works`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={t("meta.works.title")} />
        <meta name="twitter:description" content={t("meta.works.description")} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        <WorksPageMain
          featuredProject={featuredProject}
          projectCards={projectCards}
          filterChips={filterChips}
        />
        <FooterComponent />
      </div>
    </>
  );
};

export default Works;
