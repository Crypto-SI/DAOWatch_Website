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
          href="/images/hero.jpg"
          type="image/jpeg"
          imageSrcSet="/images/hero.jpg 1x"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 
