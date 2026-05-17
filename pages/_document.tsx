import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";
import { isAppLocale } from "../lib/strapi/language";

type DocProps = { lang: string };

export default class MyDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const path = ctx.asPath?.split("?")[0]?.split("#")[0] ?? "";
    const seg = path.split("/").filter(Boolean)[0];
    const lang = isAppLocale(seg) ? seg : "en";
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
