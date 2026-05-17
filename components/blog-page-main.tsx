"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "../contexts/locale-context";
import { useTranslation } from "../lib/i18n/use-translation";
import { useLocalizedPath } from "../lib/i18n/use-localized-path";
import type { BlogPostPreview } from "../lib/blog-posts";
import { BlogFeaturedCarousel } from "./blog-featured-carousel";
import { BlogPostList } from "./blog-post-list";
import { ContentLoadingOverlay } from "./content-loading-overlay";
import { GradientGlow } from "./gradient-glow";

export type { BlogPostPreview } from "../lib/blog-posts";

export default function BlogPageMain() {
  const { locale } = useLocale();
  const { t, formatBlogDate } = useTranslation();
  const lp = useLocalizedPath();
  const [featuredPosts, setFeaturedPosts] = useState<BlogPostPreview[]>([]);
  const [listPosts, setListPosts] = useState<BlogPostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(
          `/api/blogs?locale=${encodeURIComponent(locale)}`,
        );
        const data = (await res.json()) as {
          source?: string;
          featuredPosts?: BlogPostPreview[];
          listPosts?: BlogPostPreview[];
        };
        if (cancelled) return;
        if (
          data.source === "cms" &&
          Array.isArray(data.featuredPosts) &&
          Array.isArray(data.listPosts)
        ) {
          setFeaturedPosts(data.featuredPosts);
          setListPosts(data.listPosts);
        } else {
          setFeaturedPosts([]);
          setListPosts([]);
        }
      } catch {
        if (!cancelled) {
          setFeaturedPosts([]);
          setListPosts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const empty =
    !loading && featuredPosts.length === 0 && listPosts.length === 0;

  return (
    <main className="relative box-border flex min-h-[70vh] w-full flex-col items-center overflow-x-clip bg-gradient-to-b from-[#0d0824] via-[#1b1333] to-[#1b1333] px-5 pb-24 pt-8 text-white mq900:px-6">
      <ContentLoadingOverlay visible={loading} fullViewport />
      <GradientGlow className="top-0 opacity-90" />
      <div className="relative flex w-full max-w-[1100px] flex-col items-stretch gap-14 mq900:gap-12">
        <div className="flex w-full flex-col gap-8">
          <Link
            href={lp("/")}
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
              {t("blog.back")}
            </span>
          </Link>

          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="m-0 max-w-[720px] font-sora text-[52px] font-normal leading-[1.08] tracking-[0.02em] text-white mq450:text-4xl mq900:text-[44px]">
              {t("blog.title")}
            </h1>
            {empty ? (
              <p className="m-0 max-w-md font-reg text-sm leading-relaxed text-white/70">
                {t("blog.noPosts")}
              </p>
            ) : null}
          </div>
        </div>

        {featuredPosts.length > 0 ? (
          <BlogFeaturedCarousel posts={featuredPosts} formatDate={formatBlogDate} />
        ) : null}

        <div className="mt-20 flex w-full mq900:mt-0">
          <BlogPostList posts={listPosts} formatDate={formatBlogDate} />
        </div>
      </div>
    </main>
  );
}
