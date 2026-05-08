"use client";

import Router from "next/router";
import { useEffect, useState } from "react";

/**
 * Top indeterminate bar during client navigations to `/blog` routes (list → detail, etc.).
 */
export function BlogRouteProgress() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onStart = (url: string) => {
      try {
        const path = url.split("?")[0] ?? "";
        if (path.startsWith("/blog")) setActive(true);
      } catch {
        setActive(true);
      }
    };
    const onDone = () => setActive(false);

    Router.events.on("routeChangeStart", onStart);
    Router.events.on("routeChangeComplete", onDone);
    Router.events.on("routeChangeError", onDone);

    return () => {
      Router.events.off("routeChangeStart", onStart);
      Router.events.off("routeChangeComplete", onDone);
      Router.events.off("routeChangeError", onDone);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-0.5 w-full overflow-hidden bg-white/10 motion-reduce:h-1 motion-reduce:bg-purple/40"
      aria-hidden
    >
      <div className="h-full w-[42%] bg-gradient-to-r from-transparent via-purple to-mediumpurple shadow-[0_0_12px_rgba(115,95,212,0.8)] motion-safe:animate-blog-route-bar motion-reduce:translate-x-0 motion-reduce:animate-none motion-reduce:w-full motion-reduce:opacity-80" />
    </div>
  );
}
