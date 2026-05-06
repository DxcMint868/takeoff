"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Badge } from "./badge";
import type { WorkTagSpec } from "./work-examples-portfolio";

/** Avoids React SSR warnings: `useLayoutEffect` is a no-op on the server. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type TagsDisplayProps = {
  tags: WorkTagSpec[];
  projectId: string;
  extra?: string;
  containerClassName?: string;
};

export function TagsDisplay({ tags, projectId, extra, containerClassName }: TagsDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(tags.length);
  const [tooltipAnchor, setTooltipAnchor] = useState<DOMRect | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Reset when tags change so we re-measure
    setVisibleCount(tags.length);
  }, [tags]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tagEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-tag-item]"),
    );

    // Only measure when ALL tags are rendered (no +N badge yet).
    // If tagEls.length < tags.length we're already in a truncated render — skip.
    if (tagEls.length !== tags.length) return;

    const rowTops: number[] = [];
    for (const el of tagEls) {
      const top = el.offsetTop;
      if (!rowTops.includes(top)) rowTops.push(top);
      if (rowTops.length > 2) break;
    }

    if (rowTops.length <= 2) return; // All tags fit in ≤2 rows — nothing to do

    const maxTop = rowTops[1];
    const fitting = tagEls.filter((el) => el.offsetTop <= maxTop).length;
    // Reserve the last slot on row 2 for the "+N" badge
    setVisibleCount(Math.max(1, fitting - 1));
  }, [tags, visibleCount]);

  const shown = tags.slice(0, visibleCount);
  const hiddenTags = tags.slice(visibleCount);
  const hiddenCount = hiddenTags.length + (extra ? 1 : 0);

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap gap-2${containerClassName ? ` ${containerClassName}` : ""}`}
      onClick={(e) => e.preventDefault()}
    >
      {shown.map((t) => (
        <span key={`${projectId}-${t.label}`} data-tag-item>
          <Badge>{t.label}</Badge>
        </span>
      ))}

      {hiddenCount > 0 && (
        <span
          className="relative inline-flex h-7 cursor-default items-center rounded-md border border-white/20 bg-white/10 px-2.5 font-reg text-xs font-medium leading-none tracking-[0.02em] text-white/70 transition-colors hover:border-white/40 hover:bg-white/20"
          onMouseEnter={(e) =>
            setTooltipAnchor(e.currentTarget.getBoundingClientRect())
          }
          onMouseLeave={() => setTooltipAnchor(null)}
        >
          +{hiddenCount}
        </span>
      )}

      {hiddenCount === 0 && extra && (
        <span className="font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white-60">
          {extra}
        </span>
      )}

      {tooltipAnchor &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              ...(tooltipAnchor.left + 280 > window.innerWidth
                ? { right: window.innerWidth - tooltipAnchor.right }
                : { left: tooltipAnchor.left }),
              top: tooltipAnchor.top - 10,
              transform: "translateY(-100%)",
              zIndex: 9999,
            }}
            className="w-max max-w-[280px] rounded-xl border border-white/20 bg-[#1b1333] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            onMouseEnter={() => setTooltipAnchor(tooltipAnchor)}
            onMouseLeave={() => setTooltipAnchor(null)}
          >
            <div className="flex flex-wrap gap-2">
              {hiddenTags.map((t) => (
                <Badge key={`tooltip-${projectId}-${t.label}`}>{t.label}</Badge>
              ))}
              {extra && (
                <span className="font-reg text-sm font-medium leading-[22px] tracking-[0.02em] text-white-60">
                  {extra}
                </span>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
