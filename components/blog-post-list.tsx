"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPostPreview } from "../lib/blog-posts";
import { useTranslation } from "../lib/i18n/use-translation";
import { useLocalizedPath } from "../lib/i18n/use-localized-path";
import { BlogPostMetaRow } from "./blog-post-meta-row";

type BlogPostListProps = {
  posts: BlogPostPreview[];
  formatDate: (iso: string) => string;
};

export function BlogPostList({ posts, formatDate }: BlogPostListProps) {
  const { readSeconds } = useTranslation();
  const lp = useLocalizedPath();
  if (posts.length === 0) return null;

  return (
    <div className="flex w-full flex-col">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="border-b border-solid border-white/20 py-10 last:border-b-0 last:pb-0 mq900:py-8"
        >
          <div className="flex flex-row gap-8 mq900:gap-5">
            <Link
              href={lp(`/blog/${post.slug}`)}
              className="relative block h-[170px] w-[170px] aspect-square shrink-0 overflow-hidden rounded-xl mq900:h-[100px] mq900:w-[100px]"
            >
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 170px"
                unoptimized
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="mq900:hidden inline w-fit rounded-full bg-white/[0.08] px-3 py-1 font-reg text-xs font-medium tracking-[0.02em] text-white/70">
                {readSeconds(post.timeToRead)}
              </span>
              <h2 className="mt-3 mq900:mt-0 font-sora text-xl mq900:text-[16px] font-semibold leading-snug tracking-[0.02em] text-white mq450:text-lg">
                <Link
                  href={lp(`/blog/${post.slug}`)}
                  className="block text-inherit [text-decoration:none] outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-dark mq900:line-clamp-2"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="m-0 mt-3 mq900:mt-0 line-clamp-2 font-reg text-sm font-light leading-[22px] tracking-[0.02em] text-white/70">
                {post.excerpt}
              </p>
              <div className="mq900:hidden">
                <BlogPostMetaRow post={post} dateFormatter={formatDate} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
