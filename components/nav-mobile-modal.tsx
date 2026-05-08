"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { isNavItemActiveMobile, NAV_ITEMS } from "../lib/nav-links";
import { useTranslation } from "../lib/i18n/use-translation";

const HREF_TO_KEY: Record<string, string> = {
  "/#our-service": "nav.services",
  "/works": "nav.works",
  "/#our-team": "nav.ourTeam",
  "/about-us": "nav.about",
  "/#contact-us": "nav.contact",
};

type NavMobileModalProps = {
  open: boolean;
  onClose: () => void;
};

const linkBase =
  "[text-decoration:none] text-center text-xl font-reg tracking-[0.02em] leading-8 transition-colors duration-200 ease-in-out";
const linkInactive = `${linkBase} text-white-60 hover:text-white`;
const linkActive = `${linkBase} text-white font-semibold`;

export function NavMobileModal({ open, onClose }: NavMobileModalProps) {
  const { t } = useTranslation();
  const { pathname, asPath } = useRouter();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex h-[100dvh] w-full flex-col bg-dark"
      role="dialog"
      aria-modal="true"
      aria-label={t("nav.menu")}
    >
      <div className="flex shrink-0 items-center justify-end px-[30px] py-5 mq450:px-5">
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-lg border-0 bg-transparent text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple"
          aria-label={t("nav.closeMenu")}
        >
          <span className="font-reg text-3xl leading-none" aria-hidden>
            ×
          </span>
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col items-center justify-center gap-10 px-6 pb-16">
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActiveMobile(pathname, asPath, item.href);
          const key = HREF_TO_KEY[item.href];
          const label = key ? t(key) : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? linkActive : linkInactive}
              onClick={onClose}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
