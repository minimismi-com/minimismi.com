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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
