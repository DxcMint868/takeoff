"use client";

import Head from "next/head";
import { useLocale } from "../contexts/locale-context";
import { resolveOgLocale } from "../lib/i18n/dictionaries";
import type { AppLocaleCode } from "../lib/strapi/language";

type OgLocaleMetaProps = {
  /** Locale parsed from the URL on the server (first paint). */
  ssrLocale: AppLocaleCode;
};

/** Sets `og:locale` from the active UI locale (not hardcoded English). */
export function OgLocaleMeta({ ssrLocale }: OgLocaleMetaProps) {
  const { locale, isLocaleReady } = useLocale();
  const active = isLocaleReady ? locale : ssrLocale;

  return (
    <Head>
      <meta key={`og:locale-${active}`} property="og:locale" content={resolveOgLocale(active)} />
    </Head>
  );
}
