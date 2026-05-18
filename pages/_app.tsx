import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { BlogRouteProgress } from "../components/blog-route-progress";
import { HtmlLangSync } from "../components/html-lang-sync";
import { LocaleProvider } from "../contexts/locale-context";
import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:site_name" content="Hoasen" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
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
        <HtmlLangSync />
        <BlogRouteProgress />
        <Component {...pageProps} />
      </LocaleProvider>
    </>
  );
}

export default MyApp;
