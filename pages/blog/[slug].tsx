import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BlogPostArticle from "../../components/blog-post-article";
import FooterComponent from "../../components/footer-component";
import Nav from "../../components/nav";
import { BLOG_POSTS, type BlogPostPreview } from "../../lib/blog-posts";

type BlogPostPageProps = {
  post: BlogPostPreview;
  bodyHtml: string;
};

const SITE_URL = "https://www.hoasen.io";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: BLOG_POSTS.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = String(params?.slug ?? "");
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { notFound: true };

  return {
    props: {
      post,
      bodyHtml: post.content.trim(),
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
        <BlogPostArticle post={post} bodyHtml={bodyHtml} />
        <FooterComponent />
      </div>
    </>
  );
};

export default BlogPostPage;
