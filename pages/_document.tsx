import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

type DocumentProps = {
  locale?: string;
};

export default function MyDocument({ locale }: DocumentProps) {
  return (
    <Html lang={locale ?? "en"}>
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

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, locale: ctx.locale };
};
