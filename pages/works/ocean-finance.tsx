import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../../components/nav";
import FooterComponent from "../../components/footer-component";
import OceanCaseStudy from "../../components/ocean-case-study";

const SITE_URL = "https://www.hoasen.io";
const TAB_TITLE = "Ocean Finance — RWA Trade Finance Case Study | Hoasen";
const TITLE = "Ocean Finance × Hoasen — RWA tokenization for trade finance";
const DESCRIPTION =
  "How Hoasen delivered tokenization, NAV pipeline, and admin tooling for institutional trade finance on Avalanche.";
const KEYWORDS =
  "RWA, trade finance, tokenization, Avalanche, NAV, institutional";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/works` },
    { "@type": "ListItem", position: 3, name: "Ocean Finance", item: `${SITE_URL}/works/ocean-finance` },
  ],
};

const OceanPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{TAB_TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/works/ocean-finance`} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/works/ocean-finance`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        <OceanCaseStudy />
        <FooterComponent />
      </div>
    </>
  );
};

export default OceanPage;
