import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/azo-sans-uber-webfont.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/azo-sans-uber-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <meta property="og:url" content="https://minimismi.com" />
          <meta property="og:title" content="Minimismi.com" />
          <meta
            property="og:description"
            content="Uniquely designed, hand-made, eco-friendly ballet clothing"
          />
          <meta
            property="og:image"
            content="https://minimismi.com/images/minimismi-com_open-graph.jpg"
          />
          <meta property="og:site_name" content="Minimismi.com" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
