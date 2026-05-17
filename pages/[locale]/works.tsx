import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import FooterComponent from "../../components/footer-component";
import Nav from "../../components/nav";
import WorksPageMain from "../../components/works-page-main";
import {
  type WorkProjectCard,
  type WorkTagSpec,
} from "../../components/work-examples-portfolio";
import { localeAbsoluteUrl, siteOrigin } from "../../lib/i18n/routing";
import type { AppLocaleCode } from "../../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../../lib/strapi/language";
import { fetchWorksData } from "../../lib/strapi/case-studies";
import {
  fetchDesignProjectCards,
  type DesignProjectCard,
} from "../../lib/strapi/design-projects";

const SITE_ROOT = siteOrigin();
const OG_IMAGE = `${SITE_ROOT}/og-image.png`;
const WORKS_TITLE = "Our Work Examples | Hoasen";
const WORKS_DESCRIPTION =
  "Explore Hoasen's portfolio: Ocean Finance (RWA tokenisation), PowerTrade (crypto options), Crypto Paradise, bspin, TripTips, and more — spanning fintech, blockchain, and enterprise software.";

type WorksPageProps = {
  featuredProject: WorkProjectCard | null;
  projectCards: WorkProjectCard[];
  filterChips: WorkTagSpec[];
  designProjectCards: DesignProjectCard[];
  locale: AppLocaleCode;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: APP_LOCALE_CODES.map((locale) => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<WorksPageProps> = async (ctx) => {
  const raw = ctx.params?.locale;
  const locale = typeof raw === "string" ? raw : "";
  if (!isAppLocale(locale)) return { notFound: true };

  const [cmsWorks, designProjectCards] = await Promise.all([
    fetchWorksData(),
    fetchDesignProjectCards(),
  ]);

  return {
    props: {
      featuredProject: cmsWorks.featuredProject,
      projectCards: cmsWorks.projectCards,
      filterChips: cmsWorks.filterChips,
      designProjectCards,
      locale,
    },
    revalidate: 60,
  };
};

const Works: NextPage<WorksPageProps> = ({
  featuredProject,
  projectCards,
  filterChips,
  designProjectCards,
  locale,
}) => {
  const canonical = localeAbsoluteUrl(locale, "/works");
  const homeUrl = localeAbsoluteUrl(locale, "/");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Works",
        item: canonical,
      },
    ],
  };

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
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={WORKS_TITLE} />
        <meta property="og:description" content={WORKS_DESCRIPTION} />
        <meta property="og:url" content={canonical} />
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
