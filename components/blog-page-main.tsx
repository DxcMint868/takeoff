import Link from "next/link";
import { BLOG_POSTS } from "../lib/blog-posts";
import { BlogFeaturedCarousel } from "./blog-featured-carousel";
import { BlogPostList } from "./blog-post-list";
import { GradientGlow } from "./gradient-glow";

export type { BlogPostPreview } from "../lib/blog-posts";

const FEATURED_COUNT = 3;

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function BlogPageMain() {
  const featuredPosts = BLOG_POSTS.slice(0, Math.min(FEATURED_COUNT, BLOG_POSTS.length));
  const listPosts = BLOG_POSTS.slice(featuredPosts.length);

  return (
    <main className="relative box-border flex min-h-[70vh] w-full flex-col items-center overflow-x-clip bg-gradient-to-b from-[#0d0824] via-[#1b1333] to-[#1b1333] px-5 pb-24 pt-8 text-white mq900:px-6">
      <GradientGlow className="top-0 opacity-90" />
      <div className="relative flex w-full max-w-[1100px] flex-col items-stretch gap-14 mq900:gap-12">
        <div className="flex w-full flex-col gap-8">
          <Link
            href="/"
            className="group flex w-fit flex-row items-center gap-3 self-start text-left [text-decoration:none]"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-white-30 bg-dark/40 transition-colors group-hover:border-white-60">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
                aria-hidden
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-reg text-xs uppercase leading-4 tracking-[0.2em] text-white">
              Back
            </span>
          </Link>

          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="m-0 max-w-[720px] font-sora text-[52px] font-normal leading-[1.08] tracking-[0.02em] text-white mq450:text-4xl mq900:text-[44px]">
              Blog
            </h1>
          </div>
        </div>

        {featuredPosts.length > 0 ? (
          <BlogFeaturedCarousel posts={featuredPosts} formatDate={formatDate} />
        ) : null}

        <div className="flex mq900:mt-0 mt-20 w-full">
          <BlogPostList posts={listPosts} formatDate={formatDate} />

        </div>
      </div>
    </main>
  );
}
