import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BlogPostLoader from "../../components/blog-post-loader";
import FooterComponent from "../../components/footer-component";
import Nav from "../../components/nav";
import type { BlogPostPreview } from "../../lib/blog-posts";
import {
  fetchAllBlogSlugsDefaultLocale,
  fetchBlogPostBySlugAcrossLocales,
} from "../../lib/strapi/blogs";
import { hasCmsConfig } from "../../lib/strapi/case-studies";

type BlogPostPageProps = {
  post: BlogPostPreview;
  bodyHtml: string;
};

const SITE_URL = "https://www.hoasen.io";

export const getStaticPaths: GetStaticPaths = async () => {
  const cmsSlugs = hasCmsConfig()
    ? await fetchAllBlogSlugsDefaultLocale()
    : [];

  return {
    paths: cmsSlugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = String(params?.slug ?? "");

  const cms = await fetchBlogPostBySlugAcrossLocales(slug);
  if (!cms) {
    return { notFound: true };
  }

  const html = (cms.content ?? "").trim();
  return {
    props: {
      post: cms,
      bodyHtml: cms.contentBlocks?.length ? "" : html,
    },
  };
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, bodyHtml }) => {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | Hoasen`;
  const ogImage =
    post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
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
