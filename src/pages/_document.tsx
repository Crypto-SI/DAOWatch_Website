import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A comprehensive blog and video series about crypto-based projects, with a focus on Decentralized Autonomous Organizations (DAOs)." />
        <link
          rel="preload"
          as="image"
          href="/images/hero-500.webp"
          type="image/webp"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero-1000.webp"
          type="image/webp"
          media="(min-width: 768px)"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 
