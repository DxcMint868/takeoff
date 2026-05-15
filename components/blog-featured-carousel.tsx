"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BlogPostPreview } from "../lib/blog-posts";
import { useTranslation } from "../lib/i18n/use-translation";
import { BlogPostMetaRow } from "./blog-post-meta-row";

type BlogFeaturedCarouselProps = {
  posts: BlogPostPreview[];
  formatDate: (iso: string) => string;
};

const AUTOPLAY_MS = 6000;
const SWIPE_PX = 56;

function excerptLead(text: string): { first: string; second?: string } {
  const parts = text.split(/(?<=\.)\s+/);
  if (parts.length >= 2) {
    return {
      first: parts[0].trim(),
      second: parts.slice(1).join(" ").trim(),
    };
  }
  return { first: text };
}

export function BlogFeaturedCarousel({
  posts,
  formatDate,
}: BlogFeaturedCarouselProps) {
  const { readSeconds } = useTranslation();
  const [active, setActive] = useState(0);
  const [resumeKey, setResumeKey] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);

  const len = posts.length;
  const post = posts[Math.min(active, len - 1)] ?? posts[0];
  const { first, second } = excerptLead(post.excerpt);

  const suppressLinkClickRef = useRef(false);
  const dragRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);

  const bumpAutoplay = useCallback(() => {
    setResumeKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (len <= 1 || hoverPause) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % len);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [len, hoverPause, resumeKey]);

  const goTo = useCallback(
    (i: number) => {
      setActive(i);
      bumpAutoplay();
    },
    [bumpAutoplay],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      pointerId: e.pointerId,
    };
  }, []);

  const endDrag = useCallback(
    (e: React.PointerEvent, clientX: number, clientY: number) => {
      const start = dragRef.current;
      dragRef.current = null;
      if (!start || start.pointerId !== e.pointerId) return;

      const dx = clientX - start.x;
      const dy = clientY - start.y;
      if (Math.abs(dx) < SWIPE_PX) return;
      if (Math.abs(dx) < Math.abs(dy)) return;

      suppressLinkClickRef.current = true;
      bumpAutoplay();
      if (dx < 0) {
        setActive((i) => (i + 1) % len);
      } else {
        setActive((i) => (i - 1 + len) % len);
      }
    },
    [bumpAutoplay, len],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      endDrag(e, e.clientX, e.clientY);
    },
    [endDrag],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent) => {
      dragRef.current = null;
    },
    [],
  );

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (suppressLinkClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressLinkClickRef.current = false;
    }
  }, []);

  if (len === 0) return null;

  return (
    <div
      className="w-full h-[370px] touch-manipulation mq900:h-[756px] mq900:touch-pan-y"
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onClickCapture={handleClickCapture}
    >
      <article className="group overflow-hidden rounded-[20px] border-solid border-[1px] border-[#7068A366] bg-[#261D44] p-4 shadow-[0_0_30px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_30px_0_rgba(255,255,255,0.2)] mq900:rounded-xl cursor-grab active:cursor-grabbing select-none">
        <div className="flex flex-row mq900:flex-col">
          <Link
            href={`/blog/${post.slug}`}
            className="relative block aspect-[440/338] w-[48%] shrink-0 overflow-hidden mq900:aspect-[303/338] mq900:h-auto mq900:w-full"
          >
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover rounded-[20px] pointer-events-none"
              sizes="(max-width: 900px) 100vw, 48vw"
              priority
              unoptimized
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent mq900:from-dark/60"
              aria-hidden
            />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col justify-between px-5 py-8 mq900:px-0 mq900:py-6">
            <div>
              <span className="inline-block rounded-full bg-white/[0.08] px-3 py-1 font-reg text-xs font-medium tracking-[0.02em] text-white/70">
                {readSeconds(post.timeToRead)}
              </span>
              <h2 className="mt-5 font-sora text-[22px] font-semibold leading-[1.25] tracking-[0.02em] text-white mq450:text-xl mq900:text-2xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-inherit [text-decoration:none] outline-none transition-colors group-hover:text-purple focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(28,22,48,0.65)]"
                >
                  {post.title}
                </Link>
              </h2>
              <div className="mt-4 space-y-3 font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white/70 mq900:text-[13px] mq900:leading-[21px]">
                <p className="m-0">{first}</p>
                {second ? <p className="m-0">{second}</p> : null}
              </div>
            </div>

            <BlogPostMetaRow post={post} dateFormatter={formatDate} />
          </div>
        </div>
      </article>

      {len > 1 ? (
        <div
          className="mt-8 flex justify-center gap-2"
          role="tablist"
          aria-label="Featured articles"
        >
          {posts.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show article ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-[3px] w-8 cursor-pointer rounded-full border-0 p-0 transition-colors duration-300 ${
                i === active ? "bg-white" : "bg-white/35 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
