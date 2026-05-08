import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
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
import { fetchWorksData } from "../lib/strapi/case-studies";
import {
  fetchDesignProjectCards,
  type DesignProjectCard,
} from "../lib/strapi/design-projects";

const SITE_URL = "https://www.hoasen.io";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const WORKS_TITLE = "Our Work Examples | Hoasen";
const WORKS_DESCRIPTION =
  "Explore Hoasen's portfolio: Ocean Finance (RWA tokenisation), PowerTrade (crypto options), Crypto Paradise, bspin, TripTips, and more — spanning fintech, blockchain, and enterprise software.";

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

type WorksPageProps = {
  featuredProject: WorkProjectCard | null;
  projectCards: WorkProjectCard[];
  filterChips: WorkTagSpec[];
  designProjectCards: DesignProjectCard[];
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

export const getStaticProps: GetStaticProps<WorksPageProps> = async () => {
  const [cmsWorks, designProjectCards] = await Promise.all([
    fetchWorksData(),
    fetchDesignProjectCards(),
  ]);

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
        featuredProject: cmsWorks.featuredProject,
        projectCards: cmsWorks.projectCards,
        filterChips:
          cmsWorks.filterChips.length > 0
            ? cmsWorks.filterChips
            : fallbackFilterChips,
        designProjectCards,
      },
      revalidate: 60,
    };
  }

  return {
    props: {
      featuredProject: fallbackFeatured,
      projectCards: fallbackCards,
      filterChips: fallbackFilterChips,
      designProjectCards,
    },
    revalidate: 60,
  };
};

const Works: NextPage<WorksPageProps> = ({
  featuredProject,
  projectCards,
  filterChips,
  designProjectCards,
}) => {
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
        <title>{WORKS_TITLE}</title>
        <meta name="description" content={WORKS_DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/works`} />

        <meta property="og:title" content={WORKS_TITLE} />
        <meta property="og:description" content={WORKS_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/works`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={WORKS_TITLE} />
        <meta name="twitter:description" content={WORKS_DESCRIPTION} />
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
          designProjectCards={designProjectCards}
        />
        <FooterComponent />
      </div>
    </>
  );
};

export default Works;
