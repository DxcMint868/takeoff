import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import Script from "next/script";
import { BlogRouteProgress } from "../components/blog-route-progress";
import { HtmlLangSync } from "../components/html-lang-sync";
import { OgLocaleMeta } from "../components/og-locale-meta";
import { LocaleProvider } from "../contexts/locale-context";
import { localeFromPathname } from "../lib/i18n/routing";
import type { AppLocaleCode } from "../lib/strapi/language";
import "./global.css";

type HoasenAppProps = AppProps & {
  ssrLocale: AppLocaleCode;
};

function MyApp({ Component, pageProps, ssrLocale }: HoasenAppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:site_name" content="Hoasen" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hoasenhub" />
      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-Q2GJ29HYCB"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q2GJ29HYCB');
        `}
      </Script>

      <LocaleProvider>
        <HtmlLangSync ssrLocale={ssrLocale} />
        <OgLocaleMeta ssrLocale={ssrLocale} />
        <BlogRouteProgress />
        <Component {...pageProps} />
      </LocaleProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const path = appContext.ctx.asPath ?? "";
  return {
    ...appProps,
    ssrLocale: localeFromPathname(path),
  };
};

export default MyApp;
