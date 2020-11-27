import "styles/global.css";

import Head from "next/head";

export default function Root({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>reduce.media</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#27272a" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Convert files with just the power of your browser, no internet required."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
