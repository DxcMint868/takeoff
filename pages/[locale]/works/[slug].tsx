import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import FooterComponent from "../../../components/footer-component";
import { HreflangLinks } from "../../../components/hreflang-links";
import Nav from "../../../components/nav";
import CaseStudyLoader from "../../../components/case-study-loader";
import { buildHreflangAlternates } from "../../../lib/i18n/hreflang";
import { localeAbsoluteUrl, siteOrigin } from "../../../lib/i18n/routing";
import type { AppLocaleCode } from "../../../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../../../lib/strapi/language";
import {
  fetchCaseStudyBySlugAcrossLocales,
  fetchCaseStudySlugs,
  type CaseStudyViewModel,
} from "../../../lib/strapi/case-studies";

const SITE_ROOT = siteOrigin();
const RESERVED_SLUGS = new Set<string>();

type DynamicCaseStudyPageProps = {
  caseStudy: CaseStudyViewModel;
  locale: AppLocaleCode;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchCaseStudySlugs();
  const paths: { params: { locale: string; slug: string } }[] = [];
  for (const locale of APP_LOCALE_CODES) {
    for (const slug of slugs.filter((s) => !RESERVED_SLUGS.has(s))) {
      paths.push({ params: { locale, slug } });
    }
  }
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<DynamicCaseStudyPageProps> = async (
  context,
) => {
  const rawLocale = context.params?.locale;
  const locale = typeof rawLocale === "string" ? rawLocale : "";
  if (!isAppLocale(locale)) return { notFound: true };

  const slug = String(context.params?.slug || "").trim();

  if (!slug || RESERVED_SLUGS.has(slug)) {
    return { notFound: true, revalidate: 60 };
  }

  const caseStudy = await fetchCaseStudyBySlugAcrossLocales(slug);
  if (!caseStudy) {
    return { notFound: true, revalidate: 120 };
  }

  return {
    props: {
      caseStudy,
      locale,
    },
    revalidate: 60,
  };
};

export default function DynamicCaseStudyPage({
  caseStudy,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonical = localeAbsoluteUrl(locale, `/works/${caseStudy.slug}`);
  const hreflangAlternates = buildHreflangAlternates(
    `/works/${caseStudy.slug}`,
  );
  const homeUrl = localeAbsoluteUrl(locale, "/");
  const worksUrl = localeAbsoluteUrl(locale, "/works");

  const metaTitle = `${caseStudy.title} — Case Study | Hoasen`;
  const metaDescription = caseStudy.shortDescription;
  const metaKeywords = caseStudy.heroTags.join(", ");
  const metaOgImage = caseStudy.heroImage?.url || `${SITE_ROOT}/og-image.png`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Works",
        item: worksUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy.title,
        item: canonical,
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
        <link rel="canonical" href={canonical} />
        <HreflangLinks alternates={hreflangAlternates} />

        <meta property="og:title" content={caseStudy.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={metaOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={caseStudy.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaOgImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        <CaseStudyLoader initialCaseStudy={caseStudy} />
        <FooterComponent />
      </div>
    </>
  );
}
