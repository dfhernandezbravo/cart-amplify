import type { AppProps } from 'next/app';
import '@assets/styles/globals.css';
import { Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@cencosud-ds/easy-design-system';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <main className={openSans.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
