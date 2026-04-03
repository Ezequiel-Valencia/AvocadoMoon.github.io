import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.scss';
import { AppStateProvider } from '@/hooks/useAppState';

export const metadata: Metadata = {
  title: 'Ezequiel Valencia',
  description: "Ezequiel's personal website describing their accomplishments and interests.",
  authors: [{ name: 'Ezequiel Valencia' }],
  icons: { icon: '/pixel moon.png' },
  openGraph: {
    title: 'Ezequiel Valencia',
    description: "Ezequiel's personal website describing their accomplishments and interests.",
    type: 'website',
    url: 'https://ezequielvalencia.com',
    images: [{ url: 'https://ezequielvalencia.com/clouds.jpg' }],
  },
};

// All routes are statically generated — matches the original SvelteKit prerender = true
export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <AppStateProvider>
          {children}
        </AppStateProvider>
        <Script
          src="https://kit.fontawesome.com/6a3a94789b.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
