"use client";

import Image from "next/image";
import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react";

interface GallerySlide {
  src: string;
  alt: string;
}

interface ProjectGalleryProps {
  slides: GallerySlide[];
  autoPlayMs?: number;
}

export default function ProjectGallery({
  slides,
  autoPlayMs = 5000,
}: ProjectGalleryProps) {
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
        Project Gallery
      </h2>

      {/* Desktop carousel */}
      <div className="relative mx-auto h-[520px] max-w-[1200px] mq900:hidden">
        {slides.map((slide, i) => {
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const isVisible = offset >= -1 && offset <= 1;

          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={isCenter ? `Current slide: ${slide.alt}` : `Go to: ${slide.alt}`}
              className="absolute left-1/2 top-1/2 w-[62%] cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 42}%) scale(${isCenter ? 1 : 0.78})`,
                filter: isCenter ? "none" : "blur(4px) brightness(0.5)",
                zIndex: isCenter ? 3 : isVisible ? 2 : 1,
                opacity: isVisible ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              <div className="relative aspect-[890/505] w-full overflow-hidden rounded-[20px] bg-[#0d0b1a]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 62vw, 744px"
                />
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* Mobile: simple single-image view */}
      <div className="relative hidden mq900:block">
        <div
          className="relative aspect-[890/505] w-full overflow-hidden rounded-[20px] bg-[#0d0b1a] mq450:rounded-[12px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          <Image
            src={slides[active].src}
            alt={slides[active].alt}
            fill
            className="object-contain transition-opacity duration-500"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[3px] w-5 cursor-pointer rounded-[40px] border-0 p-0 transition-colors duration-300 ${
              i === active ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
