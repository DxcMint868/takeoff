import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import FooterComponent from "../components/footer-component";
import Nav from "../components/nav";
import AboutPageMain from "../components/about-page-main";
import type { TeamPageViewModel } from "../lib/strapi/team-page";
import { fetchTeamPageData } from "../lib/strapi/team-page";

type AboutUsPageProps = {
  teamPage: TeamPageViewModel | null;
};

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async () => {
  const teamPage = await fetchTeamPageData("en");
  return {
    props: { teamPage },
    revalidate: 60,
  };
};

const SITE_URL = "https://www.hoasen.io";
const PAGE_URL = `${SITE_URL}/about-us`;
const DEFAULT_TITLE = "About Us | Hoasen";
const DEFAULT_DESCRIPTION =
  "Hoasen is a blockchain and fintech development studio based in the UAE. We partner with startups and enterprises to design, build, and ship products on chain — from smart contracts and DApps to AI-driven fintech.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const AboutUs: NextPage<AboutUsPageProps> = ({ teamPage }) => {
  const title =
    teamPage?.seo?.metaTitle?.trim() || DEFAULT_TITLE;
  const description =
    teamPage?.seo?.metaDescription?.trim() || DEFAULT_DESCRIPTION;
  const ogImage =
    teamPage?.seo?.ogImageUrl?.trim() || DEFAULT_OG_IMAGE;

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
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

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
        <AboutPageMain initialTeamPage={teamPage} />
        <FooterComponent />
      </div>
    </>
  );
};

export default AboutUs;
