import type { HreflangAlternate } from "../lib/i18n/hreflang";

type HreflangLinksProps = {
  alternates: HreflangAlternate[];
};

/** Place inside `<Head>` — renders alternate hreflang link elements. */
export function HreflangLinks({ alternates }: HreflangLinksProps) {
  if (alternates.length === 0) return null;

  return (
    <>
      {alternates.map((alt) => (
        <link
          key={alt.hreflang}
          rel="alternate"
          hrefLang={alt.hreflang}
          href={alt.href}
        />
      ))}
    </>
  );
}
