"use client";

import type { BlogPostPreview } from "../lib/blog-posts";
import { useTranslation } from "../lib/i18n/use-translation";
import { BlogShareButton } from "./blog-share-button";

type BlogPostMetaRowProps = {
  post: BlogPostPreview;
  dateFormatter: (iso: string) => string;
};

export function BlogPostMetaRow({ post, dateFormatter }: BlogPostMetaRowProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-auto flex w-full flex-row items-center justify-between gap-4 pt-6">
      <p className="m-0 font-reg text-[11px] font-medium leading-tight tracking-[0.12em] text-white-60">
        {t("meta.by")} {post.author} • {dateFormatter(post.publishedAt)}
      </p>
      <BlogShareButton slug={post.slug} title={post.title} />
    </div>
  );
}
