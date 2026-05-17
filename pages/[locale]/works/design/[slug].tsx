import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import FooterComponent from "../../../../components/footer-component";
import Nav from "../../../../components/nav";
import DesignProjectTemplate from "../../../../components/design-project-template";
import { localeAbsoluteUrl, siteOrigin } from "../../../../lib/i18n/routing";
import type { AppLocaleCode } from "../../../../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../../../../lib/strapi/language";
import {
  fetchDesignProjectBySlug,
  fetchDesignProjectSlugs,
  type DesignProjectViewModel,
} from "../../../../lib/strapi/design-projects";

const SITE_ROOT = siteOrigin();

type DesignProjectPageProps = {
  designProject: DesignProjectViewModel;
  locale: AppLocaleCode;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchDesignProjectSlugs();
  const paths: { params: { locale: string; slug: string } }[] = [];
  for (const locale of APP_LOCALE_CODES) {
    for (const slug of slugs) {
      paths.push({ params: { locale, slug } });
    }
  }
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<DesignProjectPageProps> = async (
  context,
) => {
  const rawLocale = context.params?.locale;
  const locale = typeof rawLocale === "string" ? rawLocale : "";
  if (!isAppLocale(locale)) return { notFound: true };

  const slug = String(context.params?.slug || "").trim();
  if (!slug) return { notFound: true, revalidate: 60 };

  const result = await fetchDesignProjectBySlug(slug);
  if (!result.designProject) return { notFound: true, revalidate: 120 };

  return {
    props: { designProject: result.designProject, locale },
    revalidate: 60,
  };
};

export default function DesignProjectPage({
  designProject,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonical = localeAbsoluteUrl(
    locale,
    `/works/design/${designProject.slug}`,
  );
  const homeUrl = localeAbsoluteUrl(locale, "/");
  const worksUrl = localeAbsoluteUrl(locale, "/works");
  const metaTitle = `${designProject.title} — Design Case Study | Hoasen`;
  const metaDescription = `Explore the ${designProject.title} brand identity designed by Hoasen.`;
  const metaOgImage =
    designProject.heroImage?.url || `${SITE_ROOT}/og-image.png`;

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
        name: designProject.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {designProject.heroTags.length > 0 && (
          <meta
            name="keywords"
            content={designProject.heroTags.join(", ")}
          />
        )}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={designProject.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={metaOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:title" content={designProject.title} />
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
        <DesignProjectTemplate designProject={designProject} />
        <FooterComponent />
      </div>
    </>
  );
}
