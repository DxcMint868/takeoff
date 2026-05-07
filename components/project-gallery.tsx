"use client";

import { useTranslation } from "next-i18next";
import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react";

interface GallerySlide {
  src: string;
  alt: string;
  productPlatform?: "mobile" | "web" | "tablet";
}

interface ProjectGalleryProps {
  slides: GallerySlide[];
  autoPlayMs?: number;
}

export default function ProjectGallery({
  slides,
  autoPlayMs = 5000,
}: ProjectGalleryProps) {
  const { t } = useTranslation("common");
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
  const len = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(index);
      setTick((t) => t + 1);
    },
    [],
  );

  const go = useCallback(
    (dir: 1 | -1) =>
      goTo((active + dir + len) % len),
    [active, len, goTo],
  );

  useEffect(() => {
    if (len <= 1) return;
    const id = setInterval(() => setActive((prev) => (prev + 1) % len), autoPlayMs);
    return () => clearInterval(id);
  }, [len, autoPlayMs, tick]);

  const getOffset = (index: number) => {
    const diff = index - active;
    if (diff === 0) return 0;
    if (diff === 1 || diff === -(len - 1)) return 1;
    if (diff === -1 || diff === len - 1) return -1;
    return diff > 0 ? 2 : -2;
  };

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;

    touchStartRef.current = null;
    touchEndRef.current = null;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    go(deltaX < 0 ? 1 : -1);
  }, [go]);

  return (
    <section className="w-full overflow-hidden bg-dark py-16">
      <h2 className="m-0 mb-10 text-center font-sora text-[26px] font-semibold capitalize leading-none mq450:text-xl mq450:leading-[1.25]">
        {t("caseStudy.projectGallery")}
      </h2>

      {/* Desktop carousel */}
      <div className="relative mx-auto h-[580px] max-w-[1200px] mq900:hidden">
        {slides.map((slide, i) => {
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const isVisible = offset >= -1 && offset <= 1;

          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={
                isCenter
                  ? t("caseStudy.slideCurrent", { alt: slide.alt })
                  : t("caseStudy.slideGoTo", { alt: slide.alt })
              }
              className="absolute left-1/2 top-1/2 flex w-[62%] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 42}%) scale(${isCenter ? 1 : 0.78})`,
                filter: isCenter ? "none" : "blur(4px) brightness(0.5)",
                zIndex: isCenter ? 3 : isVisible ? 2 : 1,
                opacity: isVisible ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-h-[520px] w-auto max-w-full rounded-[20px] object-contain"
              />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t("caseStudy.galleryPrev")}
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t("caseStudy.galleryNext")}
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* Mobile: simple single-image view */}
      <div
        className="relative hidden mq900:flex mq900:justify-center mq900:px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slides[active].src}
          alt={slides[active].alt}
          className="max-h-[480px] w-auto max-w-full rounded-[20px] object-contain transition-opacity duration-500 mq450:rounded-[12px]"
        />
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t("caseStudy.galleryDot", { n: i + 1 })}
            className={`h-[3px] w-5 cursor-pointer rounded-[40px] border-0 p-0 transition-colors duration-300 ${
              i === active ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
