import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_BFF_WEB_URL} />
        <link rel="preconnect" href={'https://cencosud.com'} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
