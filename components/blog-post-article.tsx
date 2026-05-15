"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPostPreview } from "../lib/blog-posts";
import type { StrapiBlocksNode } from "../lib/strapi/case-studies";
import { useTranslation } from "../lib/i18n/use-translation";
import { useLocalizedPath } from "../lib/i18n/use-localized-path";
import { BlogShareButton } from "./blog-share-button";
import { GradientGlow } from "./gradient-glow";
import StrapiBlocks from "./strapi-blocks";

type BlogPostArticleProps = {
  post: BlogPostPreview;
  /** Local/static HTML body */
  bodyHtml?: string;
  /** Strapi blocks (overrides `post.contentBlocks` when passed) */
  contentBlocks?: StrapiBlocksNode[];
};

const bodyClassName =
  "blog-post-body mt-10 font-reg text-base font-light leading-[28px] tracking-[0.02em] text-white/70 [&_a]:text-purple [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0 [&_p+p]:mt-8 [&_strong]:font-medium [&_strong]:text-white [&_h2]:mt-14 [&_h2]:font-sora [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:tracking-[0.02em] [&_h2]:text-white [&_h2:first-of-type]:mt-12 [&_ul]:my-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-8 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-3 [&_blockquote]:my-10 [&_blockquote]:border-l-2 [&_blockquote]:border-purple/60 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-white/80";

export function BlogPostArticle({
  post,
  bodyHtml = "",
  contentBlocks: contentBlocksProp,
}: BlogPostArticleProps) {
  const { t, readSeconds, formatBlogDate } = useTranslation();
  const lp = useLocalizedPath();
  const blocks = contentBlocksProp ?? post.contentBlocks;
  const remoteCover =
    typeof post.image === "string" &&
    (post.image.startsWith("http://") || post.image.startsWith("https://"));

  return (
    <article className="relative box-border flex w-full flex-col items-center overflow-x-clip px-5 pb-28 pt-8 text-white mq900:px-6">
      <GradientGlow className="top-0 opacity-90" />

      <div className="relative w-full max-w-[1040px]">
        <Link
          href={lp("/blog")}
          className="group mb-8 inline-flex flex-row items-center gap-3 self-start [text-decoration:none] mq900:mb-6"
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

        <div className="relative h-[450px] w-full overflow-hidden rounded-[24px] mq900:aspect-[4/3] mq900:h-[300px] mq900:rounded-2xl">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1040px) 100vw, 1040px"
            priority
            unoptimized={remoteCover || post.image.endsWith(".svg")}
          />
        </div>

        <div className="mx-auto mt-10 w-full mq900:mt-8">
          <span className="inline-block rounded-full bg-white/[0.08] px-3 py-1 font-reg text-xs font-medium tracking-[0.02em] text-white/70">
            {readSeconds(post.timeToRead)}
          </span>

          <h1 className="mt-6 font-sora text-[36px] font-semibold leading-[1.2] tracking-[0.02em] text-white mq450:text-[26px] mq900:text-[28px] mq900:leading-[1.25]">
            {post.title}
          </h1>

          {blocks && blocks.length > 0 ? (
            <StrapiBlocks blocks={blocks} className={bodyClassName} />
          ) : (
            <div
              className={bodyClassName}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          )}

          <div className="mt-14 flex justify-center mq900:mt-12">
            <BlogShareButton
              slug={post.slug}
              title={post.title}
              className="size-11 bg-purple shadow-[0_0_24px_rgba(115,95,212,0.35)] [&_img]:size-[18px]"
            />
          </div>

          <p className="mt-10 text-center font-reg text-[11px] font-medium leading-relaxed tracking-[0.14em] text-white/70 mq900:mt-8">
            {t("meta.by")} {post.author} • {formatBlogDate(post.publishedAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default BlogPostArticle;
