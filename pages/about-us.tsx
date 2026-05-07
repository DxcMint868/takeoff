import type { GetStaticProps, NextPage } from "next";
import type { SSRConfig } from "next-i18next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import FooterComponent from "../components/footer-component";
import Nav from "../components/nav";
import AboutPageMain from "../components/about-page-main";
import { loadCommonTranslations } from "../lib/i18n/load-common";

type AboutUsPageProps = SSRConfig;

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async (
  context,
) => {
  return {
    props: {
      ...(await loadCommonTranslations(context.locale)),
    },
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
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("meta.about.title")}</title>
        <meta name="description" content={t("meta.about.description")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:title" content={t("meta.about.title")} />
        <meta property="og:description" content={t("meta.about.description")} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={t("meta.about.title")} />
        <meta name="twitter:description" content={t("meta.about.description")} />
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
