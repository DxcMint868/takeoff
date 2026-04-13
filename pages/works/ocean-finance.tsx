import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Nav from "../../components/nav";
import FooterComponent from "../../components/footer-component";
import OceanCaseStudy from "../../components/ocean-case-study";
import CaseStudyTemplate from "../../components/case-study-template";
import {
  fetchCaseStudyBySlug,
  type CaseStudyViewModel,
} from "../../lib/strapi/case-studies";

const SITE_URL = "https://www.hoasen.io";
const TAB_TITLE = "Ocean Finance — RWA Trade Finance Case Study | Hoasen";
const TITLE = "Ocean Finance × Hoasen — RWA tokenization for trade finance";
const DESCRIPTION =
  "How Hoasen delivered tokenization, NAV pipeline, and admin tooling for institutional trade finance on Avalanche.";
const KEYWORDS =
  "RWA, trade finance, tokenization, Avalanche, NAV, institutional";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type OceanPageProps = {
  caseStudy: CaseStudyViewModel | null;
};

export const getStaticProps: GetStaticProps<OceanPageProps> = async () => {
  const result = await fetchCaseStudyBySlug("ocean");
  return {
    props: {
      caseStudy: result.caseStudy,
    },
    revalidate: 3600,
  };
};

const OceanPage: NextPage<OceanPageProps> = ({ caseStudy }) => {
  const metaTitle = caseStudy
    ? `${caseStudy.title} — Case Study | Hoasen`
    : TAB_TITLE;
  const metaDescription = caseStudy?.shortDescription || DESCRIPTION;
  const metaKeywords = caseStudy?.heroTags.join(", ") || KEYWORDS;
  const metaOgImage = caseStudy?.heroImage?.url || OG_IMAGE;

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
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy?.title || "Ocean Finance",
        item: `${SITE_URL}/works/ocean-finance`,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/works/ocean-finance`} />

        <meta property="og:title" content={caseStudy?.title || TITLE} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/works/ocean-finance`} />
        <meta property="og:image" content={metaOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={caseStudy?.title || TITLE} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaOgImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        {caseStudy ? (
          <CaseStudyTemplate caseStudy={caseStudy} />
        ) : (
          <OceanCaseStudy />
        )}
        <FooterComponent />
      </div>
    </>
  );
};

export default OceanPage;
