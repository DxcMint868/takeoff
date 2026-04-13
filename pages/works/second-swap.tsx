import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Nav from "../../components/nav";
import FooterComponent from "../../components/footer-component";
import SecondSwapCaseStudy from "../../components/second-swap-case-study";
import CaseStudyTemplate from "../../components/case-study-template";
import {
  fetchCaseStudyBySlug,
  type CaseStudyViewModel,
} from "../../lib/strapi/case-studies";

const SITE_URL = "https://www.hoasen.io";
const TAB_TITLE =
  "SecondSwap — Multi-chain Vesting Marketplace Case Study | Hoasen";
const TITLE =
  "SecondSwap × Hoasen — Tradable vesting contracts across Avalanche, Ethereum & Solana";
const DESCRIPTION =
  "How Hoasen delivered smart contracts, a multi-chain marketplace, and analytics for a DeFi vesting protocol with $6M peak TVL and 5,000+ users.";
const KEYWORDS =
  "DeFi, vesting, tokenization, Avalanche, Ethereum, Solana, marketplace, smart contracts";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type SecondSwapPageProps = {
  caseStudy: CaseStudyViewModel | null;
};

export const getStaticProps: GetStaticProps<SecondSwapPageProps> = async () => {
  const result = await fetchCaseStudyBySlug("secondswap"); // real slug
  return {
    props: {
      caseStudy: result.caseStudy,
    },
    revalidate: 3600,
  };
};

const SecondSwapPage: NextPage<SecondSwapPageProps> = ({ caseStudy }) => {
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
        name: caseStudy?.title || "SecondSwap",
        item: `${SITE_URL}/works/second-swap`,
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
        <link rel="canonical" href={`${SITE_URL}/works/second-swap`} />

        <meta property="og:title" content={caseStudy?.title || TITLE} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/works/second-swap`} />
        <meta property="og:image" content={metaOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={caseStudy?.title || TITLE} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaOgImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        {caseStudy ? (
          <CaseStudyTemplate caseStudy={caseStudy} />
        ) : (
          <SecondSwapCaseStudy />
        )}
        <FooterComponent />
      </div>
    </>
  );
};

export default SecondSwapPage;
