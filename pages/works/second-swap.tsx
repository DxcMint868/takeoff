import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../../components/nav";
import FooterComponent from "../../components/footer-component";
import SecondSwapCaseStudy from "../../components/second-swap-case-study";

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
      name: "SecondSwap",
      item: `${SITE_URL}/works/second-swap`,
    },
  ],
};

const SecondSwapPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{TAB_TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/works/second-swap`} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/works/second-swap`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        <SecondSwapCaseStudy />
        <FooterComponent />
      </div>
    </>
  );
};

export default SecondSwapPage;
