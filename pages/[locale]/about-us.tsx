import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import FooterComponent from "../../components/footer-component";
import Nav from "../../components/nav";
import AboutPageMain from "../../components/about-page-main";
import { localeAbsoluteUrl, siteOrigin } from "../../lib/i18n/routing";
import type { AppLocaleCode } from "../../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../../lib/strapi/language";
import type { TeamPageViewModel } from "../../lib/strapi/team-page";
import { fetchTeamPageData } from "../../lib/strapi/team-page";

type AboutUsPageProps = {
  teamPage: TeamPageViewModel | null;
  locale: AppLocaleCode;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: APP_LOCALE_CODES.map((locale) => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async (
  ctx,
) => {
  const raw = ctx.params?.locale;
  const locale = typeof raw === "string" ? raw : "";
  if (!isAppLocale(locale)) return { notFound: true };

  const teamPage = await fetchTeamPageData(locale);
  return {
    props: { teamPage, locale },
    revalidate: 60,
  };
};

const SITE_ROOT = siteOrigin();
const DEFAULT_TITLE = "About Us | Hoasen";
const DEFAULT_DESCRIPTION =
  "Hoasen is a blockchain and fintech development studio based in the UAE. We partner with startups and enterprises to design, build, and ship products on chain — from smart contracts and DApps to AI-driven fintech.";
const DEFAULT_OG_IMAGE = `${SITE_ROOT}/og-image.png`;

const AboutUs: NextPage<AboutUsPageProps> = ({ teamPage, locale }) => {
  const canonical = localeAbsoluteUrl(locale, "/about-us");
  const homeUrl = localeAbsoluteUrl(locale, "/");

  const title = teamPage?.seo?.metaTitle?.trim() || DEFAULT_TITLE;
  const description =
    teamPage?.seo?.metaDescription?.trim() || DEFAULT_DESCRIPTION;
  const ogImage =
    teamPage?.seo?.ogImageUrl?.trim() || DEFAULT_OG_IMAGE;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: "About Us", item: canonical },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_ROOT}/#website` },
    about: { "@id": `${SITE_ROOT}/#organization` },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
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
