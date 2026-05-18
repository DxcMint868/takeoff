import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";
import { localeFromPathname } from "../lib/i18n/routing";

type DocProps = { lang: string };

export default class MyDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = localeFromPathname(ctx.asPath ?? "");
    return { ...initialProps, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#1b1333" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/svg+xml" href="/base-logo.svg" />
          <link rel="apple-touch-icon" href="/og-image.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
