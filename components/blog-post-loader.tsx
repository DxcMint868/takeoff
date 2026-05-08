"use client";

import { useEffect, useState } from "react";
import type { BlogPostPreview } from "../lib/blog-posts";
import { useLocale } from "../contexts/locale-context";
import BlogPostArticle from "./blog-post-article";

type BlogPostLoaderProps = {
  initialPost: BlogPostPreview;
  initialBodyHtml: string;
};

/** Refetches article when UI locale changes (Strapi i18n). */
export default function BlogPostLoader({
  initialPost,
  initialBodyHtml,
}: BlogPostLoaderProps) {
  const { locale } = useLocale();
  const [post, setPost] = useState(initialPost);
  const [bodyHtml, setBodyHtml] = useState(initialBodyHtml);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/blogs/${encodeURIComponent(initialPost.slug)}?locale=${encodeURIComponent(locale)}`,
        );
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { post?: BlogPostPreview };
        if (!data.post || cancelled) return;
        setPost(data.post);
        const html = (data.post.content ?? "").trim();
        setBodyHtml(data.post.contentBlocks?.length ? "" : html);
      } catch {
        /* keep SSR props */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale, initialPost.slug]);

  return (
    <BlogPostArticle post={post} bodyHtml={bodyHtml} />
  );
}
