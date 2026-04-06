import type { NextPage } from "next";
import Head from "next/head";
import FooterComponent from "../components/footer-component";
import Nav from "../components/nav";
import WorksPageMain from "../components/works-page-main";

const SITE_URL = "https://www.hoasen.io";
const TITLE = "Our Work Examples | Hoasen";
const DESCRIPTION =
  "Explore Hoasen's portfolio: Ocean Finance (RWA tokenisation), PowerTrade (crypto options), Crypto Paradise, bspin, TripTips, and more — spanning fintech, blockchain, and enterprise software.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/works` },
  ],
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hoasen Project Portfolio",
  numberOfItems: 6,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ocean Finance",
      description:
        "End-to-end tokenized fund infrastructure for institutional investors. Smart contract development, web application delivery, and on-chain data infrastructure.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "PowerTrade",
      description:
        "An altcoin options exchange with a sleek portfolio tracker for managing crypto assets and trading options.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Crypto Paradise",
      description:
        "A crypto lifestyle community and mini app powered by the $SURF token, offering alpha, education, and investment opportunities.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "bspin",
      description:
        "A Bitcoin casino offering slots, poker, sports betting, and live games with provably fair gameplay and crypto deposits.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "TripTips",
      description:
        "A curated city guide app for discovering the best local spots to eat, drink, shop, and explore worldwide.",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Spinly",
      description:
        "A crypto-native casino platform blending retro pixel-art aesthetics with responsible gaming tools and 4,000+ games.",
    },
  ],
};

const Works: NextPage = () => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/works`} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/works`} />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent />
        <WorksPageMain />
        <FooterComponent />
      </div>
    </>
  );
};

export default Works;
