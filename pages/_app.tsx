import { Fragment } from "react";
import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Hoasen - Crafting the Future of Blockchain & Fintech</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Hoasen crafts the future of blockchain and fintech. Specializing in smart contracts, DApps, and other fintech implementations." />
        <meta name="keywords" content="blockchain, fintech, smart contracts, DApps, cryptocurrency, Ethereum, Solana, development, software" />
        <meta name="author" content="Hoasen" />
        <meta property="og:title" content="Hoasen - Crafting the Future of Blockchain & Fintech" />
        <meta property="og:description" content="Expert blockchain and fintech development services. Build your next-generation decentralized application with Hoasen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hoasen.io" />
        <meta property="og:image" content="https://www.hoasen.io/og-image.png" />
        <link rel="canonical" href="https://www.hoasen.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-Q2GJ29HYCB"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q2GJ29HYCB');
        `}
      </Script>

      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
