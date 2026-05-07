import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
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

      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
