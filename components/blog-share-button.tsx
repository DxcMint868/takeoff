"use client";

import { useCallback } from "react";
import Image from "next/image";

type BlogShareButtonProps = {
  slug: string;
  title: string;
  className?: string;
};

export function BlogShareButton({
  slug,
  title,
  className = "",
}: BlogShareButtonProps) {
  const onShare = useCallback(async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/blog/${slug}`
        : `/blog/${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled or copy failed */
    }
  }, [slug, title]);

  return (
    <button
      type="button"
      onClick={onShare}
      className={`inline-flex size-[32px] shrink-0 items-center justify-center rounded-full bg-[#735FD466] text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${className}`}
      aria-label="Share article"
    >
      <Image src="/share-icon.svg" alt="Share" width={16} height={16} />
    </button>
  );
}
