import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BlogPageMain from "../../components/blog-page-main";
import FooterComponent from "../../components/footer-component";
import Nav from "../../components/nav";
import { localeAbsoluteUrl, siteOrigin } from "../../lib/i18n/routing";
import type { AppLocaleCode } from "../../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../../lib/strapi/language";

const SITE_ROOT = siteOrigin();
const OG_IMAGE = `${SITE_ROOT}/og-image.png`;
const TITLE = "Blog | Hoasen";
const DESCRIPTION =
  "Articles from Hoasen on blockchain development, fintech, and shipping products on chain.";

type BlogPageProps = { locale: AppLocaleCode };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: APP_LOCALE_CODES.map((locale) => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BlogPageProps> = async (ctx) => {
  const raw = ctx.params?.locale;
  const locale = typeof raw === "string" ? raw : "";
  if (!isAppLocale(locale)) return { notFound: true };
  return { props: { locale } };
};

const Blog: NextPage<BlogPageProps> = ({ locale }) => {
  const canonical = localeAbsoluteUrl(locale, "/blog");
  const homeUrl = localeAbsoluteUrl(locale, "/");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: canonical },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": `${SITE_ROOT}/#website` },
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={canonical} />
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
        <BlogPageMain />
        <FooterComponent />
      </div>
    </>
  );
};

export default Blog;
