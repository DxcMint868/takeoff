"use client";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { BlogPostPreview } from "../lib/blog-posts";
import { withLocale } from "../lib/i18n/routing";
import { useLocale } from "../contexts/locale-context";
import BlogPostArticle from "./blog-post-article";
import { ContentLoadingOverlay } from "./content-loading-overlay";

type BlogPostLoaderProps = {
  initialPost: BlogPostPreview;
  initialBodyHtml: string;
};

/** Refetches article when UI locale changes (Strapi i18n). Uses `documentId` when slug differs per locale. */
export default function BlogPostLoader({
  initialPost,
  initialBodyHtml,
}: BlogPostLoaderProps) {
  const router = useRouter();
  const { locale, isLocaleReady } = useLocale();
  const [post, setPost] = useState(initialPost);
  const [bodyHtml, setBodyHtml] = useState(initialBodyHtml);
  const [busy, setBusy] = useState(false);

  const prevLocaleRef = useRef<string | null>(null);
  const prevSlugRef = useRef<string | null>(null);

  const slugFromUrl =
    router.isReady && typeof router.query.slug === "string"
      ? router.query.slug
      : initialPost.slug;

  const documentId = post.documentId ?? initialPost.documentId;

  useEffect(() => {
    if (!router.isReady || !isLocaleReady) return;

    const localeSwitch =
      prevLocaleRef.current !== null && prevLocaleRef.current !== locale;
    const slugSwitch =
      prevSlugRef.current !== null && prevSlugRef.current !== slugFromUrl;

    prevLocaleRef.current = locale;
    prevSlugRef.current = slugFromUrl;

    const showOverlay = localeSwitch || slugSwitch;

    let cancelled = false;

    (async () => {
      if (showOverlay) {
        setBusy(true);
      }
      try {
        const qs = new URLSearchParams();
        qs.set("locale", locale);
        if (documentId) qs.set("documentId", documentId);

        const res = await fetch(
          `/api/blogs/${encodeURIComponent(slugFromUrl)}?${qs.toString()}`,
        );
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { post?: BlogPostPreview };
        if (!data.post || cancelled) return;

        setPost(data.post);
        const html = (data.post.content ?? "").trim();
        setBodyHtml(data.post.contentBlocks?.length ? "" : html);

        if (data.post.slug !== slugFromUrl) {
          void router.replace(
            withLocale(locale, `/blog/${data.post.slug}`),
            undefined,
            {
              scroll: false,
            },
          );
        }
      } catch {
        /* keep SSR props */
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale, isLocaleReady, slugFromUrl, documentId, router, router.isReady]);

  return (
    <div className="relative min-h-[40vh] w-full">
      <ContentLoadingOverlay visible={busy} fullViewport />
      <BlogPostArticle post={post} bodyHtml={bodyHtml} />
    </div>
  );
}
