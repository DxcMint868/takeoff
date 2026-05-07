import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import FooterComponent from "../components/footer-component";
import Nav from "../components/nav";
import AboutPageMain from "../components/about-page-main";

type AboutUsPageProps = Record<string, never>;

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async () => {
  return {
    props: {},
  };
};

const SITE_URL = "https://www.hoasen.io";
const PAGE_URL = `${SITE_URL}/about-us`;
const TITLE = "About Us | Hoasen";
const DESCRIPTION =
  "Hoasen is a blockchain and fintech development studio based in the UAE. We partner with startups and enterprises to design, build, and ship products on chain — from smart contracts and DApps to AI-driven fintech.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About Us", item: PAGE_URL },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}/#webpage`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
};

const AboutUs: NextPage<AboutUsPageProps> = () => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        <AboutPageMain />
        <FooterComponent />
      </div>
    </>
  );
};

export default AboutUs;
