import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import FooterComponent from "../../../components/footer-component";
import Nav from "../../../components/nav";
import DesignProjectTemplate from "../../../components/design-project-template";
import {
  fetchDesignProjectBySlug,
  fetchDesignProjectSlugs,
  type DesignProjectViewModel,
} from "../../../lib/strapi/design-projects";

const SITE_URL = "https://www.hoasen.io";

type DesignProjectPageProps = {
  designProject: DesignProjectViewModel;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchDesignProjectSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<DesignProjectPageProps> = async (
  context,
) => {
  const slug = String(context.params?.slug || "").trim();
  if (!slug) return { notFound: true, revalidate: 60 };

  const result = await fetchDesignProjectBySlug(slug);
  if (!result.designProject) return { notFound: true, revalidate: 120 };

  return {
    props: { designProject: result.designProject },
    revalidate: 60,
  };
};

export default function DesignProjectPage({
  designProject,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonical = `${SITE_URL}/works/design/${designProject.slug}`;
  const metaTitle = `${designProject.title} — Design Case Study | Hoasen`;
  const metaDescription = `Explore the ${designProject.title} brand identity designed by Hoasen.`;
  const metaOgImage =
    designProject.heroImage?.url || `${SITE_URL}/og-image.png`;

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
