import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BlogPostLoader from "../../../components/blog-post-loader";
import FooterComponent from "../../../components/footer-component";
import { HreflangLinks } from "../../../components/hreflang-links";
import Nav from "../../../components/nav";
import type { BlogPostPreview } from "../../../lib/blog-posts";
import type { HreflangAlternate } from "../../../lib/i18n/hreflang";
import { localeAbsoluteUrl, siteOrigin } from "../../../lib/i18n/routing";
import type { AppLocaleCode } from "../../../lib/strapi/language";
import { APP_LOCALE_CODES, isAppLocale } from "../../../lib/strapi/language";
import {
  fetchAllBlogSlugsDefaultLocale,
  fetchBlogPostFromStrapi,
  resolveBlogHreflangAlternates,
} from "../../../lib/strapi/blogs";
import { hasCmsConfig } from "../../../lib/strapi/case-studies";

type BlogPostPageProps = {
  post: BlogPostPreview;
  bodyHtml: string;
  locale: AppLocaleCode;
  hreflangAlternates: HreflangAlternate[];
};

const SITE_ROOT = siteOrigin();

export const getStaticPaths: GetStaticPaths = async () => {
  const cmsSlugs = hasCmsConfig()
    ? await fetchAllBlogSlugsDefaultLocale()
    : [];
  const paths: { params: { locale: string; slug: string } }[] = [];
  for (const locale of APP_LOCALE_CODES) {
    for (const slug of cmsSlugs) {
      paths.push({ params: { locale, slug } });
    }
  }
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const rawLocale = params?.locale;
  const locale = typeof rawLocale === "string" ? rawLocale : "";
  if (!isAppLocale(locale)) return { notFound: true };

  const slug = String(params?.slug ?? "");
  const post = await fetchBlogPostFromStrapi(slug, locale);
  if (!post) {
    return { notFound: true };
  }

  const html = (post.content ?? "").trim();
  const hreflangAlternates = await resolveBlogHreflangAlternates(
    post.documentId,
    post.slug,
  );

  return {
    props: {
      post,
      bodyHtml: post.contentBlocks?.length ? "" : html,
      locale,
      hreflangAlternates,
    },
  };
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({
  post,
  bodyHtml,
  locale,
  hreflangAlternates,
}) => {
  const canonical = localeAbsoluteUrl(locale, `/blog/${post.slug}`);
  const title = `${post.title} | Hoasen`;
  const ogImage =
    post.image.startsWith("http") ? post.image : `${SITE_ROOT}${post.image}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <HreflangLinks alternates={hreflangAlternates} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent scrollThreshold={80} />
        <BlogPostLoader initialPost={post} initialBodyHtml={bodyHtml} />
        <FooterComponent />
      </div>
    </>
  );
};

export default BlogPostPage;
